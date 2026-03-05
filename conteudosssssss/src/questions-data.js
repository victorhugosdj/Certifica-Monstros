const QUESTION_BANK = [
  {
    id: "m1_q1",
    modulo: 1,
    pergunta: "AnyAirlines wants to automate checking customer loyalty status in a legacy green-screen system with no APIs. What is the most appropriate primary technology?",
    opcoes: [
      "MuleSoft Composer calling a REST API",
      "MuleSoft RPA with screen automation",
      "Salesforce Flow with HTTP Callout",
      "Anypoint Platform Experience API only"
    ],
    correta: 1,
    justificativa: "MuleSoft RPA é a tecnologia ideal para sistemas legados sem APIs através de automação de tela."
  },
  {
    id: "m1_q2",
    modulo: 1,
    pergunta: "Northern Trail Outfitters (NTO) wants to quickly sync standard objects between Salesforce and NetSuite using clicks, not code. Which solution best fits the requirement?",
    opcoes: [
      "Anypoint Studio with custom DataWeave transformations",
      "MuleSoft RPA recording user actions in both systems",
      "MuleSoft Composer with prebuilt SaaS connectors",
      "Salesforce Flow with Scheduled Path and custom Apex"
    ],
    correta: 2,
    justificativa: "MuleSoft Composer permite integrações rápidas entre sistemas SaaS usando conectores pré-configurados."
  },
  {
    id: "m1_q3",
    modulo: 1,
    pergunta: "A company needs to process millions of transaction records nightly, aggregating data from multiple databases. Which component should be the core of this integration?",
    opcoes: [
      "MuleSoft RPA with multiple bots in parallel",
      "MuleSoft Composer flows triggered every 5 minutes",
      "Anypoint Platform APIs with batch processing",
      "Salesforce Flow invoked by Platform Events only"
    ],
    correta: 2,
    justificativa: "Anypoint Platform é a escolha certa para volumes massivos de dados e processamento em lote."
  },
  {
    id: "m1_q4",
    modulo: 1,
    pergunta: "A project team wants to avoid building multiple logins to the same legacy ERP for different automations. What is the best practice aligned with C4E?",
    opcoes: [
      "Embed login logic inside every bot individually",
      "Reuse a shared RPA process published in Anypoint Exchange",
      "Implement login logic in a Salesforce Screen Flow",
      "Configure separate credentials in each Composer flow"
    ],
    correta: 1,
    justificativa: "O reuso de processos RPA através do Anypoint Exchange promove eficiência e governança alinhada ao C4E."
  },
  {
    id: "m1_q5",
    modulo: 1,
    pergunta: "A customer asks: \"We need the fastest no-code way to connect Salesforce and ServiceNow with simple field mappings.\" Which two dimensions from the tool selection matrix are most relevant to justify using Composer?",
    opcoes: [
      "Volume and Interface",
      "Complexity and User Profile",
      "Volume and Protocol Complexity",
      "Governance and Advanced Security"
    ],
    correta: 1,
    justificativa: "Complexidade baixa e perfil de usuário de negócio são os principais fatores para escolher o Composer."
  },
  {
    id: "m1_q6",
    modulo: 1,
    pergunta: "NTO wants to minimize the impact of a flaky on-premises database during request/response lookups in Anypoint APIs. What is the most efficient way to protect the consumer experience?",
    opcoes: [
      "Use RPA to read database screens instead of APIs",
      "Implement exponential backoff and retries in the API",
      "Move all logic into Salesforce Flows",
      "Call the database directly from Composer on every request"
    ],
    correta: 1,
    justificativa: "Backoff exponencial e retentativas aumentam a resiliência de APIs contra falhas temporárias."
  },
  {
    id: "m1_q7",
    modulo: 1,
    pergunta: "A solution architect wants to ensure end-to-end testing of a new hyperautomation scenario before the legacy system is ready. Which component should be used to simulate backend APIs?",
    opcoes: [
      "MuleSoft RPA Recorder",
      "Anypoint Exchange Mocking Service",
      "Salesforce Sandbox with only partial data",
      "Production database with masked records"
    ],
    correta: 1,
    justificativa: "O Mocking Service do Anypoint permite simular respostas de APIs antes mesmo delas serem implementadas."
  },
  {
    id: "m1_q8",
    modulo: 1,
    pergunta: "In a complex flow involving Salesforce, RPA and Composer, one transaction failed. Logs show that the robot could not open a desktop window. How should the error be classified?",
    opcoes: [
      "Business exception",
      "Integration exception",
      "Technical exception in the RPA layer",
      "Data quality exception"
    ],
    correta: 2,
    justificativa: "Falhas de infraestrutura ou interface no robô são classificadas como exceções técnicas."
  },
  {
    id: "m1_q9",
    modulo: 1,
    pergunta: "A retail company already exposes a stable Customer System API on Anypoint. A new chatbot experience must reuse this data. What is the most efficient way to design the solution?",
    opcoes: [
      "Build a new System API specifically for the chatbot",
      "Call the database directly from Einstein Bot",
      "Create an Experience API on top of the existing System API",
      "Use RPA to query the database with a headless client"
    ],
    correta: 2,
    justificativa: "Seguindo o API-led, deve-se criar uma Experience API que consome as System APIs já existentes."
  },
  {
    id: "m1_q10",
    modulo: 1,
    pergunta: "A bank wants to avoid duplicate processing if a request message is accidentally sent twice to an API that triggers RPA. Which concept is most important here?",
    opcoes: [
      "Idempotency of API operations",
      "Horizontal scaling of workers",
      "API proxying with Flex Gateway",
      "Scheduler-based throttling only"
    ],
    correta: 0,
    justificativa: "Idempotência garante que múltiplas chamadas idênticas produzam o mesmo resultado sem processamento duplicado."
  },
  {
    id: "m2_q1",
    modulo: 2,
    pergunta: "AnyAirlines wants to automate a stable, repetitive back‑office process currently executed by an operator in a legacy Windows application. There is no API available. What is the most appropriate first technology choice?",
    opcoes: ["MuleSoft Composer with HTTP trigger", "MuleSoft RPA Builder criando a UI automation process", "Salesforce Flow with External Services", "Anypoint Platform Experience API only"],
    correta: 1,
    justificativa: "RPA Builder é a ferramenta certa para automatizar interfaces de usuário em sistemas legados Windows."
  },
  {
    id: "m2_q2",
    modulo: 2,
    pergunta: "Northern Trail Outfitters (NTO) wants to decide whether a candidate process is suitable for RPA. Which characteristic most strongly indicates a good fit?",
    opcoes: ["Process changes its steps every week", "Process is ad‑hoc and creative", "Process is rule‑based, high volume and stable over time", "Process is performed once per year by executives"],
    correta: 2,
    justificativa: "Processos baseados em regras, estáveis e de alto volume são os melhores candidatos para RPA."
  },
  {
    id: "m2_q3",
    modulo: 2,
    pergunta: "A question describes the Evaluation phase inside RPA Manager. What is the most efficient way to use this phase according to best practices?",
    opcoes: ["To configure attended robots on users’ desktops", "To estimate automation potential and business value before building", "To deploy processes directly to production workers", "To record user clicks automatically"],
    correta: 1,
    justificativa: "A fase de Evaluation no RPA Manager serve para validar o valor de negócio e o potencial de automação."
  }
];

