# Module 1 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 1.md.

## Q01 (m1_q1)
**Question:** AnyAirlines wants to automatically check customer loyalty status in a legacy green-screen system with no APIs. What is the most appropriate primary technology?

- A. MuleSoft Composer calling REST API
- B. MuleSoft RPA with screen automation
- C. Salesforce Flow with HTTP Callout
- D. Anypoint Platform Experience API only

**Correct answer:** MuleSoft RPA with screen automation

## Q02 (m1_q2)
**Question:** Northern Trail Outfitters (NTO) wants to quickly sync standard objects between Salesforce and NetSuite using clicks, not code. Which solution best fits the requirement?

- A. Anypoint Studio with custom DataWeave transformations
- B. MuleSoft RPA recording user actions in both systems
- C. MuleSoft Composer with prebuilt SaaS connectors
- D. Salesforce Flow with Scheduled Path and custom Apex

**Correct answer:** MuleSoft Composer with prebuilt SaaS connectors

## Q03 (m1_q3)
**Question:** A company needs to process millions of transaction records nightly, aggregating data from multiple databases. Which component should be the core of this integration?

- A. MuleSoft RPA with multiple bots in parallel
- B. MuleSoft Composer flow triggered every 5 minutes
- C. Anypoint Platform APIs with batch processing
- D. Salesforce Flow invoked by Platform Events only

**Correct answer:** Anypoint Platform APIs with batch processing

## Q04 (m1_q4)
**Question:** A project team wants to avoid building multiple logins to the same legacy ERP for different automations. What is the best practice aligned with C4E?

- A. Embed login logic inside every bot individually
- B. Reuse a shared RPA process published in Anypoint Exchange
- C. Implement login logic in a Salesforce Screen Flow
- D. Configure separate credentials in each Composer flow

**Correct answer:** Reuse a shared RPA process published in Anypoint Exchange

## Q05 (m1_q5)
**Question:** A customer asks: "We need the fastest no-code way to connect Salesforce and ServiceNow with simple field maps." Which two dimensions from the tool selection matrix are most relevant to justify using Composer?

- A. Volume and Interface
- B. Complexity and User Profile
- C. Volume and Protocol Complexity
- D. Governance and Advanced Security

**Correct answer:** Complexity and User Profile

## Q06 (m1_q6)
**Question:** NTO wants to minimize the impact of a flaky on-premises database during request/response lookups in Anypoint APIs. What is the most efficient way to protect the consumer experience?

- A. Use RPA to read database screens instead of APIs
- B. Exponential backoff and retries in the API
- C. Move all logic into Salesforce Flows
- D. Call the database directly from Composer on every request

**Correct answer:** Exponential backoff and retries in the API

## Q07 (m1_q7)
**Question:** A solution architect wants to ensure end-to-end testing of a new hyperautomation scenario before the legacy system is ready. Which component should be used to simulate backend APIs?

- A. MuleSoft RPA Recorder
- B. Anypoint Exchange Mocking Service
- C. Salesforce Sandbox with only partial data
- D. Production database with masked records

**Correct answer:** Anypoint Exchange Mocking Service

## Q08 (m1_q8)
**Question:** In a complex flow involving Salesforce, RPA and Composer, one transaction failed. Logs show that the robot could not open a desktop window. How would the error be classified?

- A. Business exception
- B. Integration exception
- C. Technical exception in the RPA layer
- D. Data quality exception

**Correct answer:** Technical exception in the RPA layer

## Q09 (m1_q9)
**Question:** A retail company already exposes a stable Customer System API on Anypoint. A new chatbot experience must reuse this data. What is the most efficient way to design the solution?

- A. Build a new System API specifically for the chatbot
- B. Call the database directly from Einstein Bot
- C. Create an Experience API on top of the existing System API
- D. Use RPA to read the database through a headless client

**Correct answer:** Create an Experience API on top of the existing System API

