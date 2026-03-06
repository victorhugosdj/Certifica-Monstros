---
# 📝 Prova 1 – Módulo 8: Fundamentos de Salesforce Flow Orchestration
---

1. AnyAirlines quer orquestrar o processo completo de admissão de funcionários, com várias etapas e departamentos. Qual componente é mais apropriado?
   A. Um único Screen Flow simples  
   B. Salesforce Flow Orchestration  
   C. Apenas MuleSoft RPA  
   D. Apenas Composer  

2. Northern Trail Outfitters (NTO) precisa entender a estrutura básica de uma orquestração. Qual é a hierarquia correta?
   A. Step → Stage → Orchestration  
   B. Orchestration → Stages → Steps  
   C. Stage → Orchestration → Steps  
   D. Steps → Orchestration → Stages  

3. Em um cenário, o processo de “Admissão de Funcionário” é dividido em Documentação, TI e Treinamento. Como isso deve ser modelado?
   A. Cada atividade como uma Orchestration separada  
   B. Estágios (Stages) representando cada agrupamento lógico  
   C. Apenas Steps sem Stages  
   D. Um único Step gigante  

4. A orquestração possui etapas que executam Autolaunched Flows sem interação humana. Como são chamadas essas etapas?
   A. Interactive Steps  
   B. Background Steps  
   C. User Tasks  
   D. Bot Tasks  

5. Uma etapa exige que um gerente aprove um desconto em uma tela. Que tipo de Step é esse?
   A. Background Step  
   B. Interactive Step  
   C. System Step  
   D. Async Step  

6. Um cenário fala sobre “Work Items” que aparecem para usuários em uma fila de trabalho, associando um Flow específico a ser preenchido. O que isso representa?
   A. Registros de log  
   B. Orchestration Work Items  
   C. Platform Events  
   D. Apex Jobs  

7. NTO quer que uma etapa interativa seja atribuída a um grupo de aprovadores. O que a Orchestration suporta?
   A. Atribuição apenas a usuários individuais  
   B. Atribuição a Usuário, Grupo ou Fila (Queue)  
   C. Atribuição apenas a filas  
   D. Atribuição apenas ao dono do registro  

8. Um exemplo de prova descreve um processo que pode levar dias, com múltiplas aprovações em momentos diferentes. Por que Flow Orchestration é adequado aqui?
   A. Porque roda apenas em lote  
   B. Porque gerencia estado de longo prazo, etapas e responsáveis  
   C. Porque substitui APIs  
   D. Porque não precisa de Flows  

9. Em um Stage, duas etapas devem ocorrer ao mesmo tempo: RH prepara o contrato e TI cria o e‑mail. Como isso é modelado?
   A. Steps sequenciais dentro do Stage  
   B. Steps paralelos dentro do mesmo Stage, que só termina quando ambos concluírem  
   C. Orchestrations separadas  
   D. Uma única etapa com lógica condicional  

10. Um candidato sugere usar apenas Flows isolados para um processo que exige coordenação entre vários times e tarefas humanas espaçadas. Por que isso pode ser insuficiente?
    A. Porque Flows não suportam Autolaunched  
    B. Porque Orchestration fornece modelo explícito de Stages, Steps e Work Items de longa duração  
    C. Porque Flows não podem chamar APIs  
    D. Porque Flows não podem ter tela  

11. AnyAirlines quer garantir trilha de auditoria: quem aprovou o quê, em qual etapa. Qual recurso ajuda nisso?
    A. Logs apenas em Apex  
    B. Estado e histórico de Orchestration Runs e Work Items  
    C. Somente logs do sistema legado  
    D. Apenas e‑mails salvos  

12. Um cenário menciona que a mesma Orchestration será usada em vários tipos de processos semelhantes, com pequenas variações. O que a prova tende a valorizar?
    A. Criar uma Orchestration totalmente nova para cada variação  
    B. Reutilizar orquestração e subflows onde fizer sentido, evitando duplicações  
    C. Colocar tudo em Apex  
    D. Usar apenas RPA  

13. NTO quer que certas etapas sejam opcionais e outras obrigatórias dentro de um Stage. O que define a conclusão do Stage?
    A. Quando qualquer Step termina  
    B. Quando todas as Steps obrigatórias terminam  
    C. Quando o primeiro usuário abre o Work Guide  
    D. Quando o administrador marcar manualmente como concluído  

14. Uma alternativa diz que “Flow Orchestration é apenas um nome novo para qualquer Screen Flow”. Como isso deve ser avaliado?
    A. Correto  
    B. Errado; Orchestration adiciona camada de processo multiestágio, não apenas UI  
    C. Verdadeiro em Sandbox  
    D. Verdadeiro apenas em produção  

15. Um processo descrito na prova envolve uma sequência curta, sem interação humana, toda síncrona. Que ferramenta provavelmente será preferida ao invés de Orchestration?
    A. Um Flow autônomo (Autolaunched/Record‑Triggered)  
    B. Uma Orchestration multiestágio  
    C. Apenas RPA  
    D. Apenas Composer  
