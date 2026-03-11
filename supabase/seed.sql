-- Supabase seed script: cria tabelas usadas pelo frontend (profiles e histórico de progresso)
-- Ajuste de acordo com sua configuração de projeto.

-- Extensões úteis para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Perfil de usuário (usado pelo frontend para armazenar pontuação e badges)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  user_id uuid UNIQUE NOT NULL,
  display_name text,
  pontuacao integer DEFAULT 0,
  unlocked_badges text[] DEFAULT array[]::text[]
);

-- Index para consultas por user_id
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Histórico de respostas do usuário (para métricas de dificuldade)
CREATE TABLE IF NOT EXISTS responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module integer NOT NULL,
  question_id text NOT NULL,
  correct boolean NOT NULL,
  answered_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_responses_user_id ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_module ON responses(module);

-- Tabela de histórico em português (usada pelo backend para métricas de erros)
CREATE TABLE IF NOT EXISTS respostas_usuario (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module integer NOT NULL,
  question_id text NOT NULL,
  correto boolean NOT NULL,
  answered_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_respostas_usuario_user_id ON respostas_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_respostas_usuario_module ON respostas_usuario(module);

-- Tabela de questões importadas do JSON
CREATE TABLE IF NOT EXISTS questoes (
  id text PRIMARY KEY,
  modulo_id integer NOT NULL,
  enunciado text NOT NULL,
  opcoes jsonb NOT NULL,
  correta text NOT NULL
);