## Q10 (m1_q10)
**Question:** A bank wants to avoid duplicate processing if the same request is accidentally sent twice to an API that triggers an RPA process. Which concept is most important here?

- A. Idempotency of API operations
- B. Horizontal scaling of workers
- C. API proxying with Flex Gateway
- D. Scheduler-based throttling only

**Correct answer:** Idempotency of API operations

## Q11 (m1_q23)
**Question:** In an end-to-end test of a hyperautomation flow, what is the most effective way to isolate where an error occurred?

- A. Disable logs and enable only monitoring dashboards
- B. Test the entire chain only from the user interface
- C. Validate RPA, integration APIs and target systems independently
- D. Retry the entire flow repeatedly until it passes

**Correct answer:** Validate RPA, integration APIs and target systems independently

## Q12 (m1_q24)
**Question:** A process involves a long-running human approval plus a short, technical API call. When designing the architecture, which tool should handle the long-running orchestration?

- A. Salesforce Flow Orchestration
- B. MuleSoft Composer only
- C. Anypoint Experience API
- D. MuleSoft RPA Manager

**Correct answer:** Salesforce Flow Orchestration

## Q13 (m1_q25)
**Question:** A candidate proposals putting all heavy data transformations into System APIs to keep Process APIs “thin”. Why is this not aligned with MuleSoft best practices?

- A. System APIs must not connect to any databases
- B. Process APIs are responsible for orchestration and business logic
- C. Experience APIs cannot perform transformations
- D. RPA bots should handle transformations instead

**Correct answer:** Process APIs are responsible for orchestration and business logic

## Q14 (m1_q26)
**Question:** Which option best describes API-led connectivity in the context of hyperautomation?

- A. Direct point-to-point integrations between all systems
- B. A layered model with System, Process and Experience APIs promoting reuse
- C. A set of UI flows built only in Salesforce
- D. A network of ungoverned webhooks between services

**Correct answer:** A layered model with System, Process and Experience APIs promoting reuse

## Q15 (m1_q27)
**Question:** During an exam question, a scenario offers four valid-sounding options. Which one is most likely correct according to MuleSoft strategy?

- A. The option that recreates existing integrations from scratch
- B. The option that maximizes reuse of existing APIs and assets
- C. The option that adds the greatest number of new components
- D. The option that ignores API-led layers for speed

**Correct answer:** The option that maximizes reuse of existing APIs and assets

## Q16 (m1_q28)
**Question:** AnyAirlines already has several point-to-point integrations between SaaS systems. They now want a more governed and reusable architecture. Which approach best aligns with MuleSoft recommendations?

- A. Add more scheduled jobs between systems as needed
- B. Replace all integrations with a single monolithic API
- C. Implement API-led connectivity with System, Process and Experience APIs
- D. Move all integrations into Salesforce Flow only

**Correct answer:** Implement API-led connectivity with System, Process and Experience APIs

## Q17 (m1_q29)
**Question:** NTO wants to expose product prices to multiple channels (web, mobile app, Salesforce). What is the most efficient way to design this according to API-led principles?

- A. One Process API that all channels call directly
- B. Separate System APIs for each channel
- C. A shared Product System API plus dedicated Experience APIs per channel
- D. Multiple duplicated APIs per consumer team

**Correct answer:** A shared Product System API plus dedicated Experience APIs per channel

## Q18 (m1_q30)
**Question:** The scenario describes the Composer flow calling an API that performs heavy aggregations across systems. Where should the complex business logic primarily reside?

- A. Inside the Composer formula editor
- B. Inside the Salesforce Flow screen logic
- C. Inside the Process API on Anypoint Platform
- D. Inside the RPA bot actions

**Correct answer:** Inside the Process API on Anypoint Platform

## Q19 (m1_q31)
**Question:** A candidate suggests using RPA to automate a system that already exposes robust, secure REST APIs. Which statement best reflects MuleSoft best practice?

