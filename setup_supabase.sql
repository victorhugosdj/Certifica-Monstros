-- ============================================================
-- SCRIPT SQL PARA SUPABASE
-- ============================================================
-- 
-- Executar no Supabase Dashboard → SQL Editor
-- Copie e cole todo este conteúdo, depois clique "Run"
--
-- ============================================================

-- 1. Criar tabela de respostas do usuário
CREATE TABLE IF NOT EXISTS respostas_usuario (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

-- 3. Ativar Row Level Security (RLS)
ALTER TABLE respostas_usuario ENABLE ROW LEVEL SECURITY;

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

-- 7. Grant permissions para service role (backend)
GRANT ALL ON respostas_usuario TO authenticated;
GRANT ALL ON respostas_usuario TO service_role;

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
