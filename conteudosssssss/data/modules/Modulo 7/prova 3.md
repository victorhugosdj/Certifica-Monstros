---
# 📝 Prova 3 – Módulo 7: Estratégia de Reutilização e Pegadinhas
---

1. AnyAirlines observa que, mesmo com Exchange, times ainda criam integrações duplicadas. Qual prática ajuda a mudar esse comportamento?
   A. Proibir o uso de Exchange  
   B. Tornar Exchange parte obrigatória do processo: sempre buscar antes de construir  
   C. Usar apenas documentação em PDF  
   D. Manter apenas comunicação verbal  

2. Uma alternativa sugere usar sempre código novo em cada projeto, para que times “não fiquem dependentes” de assets comuns. Por que isso contraria a visão MuleSoft?
   A. Porque código novo é sempre mais lento  
   B. Porque MuleSoft valoriza reutilização, contratos bem definidos e catálogo central em vez de duplicação  
   C. Porque Exchange não suporta múltiplos consumidores  
   D. Porque APIs não podem ser replicadas  

3. NTO quer garantir que todos os projetos usem um modelo único de “Cliente” em RAML. Qual combinação é mais alinhada?
   A. Criar o tipo “Cliente” em cada API individual  
   B. Criar um API Fragment com tipo “Cliente” e referenciá‑lo em múltiplas APIs  
   C. Definir apenas em documentação externa  
   D. Definir em banco de dados  

4. Uma questão apresenta duas opções:
   - A) Reutilizar uma API existente, ajustando apenas a Experience API  
   - B) Criar uma nova System API com mesma funcionalidade  
   Qual opção tipicamente representa uma pegadinha?
   A. A  
   B. B  
   C. Ambas  
   D. Nenhuma  

5. AnyAirlines quer que novos desenvolvedores aprendam rapidamente como usar uma API interna, sem precisar falar com o time original. Qual recurso do Exchange ajuda?
   A. Apenas logs de execução  
   B. Documentação gerada automaticamente + exemplos + API Notebook  
   C. Somente e‑mails antigos  
   D. Somente código binário  

6. Uma alternativa sugere que processos RPA não precisam aparecer no Exchange, pois “não são APIs”. Como o conteúdo do módulo contradiz isso?
   A. RPA não é citado no módulo  
   B. RPA Assets podem ser publicados no Exchange para promover visibilidade e reutilização  
   C. Exchange só aceita RAML  
   D. RPA usa outro catálogo obrigatório  

7. NTO planeja deletar um fragmento RAML antigo sem verificar dependências. Que risco a prova quer que você reconheça?
   A. Nenhum; fragments não são usados em produção  
   B. APIs que dependem desse fragmento podem quebrar, e por isso é importante checar “Dependencies” no Exchange  
   C. Apenas logs serão afetados  
   D. Apenas RPA será afetado  

8. Uma questão afirma que “antes de criar uma nova API, o time deve sempre verificar o Exchange por assets existentes”. Que conceito isso reforça?
   A. Acoplamento forte  
   B. Reutilização e cultura de catálogo  
   C. Enfoque apenas em código  
   D. Rejeição a padrões  

9. AnyAirlines quer controlar quais times podem publicar novos assets no Exchange e quem pode apenas consumir. Onde esse controle é configurado?
   A. Somente em API Manager  
   B. Em permissões e papéis da organização no Anypoint Platform/Exchange  
   C. Apenas em Runtime Manager  
   D. Apenas em Flow Builder  

10. Uma alternativa diz: “Para ganhar tempo de prova, é melhor ignorar o Exchange e sempre assumir que precisamos construir algo novo”. Como isso deve ser tratado?
    A. Às vezes correto  
    B. Como pegadinha; a prova frequentemente espera que você procure reutilizar assets existentes  
    C. Correto se o cenário não mencionar Exchange  
    D. Sempre correto  

11. NTO quer padronizar políticas de segurança para todas as APIs de um domínio. Como o Exchange pode ajudar indiretamente?
    A. Guardando apenas logs  
    B. Servindo como lugar único onde APIs e seus contratos são documentados e descobertos, facilitando aplicação consistente de políticas  
    C. Aplicando políticas diretamente  
    D. Monitorando CPU  

12. Uma alternativa sugere que “usar Exchange é opcional e não traz benefícios claros”. Baseado no módulo, qual resposta é mais alinhada?
    A. Concordar; é apenas uma vitrine  
    B. Discordar; Exchange é peça chave para reutilização, descoberta, mock, dependências e portais  
    C. Depende do tipo de API  
    D. Só importa para APIs públicas  

13. AnyAirlines quer compartilhar, com equipes de front‑end, exemplos de chamadas de APIs que serão usadas em Flutter e React. Qual é o melhor local?
    A. Anypoint Exchange, na documentação e exemplos do asset correspondente  
    B. E‑mails avulsos  
    C. Chat privado  
    D. Comentários em código  

14. Uma questão mostra que, mesmo havendo uma API pronta no Exchange, a equipe escolhe criar outra idêntica por desconhecimento. O que isso indica do ponto de vista da prova?
    A. Arquitetura madura  
    B. Falta de cultura de catálogo e reutilização  
    C. Uso correto de Exchange  
    D. Excesso de governança  

15. Uma alternativa final afirma: “O Exchange é apenas para mostrar APIs para times externos, não tem valor para times internos”. Como o candidato deve responder?
    A. Concordar  
    B. Discordar; times internos são os maiores beneficiados com catálogo, mocks, templates e fragmentos  
    C. Depende do tamanho da empresa  
    D. Verdadeiro apenas em pequenas organizações  
