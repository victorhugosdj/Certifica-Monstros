---
# 📝 Prova 1 – Módulo 4: Fundamentos de Salesforce Flow
---

1. AnyAirlines wants a guided screen for agents to capture claim details in Salesforce and then send the data to an API. Which tipo de Flow é mais apropriado?
   A. Autolaunched Flow  
   B. Screen Flow  
   C. Schedule‑Triggered Flow  
   D. Record‑Triggered Flow  

2. Northern Trail Outfitters (NTO) precisa que, ao criar um novo Contrato, uma automação execute lógica imediatamente sem interface de usuário. Qual tipo de Flow deve ser usado?
   A. Screen Flow  
   B. Record‑Triggered Flow  
   C. Flow Orchestration  
   D. Scheduled Flow externo  

3. Um cenário descreve um fluxo complexo de backoffice que deve ser chamado tanto por Apex quanto por uma Orchestration. Qual tipo de Flow é mais adequado como “bloco reutilizável”?
   A. Screen Flow  
   B. Autolaunched Flow  
   C. Record‑Triggered Flow  
   D. Workflow Rule  

4. AnyAirlines quer que, sempre que uma Opportunity for marcada como “Closed Won”, um processo RPA seja chamado via External Services. Onde essa chamada deve ficar?
   A. Em um Screen Flow independente  
   B. Em um Record‑Triggered Flow na Opportunity  
   C. Em um Flow Orchestration sem gatilho  
   D. Em um Apex Trigger apenas  

5. NTO quer garantir que o mesmo Record‑Triggered Flow seja reutilizável entre ambientes (Sandbox → Produção). O que representa essa definição de fluxo?
   A. Flow Metadata migrada por change sets ou DevOps  
   B. Logs do Salesforce  
   C. Documentação em PDF  
   D. Código Java externo  

6. Um candidato sugere usar apenas Apex para todas as automações, ignorando Flows. Por que isso não está alinhado com o posicionamento atual da Salesforce?
   A. Apex está obsoleto  
   B. Salesforce incentiva o uso de Flow como motor declarativo principal, reservando Apex para lógica muito complexa  
   C. Flow não suporta integrações  
   D. Flows não podem ser testados  

7. Um Screen Flow coleta dados do cliente e, depois, precisa chamar uma API da MuleSoft para validar limite de crédito. Qual recurso do Flow deve ser usado para consumir a especificação dessa API de forma declarativa?
   A. Platform Events  
   B. External Services  
   C. Inbound Email Services  
   D. Apex REST Callout escrito manualmente  

8. Um cenário descreve um Flow que precisa chamar um endpoint HTTP simples sem possuir um arquivo OpenAPI ou RAML. Qual recurso pode ser usado?
   A. HTTP Callout configurado diretamente no Flow  
   B. Apenas Apex HTTP classes  
   C. Somente Workflow Rules  
   D. Visualforce Pages  

9. AnyAirlines quer usar Einstein Bot para coletar informações de um passageiro e, em seguida, chamar um processo de backoffice via Flow. Qual relacionamento é mais correto?
   A. Bot chama Flow, que chama APIs/RPA  
   B. Flow chama Bot, que chama APIs  
   C. RPA chama Bot, que chama Flow  
   D. Composer chama Bot diretamente  

10. NTO deseja que parte da lógica de cálculo seja reutilizada em vários Flows. Qual recurso do Flow ajuda nessa reutilização?
    A. Subflows  
    B. Process Builder  
    C. Workflow Rules  
    D. Approval Processes  

11. Um cenário de prova afirma que um Flow deveria processar vários registros de uma vez, mas está tratando apenas um por vez e atingindo governor limits. Qual princípio deve ser lembrado?
    A. Bulkification do Flow  
    B. Somente uso de Apex  
    C. Desativar limites da plataforma  
    D. Usar RPA no lugar do Flow  

12. Uma equipe quer que um Flow rode em resposta a um evento externo publicado pela MuleSoft. Qual recurso Salesforce está mais alinhado a esse caso?
    A. Email Services  
    B. Platform Events como gatilho  
    C. Custom Metadata Types  
    D. Static Resources  

13. Um candidato sugere usar Screen Flow para toda lógica, inclusive cenários sem interface. Por que isso pode ser uma má escolha?
    A. Screen Flow não suporta apex actions  
    B. Autolaunched Flow é mais apropriado para lógica sem UI, facilitando reutilização e orquestração  
    C. Screen Flow não suporta subflows  
    D. Screen Flow não pode usar External Services  

14. Um Record‑Triggered Flow faz atualizações em massa, mas está falhando por limites de DML. Qual prática está mais alinhada a boas práticas?
    A. Fazer DML dentro de loops sem agrupar registros  
    B. Usar padrões de bulkification e evitar DML em loops  
    C. Sempre reduzir o número de registros processados  
    D. Mover tudo para RPA  

15. Um item de prova mostra um cenário simples de automação de CRM com lógica declarativa, sem necessidade de código complexo. Qual ferramenta a prova tende a preferir?
    A. Apex triggers apenas  
    B. Salesforce Flow  
    C. MuleSoft RPA  
    D. Custom Java Services  
