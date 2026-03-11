---
# 📝 Prova 3 – Módulo 4: Arquitetura, API‑led e Pegadinhas com Flow
---

1. AnyAirlines quer que um Screen Flow chame uma API MuleSoft que já está publicada como Experience API. Qual é a abordagem mais alinhada com API‑led?
   A. Flow chama diretamente o banco de dados, ignorando a API  
   B. Flow consome a Experience API via External Services  
   C. Flow usa RPA para consultar o sistema  
   D. Flow usa apenas campos calculados, sem integração  

2. NTO já possui uma System API para ERP e uma Process API para regras de crédito. Um candidato sugere que o Screen Flow chame diretamente a System API. Qual é a opção mais alinhada?
   A. Aceitar, pois Flow deve sempre falar com System APIs  
   B. Preferir que o Flow consuma a Process/Experience API, reutilizando a orquestração existente  
   C. Ignorar APIs e usar Composer  
   D. Usar sempre RPA  

3. Um item de prova oferece duas alternativas:
   - A) Criar nova System API específica para um projeto, mesmo já existindo outra que expõe os mesmos dados  
   - B) Reutilizar a System API existente e, se necessário, criar uma Experience API  
   Qual delas está mais alinhada com reutilização?
   A. A  
   B. B  
   C. Ambas  
   D. Nenhuma  

4. Um Flow de entrada (Screen Flow) coleta dados para sinistro e aciona um RPA que preenche um sistema legado. O que o exame provavelmente quer reforçar?
   A. Flow como camada de interface humana em hiperautomação  
   B. RPA como interface principal  
   C. APIs substituindo Flow  
   D. Composer substituindo Flow  

5. Uma alternativa sugere colocar toda a lógica de transformação de dados no Screen Flow, mesmo já existindo uma Process API para isso. Por que isso costuma ser uma pegadinha?
   A. Flows não podem transformar dados  
   B. API‑led recomenda centralizar lógica de negócio na Process API, não na UI  
   C. Process APIs não suportam múltiplos consumidores  
   D. Examens não cobram Process APIs  

6. Um cenário descreve que, quando uma venda é fechada, o Flow deve: 1) Disparar RPA para sistema legado de logística, 2) Chamar API de SMS, 3) Registrar logs. Qual dos componentes deveria coordenar esse fluxo?
   A. Apenas RPA  
   B. Record‑Triggered Flow com chamadas às integrações  
   C. Apenas Composer  
   D. Apenas Apex  

7. Em uma questão, uma opção propõe usar Flow Orchestration para um processo extremamente simples de uma etapa, que poderia ser resolvido com um único Record‑Triggered Flow. Que tipo de pegadinha é essa?
   A. Alternativa tecnicamente impossível  
   B. Alternativa que adiciona complexidade desnecessária  
   C. Alternativa que ignora reutilização  
   D. Alternativa que viola limites de DML  

8. Uma empresa planeja fazer um fluxo que, ao atualizar um registro, chama vários subflows e APIs em série, correndo risco de chegar em limites. Qual abordagem é mais madura?
   A. Ignorar limites e confiar em retries  
   B. Repensar a arquitetura usando Process APIs, bulkification e, se necessário, Orchestration  
   C. Mover tudo para RPA  
   D. Desativar validações no Salesforce  

9. NTO quer garantir que decisões complexas de roteamento (por exemplo, para qual fila enviar um caso) fiquem configuráveis e reutilizáveis. O que a prova tende a preferir?
   A. Lógica espalhada em vários Apex Triggers  
   B. Lógica centralizada em Flows reutilizáveis ou subflows  
   C. Lógica em scripts locais  
   D. Lógica somente na API externa  

10. Uma alternativa diz: “Para garantir performance, conecte o Flow diretamente ao banco de dados, evitando APIs e Exchange.” Por que isso é incorreto?
    A. Salesforce não consegue acessar bancos de dados  
    B. Isso viola API‑led Connectivity, governança e reutilização de ativos  
    C. APIs não suportam governança  
    D. Exchange é apenas opcional para RPA  

11. Um cenário mostra: Flow → chama API sem contrato → ninguém sabe quem consome a API. Qual melhoria está mais alinhada à estratégia da MuleSoft?
    A. Deixar como está  
    B. Publicar a especificação no Exchange, usar External Services e aplicar políticas no API Manager  
    C. Trocar API por consultas diretas em banco  
    D. Migrar toda a lógica para RPA  

12. Uma questão descreve um time criando vários Flows que fazem chamadas redundantes para diferentes APIs com lógica duplicada. Qual resposta mais alinhada à visão de C4E?
    A. Permitir duplicação para velocidade  
    B. Criar Process/Experience APIs reutilizáveis e documentá‑las no Exchange para uso pelos Flows  
    C. Descontinuar o uso de Flow  
    D. Criar um Flow separado para cada time sem padrão  

13. Uma opção sugere que, quando uma API falha, é melhor deixar o Flow quebrar silenciosamente para o usuário não perceber. Como isso deve ser avaliado?
    A. Correta, porque melhora UX  
    B. Errada; erros devem ser tratados via Fault Paths e feedback adequado  
    C. Neutra  
    D. Só correta em produção  

14. Em um cenário típico de hiperautomação, qual papel do Salesforce Flow em relação a RPA, Composer e APIs?
    A. Ser o motor de UI e gatilho de eventos, consumindo APIs/RPA/Composer  
    B. Substituir todos os outros componentes  
    C. Apenas executar batchs noturnos  
    D. Atuar apenas como ferramenta de teste  

15. Uma alternativa de prova diz: “Construa um novo Flow complexo que duplica o comportamento de uma Experience API já existente, para não depender da equipe de integração.” Por que essa resposta é provavelmente errada?
    A. Flows não podem consumir APIs  
    B. Ela ignora reutilização de APIs existentes e aumenta a dívida técnica  
    C. Experience APIs não podem ser chamadas por Flow  
    D. Não há impacto em arquitetura  
