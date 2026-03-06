---
# 📝 Prova 3 – Módulo 3: Estratégia, Limitações e Pegadinhas do Composer
---

1. AnyAirlines wants to build a mission‑critical, high‑volume integration reused by many teams. One option is “implement everything in Composer”. Why is this likely wrong?
   A. Composer does not support SaaS connectors  
   B. High‑volume, reusable integrations belong in Anypoint APIs, not somente em Composer  
   C. Composer cannot send HTTP requests  
   D. Composer cannot be monitored  

2. NTO wants business admins to quickly connect Salesforce and Slack for simple notifications without involving developers. Which combination is most aligned with exam expectations?
   A. Anypoint Studio + DataWeave  
   B. MuleSoft Composer + Slack connector  
   C. Custom Java microservice  
   D. RPA bot posting to Slack  

3. A scenario states that an integration must be easily consumable by multiple channels (web, mobile, partners) and governed with policies like rate limiting. Which is the best place for the core logic?
   A. Composer flow  
   B. Anypoint Platform APIs (System/Process/Experience)  
   C. Local scripts  
   D. Only RPA  

4. An exam item offers two options:
   - A) Composer calling each SaaS system directly with many mappings  
   - B) Composer calling a Process API that orquestra os sistemas  
   Which is more aligned with reuse and API‑led?
   A. A  
   B. B  
   C. Ambos são equivalentes  
   D. Nenhum é suportado  

5. A candidate suggests using Composer to perform heavy data transformations that already exist in a Process API. What is the better approach?
   A. Duplicar a lógica no Composer  
   B. Reutilizar o Process API e manter a transformação centralizada nele  
   C. Mover a lógica para RPA  
   D. Implementar toda a lógica em Screen Flows  

6. A process uses Composer to trigger MuleSoft RPA via its connector for screen automation in a legacy system. What typical pattern does this illustrate?
   A. Composer como “orquestração leve” e RPA como “execução pesada”  
   B. RPA como orquestrador de Composer  
   C. APIs substituindo Composer  
   D. Apenas uso de HTTP Listener  

7. AnyAirlines has a Composer flow that fails frequently due to destination system unavailability. Which strategy is most reasonable in this context?
   A. Blindly retry infinite times no Composer  
   B. Validar dados e, quando possível, mover lógica crítica para APIs com políticas e retry apropriado  
   C. Ignorar todas as falhas  
   D. Remover logs para “melhorar performance”  

8. An option claims that Composer supports complex “try/catch” structures like a full programming language. Why is that likely a pegadinha?
   A. Porque Composer não suporta nenhum tipo de lógica  
   B. Porque Composer tem lógica limitada; recomenda‑se validar antes e tratar erros de forma simples  
   C. Porque Composer é apenas uma IDE  
   D. Porque Composer é igual ao Anypoint Studio  

9. NTO wants to ensure that integrations built by business users do not bypass corporate APIs and governance. Which guideline is most appropriate?
   A. Composer deve sempre chamar sistemas diretamente  
   B. Composer deve consumir APIs existentes quando disponíveis, em vez de ir direto ao backend  
   C. Composer nunca deve ser usado com APIs  
   D. Composer deve substituir o API Manager  

10. A scenario describes a one‑off data load of thousands of historical records. One answer suggests building a permanent Composer flow for this. Why is this potentially not ideal?
    A. Composer não consegue lidar com nenhum volume  
    B. Para migração pontual, ferramentas dedicadas ou scripts temporários podem ser mais adequados  
    C. Composer não tem conectores para SaaS  
    D. Composer só roda em produção  

11. An exam question describes three options:
    - A) Composer para baixa complexidade entre SaaS  
    - B) APIs Anypoint para integrações críticas e reutilizáveis  
    - C) RPA para sistemas sem API  
    Which statement best reflects MuleSoft positioning?
    A. Apenas A está correta  
    B. A, B e C estão corretas e complementares  
    C. Apenas C está correta  
    D. Nenhuma está correta  

12. A candidate chooses an option where Composer directly manipulates database tables of a core system instead of calling a System API. Why is this problematic?
    A. Porque bancos de dados não podem ser acessados  
    B. Porque ignora API‑led, governança e reutilização do System API existente  
    C. Porque Composer não suporta conexões  
    D. Porque System APIs não podem ser versionadas  

13. AnyAirlines wants to give non‑technical users autonomy, but also keep control over changes in integrations. Which governance model is mais alinhado com a prova?
    A. Cada time constrói flows sem qualquer guideline  
    B. C4E definindo padrões, reuse de ativos e suporte aos citizen integrators  
    C. Apenas um time central pode criar qualquer integração  
    D. Toda integração deve ser feita por desenvolvedores Java  

14. A scenario compares two solutions:
    - Option 1: Composer call to an Experience API exposing data for a specific UI  
    - Option 2: Composer leitura direta do banco, sem API  
    Which option is usually preferred?
    A. Option 1, pois respeita API‑led e reutilização  
    B. Option 2, porque é “mais direta”  
    C. Ambas são equivalentes  
    D. Nenhuma é suportada  

15. Uma questão da prova mistura camadas da API‑led e ferramentas:
    - System API para acessar ERP  
    - Process API para regra de negócio  
    - Experience API para Salesforce/Composer  
    - Composer consumindo a Experience API  
    Como essa arquitetura deve ser vista?
    A. Errada, pois Composer nunca deve consumir APIs  
    B. Alinhada com a estratégia MuleSoft de reutilização e separação de responsabilidades  
    C. Errada, pois Process APIs não devem existir  
    D. Errada, pois RPA deveria substituir Composer  
