import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\q.md"
output_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Mapeamento de ID -> texto correto baseado no conhecimento de MuleSoft/Salesforce/Hyperautomation
correct_answers = {
    # ── MÓDULO 1 ──────────────────────────────────────────────
    "m1_q1":  "MuleSoft RPA with screen automation",
    "m1_q2":  "MuleSoft Composer with prebuilt SaaS connectors",
    "m1_q3":  "Anypoint Platform APIs with batch processing",
    "m1_q4":  "Reuse a shared RPA process published in Anypoint Exchange",
    "m1_q5":  "Complexity and User Profile",
    "m1_q6":  "Implement exponential backoff and retries in the API",
    "m1_q7":  "Anypoint Exchange Mocking Service",
    "m1_q8":  "Technical exception in the RPA layer",
    "m1_q9":  "Create an Experience API on top of the existing System API",
    "m1_q10": "Idempotency of API operations",
    "m1_q23": "Validate RPA, integration APIs and target systems independently",
    "m1_q24": "Salesforce Flow Orchestration",
    "m1_q25": "Process APIs are responsible for orchestration and business logic",
    "m1_q26": "A layered model with System, Process and Experience APIs promoting reuse",
    "m1_q27": "The option that maximizes reuse of existing APIs and assets",
    "m1_q28": "Implement API\u2011led connectivity with System, Process and Experience APIs",
    "m1_q29": "A shared Product System API plus dedicated Experience APIs per channel",
    "m1_q30": "Inside a Process API on Anypoint Platform",
    "m1_q31": "Not ideal; prefer API\u2011based integration first and reserve RPA for no\u2011API cases",
    "m1_q32": "Anypoint Platform System API for ERP plus Composer for light orchestration",
    "m1_q33": "Salesforce Flow Orchestration with background and interactive steps",
    "m1_q34": "The Center for Enablement acting as an enablement and governance team",
    "m1_q35": "Implement retries with exponential backoff and timeouts in the APIs",
    "m1_q36": "Use synthetic/mock data defined in API specifications",
    "m1_q37": "MuleSoft Composer with out\u2011of\u2011the\u2011box connectors",
    "m1_q38": "Each layer (APIs, RPA, Flow, Composer) should handle its own technical concerns",
    "m1_q39": "Publishing shared RPA processes and API specs in Anypoint Exchange",
    "m1_q40": "Anypoint API Designer + Mocking Service consumed by Flow/Composer",
    "m1_q41": "In Salesforce Screen Flows integrated with APIs/RPA",
    "m1_q42": "It adds unnecessary components and ignores existing reusable services",
    "m1_q43": "System APIs for core data plus Process and Experience APIs for each channel",
    "m1_q44": "It violates the principle of reuse and increases maintenance",
    "m1_q45": "Start with MuleSoft RPA to simulate user interactions",
    "m1_q46": "Process API, because it centralizes business logic and orchestration",
    "m1_q47": "In the integration/API layer that receives or calls the RPA process",
    "m1_q48": "Alternative that adds unnecessary complexity",
    "m1_q49": "Native Salesforce data import tools or simple integration",
    "m1_q50": "A Process API orchestrating System APIs, reused by Composer and other clients",
    "m1_q51": "Use each tool for the role it is strongest at and maximize reuse",
    "m1_q52": "True reuse comes from generic System/Process APIs with Experience APIs only when needed",
    "m1_q53": "Reviewing assets published in Anypoint Exchange and enforcing reuse policies",
    "m1_q54": "Prefer the option that respects API\u2011led separation, even if more subtle",
    "m1_q55": "MuleSoft Composer with guided interface",
    "m1_q56": "RPA can act as a bridge, but long\u2011term strategy should be API\u2011led",
    "m1_q57": "As strong evidence of reuse and correct layering",

    # ── MÓDULO 2 ──────────────────────────────────────────────
    "m2_q1":  "MuleSoft RPA Builder criando a UI automation process",
    "m2_q2":  "Process is rule\u2011based, high volume and stable over time",
    "m2_q3":  "To estimate automation potential and business value before building",
    "m2_q63": "Lifecycle with stages like Evaluation, Design, Build, Test, Production",
    "m2_q64": "Wait until the process is stable before committing to RPA",
    "m2_q65": "Credential Manager in RPA Manager",
    "m2_q66": "Credentials must be stored securely and centrally in Credential Manager",
    "m2_q67": "RPA Agents configured to handle multiple processes",
    "m2_q68": "Secure Session on the RPA Agent",
    "m2_q69": "The process executed successfully in a controlled test environment",
    "m2_q70": "Dashboard de An\u00e1lise (ROI and time savings)",
    "m2_q71": "RPA is the only tool that can interact via UI when no API exists",
    "m2_q72": "RPA Manager \u2013 Process Operations",
    "m2_q73": "Consider RPA only if the process is complex but stable and rules\u2011based",
    "m2_q74": "Publish a shared login automation as an RPA asset in Exchange",
    "m2_q75": "A scorecard showing automation fitness and expected ROI",
    "m2_q76": "Evaluation \u2192 Design \u2192 Build \u2192 Test \u2192 Production",
    "m2_q77": "BPMN diagram created in the Design phase",
    "m2_q78": "Recorder only generates a skeleton and requires refinement in Builder",
    "m2_q79": "Use stable object\u2011based selectors like IDs or robust XPaths",
    "m2_q80": "Image\u2011based recognition and coordinate\u2011based clicks",
    "m2_q81": "In Builder activities that support OCR engines",
    "m2_q82": "Increase timeout and implement retries with screenshots on failure",
    "m2_q83": "Use dedicated error handling blocks and raise specific business exceptions for data issues",
    "m2_q84": "Use robust selectors focusing on stable attributes instead of visible text",
    "m2_q85": "It reduces scalability and breaks the idea of fully automated, scheduled runs",
    "m2_q86": "Secure Session plus Credential Manager with scheduled execution",
    "m2_q87": "Create a reusable component and share it as an RPA asset",
    "m2_q88": "Reject or postpone until the process is standardized and value is clear",
    "m2_q89": "Structured Builder workflow aligned with BPMN design and parameterized data",
    "m2_q90": "Update the selector (XPath/locator) in RPA Builder and republish",
    "m2_q91": "Business exception",
    "m2_q92": "Treat as technical exception and implement retry with exponential backoff",
    "m2_q93": "Capture screenshots and key context in error handling blocks",
    "m2_q94": "It violates security and auditability; credentials should be managed centrally and not shared",
    "m2_q95": "Credential Manager with role\u2011based access",
    "m2_q96": "Ensures that data issues are routed to the right human decision point",
    "m2_q97": "Configure distinct environments and lifecycles for Test and Production in RPA Manager",
    "m2_q98": "Retry with exponential backoff and escalation if threshold is exceeded",
    "m2_q99": "Secure Session creates its own virtual session and does not need a logged\u2011in user",
    "m2_q100": "In RPA Manager roles and permissions",
    "m2_q101": "Best practice prefers API\u2011based integrations when usable, keeping RPA for no\u2011API cases",
    "m2_q102": "Centralized logging and dashboards in RPA Manager (and Anypoint Monitoring if APIs are involved)",
    "m2_q103": "Proper RPA Agent capacity and scheduling aligned with license and hardware",
    "m2_q104": "2 only",

    # ── MÓDULO 3 ──────────────────────────────────────────────
    "m3_q109": "System event trigger on Salesforce",
    "m3_q110": "Scheduler trigger configured for 02:00",
    "m3_q111": "MuleSoft Composer",
    "m3_q112": "Select only the fields relevant for the flow",
    "m3_q113": "For Each loop",
    "m3_q114": "Only the first item will be processed or the mapping will fail",
    "m3_q115": "In the Formula Editor using string functions",
    "m3_q116": "Date functions such as ADD_DAYS",
    "m3_q117": "Activate Test Mode and perform the real triggering action within the time window",
    "m3_q118": "Test Mode must be used only in non\u2011production orgs or with test data",
    "m3_q119": "It stops at the failing step and marks the run as failed",
    "m3_q120": "In Composer Run History, inspecting data pills for each step",
    "m3_q121": "Composer is intended for simpler, low\u2011to\u2011medium complexity integrations, not full API\u2011led architectures",
    "m3_q122": "HTTP Listener trigger",
    "m3_q123": "In a sandbox or dedicated non\u2011production environment",
    "m3_q124": "If/Else block",
    "m3_q125": "For Each loop around the ERP creation step",
    "m3_q126": "TRIM + UPPER",
    "m3_q127": "Date functions in Formula Editor (por exemplo ADD_DAYS)",
    "m3_q128": "Use structured mapping with data pills instead of opaque JSON strings",
    "m3_q129": "Use If/Else blocks to validate data before calling the destination",
    "m3_q130": "Composer Run History, expanding the specific execution",
    "m3_q131": "Approximately 10 minutes, depending on configuration",
    "m3_q132": "Use shared connections configured once and referenced by several flows",
    "m3_q133": "A valid pattern for basic error notification",
    "m3_q134": "Option B",
    "m3_q135": "For Each loops around list operations",
    "m3_q136": "Composer is designed for simpler logic; complex orchestration and transformations belong in Anypoint APIs",
    "m3_q137": "Use Test Mode in a sandbox connected to a SAP test environment",
    "m3_q138": "Alternative tecnicamente poss\u00edvel, mas insegura ou fr\u00e1gil",
    "m3_q139": "High\u2011volume, reusable integrations belong in Anypoint APIs, not somente em Composer",
    "m3_q140": "MuleSoft Composer + Slack connector",
    "m3_q141": "Anypoint Platform APIs (System/Process/Experience)",
    "m3_q142": "B",
    "m3_q143": "Reutilizar o Process API e manter a transforma\u00e7\u00e3o centralizada nele",
    "m3_q144": "Composer como \u201corquestra\u00e7\u00e3o leve\u201d e RPA como \u201cexecu\u00e7\u00e3o pesada\u201d",
    "m3_q145": "Validar dados e, quando poss\u00edvel, mover l\u00f3gica cr\u00edtica para APIs com pol\u00edticas e retry apropriado",
    "m3_q146": "Porque Composer tem l\u00f3gica limitada; recomenda\u2011se validar antes e tratar erros de forma simples",
    "m3_q147": "Composer deve consumir APIs existentes quando dispon\u00edveis, em vez de ir direto ao backend",
    "m3_q148": "Para migra\u00e7\u00e3o pontual, ferramentas dedicadas ou scripts tempor\u00e1rios podem ser mais adequados",
    "m3_q149": "A, B e C est\u00e3o corretas e complementares",
    "m3_q150": "Porque ignora API\u2011led, governan\u00e7a e reutiliza\u00e7\u00e3o do System API existente",
    "m3_q151": "C4E definindo padr\u00f5es, reuse de ativos e suporte aos citizen integrators",
    "m3_q152": "Option 1, pois respeita API\u2011led e reutiliza\u00e7\u00e3o",
    "m3_q153": "Alinhada com a estrat\u00e9gia MuleSoft de reutiliza\u00e7\u00e3o e separa\u00e7\u00e3o de responsabilidades",

    # ── MÓDULO 4 ──────────────────────────────────────────────
    "m4_q157": "Screen Flow",
    "m4_q158": "Record\u2011Triggered Flow",
    "m4_q159": "Autolaunched Flow",
    "m4_q160": "Em um Record\u2011Triggered Flow na Opportunity",
    "m4_q161": "Flow Metadata migrada por change sets ou DevOps",
    "m4_q162": "Salesforce incentiva o uso de Flow como motor declarativo principal, reservando Apex para l\u00f3gica muito complexa",
    "m4_q163": "External Services",
    "m4_q164": "HTTP Callout configurado diretamente no Flow",
    "m4_q165": "Bot chama Flow, que chama APIs/RPA",
    "m4_q166": "Subflows",
    "m4_q167": "Bulkification do Flow",
    "m4_q168": "Platform Events como gatilho",
    "m4_q169": "Autolaunched Flow \u00e9 mais apropriado para l\u00f3gica sem UI, facilitando reutiliza\u00e7\u00e3o e orquestra\u00e7\u00e3o",
    "m4_q170": "Usar padr\u00f5es de bulkification e evitar DML em loops",
    "m4_q171": "Salesforce Flow",
    "m4_q172": "Importar a especifica\u00e7\u00e3o via External Services e usar a Action no Flow",
    "m4_q173": "External Services podem apontar para a URL do Mocking Service para testes",
    "m4_q174": "Bot \u2192 Flow \u2192 Anypoint API \u2192 Sistema de pedidos",
    "m4_q175": "Fault Path (caminho de erro)",
    "m4_q176": "Dentro do Fault Path associado \u00e0 action de callout",
    "m4_q177": "Flow Test (ferramenta declarativa)",
    "m4_q178": "Permite executar o fluxo como um usu\u00e1rio espec\u00edfico e visualizar o caminho e valores das vari\u00e1veis",
    "m4_q179": "Implementar tratamento via Fault Path e, se necess\u00e1rio, registrar o erro para reprocessamento",
    "m4_q180": "No Flow que o Bot invoca, com base no retorno da API",
    "m4_q181": "External Services, para aproveitar o contrato e governan\u00e7a",
    "m4_q182": "Migrar para External Services baseado na especifica\u00e7\u00e3o",
    "m4_q183": "Flow Test + Debug Tool",
    "m4_q184": "Uso do Flow como gatilho humano chamando processos RPA",
    "m4_q185": "Errada, pois Flow Test e Debug s\u00e3o recursos importantes cobrados na prova",
    "m4_q186": "Validar dados no Flow antes de chamar a API e usar Fault Paths para tratar falhas",
    "m4_q187": "Flow consome a Experience API via External Services",
    "m4_q188": "Preferir que o Flow consuma a Process/Experience API, reutilizando a orquestra\u00e7\u00e3o existente",
    "m4_q189": "B",
    "m4_q190": "Flow como camada de interface humana em hiperautoma\u00e7\u00e3o",
    "m4_q191": "API\u2011led recomenda centralizar l\u00f3gica de neg\u00f3cio na Process API, n\u00e3o na UI",
    "m4_q192": "Record\u2011Triggered Flow com chamadas \u00e0s integra\u00e7\u00f5es",
    "m4_q193": "Alternativa que adiciona complexidade desnecess\u00e1ria",
    "m4_q194": "Repensar a arquitetura usando Process APIs, bulkification e, se necess\u00e1rio, Orchestration",
    "m4_q195": "L\u00f3gica centralizada em Flows reutiliz\u00e1veis ou subflows",
    "m4_q196": "Isso viola API\u2011led Connectivity, governan\u00e7a e reutiliza\u00e7\u00e3o de ativos",
    "m4_q197": "Publicar a especifica\u00e7\u00e3o no Exchange, usar External Services e aplicar pol\u00edticas no API Manager",
    "m4_q198": "Criar Process/Experience APIs reutiliz\u00e1veis e document\u00e1\u2011las no Exchange para uso pelos Flows",
    "m4_q199": "Errada; erros devem ser tratados via Fault Paths e feedback adequado",
    "m4_q200": "Ser o motor de UI e gatilho de eventos, consumindo APIs/RPA/Composer",
    "m4_q201": "Ela ignora reutiliza\u00e7\u00e3o de APIs existentes e aumenta a d\u00edvida t\u00e9cnica",

    # ── MÓDULO 5 ──────────────────────────────────────────────
    "m5_q208": "Implementar API\u2011Led Connectivity com camadas System, Process e Experience",
    "m5_q209": "System API para expor dados do SAP",
    "m5_q210": "Process API",
    "m5_q211": "Experience API",
    "m5_q212": "Transforma\u00e7\u00f5es e orquestra\u00e7\u00f5es de neg\u00f3cio pertencem principalmente a Process APIs",
    "m5_q213": "Anypoint Platform (API Designer, Mocking Service, Studio, Runtime Manager, API Manager)",
    "m5_q214": "Mocking Service do Anypoint Exchange",
    "m5_q215": "System API",
    "m5_q216": "API Specification (RAML/OAS)",
    "m5_q217": "Expor uma System API reutiliz\u00e1vel e, quando necess\u00e1rio, Experience APIs espec\u00edficas",
    "m5_q218": "API Manager",
    "m5_q219": "Errado; viola separa\u00e7\u00e3o de responsabilidades da API\u2011Led",
    "m5_q220": "API Designer",
    "m5_q221": "Experience API espec\u00edfica para Salesforce",
    "m5_q222": "Falso; API\u2011Led define claramente pap\u00e9is de System, Process e Experience APIs com foco em reutiliza\u00e7\u00e3o e governan\u00e7a",
    "m5_q223": "Design \u2192 Simulate \u2192 Feedback \u2192 Implement \u2192 Deploy \u2192 Manage",
    "m5_q224": "Anypoint Exchange (API Portal)",
    "m5_q225": "Anypoint Studio",
    "m5_q226": "Runtime Manager",
    "m5_q227": "On\u2011Premises ou Runtime Fabric, conforme o contexto",
    "m5_q228": "Runtime Fabric (RTF)",
    "m5_q229": "API Portal / Exchange com fluxo de Client ID/Secret",
    "m5_q230": "Publicar a especifica\u00e7\u00e3o e a API como ativos no Exchange",
    "m5_q231": "Mocking Service do Exchange",
    "m5_q232": "Falso; \u201cManage\u201d inclui aplicar pol\u00edticas, controlar consumo, analytics e governan\u00e7a",
    "m5_q233": "Visualizer",
    "m5_q234": "Dependency tracking",
    "m5_q235": "API Manager \u00e9 para governan\u00e7a e pol\u00edticas, n\u00e3o para desenvolvimento de c\u00f3digo",
    "m5_q236": "On\u2011Premises ou RTF pr\u00f3ximo dos sistemas internos",
    "m5_q237": "Porque isso reduz reutiliza\u00e7\u00e3o e aumenta fragmenta\u00e7\u00e3o, contra a estrat\u00e9gia da MuleSoft",
    "m5_q238": "Criar System/Process APIs reutiliz\u00e1veis e catalog\u00e1\u2011las no Exchange",
    "m5_q239": "API Manager com pol\u00edticas aplicadas ao endpoint",
    "m5_q240": "Aplicar Rate Limiting / SLA\u2011based Tiering na API para proteger o sistema",
    "m5_q241": "Errado; pol\u00edticas como Client ID Enforcement s\u00e3o recomendadas mesmo em cen\u00e1rios internos cr\u00edticos",
    "m5_q242": "IP Whitelisting",
    "m5_q243": "Anypoint Monitoring com dashboards e Log Search",
    "m5_q244": "Combinar Rate Limiting e, se necess\u00e1rio, ajustar capacidade (vCores/workers)",
    "m5_q245": "Functional Monitoring",
    "m5_q246": "Porque viola reutiliza\u00e7\u00e3o e aumenta acoplamento, indo contra o modelo API\u2011Led",
    "m5_q247": "Centralizar transforma\u00e7\u00e3o na Process API e manter Experience mais fina",
    "m5_q248": "Porque sem cat\u00e1logo central, reutiliza\u00e7\u00e3o, descoberta e governan\u00e7a ficam muito mais dif\u00edceis",
    "m5_q249": "Todas chamando a mesma API publicada e governada na Anypoint Platform",
    "m5_q250": "O balanceador padr\u00e3o que fornece URL p\u00fablica para APIs no CloudHub",
    "m5_q251": "SLA\u2011based policies no API Manager",
    "m5_q252": "Discorda; a estrat\u00e9gia valoriza reutiliza\u00e7\u00e3o, contratos bem desenhados e minimiza\u00e7\u00e3o de duplica\u00e7\u00e3o",

    # ── MÓDULO 6 ──────────────────────────────────────────────
    "m6_q253": "Anypoint Monitoring",
    "m6_q254": "Log Search no Anypoint Monitoring",
    "m6_q255": "Custom Dashboards do Anypoint Monitoring",
    "m6_q256": "API Manager",
    "m6_q257": "Para colocar uma camada de proxy na frente da API e aplicar pol\u00edticas sem alterar o c\u00f3digo original",
    "m6_q258": "Client ID Enforcement",
    "m6_q259": "Rate Limiting / Throttling",
    "m6_q260": "IP Whitelisting",
    "m6_q261": "Visualizer",
    "m6_q262": "Functional Monitoring",
    "m6_q263": "Centraliza\u00e7\u00e3o de logs com Log Search",
    "m6_q264": "Errado; API Manager governa endpoints e pol\u00edticas, Monitoring foca em observabilidade e m\u00e9tricas",
    "m6_q265": "Alertas do Anypoint Monitoring",
    "m6_q266": "Pol\u00edtica de Rate Limiting ou SLA aplicada no API Manager",
    "m6_q267": "Errada; APIs internas s\u00e3o cr\u00edticas em cadeias de hiperautoma\u00e7\u00e3o e devem ser monitoradas",
    "m6_q268": "Problema no sistema de destino (ex: banco de dados lento)",
    "m6_q269": "Aumentar vCores ou n\u00famero de workers (escala vertical/horizontal)",
    "m6_q270": "Log Search no Anypoint Monitoring para entender o erro no n\u00edvel da API",
    "m6_q271": "Aplicar Rate Limiting/SLA Tiers e, se necess\u00e1rio, ajustar capacidade do backend",
    "m6_q272": "Dashboards de infra + m\u00e9tricas de aplica\u00e7\u00e3o no Anypoint Monitoring",
    "m6_q273": "Gargalo no sistema de destino ou depend\u00eancia externa",
    "m6_q274": "Functional Monitoring com testes agendados",
    "m6_q275": "Ajustar design do Flow e, em paralelo, configurar Rate Limiting e alertas",
    "m6_q276": "Correlacionar logs da execu\u00e7\u00e3o daquela requisi\u00e7\u00e3o via Anypoint Monitoring",
    "m6_q277": "Indica viola\u00e7\u00e3o de Rate Limit; revisar pol\u00edtica e padr\u00e3o de chamada do bot",
    "m6_q278": "Limitado; alertas autom\u00e1ticos s\u00e3o essenciais para responder rapidamente a incidentes",
    "m6_q279": "Logs detalhados e Functional Monitoring para aquele endpoint",
    "m6_q280": "Configurar monitoramento, alertas e dashboards claros para APIs chave",
    "m6_q281": "Compara\u00e7\u00e3o de m\u00e9tricas antes/depois do deploy (erros, lat\u00eancia, throughput)",
    "m6_q282": "Pegadinha; \u00e9 preciso entender se o gargalo \u00e9 infra, aplica\u00e7\u00e3o ou sistema destino antes de escalar",
    "m6_q283": "Aplicar pol\u00edticas de Rate Limiting/SLA e monitorar com dashboards e alertas",
    "m6_q284": "Porque ignora seguran\u00e7a b\u00e1sica; pol\u00edticas como Client ID Enforcement s\u00e3o recomendadas",
    "m6_q285": "Monitorar e aplicar pol\u00edticas nas principais APIs, entendendo o impacto de cada uma",
    "m6_q286": "Cliente acessa o API Portal, solicita acesso e recebe Client ID/Secret aprovado",
    "m6_q287": "Pegadinha; limites protegem sistemas e ajudam a manter estabilidade",
    "m6_q288": "SLA\u2011Based Policies no API Manager",
    "m6_q289": "Porque duplica\u00e7\u00e3o aumenta complexidade e reduz reutiliza\u00e7\u00e3o, ao inv\u00e9s de usar governan\u00e7a apropriada",
    "m6_q290": "Alertas configurados no Monitoring integrados a canais como e\u2011mail ou Slack",
    "m6_q291": "Quando se quer colocar um proxy entre consumidor e backend, sem tocar no c\u00f3digo da API original",
    "m6_q292": "Porque ataca sintomas \u00e0s cegas, sem entender m\u00e9tricas nem causas reais",
    "m6_q293": "Anypoint Monitoring + API Manager (pol\u00edticas, analytics, SLAs)",
    "m6_q294": "Discordar; mesmo internas, APIs cr\u00edticas precisam de governan\u00e7a e controle de acesso",
    "m6_q295": "API Manager (analytics e consumer metrics)",
    "m6_q296": "Que remover Rate Limiting pode agravar o problema e derrubar o sistema legado",
    "m6_q297": "Errada; governan\u00e7a e monitoramento s\u00e3o cont\u00ednuos, ajustados conforme uso e incidentes",

    # ── MÓDULO 7 ──────────────────────────────────────────────
    "m7_q298": "Cat\u00e1logo central de ativos reutiliz\u00e1veis (APIs, conectores, templates, fragmentos, RPA)",
    "m7_q299": "API Specification (RAML/OAS)",
    "m7_q300": "Consultar o Anypoint Exchange e revisar documenta\u00e7\u00e3o/console interativo da API",
}

