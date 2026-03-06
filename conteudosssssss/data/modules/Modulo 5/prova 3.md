---
# 📝 Prova 3 – Módulo 5: Governança, Reutilização e Pegadinhas
---

1. AnyAirlines nota que diferentes equipes estão construindo integrações diretas para o mesmo sistema legado, sem usar APIs comuns. Qual prática da MuleSoft mais combate esse problema?
   A. Incentivar mais integrações ponto‑a‑ponto  
   B. Criar System/Process APIs reutilizáveis e catalogá‑las no Exchange  
   C. Migrar tudo para planilhas  
   D. Usar apenas RPA  

2. NTO quer aplicar políticas de Rate Limiting em uma API sem alterar o código Mule. Qual componente deve ser usado?
   A. Anypoint Studio  
   B. API Manager com políticas aplicadas ao endpoint  
   C. Runtime Manager  
   D. RPA Manager  

3. Um cenário de exame: um Flow está sobrecarregando um sistema legado via API, causando travamentos. Qual resposta mais alinhada?
   A. Permitir o volume e esperar que o sistema seja atualizado  
   B. Aplicar Rate Limiting / SLA‑based Tiering na API para proteger o sistema  
   C. Desativar logs do sistema legado  
   D. Substituir a API por acesso direto ao banco  

4. Uma alternativa sugere expor uma API sem nenhuma forma de autenticação para simplificar o consumo por RPA, Flow e Composer. Como isso deve ser visto?
   A. Correto para ambientes internos  
   B. Errado; políticas como Client ID Enforcement são recomendadas mesmo em cenários internos críticos  
   C. Recomendado em provas  
   D. Neutro  

5. Uma empresa quer garantir que apenas IPs da infraestrutura Salesforce acessem determinada API. Qual política é usada?
   A. Rate Limiting  
   B. IP Whitelisting  
   C. Client ID Enforcement  
   D. JWT Validation  

6. Em um cenário, várias APIs críticas fazem parte de um fluxo de hiperautomação. Qual combinação ajuda a enxergar disponibilidade e erros em tempo real?
   A. Apenas logs locais dos servidores  
   B. Anypoint Monitoring com dashboards e Log Search  
   C. E‑mails manuais de usuários  
   D. Apenas o console do RPA  

7. Um item descreve um sistema em “choque” porque um Flow disparou milhares de requisições simultâneas. A alternativa correta provavelmente fala sobre:
   A. Escalar apenas vCores  
   B. Combinar Rate Limiting e, se necessário, ajustar capacidade (vCores/workers)  
   C. Desligar o Flow permanentemente  
   D. Migrar para integrações manuais  

8. NTO quer monitorar não só se a API está “de pé”, mas se está respondendo corretamente a determinados cenários críticos. Qual recurso é mencionado?
   A. Visualizer  
   B. Functional Monitoring  
   C. Exchange  
   D. API Notebook  

9. Uma alternativa diz: “Sempre que um novo consumidor aparecer, crie uma API nova para ele, com sua própria lógica e dados, mesmo que já exista uma API genérica”. Por que isso é típica pegadinha?
   A. Porque APIs não podem ter mais de um consumidor  
   B. Porque viola reutilização e aumenta acoplamento, indo contra o modelo API‑Led  
   C. Porque nenhuma API pode ser genérica  
   D. Porque API Manager não suporta múltiplas políticas  

10. Em um cenário, uma Experience API faz transformações pesadas e agregações de múltiplos sistemas. Já existe uma Process API que faz o mesmo. Qual opção é mais alinhada?
    A. Manter lógica duplicada na Experience API  
    B. Centralizar transformação na Process API e manter Experience mais fina  
    C. Migrar tudo para System APIs  
    D. Remover Process API  

11. Uma equipe argumenta que não há necessidade de publicar ativos no Exchange porque todos já sabem onde está o código. Por que isso é fraco arquiteturalmente?
    A. Porque o Exchange é obrigatório por contrato  
    B. Porque sem catálogo central, reutilização, descoberta e governança ficam muito mais difíceis  
    C. Porque APIs não funcionam sem Exchange  
    D. Porque Runtime Manager depende do Exchange  

12. AnyAirlines quer que RPA, Flow e Composer usem a mesma API de clientes. Qual desenho é mais consistente com a estratégia MuleSoft?
    A. Cada ferramenta chamando seu próprio conector proprietário para o sistema legado  
    B. Todas chamando a mesma API publicada e governada na Anypoint Platform  
    C. Apenas Flow chamando a API  
    D. Apenas RPA chamando a API  

13. Um item de prova menciona “Shared Load Balancer” (SLB). O que ele representa?
    A. Um concentrador de bots RPA  
    B. O balanceador padrão que fornece URL pública para APIs no CloudHub  
    C. Um componente exclusivo do Runtime Fabric  
    D. Um módulo de autenticação do Salesforce  

14. NTO quer limitar o tráfego para uma API com base no plano de acesso de cada consumidor (por exemplo, Bronze, Prata, Ouro). Qual funcionalidade é mais adequada?
    A. Rate Limiting simples  
    B. SLA‑based policies no API Manager  
    C. IP Whitelisting apenas  
    D. Desativar API em horários de pico  

15. Uma alternativa de prova afirma: “Em uma boa arquitetura MuleSoft, é melhor duplicar APIs do que ajustar contratos existentes para permitir reutilização”. Como o candidato ideal responde?
    A. Concorda, para evitar dependências  
    B. Discorda; a estratégia valoriza reutilização, contratos bem desenhados e minimização de duplicação  
    C. Depende do humor da equipe  
    D. Reproduz a abordagem sem questionar  