- A. Acceptable, because RPA is always simple to configure
- B. Not ideal; prefer API-based integration first and use RPA for no-API cases
- C. Required, because exam scenarios always prefer RPA
- D. Required, because APIs cannot be reused in other channels

**Correct answer:** Not ideal; prefer API-based integration first and use RPA for no-API cases

## Q20 (m1_q32)
**Question:** A retail customer wants near real-time inventory updates between their ERP and Salesforce. Which tool combination best balances speed and maintainability?

- A. Only RPA bots reading ERP screens
- B. Anypoint Platform System API for ERP plus Composer for light orchestration
- C. Composer polling ERP database directly every second
- D. Manual CSV uploads by users

**Correct answer:** Anypoint Platform System API for ERP plus Composer for light orchestration

## Q21 (m1_q33)
**Question:** The scenario describes a complex multi-step process where a human underwriter reviews cases over several days. Which component should coordinate long-running steps while still carrying APIs and RPA where needed?

- A. Single large RPA process with embedded decision logic
- B. Salesforce Flow Orchestration with background and interactive steps
- C. A large Composer flow with nested If/Else branches
- D. A single Process API with many synchronous calls

**Correct answer:** Salesforce Flow Orchestration with background and interactive steps

## Q22 (m1_q34)
**Question:** In a hyperautomation project, who is primarily responsible for promoting reuse of assets like APIs, RPA processes and fragments according to the C4E model?

- A. Only project managers
- B. The Center for Enablement acting as an enablement and governance team
- C. Individual developers working in isolation
- D. External vendors only

**Correct answer:** The Center for Enablement acting as an enablement and governance team

## Q23 (m1_q35)
**Question:** A scenario describes repeated failures in a hyperautomation chain whenever a legacy system is under heavy load. Which combination best addresses resilience at the integration layer?

- A. Remove logs to save processing time
- B. Implement retries with exponential backoff and timeouts in the APIs
- C. Move all logic to RPA bots to hide the problem
- D. Increase Salesforce govern limits

**Correct answer:** Implement retries with exponential backoff and timeouts in the APIs

## Q24 (m1_q36)
**Question:** A company wants to test a new orchestration between Salesforce Flow and RPA while the final production credentials are not yet available. What is the safest test data strategy?

- A. Use real customer data in production systems
- B. Use synthetic/mock data defined in API specifications
- C. Export CSVs from production and mask only names
- D. Duplicate production environment without any anonymization

**Correct answer:** Use synthetic/mock data defined in API specifications

## Q25 (m1_q37)
**Question:** The exam presents four tool choices for a simple SaaS-to-SaaS integration with low volume and business admin ownership. Which one is most aligned with MuleSoft guidance?

- A. Anypoint Platform with full custom APIs
- B. MuleSoft Composer with out-of-the-box connectors
- C. RPA bots simulating all user clicks
- D. Custom Java microservices on Kubernetes

**Correct answer:** MuleSoft Composer with out-of-the-box connectors

## Q26 (m1_q38)
**Question:** An architect proposes centralizing all error handling in the RPA layer. Why is this approach problematic for hyperautomation?

- A. APIs never fail, so this is unnecessary
- B. Each layer (APIs, RPA, Flow, Composer) should handle its own technical concerns
- C. RPA does not log any errors
- D. Composer has no way to react to failures

**Correct answer:** Each layer (APIs, RPA, Flow, Composer) should handle its own technical concerns

## Q27 (m1_q39)
**Question:** The scenario lies “avoiding duplicate login implementations across multiple teams”. Which platform capability directly supports this goal?

- A. Publishing shared RPA processes and API specs in Anypoint Exchange
- B. Creating separate logins in each project for independence
- C. Storing credentials in local text files
- D. Embedding passwords into hard-coded scripts

**Correct answer:** Publishing shared RPA processes and API specs in Anypoint Exchange

## Q28 (m1_q40)
**Question:** NTO wants to quickly pilot a new customer journey using mocked APIs while backend systems are still under design. Which combination best supports this parallel development?

