---
# 📝 Prova 2 – Módulo 8: Entry/Exit, Atribuição e Execução
---

1. AnyAirlines quer que o Stage “TI” só seja iniciado depois que o Stage “Documentação” for aprovado com sucesso. Que conceito se aplica?
   A. Work Items  
   B. Entry Conditions  
   C. Exit Conditions  
   D. Platform Events  

2. Northern Trail Outfitters (NTO) precisa definir quando um Step é considerado concluído. Em uma etapa interativa, qual é o critério típico?
   A. Quando o usuário termina o Screen Flow associado  
   B. Quando o administrador clica em “aprovar tudo”  
   C. Quando o sistema envia um e‑mail  
   D. Quando o registro é criado  

3. Em um Background Step, qual evento geralmente determina a Exit Condition?
   A. O usuário clicar em “Salvar”  
   B. A conclusão do Autolaunched Flow que implementa a lógica  
   C. O fim do dia útil  
   D. A execução de um Apex Trigger  

4. Um cenário descreve um Step que deve ser iniciado apenas quando um certo campo do registro estiver com status “Aprovado”. Onde isso é configurado?
   A. Em Work Guide  
   B. Na Entry Condition do Step/Stage  
   C. Em Apex apenas  
   D. Em Process Builder  

5. Um gerente quer que certas tarefas caiam em uma fila, não em um usuário específico, para que qualquer membro da equipe possa pegá‑las. Como isso é suportado?
   A. Atribuição apenas por usuário  
   B. Atribuição de Step interativo a Queue  
   C. Atribuição direta a RPA  
   D. Atribuição a API Manager  

6. NTO precisa que um usuário veja claramente quais tarefas pendentes existem para ele em um determinado registro. Qual componente da UI é usado?
   A. Work Guide no registro do Salesforce  
   B. Apenas lista de tarefas padrão  
   C. Tela do RPA  
   D. Console do Exchange  

7. Em um cenário de prova, duas etapas devem rodar em paralelo dentro do mesmo Stage. Quando o Stage é considerado finalizado?
   A. Quando qualquer uma termina  
   B. Quando todas as Steps obrigatórias paralelas são concluídas  
   C. Quando o administrador desejar  
   D. Quando uma API retorna 200  

8. AnyAirlines quer pausar um processo de aprovação até que um evento externo seja concluído. Como o Orchestrator lida com isso?
   A. Não suporta pausas  
   B. Mantém o estado da Orchestration e aguarda conclusão do Step ou Flow responsável  
   C. Cancela o processo automaticamente  
   D. Move tudo para Apex  

9. Um candidato confunde Orchestration Runs com Flows individuais. Qual a melhor definição de “Orchestration Run”?
   A. Código fonte de um Flow  
   B. Uma execução específica da orquestração completa, com todos seus Stages e Steps  
   C. Um log de API Manager  
   D. Uma execução de Apex  

10. Um cenário mostra que várias execuções da mesma Orchestration estão em diferentes estados (em andamento, pausada, concluída). Onde isso é visualizado?
    A. Apenas em logs brutos  
    B. Na página de Orchestration Runs  
    C. Em RPA Manager  
    D. No Exchange  

11. NTO precisa depurar por que um processo de compras ficou travado em um Stage específico. Que recurso ajuda?
    A. Debug da Orchestration, inspeccionando variáveis entre Stages  
    B. Apenas logs de Apex  
    C. Apenas Exchange  
    D. Apenas RPA logs  

12. Um fluxo de exemplo cita: “Stage 1 – Pedido, Stage 2 – Aprovação, Stage 3 – Estoque (background), Stage 4 – Compras”. Em qual Stage a API MuleSoft provavelmente é chamada?
    A. Stage 1  
    B. Stage 2  
    C. Stage 3 (Estoque) via Background Step  
    D. Stage 4  

13. AnyAirlines quer que uma etapa de “Revisão de Compliance” seja necessária somente se o valor do pedido for maior que um limite. Onde essa lógica deve ser configurada?
    A. Na política de API  
    B. Na Entry Condition do Step/Stage de Compliance  
    C. Em logs do Monitoring  
    D. Em um e‑mail manual  

14. Uma alternativa diz que “Background Steps não podem chamar APIs, apenas atualizar campos locais”. Com base no conteúdo, isso é:
    A. Verdadeiro  
    B. Falso; Background Steps executam Flows, que podem chamar APIs MuleSoft e outros serviços  
    C. Verdadeiro apenas em Sandbox  
    D. Verdadeiro apenas para Experience Cloud  

15. NTO quer entender quem está segurando um processo parado. Que combinação de informações a Orchestration fornece?
    A. Apenas logs de sistema  
    B. Orchestration Runs + Work Items, mostrando em qual Step/usuário/queue o processo está  
    C. Apenas a data de criação  
    D. Apenas o status final  
