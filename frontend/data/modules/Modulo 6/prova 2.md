---
# 📝 Prova 2 – Módulo 6: Performance, Gargalos e Troubleshooting
---

1. AnyAirlines nota que o tempo de resposta de uma API aumentou muito, mas o uso de CPU dos workers está baixo. Qual conclusão é mais provável?
   A. Problema na infraestrutura da API  
   B. Problema no sistema de destino (ex: banco de dados lento)  
   C. Falha no API Manager  
   D. Falha de rede entre CloudHub e internet  

2. Northern Trail Outfitters (NTO) vê CPU constantemente em 100% para uma API crítica. Qual ação está mais alinhada?
   A. Reduzir o número de requisições aceitas  
   B. Aumentar vCores ou número de workers (escala vertical/horizontal)  
   C. Desativar logs  
   D. Ignorar, se não há erros 500  

3. Um fluxo de hiperautomação começa no Salesforce Flow, chama uma API MuleSoft, que por sua vez chama um sistema legado. O Flow recebe 500. Onde o time deve olhar primeiro?
   A. Logs do Flow apenas  
   B. Log Search no Anypoint Monitoring para entender o erro no nível da API  
   C. Logs do usuário final apenas  
   D. Configurações DNS  

4. Em um cenário, RPA e Composer consomem a mesma API de estoque. De repente, o sistema legado começa a travar. Qual combinação é mais adequada?
   A. Escalar apenas RPA  
   B. Aplicar Rate Limiting/SLA Tiers e, se necessário, ajustar capacidade do backend  
   C. Desativar monitoramento  
   D. Permitir tráfego irrestrito  

5. NTO quer diferenciar problemas de infraestrutura (CPU/memória) de problemas de aplicação (erros de negócio). Qual conjunto de visões ajuda?
   A. Apenas logs locais  
   B. Dashboards de infra + métricas de aplicação no Anypoint Monitoring  
   C. Somente gráficos de CPU  
   D. Somente contagem de requisições  

6. Um item de prova mostra um gráfico em que a taxa de erro aumenta junto com a latência, enquanto CPU se mantém baixa. O que isso sugere?
   A. Gargalo de infraestrutura da API  
   B. Gargalo no sistema de destino ou dependência externa  
   C. Erro no RPA  
   D. Problema de DNS  

7. Uma empresa quer detectar proativamente se uma API crítica parou de responder como esperado para um cenário específico, antes que usuários reclamem. Qual recurso usar?
   A. Functional Monitoring com testes agendados  
   B. Apenas Console de Logs  
   C. Apenas alertas de CPU alta  
   D. Apenas testes manuais ocasionais  

8. AnyAirlines observa picos de tráfego gerados por um Flow mal configurado, causando falhas em lote. Qual resposta mais madura?
   A. Desativar o Flow sem análise  
   B. Ajustar design do Flow e, em paralelo, configurar Rate Limiting e alertas  
   C. Duplicar a API  
   D. Ignorar, esperando o volume cair  

9. NTO precisa investigar um caso específico em que um pedido falhou em uma cadeia de APIs. Qual abordagem é mais eficiente?
   A. Pedir prints de tela ao usuário  
   B. Correlacionar logs da execução daquela requisição via Anypoint Monitoring  
   C. Desinstalar a API  
   D. Ler todos os logs de todos os dias manualmente  

10. Um bot RPA dispara milhares de chamadas, gerando erros 429. O que isso indica e qual ação combina melhor?
    A. Indica problema de autenticação; trocar credenciais  
    B. Indica violação de Rate Limit; revisar política e padrão de chamada do bot  
    C. Indica que a API está offline  
    D. Indica erro de DNS  

11. Um candidato afirma: “não é necessário configurar alertas, pois o time sempre vê dashboards diariamente”. Como a prova tende a avaliar isso?
    A. Correto  
    B. Limitado; alertas automáticos são essenciais para responder rapidamente a incidentes  
    C. Válido apenas em produção  
    D. Suficiente para ambientes críticos  

12. Um cenário mostra que uma API está “up”, mas chamadas para um endpoint específico falham. Qual combinação de recursos ajuda na análise?
    A. Apenas status de worker  
    B. Logs detalhados e Functional Monitoring para aquele endpoint  
    C. Somente dashboards de CPU  
    D. Apenas logs do RPA  

13. AnyAirlines quer reduzir o MTTR (Mean Time To Resolve) para falhas em integrações. Qual prática é mais alinhada?
    A. Depender de e‑mails de usuários  
    B. Configurar monitoramento, alertas e dashboards claros para APIs chave  
    C. Apenas aumentar vCores  
    D. Desativar logs para simplificar  

14. Um time observa que, após um deploy, erros começaram a ocorrer. O que deve ser avaliado no Monitoring?
    A. Nenhuma métrica, pois é esperado errar  
    B. Comparação de métricas antes/depois do deploy (erros, latência, throughput)  
    C. Apenas logs locais  
    D. Apenas número de workers  

15. Uma alternativa sugere que “para resolver problemas de performance, a melhor estratégia é sempre adicionar mais vCores, sem analisar métricas detalhadas”. Como isso deve ser visto?
    A. Correto em todos os casos  
    B. Pegadinha; é preciso entender se o gargalo é infra, aplicação ou sistema destino antes de escalar  
    C. Aceitável apenas on‑premises  
    D. Aceitável apenas em CloudHub  
