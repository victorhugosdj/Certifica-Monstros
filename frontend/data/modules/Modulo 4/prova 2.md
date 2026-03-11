---
# 📝 Prova 2 – Módulo 4: Integração, Einstein Bots e Testes de Flow
---

1. AnyAirlines quer que um Screen Flow consuma uma API publicada na Anypoint Platform usando um contrato OpenAPI. Qual é o caminho recomendado?
   A. Criar Apex HTTP callout manualmente  
   B. Importar a especificação via External Services e usar a Action no Flow  
   C. Usar apenas HTTP Callout sem contrato  
   D. Criar um RPA para chamar a API  

2. NTO tem um cenário em que o Flow precisa chamar uma API cujo contrato ainda está em construção, mas há um Mocking Service disponível no Exchange. Como isso pode ser aproveitado?
   A. Não pode; Flow exige API real  
   B. External Services podem apontar para a URL do Mocking Service para testes  
   C. Somente Composer pode usar Mocking Service  
   D. Somente RPA pode usar Mocking Service  

3. Um Einstein Bot coleta o número de pedido do cliente e precisa obter o status via MuleSoft. Qual sequência está mais alinhada com a arquitetura recomendada?
   A. Bot → RPA → Banco de dados diretamente  
   B. Bot → Flow → Anypoint API → Sistema de pedidos  
   C. Bot → Composer → Planilha  
   D. Bot → Apex batch anonimo  

4. Um Flow que chama um External Service falha com erro 500 na API. Qual recurso do Flow deve ser usado para tratar essa falha de forma controlada?
   A. Path padrão do elemento  
   B. Fault Path (caminho de erro)  
   C. Loop infinito  
   D. Recurso de Debug apenas  

5. Em um cenário, o Flow precisa registrar um log e criar um caso interno sempre que uma chamada a API externa falhar. Onde essa lógica deve ficar?
   A. Dentro do Fault Path associado à action de callout  
   B. Fora do Flow, apenas em Apex  
   C. No client que chamou o Flow  
   D. Em um Workflow Rule  

6. NTO quer automatizar testes de Record‑Triggered Flows para garantir que não quebrem após mudanças. Qual recurso é mais apropriado?
   A. Flow Test (ferramenta declarativa)  
   B. Apenas testes manuais com Debug  
   C. Logs de execução em produção  
   D. Testes Apex exclusivamente  

7. Um item de prova descreve o uso da ferramenta de Debug de Flow. Qual vantagem principal ela oferece?
   A. Substitui todos os testes automatizados  
   B. Permite executar o fluxo como um usuário específico e visualizar o caminho e valores das variáveis  
   C. Apenas mostra logs de texto  
   D. Só funciona para Screen Flows  

8. Um Flow acionado por registro está falhando de forma intermitente por causa de uma API instável. Qual combinação é mais adequada?
   A. Ignorar as falhas  
   B. Implementar tratamento via Fault Path e, se necessário, registrar o erro para reprocessamento  
   C. Desativar o Flow  
   D. Transferir tudo para Workflow Rules  

9. AnyAirlines quer usar Einstein Bot como camada inicial e, dependendo da resposta da API, direcionar o caso para um agente humano. Onde essa decisão deve ser tomada?
   A. No banco de dados  
   B. No Flow que o Bot invoca, com base no retorno da API  
   C. Apenas no RPA  
   D. Apenas em Apex  

10. NTO precisa decidir entre External Services e HTTP Callout em um cenário de prova. A API já tem especificação publicada no Exchange e precisa ser reutilizada em vários Flows. Qual é a melhor escolha?
    A. HTTP Callout  
    B. External Services, para aproveitar o contrato e governança  
    C. Apenas Apex  
    D. Apenas Composer  

11. Um Flow consome uma API sem contrato, usando apenas URL e método HTTP. Mais tarde, a API ganha especificação OAS. O que a prova tende a considerar uma melhoria?
    A. Manter HTTP Callout para simplicidade  
    B. Migrar para External Services baseado na especificação  
    C. Trocar Flow por RPA  
    D. Trocar Flow por Apex triggers  

12. Um cenário descreve que analistas de negócio precisam simular entradas diferentes e ver rapidamente o comportamento do Flow. Qual combinação é mais adequada?
    A. Flow Test + Debug Tool  
    B. Apenas logs em produção  
    C. Apenas testes Apex  
    D. Apenas monitoramento em Anypoint  

13. Uma integração entre Flow e MuleSoft RPA é implementada via External Services chamando um endpoint do RPA Manager. O que isso representa em termos de hiperautomação?
    A. Uso do Flow como gatilho humano chamando processos RPA  
    B. Uso do RPA como interface de usuário  
    C. Substituição de APIs por bots  
    D. Eliminação da necessidade de Exchange  

14. Em um cenário de prova, uma alternativa sugere “usar Flow sem nenhum tipo de teste ou debug, confiando somente em produção”. Como essa opção deve ser vista?
    A. Correta, pois Flow é declarativo  
    B. Errada, pois Flow Test e Debug são recursos importantes cobrados na prova  
    C. Neutra, sem impacto  
    D. Preferível a qualquer estratégia de testes automatizados  

15. Uma empresa quer garantir que um Record‑Triggered Flow que chama APIs externas não quebre ao receber dados inesperados. Qual prática é mais alinhada?
    A. Assumir que dados sempre são válidos  
    B. Validar dados no Flow antes de chamar a API e usar Fault Paths para tratar falhas  
    C. Confiar apenas em logs da API  
    D. Desativar o Flow quando surgirem erros  
