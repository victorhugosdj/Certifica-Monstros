---
# 📝 Prova 3 – Módulo 6: Estratégia de Governança e Pegadinhas
---

1. AnyAirlines quer garantir que integrações de diferentes times não derrubem um sistema legado via APIs. Qual combinação melhor reflete a abordagem recomendada?
   A. Nenhuma limitação; confiar nos times  
   B. Aplicar políticas de Rate Limiting/SLA e monitorar com dashboards e alertas  
   C. Desativar todas as integrações  
   D. Usar apenas RPA  

2. Uma alternativa sugere expor APIs internas sem autenticação “para simplificar o acesso por RPA e Flow”. Por que isso é uma má prática?
   A. Porque APIs internas não podem ser usadas  
   B. Porque ignora segurança básica; políticas como Client ID Enforcement são recomendadas  
   C. Porque APIs com autenticação não funcionam com Flow  
   D. Porque Anypoint Monitoring não suporta APIs internas  

3. NTO tem múltiplas APIs críticas encadeadas em um processo de hiperautomação. O que melhor representa uma estratégia madura?
   A. Monitorar apenas a API final do fluxo  
   B. Monitorar e aplicar políticas nas principais APIs, entendendo o impacto de cada uma  
   C. Desativar logs para reduzir custo  
   D. Depender apenas do monitoramento de RPA  

4. Uma questão mostra que um novo cliente externo deve solicitar acesso a uma API. Qual fluxo esperado na plataforma MuleSoft?
   A. Cliente acessa o API Portal, solicita acesso e recebe Client ID/Secret aprovado  
   B. Cliente recebe acesso direto ao banco  
   C. Cliente chama a API sem autenticação  
   D. Cliente precisa de usuário administrativo no Anypoint Platform  

5. Um candidato escolhe uma opção que diz: “para evitar limites, é melhor remover Rate Limiting de APIs que suportam RPA e Flows”. Como isso deve ser lido?
   A. Correta; limites atrapalham automações  
   B. Pegadinha; limites protegem sistemas e ajudam a manter estabilidade  
   C. Correta apenas para sistemas internos  
   D. Correta se houver muitos consumidores  

6. AnyAirlines quer aplicar regras diferentes de consumo para clientes Gold, Silver e Bronze. Qual funcionalidade se encaixa melhor?
   A. IP Whitelisting  
   B. SLA‑Based Policies no API Manager  
   C. Apenas Rate Limiting estático  
   D. Somente logs  

7. Uma alternativa sugere criar cópias idênticas de uma API para separar tráfego interno e externo, em vez de usar políticas e gestão adequada. Por que isso normalmente é errado?
   A. Porque não se pode ter mais de uma API  
   B. Porque duplicação aumenta complexidade e reduz reutilização, ao invés de usar governança apropriada  
   C. Porque políticas não funcionam em APIs internas  
   D. Porque só RPA pode usar APIs internas  

8. NTO quer que incidentes de APIs críticas sejam rapidamente comunicados às equipes corretas. Qual combinação é mais alinhada?
   A. Apenas dashboards sem alertas  
   B. Alertas configurados no Monitoring integrados a canais como e‑mail ou Slack  
   C. Depender de clientes externos para avisar  
   D. Apenas reuniões semanais de status  

9. Uma questão mostra que uma API está configurada como Basic Endpoint, diretamente no runtime. Em qual situação considerar Proxy Endpoint faz mais sentido?
   A. Quando não se deseja aplicar nenhuma política  
   B. Quando se quer colocar um proxy entre consumidor e backend, sem tocar no código da API original  
   C. Quando se quer remover monitoramento  
   D. Quando a API está em beta  

10. Um candidato propõe “desabilitar logs detalhados” como solução primária para problemas de performance, sem qualquer análise. Por que isso é uma resposta fraca?
    A. Porque logs nunca impactam performance  
    B. Porque ataca sintomas às cegas, sem entender métricas nem causas reais  
    C. Porque Monitoring não usa logs  
    D. Porque API Manager ignora logs  

11. AnyAirlines quer evidências de que sua arquitetura está saudável: tempos estáveis, poucas falhas, políticas aplicadas. Qual combinação de ferramentas suporta essa visão?
    A. Apenas Studio  
    B. Anypoint Monitoring + API Manager (políticas, analytics, SLAs)  
    C. Apenas Exchange  
    D. Apenas RPA Manager  

12. Uma alternativa afirma: “Como as APIs são internas, não há necessidade de políticas de segurança nem controle de quem consome”. Como o candidato deve responder?
    A. Concordar, pois segurança é só para APIs externas  
    B. Discordar; mesmo internas, APIs críticas precisam de governança e controle de acesso  
    C. Depende do time de rede  
    D. Verdadeiro apenas em Sandbox  

13. NTO quer uma forma rápida de visualizar, em produção, quem está consumindo cada API e qual o volume por consumidor. Qual componente ajuda?
    A. API Manager (analytics e consumer metrics)  
    B. Studio  
    C. Exchange  
    D. Flow Builder  

14. Uma questão mostra um fluxo onde Flow → API → Sistema legado. A resposta “correta” sugere desativar Rate Limiting para resolver picos de erro. Que ponto a prova tenta testar?
    A. Que limites são sempre ruins  
    B. Que remover Rate Limiting pode agravar o problema e derrubar o sistema legado  
    C. Que Flow não suporta limites  
    D. Que APIs não precisam de proteção  

15. Uma alternativa final diz: “Boa governança significa nunca tocar em políticas ou monitoramento depois da primeira configuração”. Qual é a visão de melhores práticas?
    A. Correta; configuração inicial basta  
    B. Errada; governança e monitoramento são contínuos, ajustados conforme uso e incidentes  
    C. Correta apenas em produção  
    D. Correta apenas para APIs internas  
