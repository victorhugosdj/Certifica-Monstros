-- SCRIPT DEFINITIVO DE PRODUÇÃO - EXECUTAR NO SQL EDITOR DO SUPABASE --

-- 1. Extensões e Limpeza (Opcional)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Esquema de Tabelas (Sincronizado)
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT DEFAULT 'Aluno',
  pontuacao INTEGER DEFAULT 0,
  unlocked_badges TEXT[] DEFAULT '{}'::text[],
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  modules JSONB DEFAULT '{}'::jsonb,
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

CREATE TABLE IF NOT EXISTS public.drafts (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_code TEXT,
  answers JSONB DEFAULT '{}'::jsonb,
  current_question INTEGER DEFAULT 0,
  time_left INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Segurança (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "authenticated_select_profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_upsert_profiles" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "authenticated_select_progress" ON public.progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "authenticated_upsert_progress" ON public.progress FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "authenticated_select_metrics" ON public.metrics FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated_all_drafts" ON public.drafts FOR ALL TO authenticated USING (auth.uid() = user_id);

-- 4. Índices
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_metrics_ranking ON public.metrics (consolidated_count DESC, global_accuracy DESC);

-- 5. Função de Sincronização Automática (Expert Version)
CREATE OR REPLACE FUNCTION public.sync_metrics_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_total INTEGER := 0;
    v_correct INTEGER := 0;
    v_consolidated INTEGER := 0;
    v_name TEXT;
    kv RECORD;
    v_totalAnswered INT;
    v_correctCount INT;
    v_accuracy NUMERIC;
BEGIN
    -- Se DELETE: remover métricas
    IF TG_OP = 'DELETE' THEN
        DELETE FROM public.metrics WHERE user_id = OLD.user_id;
        RETURN OLD;
    END IF;

    -- Pega o nome do perfil
    SELECT display_name INTO v_name FROM public.profiles WHERE user_id = NEW.user_id LIMIT 1;
    IF v_name IS NULL THEN v_name := 'Aluno'; END IF;

    -- Garante que modules não é nulo
    IF NEW.modules IS NULL THEN
        NEW.modules := '{}'::jsonb;
    END IF;

    -- Suporte Híbrido (Array ou Objeto)
    IF jsonb_typeof(NEW.modules) = 'array' THEN
        FOR kv IN SELECT * FROM jsonb_array_elements(NEW.modules) AS elem LOOP
            v_totalAnswered := COALESCE((kv.elem->>'totalAnswered')::int, 0);
            v_correctCount := COALESCE((kv.elem->>'correctCount')::int, 0);
            v_total := v_total + v_totalAnswered;
            v_correct := v_correct + v_correctCount;
            IF v_totalAnswered >= 5 AND (v_correctCount::numeric / NULLIF(v_totalAnswered,0)) >= 0.8 THEN
                v_consolidated := v_consolidated + 1;
            END IF;
        END LOOP;
    ELSIF jsonb_typeof(NEW.modules) = 'object' THEN
        FOR kv IN SELECT * FROM jsonb_each(NEW.modules) LOOP
            v_totalAnswered := COALESCE((kv.value->>'totalAnswered')::int, 0);
            v_correctCount := COALESCE((kv.value->>'correctCount')::int, 0);
            v_total := v_total + v_totalAnswered;
            v_correct := v_correct + v_correctCount;
            IF v_totalAnswered >= 5 AND (v_correctCount::numeric / NULLIF(v_totalAnswered,0)) >= 0.8 THEN
                v_consolidated := v_consolidated + 1;
            END IF;
        END LOOP;
    END IF;

    -- Calcula acurácia
    v_accuracy := CASE WHEN v_total > 0 THEN ROUND((v_correct::numeric / v_total::numeric) * 100, 2) ELSE 0 END;

    -- Upsert Automático
    INSERT INTO public.metrics (user_id, user_name, consolidated_count, global_accuracy, total_answered, last_update)
    VALUES (NEW.user_id, v_name, v_consolidated, v_accuracy, v_total, now())
    ON CONFLICT (user_id) DO UPDATE SET
        user_name = EXCLUDED.user_name,
        consolidated_count = EXCLUDED.consolidated_count,
        global_accuracy = EXCLUDED.global_accuracy,
        total_answered = EXCLUDED.total_answered,
        last_update = now();

    -- Atualiza timestamp de progress
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Ativar o Gatilho (Trigger)
-- Mudamos para BEFORE para que o NEW.updated_at seja salvo na mesma transação
DROP TRIGGER IF EXISTS trigger_update_metrics ON public.progress;
CREATE TRIGGER trigger_update_metrics
BEFORE INSERT OR UPDATE ON public.progress
FOR EACH ROW EXECUTE FUNCTION public.sync_metrics_trigger();

-- Segurança Extra (Recomendação Sênior)
REVOKE EXECUTE ON FUNCTION public.sync_metrics_trigger() FROM PUBLIC;
-- Caso exista a função auxiliar _upsert_metrics (se você a manteve separada, senão ignore)
-- REVOKE EXECUTE ON FUNCTION public._upsert_metrics(UUID, TEXT, INTEGER, NUMERIC, INTEGER) FROM PUBLIC;

REVOKE ALL ON public.metrics FROM PUBLIC;
GRANT SELECT ON public.metrics TO authenticated;

-- Índice Extra para consultas por data
CREATE INDEX IF NOT EXISTS idx_metrics_last_update ON public.metrics(last_update DESC);