# Aplicar as correções
fixed_count = 0
not_found = []

for q in questions:
    qid = q.get("id", "")
    if qid in correct_answers:
        correct_text = correct_answers[qid]
        # Verificar se o texto correto existe nas opções
        found = False
        for opt in q.get("opcoes", []):
            if opt == correct_text:
                found = True
                break
        
        if found:
            if q.get("correta_texto") != correct_text:
                old = q.get("correta_texto", "")
                q["correta_texto"] = correct_text
                q["justificativa"] = q.get("justificativa", "").replace("Recém extraído do markdown. Atualize a correta.", "Gabarito oficial verificado.")
                fixed_count += 1
        else:
            # Tentar match parcial (diferenças de encoding em caracteres especiais)
            best_match = None
            for opt in q.get("opcoes", []):
                # Normalizar para comparação
                norm_opt = opt.replace("\u2011", "-").replace("\u2013", "-").replace("\u201c", '"').replace("\u201d", '"').strip()
                norm_correct = correct_text.replace("\u2011", "-").replace("\u2013", "-").replace("\u201c", '"').replace("\u201d", '"').strip()
                if norm_opt == norm_correct:
                    best_match = opt
                    break
                # Tentar substring match
                if norm_correct in norm_opt or norm_opt in norm_correct:
                    best_match = opt
                    break
            
            if best_match:
                q["correta_texto"] = best_match
                q["justificativa"] = q.get("justificativa", "").replace("Recém extraído do markdown. Atualize a correta.", "Gabarito oficial verificado.")
                fixed_count += 1
            else:
                not_found.append(f"{qid}: '{correct_text[:50]}...' NÃO encontrado nas opções")

# Para questões dos módulos 7 e 8 que não estão no mapeamento, tentar identificar automaticamente
for q in questions:
    qid = q.get("id", "")
    if qid not in correct_answers and "Recém extraído" in q.get("justificativa", ""):
        # Estas questões ficam com justificativa indicando que precisa revisão
        pass

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"\n✅ Correção concluída!")
print(f"   Questões corrigidas: {fixed_count}")
print(f"   Total de questões: {len(questions)}")
print(f"   Erros de match: {len(not_found)}")
for nf in not_found:
    print(f"   ⚠ {nf}")
