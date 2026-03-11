# 🎯 Certifica Monstros – Treinador de Elite

Uma plataforma de educação moderna, de alto desempenho, focada em uma experiência de usuário premium com design **Dark & Red**. Totalmente integrada ao **Supabase** para gerenciamento de dados em tempo real e autenticação segura.

## 🏗️ Infraestrutura e Visão

O projeto foi reconstruído seguindo os padrões mais modernos de desenvolvimento Web:

- **Front-end**: Single Page Application (SPA) utilizando HTML5, CSS3 vanila (para máxima performance) e JavaScript moderno (ES6+).
- **Backend (BaaS)**: [Supabase](https://supabase.com/) para Autenticação, Banco de Dados (PostgreSQL) e Real-time Ranking.
- **Design System**: Interface customizada com estética "Grafite & Vermelho Vibrante", utilizando glassmorphism e micro-animações para uma sensação premium.
- **Segurança**: Políticas de Segurança ao Nível de Linha (RLS) no banco de dados para proteção contra trapaças e acesso não autorizado.
- **Comunicação**: Integração com EmailJS para recuperação de senha e validações.

## 🚀 Funcionalidades Principais

- **Fluxo de Autenticação Completo**: Cadastro com criação automática de perfil, Login seguro e Recuperação de senha.
- **Dashboard Dinâmico**: Visualização de progresso, acurácia global e evolução de estudo através de gráficos.
- **Sistema de Conquistas (Badges)**: Medalhas automáticas baseadas no desempenho do aluno (ex: Scholar, Master, Legend).
- **Ranking Global em Tempo Real**: Ranking calculado no servidor (Supabase) via triggers para garantir integridade e velocidade.
- **Configurações do Usuário**: Alteração de nome de exibição e troca de senha diretamente na interface.

## 📁 Organização de Pastas

```text
/
├── assets/          # Estilos CSS, Imagens e Ícones
├── data/            # Conteúdo educacional em Markdown
├── src/             # Lógica de negócio da aplicação (JS)
│   ├── auth.js      # Gestão de sessões e autenticação
│   ├── database.js  # Abstração de acesso aos dados
│   ├── ranking.js   # Lógica do ranking global
│   └── ...          # Outros módulos
├── sql/             # Scripts de configuração do banco de dados
└── index.html       # Ponto de entrada único da SPA
```

## 🌐 Publicação (Vercel)

A plataforma está otimizada para publicação via **Vercel**:

1.  Conecte seu repositório GitHub ao projeto na Vercel.
2.  A plataforma funcionará automaticamente como um **Static Site**.
3.  Certifique-se de configurar a URL de produção no painel do Supabase (Authentication -> URL Configuration) para que os redirecionamentos funcionem.

## 🛠️ Conexão e Manutenção

Para replicar o ambiente:
1.  Execute o script `sql/setup_v3.sql` no seu console do Supabase.
2.  Atualize as chaves `supabase-url` e `supabase-anon-key` no `index.html`.
3.  Sincronize o `service_id` do EmailJS conforme necessário.

---
*Desenvolvido com foco em excelência visual e robustez técnica.*
