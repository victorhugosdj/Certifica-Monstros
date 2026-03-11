---
# 📝 Prova 3 – Módulo 8: Estratégia, Cenários e Pegadinhas
---

1. AnyAirlines tem um processo de compras: funcionário pede item, gerente aprova, API verifica estoque, compras aprovam compra externa se necessário. Por que Flow Orchestration é indicado?
   A. Porque é apenas um processo batch simples  
   B. Porque coordena múltiplos passos humanos e automáticos ao longo do tempo  
   C. Porque substitui todas as APIs  
   D. Porque não usa nenhum Flow  

2. Uma alternativa sugere usar apenas RPA para coordenar todas as aprovações humanas e sistemas em um processo de semanas. Qual é o problema com essa abordagem?
   A. RPA não suporta UI  
   B. Orchestration foi desenhado para coordenação de longo prazo e tarefas humanas em Salesforce  
   C. RPA não pode chamar APIs  
   D. Flow não interage com humanos  

3. NTO quer decidir entre Flow Orchestration e um único Screen Flow para um processo de atendimento rápido que termina em poucos minutos em uma única sessão. O que a prova tende a preferir?
   A. Orchestration por ser mais complexa  
   B. Um Screen Flow simples, sem sobre‑engenharia  
   C. RPA apenas  
   D. Composer apenas  

4. Uma questão oferece a opção de usar Orchestration para um cenário onde não há etapas humanas nem espera; tudo é síncrono e curto. Que tipo de pegadinha é essa?
   A. Alternativa que adiciona complexidade desnecessária  
   B. Alternativa tecnicamente impossível  
   C. Alternativa que ignora APIs  
   D. Alternativa que viola DML limits  

5. AnyAirlines quer que um gerente possa acompanhar o progresso de um processo complexo diretamente no registro de Conta. Qual combinação suporta isso?
   A. Apenas logs de API  
   B. Orchestration + Work Guide exibido no registro  
   C. Apenas RPA  
   D. Apenas Composer  

6. Uma alternativa sugere duplicar a lógica de aprovação em vários Flows em vez de centralizá‑la em uma Orchestration e subflows. Por que isso é frágil?
   A. Porque Flows não podem ter lógica de aprovação  
   B. Porque duplica lógica e dificulta manutenção e auditoria  
   C. Porque Orchestration não pode chamar subflows  
   D. Porque APIs não suportam aprovação  

7. NTO vê vários processos parados em estágios diferentes e precisa priorizar onde atuar. Qual artefato ajuda a ter essa visão de alto nível?
   A. Lista de Apex Classes  
   B. Lista de Orchestration Runs com status (em andamento, pausada, falha, concluída)  
   C. Logs locais das máquinas dos usuários  
   D. Apenas relatórios de casos  

8. Uma questão mostra um processo em que, enquanto RH valida documentos, TI já pode começar a preparar o ambiente, ambos em paralelo. Qual resposta demonstra entendimento correto?
   A. Orchestration deve sempre ser sequencial  
   B. Orchestration permite Steps paralelos em um Stage, concluído somente quando ambos terminam  
   C. Múltiplas Orchestrations são obrigatórias  
   D. Somente RPA pode rodar em paralelo  

9. Um candidato escolhe uma opção que diz: “em caso de erro, é melhor cancelar toda a Orchestration sem qualquer informação de estado”. Por que isso é inadequado?
   A. Porque não é tecnicamente possível  
   B. Porque perde rastreabilidade; melhor registrar, permitir retomada e manter histórico  
   C. Porque erros nunca ocorrem  
   D. Porque RPA sempre manipula erros  

10. AnyAirlines quer que processos de aprovação possam evoluir com o tempo, mantendo histórico de versões. Qual combinação está mais alinhada?
    A. Apex hard‑coded  
    B. Flows e Orchestrations versionados, com migração cuidadosa entre versões  
    C. Scripts locais  
    D. Apenas e‑mails  

11. Uma alternativa sugere construir toda a lógica de processo em Apex e deixar Orchestration apenas como “fachada vazia”. Por que isso não reflete o foco do módulo?
    A. Porque Apex não é suportado  
    B. Porque Flow Orchestrator é justamente a camada para coordenar processo, e Apex deve ser usado apenas quando necessário  
    C. Porque Orchestration não chama Apex Actions  
    D. Porque a prova não considera Apex  

12. NTO quer usar Orchestration, mas também precisa chamar APIs MuleSoft em certos pontos do processo. Qual é a arquitetura recomendada?
    A. Orchestration chama Flows, que usam External Services/HTTP Callout para consumir APIs  
    B. Orchestration chama diretamente o banco  
    C. APIs chamam Orchestration sempre  
    D. RPA substitui todas as APIs  

13. Uma questão apresenta um processo que já está bem atendido por um Record‑Triggered Flow e algumas automações simples. Uma opção sugere migrar tudo para Orchestration “só porque é novo”. Como avaliar?
    A. Sempre migrar para a tecnologia mais nova  
    B. Reconhecer como pegadinha; só usar Orchestration quando houver benefício claro (longa duração, múltiplos times, etc.)  
    C. Migrar por questões de marketing  
    D. Ignorar o cenário  

14. AnyAirlines quer que, se a verificação de estoque via API falhar, o processo seja pausado e redirecionado para uma fila de análise. Como isso pode ser modelado?
    A. Sem registrar nada  
    B. Background Step chamando Flow que trata falhas e encaminha Work Item para fila apropriada  
    C. Apenas com logs  
    D. Apenas com RPA  

15. Uma alternativa final afirma: “Flow Orchestration substitui completamente a necessidade de RPA, Composer e APIs em qualquer cenário de hiperautomação.” Qual resposta é mais alinhada?
    A. Concordar; Orchestration é suficiente para tudo  
    B. Discordar; Orchestration coordena processos, mas continua dependendo de Flows, APIs, RPA e Composer para executar tarefas especializadas  
    C. Concordar apenas para processos internos  
    D. Depende do volume  
