# Passo 2 – Banco de Dados (seed.sql)

## 🏗️ Tabelas no Supabase

Cole o SQL abaixo no **SQL Editor** do Supabase (Dashboard → SQL Editor → New Query).

```sql
-- ============================================================
-- CERTIFICA MONSTROS - SEED SQL
-- Execute este script inteiro no Supabase SQL Editor
-- ============================================================

-- 1. TABELA: profiles (dados do aluno)
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Aluno',
  pontuacao INTEGER NOT NULL DEFAULT 0,
  unlocked_badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA: progress (progresso por módulo)
CREATE TABLE IF NOT EXISTS progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  modules JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABELA: questoes (banco de questões importado do JSON)
CREATE TABLE IF NOT EXISTS questoes (
  id TEXT PRIMARY KEY,                    -- ex: 'm1_q1'
  modulo_id INTEGER NOT NULL,             -- 1 a 8
  enunciado TEXT NOT NULL,                -- texto da pergunta
  opcoes JSONB NOT NULL DEFAULT '[]',     -- array de strings
  correta TEXT NOT NULL,                  -- texto da resposta correta
  justificativa TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TABELA: respostas_usuario (cada resposta registrada)
CREATE TABLE IF NOT EXISTS respostas_usuario (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  questao_id TEXT NOT NULL,               -- FK lógica para questoes.id
  modulo_id INTEGER NOT NULL,
  resposta_texto TEXT NOT NULL,           -- o que o aluno selecionou
  correto BOOLEAN NOT NULL,              -- se acertou
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TABELA: metrics (métricas consolidadas por aluno)
CREATE TABLE IF NOT EXISTS metrics (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT DEFAULT 'Aluno',
  "globalAccuracy" REAL DEFAULT 0,
  "consolidatedCount" INTEGER DEFAULT 0,
  modules_data JSONB DEFAULT '{}'::jsonb,  -- métricas por módulo
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TABELA: drafts (rascunhos de prova)
CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,                    -- 'userId_moduleCode'
  "userId" UUID NOT NULL,
  "moduleCode" TEXT NOT NULL,
  questions JSONB,
  answers JSONB,
  "updatedAt" TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES para performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_respostas_user ON respostas_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_respostas_questao ON respostas_usuario(questao_id);
CREATE INDEX IF NOT EXISTS idx_respostas_modulo ON respostas_usuario(modulo_id);
CREATE INDEX IF NOT EXISTS idx_respostas_correto ON respostas_usuario(user_id, correto);
CREATE INDEX IF NOT EXISTS idx_questoes_modulo ON questoes(modulo_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - Cada usuário só vê seus dados
-- ============================================================

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_select ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY profiles_insert ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- progress
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY progress_select ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY progress_insert ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY progress_update ON progress FOR UPDATE USING (auth.uid() = user_id);

-- respostas_usuario
ALTER TABLE respostas_usuario ENABLE ROW LEVEL SECURITY;
CREATE POLICY respostas_select ON respostas_usuario FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY respostas_insert ON respostas_usuario FOR INSERT WITH CHECK (auth.uid() = user_id);

-- questoes (leitura pública, ninguém insere pelo client)
ALTER TABLE questoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY questoes_select ON questoes FOR SELECT USING (true);

-- metrics (leitura pública para ranking, escrita só pelo dono)
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY metrics_select ON metrics FOR SELECT USING (true);
CREATE POLICY metrics_insert ON metrics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY metrics_update ON metrics FOR UPDATE USING (auth.uid() = user_id);

-- drafts
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY drafts_select ON drafts FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY drafts_insert ON drafts FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY drafts_update ON drafts FOR UPDATE USING (auth.uid() = "userId");
CREATE POLICY drafts_delete ON drafts FOR DELETE USING (auth.uid() = "userId");
```

## 🔄 Importar Questões do JSON para o Supabase

Depois de criar as tabelas, use este script Python para importar as 360 questões:

```python
# import_questoes.py
import json
from supabase import create_client

SUPABASE_URL = "https://ibmembnxtbpsehqdorme.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibWVtYm54dGJwc2VocWRvcm1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ3Mjg3MiwiZXhwIjoyMDg4MDQ4ODcyfQ.tW1gnZN1K1G2KuZfcIDp-JUTcYgYIKV8DCU0Gia3TTw"  # ⚠️ Use a Service Role, não a anon key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

with open("data/provas.json", "r", encoding="utf-8") as f:
    questoes = json.load(f)

rows = []
for q in questoes:
    rows.append({
        "id": q["id"],
        "modulo_id": q["modulo"],
        "enunciado": q["pergunta"],
        "opcoes": q["opcoes"],
        "correta": q["correta_texto"],
        "justificativa": q.get("justificativa", "")
    })

# Inserir em lotes de 50
for i in range(0, len(rows), 50):
    batch = rows[i:i+50]
    result = supabase.table("questoes").upsert(batch).execute()
    print(f"  Lote {i//50 + 1}: {len(batch)} questões inseridas")

print(f"\n✅ {len(rows)} questões importadas com sucesso!")
```

## 📌 Notas

- A `Service Role Key` está em **Supabase Dashboard → Settings → API → service_role**
- **NUNCA** exponha a Service Role Key no frontend
- As questões ficam como leitura pública (política `questoes_select`)
- Respostas dos alunos são isoladas por RLS (cada um só vê as suas)

---

**Próximo passo:** [Passo 3 – Backend FastAPI](./passo_3_backend.md)
