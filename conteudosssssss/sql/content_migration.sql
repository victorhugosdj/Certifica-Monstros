-- 1. Tabela para Armazenamento de Conteúdos dos Módulos em JSON
create table public.modules_content (
  codigo_modulo text primary key,
  titulo text not null,
  conteudo_json jsonb not null,
  atualizado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Segurança: Todos podem ler, apenas admins podem modificar
alter table public.modules_content enable row level security;

create policy "Conteúdo visível para todos os usuários"
  on public.modules_content for select
  using (true);

-- 2. Exemplo de Inserção (Substituir o conteúdo real aqui)
-- O formato JSONB permite estruturar o texto markdown ou dividí-lo em seções

insert into public.modules_content (codigo_modulo, titulo, conteudo_json)
values 
('M1', 'Fundamentos de Hiperautomação', 
'{
  "introducao": "A hiperautomação combina RPA, IA e Machine Learning...",
  "topicos": [
    {"titulo": "O que é RPA?", "texto": "Robotic Process Automation..."}
  ],
  "conclusao": "A fundação para projetos complexos."
}'::jsonb),
('M2', 'Governança e Segurança', 
'{
  "introducao": "O pilar central da escala RPA.",
  "topicos": [
    {"titulo": "Modelo Operacional", "texto": "CoE, estruturas e políticas..."}
  ]
}'::jsonb);

-- 3. Atualizando a Função de Busca (Para uso futuro no App)
-- Uma função simples caso queira buscar partes específicas via RPC (Opcional)
create or replace function get_module_content(p_codigo text)
returns jsonb
language sql
security definer
as $$
  select conteudo_json from public.modules_content where codigo_modulo = p_codigo;
$$;