- A. RPA Recorder plus production database
- B. Anypoint API Designer + Mocking Service consumed by Flow/Composer
- C. Manual JSON files exchanged over email
- D. Only Salesforce custom objects with no external connectivity

**Correct answer:** Anypoint API Designer + Mocking Service consumed by Flow/Composer

## Q29 (m1_q41)
**Question:** A question describes a flow where Salesforce Screen Flows collect data from agents, which is then processed by RPA in a legacy system. Where should the primary user experience be built?

- A. In desktop RPA dialogs
- B. In Salesforce Screen Flows integrated with APIs/RPA
- C. In custom Java Swing applications
- D. In raw database client tools

**Correct answer:** In Salesforce Screen Flows integrated with APIs/RPA

## Q30 (m1_q42)
**Question:** An exam item shows multiple design options. Which is the strong sign that one option is a “trap” rather than the recommended architecture?

- A. It emphasizes reuse of existing APIs and assets
- B. It replaces three integrations with a single well-designed Process API
- C. It adds unnecessary components and ignores existing reusable services
- D. It ignores C4E and governance practices

**Correct answer:** It adds unnecessary components and ignores existing reusable services

## Q31 (m1_q43)
**Question:** AnyAirlines wants to expose flight status to partners, mobile apps and internal portals. What is the most efficient high-level design?

- A. One monolithic API mixing database calls and UI logic
- B. Separate, duplicated APIs for each consumer
- C. System APIs for core data plus Process and Experience APIs for each channel
- D. Only RPA bots reading from the reservation system

**Correct answer:** System APIs for core data plus Process and Experience APIs for each channel

## Q32 (m1_q44)
**Question:** A scenario offers the option to rebuild a Customer System API from scratch even though one already exists. Why is this typically wrong?

- A. Existing APIs cannot be reused
- B. MuleSoft discourages versioning of APIs
- C. It violates the principle of reuse and increases maintenance
- D. System APIs are not allowed to expose customer data

**Correct answer:** It violates the principle of reuse and increases maintenance

## Q33 (m1_q45)
**Question:** NTO needs a quick proof-of-concept integration from Salesforce to a legacy mainframe with no APIs. Which answer best reflects MuleSoft guidance?

- A. Start with MuleSoft RPA to simulate user interactions
- B. Wait until a new REST API is built before doing anything
- C. Use Composer directly against the database tables
- D. Only manual rekeying is acceptable

**Correct answer:** Start with MuleSoft RPA to simulate user interactions

## Q34 (m1_q46)
**Question:** In an exam question, one option suggests performing complex aggregations in the Experience API, while another suggests doing that work in the Process API. Which is more aligned with API-led architecture?

- A. Experience API, because consumer-facing APIs should also own the orchestration
- B. Process API, because it centralizes business logic and orchestration
- C. Either Experience or Process API, depending mainly on which team owns the integration
- D. System API, because all reusable logic should stay closest to the source system

**Correct answer:** Process API, because it centralizes business logic and orchestration

## Q35 (m1_q47)
**Question:** A flow uses RPA to match data from a legacy claims system and then sends the result to Salesforce. Where should retries and timeouts for unstable connectivity primarily be configured?

- A. Inside the Salesforce page layout
- B. In the integration/API layer that receives or calls the RPA process
- C. Inside the user’s browser
- D. Nowhere; failures should be ignored

**Correct answer:** In the integration/API layer that receives or calls the RPA process

## Q36 (m1_q48)
**Question:** A candidate chooses an option that adds Salesforce Flow Orchestration plus multiple new APIs when a simple synchronous API call from a Screen Flow would suffice. What kind of trap is this?

- A. An option that improves channel-specific flexibility
- B. An option that adds unnecessary complexity
- C. An option that centralizes reusable logic in fewer layers
- D. An option that reduces coupling between Salesforce and downstream APIs

**Correct answer:** An option that adds unnecessary complexity

