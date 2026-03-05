-- EXECUTAR ESTE SCRIPT NO SQL EDITOR DO SUPABASE (CHAT OU SQL EDITOR) --

-- 1. Limpeza de tabelas existentes (CUIDADO: apaga dados antigos)
-- DROP TABLE IF EXISTS public.metrics CASCADE;
-- DROP TABLE IF EXISTS public.progress CASCADE;
-- DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2. Esquema de Tabelas (Sincronizado com o App)
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT DEFAULT 'Aluno',
  pontuacao INTEGER DEFAULT 0,
  unlocked_badges TEXT[] DEFAULT '{}'::text[],
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  modules JSONB DEFAULT '{}'::jsonb, -- Estrutura: {"M1": {"correctCount": 0, "totalAnswered": 0}, ...}
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.metrics (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT DEFAULT 'Aluno',
  consolidated_count INTEGER DEFAULT 0,
  global_accuracy NUMERIC(5,2) DEFAULT 0,
  total_answered INTEGER DEFAULT 0,
  last_update TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Habilitar Segurança (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- 4. Políticas Anti-Cheat e Acesso
-- Perfis e Ranking: Qualquer logado pode ver o ranking (SELECT), mas escrita é bloqueada
CREATE POLICY "authenticated_select_profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_upsert_profiles" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "authenticated_select_progress" ON public.progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "authenticated_upsert_progress" ON public.progress FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "authenticated_select_metrics" ON public.metrics FOR SELECT TO authenticated USING (true);
-- Nota: Metrics não permite UPDATE/INSERT via cliente (bloqueia cheats no ranking)
-- O SQL abaixo (Trigger) ignora RLS por ser SECURITY DEFINER.

-- 5. Função de Automação do Ranking
CREATE OR REPLACE FUNCTION public.sync_metrics_from_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_total_correct INTEGER := 0;
    v_total_answered INTEGER := 0;
    v_consolidated INTEGER := 0;
    v_display_name TEXT;
    v_module RECORD;
BEGIN
    -- Busca o nome atualizado do perfil
    SELECT display_name INTO v_display_name FROM public.profiles WHERE user_id = NEW.user_id;

    -- Itera sobre os módulos (JSONB Object)
    FOR v_module IN SELECT * FROM jsonb_each(NEW.modules)
    LOOP
        v_total_correct := v_total_correct + (v_module.value->>'correctCount')::int;
        v_total_answered := v_total_answered + (v_module.value->>'totalAnswered')::int;
        
        -- Regra de Consolidação: 80% acurácia e pelo menos 5 questões
        IF (v_module.value->>'totalAnswered')::int >= 5 AND 
           ((v_module.value->>'correctCount')::float / NULLIF((v_module.value->>'totalAnswered')::float, 0)) >= 0.8 THEN
            v_consolidated := v_consolidated + 1;
        END IF;
    END LOOP;

    -- Upsert Automático na Tabela de Ranking
    INSERT INTO public.metrics (user_id, user_name, consolidated_count, global_accuracy, total_answered, last_update)
    VALUES (
        NEW.user_id,
        COALESCE(v_display_name, 'Aluno'),
        v_consolidated,
        CASE WHEN v_total_answered > 0 THEN ROUND((v_total_correct::numeric / v_total_answered::numeric) * 100, 2) ELSE 0 END,
        v_total_answered,
        now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        user_name = EXCLUDED.user_name,
        consolidated_count = EXCLUDED.consolidated_count,
        global_accuracy = EXCLUDED.global_accuracy,
        total_answered = EXCLUDED.total_answered,
        last_update = now();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Ativar o Gatilho (Trigger)
DROP TRIGGER IF EXISTS trigger_update_metrics ON public.progress;
CREATE TRIGGER trigger_update_metrics
AFTER INSERT OR UPDATE ON public.progress
FOR EACH ROW EXECUTE FUNCTION public.sync_metrics_from_progress();
