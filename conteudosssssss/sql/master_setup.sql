-- ==========================================
-- SCRIPT DE CONFIGURAÇÃO MESTRE (MASTER SETUP)
-- PROJETO: Certifica Monstros - Treinador de Elite
-- VERSÃO: 1.0 (Produção)
-- ==========================================

-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. LIMPEZA (Opcional - Remova o comentário se quiser resetar totalmente)
-- DROP TRIGGER IF EXISTS trigger_update_metrics ON public.progress;
-- DROP FUNCTION IF EXISTS public.sync_metrics_trigger();
-- DROP TABLE IF EXISTS public.drafts;
-- DROP TABLE IF EXISTS public.metrics;
-- DROP TABLE IF EXISTS public.progress;
-- DROP TABLE IF EXISTS public.profiles;

-- 3. ESQUEMA DE TABELAS (Ligadas ao auth.users do Supabase)
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

-- 4. SEGURANÇA (Row Level Security - RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress_select" ON public.progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "progress_all" ON public.progress FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "metrics_select" ON public.metrics FOR SELECT TO authenticated USING (true);
-- Nota: Metrics é atualizada via Trigger (Security Definer), por isso não precisa de política de UPDATE para o usuário.

CREATE POLICY "drafts_owner" ON public.drafts FOR ALL TO authenticated USING (auth.uid() = user_id);

-- 5. ÍNDICES DE PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_metrics_ranking ON public.metrics (consolidated_count DESC, global_accuracy DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_last_update ON public.metrics(last_update DESC);

-- 6. FUNÇÃO DE AUTOMAÇÃO (Gatilho de Ranking)
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

-- 7. ATIVAR GATILHO
DROP TRIGGER IF EXISTS trigger_update_metrics ON public.progress;
CREATE TRIGGER trigger_update_metrics
BEFORE INSERT OR UPDATE ON public.progress
FOR EACH ROW EXECUTE FUNCTION public.sync_metrics_trigger();

-- 8. ENDURECIMENTO (Hardening)
REVOKE EXECUTE ON FUNCTION public.sync_metrics_trigger() FROM PUBLIC;
REVOKE ALL ON public.metrics FROM PUBLIC;
GRANT SELECT ON public.metrics TO authenticated;