## Q37 (m1_q49)
**Question:** An exam item describes a need for one-time data migration from a CSV file into Salesforce. Which is the most appropriate integration approach?

- A. Full API-led architecture with three layers
- B. Complex RPA automation mimicking user input
- C. Native Salesforce data import tools or simple integration
- D. Building long-running orchestrations with many stages

**Correct answer:** Native Salesforce data import tools or simple integration

## Q38 (m1_q50)
**Question:** A scenario gives two options: call a Process API that orchestrates multiple System APIs, or let Composer call each underlying system separately. Which is typically preferred?

- A. Composer calling all systems directly to speed up delivery for one channel
- B. The Process API orchestrating System APIs, reused by Composer and other clients
- C. An Experience API orchestrating the underlying systems for consumer-specific reuse
- D. Separate point-to-point integrations for each consumer to keep teams autonomous

**Correct answer:** The Process API orchestrating System APIs, reused by Composer and other clients

## Q39 (m1_q51)
**Question:** A hyperautomation design includes Composer, RPA, Flow and multiple APIs. Which guiding principle helps keep this architecture maintainable?

- A. Push every responsibility to a single tool
- B. Use each tool for the role it is strong at and maximize reuse
- C. Duplicate logic in each layer for redundantness
- D. Prefer UI automation over APIs whenever possible

**Correct answer:** Use each tool for the role it is strong at and maximize reuse

## Q40 (m1_q52)
**Question:** An option claims that creating separate APIs for each consumer application improves reuse. Why is this misleading?

- A. MuleSoft does not support multiple APIs
- B. True reuse comes from generic System/Process APIs with Experience APIs only when needed
- C. Experience APIs cannot be consumer-specific
- D. Reuse is unrelated to API design

**Correct answer:** True reuse comes from generic System/Process APIs with Experience APIs only when needed

## Q41 (m1_q53)
**Question:** A company wants to validate that its architecture still follows best practices one year after go-live. Which practice best supports this?

- A. Letting each team evolve integrations independently and reviewing issues only when they appear
- B. Reviewing assets published in Anypoint Exchange and enforcing reuse policies
- C. Rewriting the integration portfolio on a fixed annual cycle
- D. Moving older integrations to RPA wherever possible to simplify governance

**Correct answer:** Reviewing assets published in Anypoint Exchange and enforcing reuse policies

## Q42 (m1_q54)
**Question:** In a multi-choice question, two options look good, but one ignores API-led layers and directly couples front-end to databases. How would this influence the choice?

- A. Prefer the option that respects API-led separation, even if more subtle
- B. Prefer the option that bypasses layers for performance
- C. Both are equally acceptable
- D. Choose randomly if both see possible

**Correct answer:** Prefer the option that respects API-led separation, even if more subtle

## Q43 (m1_q55)
**Question:** A scenario describes a business user who must maintain a simple integration without developer support. Which integration tool is the exam most likely to expect?

- A. Anypoint Studio with complex DataWeave scripts
- B. MuleSoft Composer with guided interface
- C. Custom Java microservices
- D. Low-level HTTP clients

**Correct answer:** MuleSoft Composer with guided interface

## Q44 (m1_q56)
**Question:** NTO needs a fast temporary workaround using RPA while the proper APIs are being built. Which statement best matches MuleSoft best practice?

- A. RPA should permanently replace API-based integrations
- B. RPA can act as a bridge, but long-term strategy should be API-led
- C. RPA and APIs should never coexist
- D. APIs are only for external consumers

**Correct answer:** RPA can act as a bridge, but long-term strategy should be API-led

## Q45 (m1_q57)
**Question:** An exam option describes calling the same System API from multiple Experience APIs and from RPA or Composer flows. How should this be interpreted?

- A. As an anti-pattern that must be avoided
- B. As strong evidence of reuse and correct layering
- C. As a sign that the System API is too generic
- D. As a violation of security principles

**Correct answer:** As strong evidence of reuse and correct layering
