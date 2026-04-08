-- ============================================================
-- SCRIPT SQL PARA SUPABASE
-- ============================================================
-- 
-- Executar no Supabase Dashboard → SQL Editor
-- Copie e cole todo este conteúdo, depois clique "Run"
--
-- ============================================================

-- Extensão para geração de UUID compatível com Supabase
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Criar tabela de respostas do usuário
CREATE TABLE IF NOT EXISTS respostas_usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module INT NOT NULL,
  question_id TEXT NOT NULL,
  correto BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_respostas_user_id ON respostas_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_respostas_module ON respostas_usuario(module);
CREATE INDEX IF NOT EXISTS idx_respostas_created_at ON respostas_usuario(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_respostas_user_module ON respostas_usuario(user_id, module);

-- 2.1 Snapshot canônico consolidado (fonte de verdade cross-browser)
CREATE TABLE IF NOT EXISTS progresso_usuario_snapshot (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  question_id TEXT NOT NULL,
  module INT,
  correct BOOLEAN NOT NULL DEFAULT false,
  points DOUBLE PRECISION NOT NULL DEFAULT 0,
  attempts INT NOT NULL DEFAULT 1,
  wrong_attempts INT NOT NULL DEFAULT 0,
  last_answered_at TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT uq_progress_snapshot_user_question UNIQUE (user_id, question_id),
  CONSTRAINT fk_progress_snapshot_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_progress_snapshot_user_id ON progresso_usuario_snapshot(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_snapshot_updated_at ON progresso_usuario_snapshot(updated_at DESC);

-- 3. Ativar Row Level Security (RLS)
ALTER TABLE respostas_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_usuario_snapshot ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Usuários só podem VER suas próprias respostas
CREATE POLICY "Users can only read own responses"
  ON respostas_usuario
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Policy: Usuários só podem INSERIR suas próprias respostas
CREATE POLICY "Users can only insert own responses"
  ON respostas_usuario
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 6. Policy: SERVICE ROLE pode fazer tudo (necessário para backend)
CREATE POLICY "Service role full access"
  ON respostas_usuario
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can only read own canonical progress"
  ON progresso_usuario_snapshot
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert own canonical progress"
  ON progresso_usuario_snapshot
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update own canonical progress"
  ON progresso_usuario_snapshot
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access canonical progress"
  ON progresso_usuario_snapshot
  USING (true)
  WITH CHECK (true);

-- 7. Grant permissions para service role (backend)
GRANT ALL ON respostas_usuario TO authenticated;
GRANT ALL ON respostas_usuario TO service_role;
GRANT SELECT, INSERT, UPDATE ON progresso_usuario_snapshot TO authenticated;
GRANT ALL ON progresso_usuario_snapshot TO service_role;

-- ============================================================
-- Verificação: Listar estrutura da tabela
-- ============================================================
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'respostas_usuario'
ORDER BY ordinal_position;

-- ============================================================
-- PRONTO! A tabela foi criada com sucesso.
-- ============================================================
-- 
-- A partir de agora, o backend pode:
-- 1. Inserir respostas via POST /api/responses
-- 2. Ler respostas via GET /api/metrics/{user_id}
-- 
-- ============================================================
