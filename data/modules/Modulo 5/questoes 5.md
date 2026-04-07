# Module 5 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 5.md.

## Q01 (m5_q208)
**Question:** AnyAirlines wants to modernize point-to-point integrations and adopt a more governed architecture. Which approach is more aligned with MuleSoft?

- A. Add more direct system integrations
- B. Implement API-led connectivity with System, Process, and Experience layers
- C. Use only RPA and Composer
- D. Build a giant integration monolith

**Correct answer:** Implement API-led connectivity with System, Process, and Experience layers

## Q02 (m5_q209)
**Question:** Northern Trail Outfitters (NTO) needs to access SAP data in a reusable way for multiple projects. What type of API should be created first?

- A. Experience API
- B. System API to expose SAP data
- C. Process API
- D. Only one batch job

**Correct answer:** System API to expose SAP data

## Q03 (m5_q210)
**Question:** A company needs to combine customer data (CRM) and inventory data (ERP) in a 'Create Order' process. Which layer does that normally belong to?

- A. System API
- B. Process API
- C. Experience API
- D. Only in the database

**Correct answer:** Process API

## Q04 (m5_q211)
**Question:** A mobile app needs a specific and simplified payload to display requests to an end-user. Which layer should expose this interface?

- A. System API
- B. Process API
- C. Experience API
- D. Internal Bank API

**Correct answer:** Experience API

## Q05 (m5_q212)
**Question:** In a test scenario, one option suggests placing all data transformation directly into System APIs. Why is this usually incorrect?

- A. System APIs cannot transform data
- B. Business transformations and orchestration mainly belong in Process APIs
- C. Experience APIs cannot consume System APIs
- D. Only RPA should transform data

**Correct answer:** Business transformations and orchestration mainly belong in Process APIs

## Q06 (m5_q213)
**Question:** The test presents a cycle: Design → Simulate → Implementation → Deploy → Manage. What platform does that describe?

- A. Compose
- B. Anypoint Platform (API Designer, Mocking Service, Studio, Runtime Manager, API Manager)
- C. Salesforce Setup
- D. Operating system

**Correct answer:** Anypoint Platform (API Designer, Mocking Service, Studio, Runtime Manager, API Manager)

## Q07 (m5_q214)
**Question:** NTO wants Flow and RPA teams to start working before current API implementation. Which resource is more relevant?

- A. Mocking Service of Anypoint Exchange
- B. Only logs in production
- C. Functional Monitoring
- D. Viewer

**Correct answer:** Mocking Service of Anypoint Exchange

## Q08 (m5_q215)
**Question:** One exam question talks about unlocking data from central systems and isolating destination complexity. Which layer is being described?

- A. Experience API
- B. Process API
- C. System API
- D. Exchange Asset

**Correct answer:** System API

## Q09 (m5_q216)
**Question:** A company publishes an API specification in Exchange so Salesforce Flow can consume it via External Services. What asset is being published?

- A. API Fragment
- B. API Specification (RAML/OAS)
- C. Project template
- D. RPA Asset

**Correct answer:** API Specification (RAML/OAS)

## Q10 (m5_q217)
**Question:** In one scenario, multiple teams want to consume the same API of customers for different use cases. Which approach is more efficient?

- A. Create an identical new API for each team
- B. Expose a reusable System API and, when necessary, Experience specific APIs
- C. Use only point-to-point integrations
- D. Restrict API uses to a single team

**Correct answer:** Expose a reusable System API and, when necessary, Experience specific APIs

## Q11 (m5_q218)
**Question:** AnyAirlines needs access control, rate limiting and central API monitoring. Which component is primarily responsible for this?

- A. Anypoint Studio
- B. Runtime Manager
- C. API Manager
- D. RPA Manager

**Correct answer:** API Manager

## Q12 (m5_q219)
**Question:** One option says that 'Experience APIs must directly access databases without System APIs to reduce hops.' How should this be evaluated?

- A. Correct; this reduces latency
- B. Wrong; this violates API-led separation of responsibilities
- C. Acceptable only for RPA
- D. Recommended by MuleSoft

**Correct answer:** Wrong; this violates API-led separation of responsibilities

## Q13 (m5_q220)
**Question:** A team wants to edit API contracts, get feedback and simulate calls before implementing code. What tool is used in the Design phase?

- A. Anypoint Studio
- B. API Designer
- C. Runtime Manager
- D. Viewer

**Correct answer:** API Designer

## Q14 (m5_q221)
**Question:** NTO needs to choose the right layer to expose data to a customer service application in Salesforce without exposing internal system details. What's the best option?

- A. System API
- B. Process API
- C. Salesforce-specific Experience API
- D. Direct connection to the database

**Correct answer:** Salesforce-specific Experience API

## Q15 (m5_q222)
**Question:** One option says that 'API-led Connectivity is just a name for any set of APIs without clear rules.' What is the correct reading?

- A. True
- B. False; API-Led clearly defines System, Process, and Experience API roles focusing on reuse and governance
- C. Depends on the project
- D. Only applications to on-premises

**Correct answer:** False; API-Led clearly defines System, Process, and Experience API roles focusing on reuse and governance

## Q16 (m5_q223)
**Question:** AnyAirlines is defining the API development process. What order correctly represents the life cycle within the Anypoint Platform?

- A. Implementation → Design → Deploy → Manage
- B. Design → Simulate → Feedback → Implementation → Deploy → Manage
- C. Deploy → Design → Implementation → Manage
- D. Simulate → Design → Deploy → Implementation

**Correct answer:** Design → Simulate → Feedback → Implementation → Deploy → Manage

## Q17 (m5_q224)
**Question:** NTO wants to allow consumers to explore APIs, see documentation and test calls on an interactive console. Which component should be used?

- A. Runtime Manager
- B. Anypoint Exchange (API Portal)
- C. Anypoint Studio
- D. Anypoint Monitoring

**Correct answer:** Anypoint Exchange (API Portal)

## Q18 (m5_q225)
**Question:** A team needs to edit Mule flows, add connectors, and write DataWeave. Which tool is used?

- A. API Designer
- B. Anypoint Studio
- C. API Manager
- D. RPA Builder

**Correct answer:** Anypoint Studio

## Q19 (m5_q226)
**Question:** A company needs to scale the number of workers for an application as API usage grows. Where is this configured?

- A. Exchange
- B. Runtime Manager
- C. Designer API
- D. Compose

**Correct answer:** Runtime Manager

## Q20 (m5_q227)
**Question:** In a scenario, the solution must run in the company's own data center because of strict compliance requirements. Which deployment option is more aligned?

- A. CloudHub with secure connectivity back to the data center
- B. On-Premises or Runtime Fabric, according to context
- C. Composer-based integration running from SaaS connectors
- D. RPA bots hosted near the internal applications

**Correct answer:** On-Premises or Runtime Fabric, according to context

## Q21 (m5_q228)
**Question:** A proof item describes a container and Kubernetes-based scenario for running Mule applications. Which MuleSoft technology is being referenced?

- A. Runtime Fabric (RTF)
- B. Anypoint MQ
- C. CloudHub 1.0
- D. Exchange

**Correct answer:** Runtime Fabric (RTF)

## Q22 (m5_q229)
**Question:** AnyAirlines wants to share an internal API with external partner developers, with access control and “Request Access” button. What resource supports this?

- A. API Notebook
- B. Portal / Exchange API with Client ID/Secret Flow
- C. Runtime Manager only
- D. Documentation only PDF

**Correct answer:** Portal / Exchange API with Client ID/Secret Flow

## Q23 (m5_q230)
**Question:** NTO has an API that will be consumed by Salesforce Flow via External Services and by RPA via HTTP. Which practice best supports this reuse?

- A. Publisher specification and API as Exchange assets
- B. Hide specification
- C. Create the separate API for each consumer
- D. Display database directly

**Correct answer:** Publisher specification and API as Exchange assets

## Q24 (m5_q231)
**Question:** A team wants to simulate the credit API before definitive implementation, allowing Flows and RPA to use fictional data. What should be used?

- A. Exchange Mocking Service
- B. Logs only
- C. Only manual tests in production
- D. Viewer

**Correct answer:** Exchange Mocking Service

## Q25 (m5_q232)
**Question:** One option says that the 'Manage' phase refers only to shutting down the API when necessary. What is the correct view?

- A. Correct
- B. False; 'Manage' includes applying policies, controlling consumption, analytics, and governance
- C. Depends on the type of API
- D. It applies only to public APIs

**Correct answer:** False; 'Manage' includes applying policies, controlling consumption, analytics, and governance

## Q26 (m5_q233)
**Question:** The company needs to see relationships between APIs and dependencies on a visual map. What capability does that refer to?

- A. Viewer
- B. Functional Monitoring
- C. Exchange
- D. RPA Manager

**Correct answer:** Viewer

## Q27 (m5_q234)
**Question:** NTO wants to ensure that changes in a shared RAML fragment do not break dependent projects without visibility. What Exchange concept addresses this?

- A. Asset only
- B. Dependency tracking
- C. Worker logs
- D. Credential Manager

**Correct answer:** Dependency tracking

## Q28 (m5_q235)
**Question:** A candidate suggests implementing APIs directly in API Manager. Why is that incorrect?

- A. API Manager does not exist
- B. API Manager is for governance and policies, not code development
- C. API Manager Replacements Exchange
- D. API Manager runs only on-premises

**Correct answer:** API Manager is for governance and policies, not code development

## Q29 (m5_q236)
**Question:** AnyAirlines needs to decide between CloudHub and On-Premises. The scenario emphasizes simplified access to internal systems without exposing firewalls. Which option can be more appropriate?

- A. CloudHub with firewall exceptions into the internal network
- B. On-Premises or RTF close to internal systems
- C. Composer with connectors reaching the internal systems directly
- D. RPA running on shared desktops near the target systems

**Correct answer:** On-Premises or RTF close to internal systems

## Q30 (m5_q237)
**Question:** One option says: 'For each new project, create a brand-new API with a different URL to make team management easier.' Why is this usually a bad idea?

- A. Because APIs cannot have different URLs
- B. Because this reduces reuse and increases fragmentation, which goes against MuleSoft strategy
- C. Because Exchange does not support multiple APIs
- D. Because CloudHub does not support more than one application

**Correct answer:** Because this reduces reuse and increases fragmentation, which goes against MuleSoft strategy

## Q31 (m5_q238)
**Question:** AnyAirlines notes that different teams are building direct integrations to the same legacy system without using common APIs. Which MuleSoft practice fights this problem the most?

- A. Encurage more point-to-point integrations
- B. Create Reusable System/Process APIs and catalog them in Exchange
- C. Migrate everything to spreadsheets
- D. Use only RPA

**Correct answer:** Create Reusable System/Process APIs and catalog them in Exchange

## Q32 (m5_q239)
**Question:** NTO wants to apply Rate Limiting policies to an API without changing Mule code. Which component should be used?

- A. Anypoint Studio
- B. API Manager
- C. Runtime Manager
- D. RPA Manager

**Correct answer:** API Manager

## Q33 (m5_q240)
**Question:** An exam scenario: a Flow is overloading a legacy system via API, causing crashes. What answer is more aligned?

- A. Scale the legacy system first and keep traffic patterns unchanged
- B. Apply Rate Limiting or SLA-based Tiering in the API to protect the system
- C. Reduce logging to relieve pressure on the system
- D. Expose a second direct integration path that bypasses the API

**Correct answer:** Apply Rate Limiting or SLA-based Tiering in the API to protect the system

## Q34 (m5_q241)
**Question:** One option suggests exposing an API without any form of authentication to simplify consumption by RPA, Flow, and Composer. How should this be evaluated?

- A. Correct for internal environments
- B. Wrong; policies like Client ID Enforcement are recommended even in critical internal scenarios
- C. Recommended in the exam
- D. Neutral

**Correct answer:** Wrong; policies like Client ID Enforcement are recommended even in critical internal scenarios

## Q35 (m5_q242)
**Question:** A company wants to ensure that only Salesforce infrastructure IPs access a given API. What policy is used?

- A. Rate Limiting
- B. IP Whitelisting
- C. Client ID Enforcement
- D. JWT Validation

**Correct answer:** IP Whitelisting

## Q36 (m5_q243)
**Question:** In one scenario, several critical APIs are part of a hyperautomation flow. What combination helps you see availability and errors in real time?

- A. Local server logs only
- B. Anypoint Monitoring with dashboards and Log Search
- C. Manual user emails
- D. Only the RPA console

**Correct answer:** Anypoint Monitoring with dashboards and Log Search

## Q37 (m5_q244)
**Question:** One item describes a “shock” system because one Flow Fired Thousands of simultaneous requests. The correct alternative probably talks about:

- A. Scale vColors Only
- B. Combine Rate Limiting and, if necessary, adjust capacity (vColors/workers)
- C. Permanently turn off Flow
- D. Migrate to manual integrations

**Correct answer:** Combine Rate Limiting and, if necessary, adjust capacity (vColors/workers)

## Q38 (m5_q245)
**Question:** NTO wants to monitor not only whether an API is up, but also whether it responds correctly to critical scenarios. What resource is being referenced?

- A. Viewer
- B. Functional Monitoring
- C. Exchange
- D. API Notebook

**Correct answer:** Functional Monitoring

## Q39 (m5_q246)
**Question:** One option says: 'Whenever a new consumer appears, create a new API just for that consumer, even if a generic API already exists.' Why is this usually wrong?

- A. Because APIs cannot have more than one consumer
- B. Because it violates reuse and increases coupling, going against the API-led model
- C. Because no API can be generic
- D. Because API Manager does not support multiple policies

**Correct answer:** Because it violates reuse and increases coupling, going against the API-led model

## Q40 (m5_q247)
**Question:** In one scenario, an Experience API makes heavy transformations and multiple system aggregations. There is already a Process API that does the same. Which option is more aligned?

- A. Keep Double Logic in the Experience API
- B. Centralize transformation in Process API and maintain Finer experience
- C. Migrate everything to System APIs
- D. Remove Process API

**Correct answer:** Centralize transformation in Process API and maintain Finer experience

## Q41 (m5_q248)
**Question:** A team argues that there is no need to publish assets in Exchange because everyone already knows where the code is. Why is that architecturally weak?

- A. Because Exchange is contractually mandatory
- B. Because without a central catalog, reuse, discovery, and governance become much harder
- C. Because APIs do not work without Exchange
- D. Because Runtime Manager depends on Exchange

**Correct answer:** Because without a central catalog, reuse, discovery, and governance become much harder

## Q42 (m5_q249)
**Question:** AnyAirlines wants RPA, Flow, and Composer to use the same customer API. Which design is most consistent with MuleSoft strategy?

- A. Each tool calls a separate wrapper API owned by its team
- B. All tools call the same governed API published in Anypoint Platform
- C. Only Flow uses the governed API while the other tools integrate directly
- D. Keep RPA and Composer on direct connectors to move faster

**Correct answer:** All tools call the same governed API published in Anypoint Platform

## Q43 (m5_q250)
**Question:** An exam question mentions 'Shared Load Balancer' (SLB). What does it represent?

- A. The RPA bot concentrator
- B. The default load balancer that provides a public URL for APIs in CloudHub
- C. An exclusive component of Runtime Fabric
- D. A Salesforce authentication module

**Correct answer:** The default load balancer that provides a public URL for APIs in CloudHub

## Q44 (m5_q251)
**Question:** NTO wants to limit traffic to an API based on each consumer's access plan (e.g. Bronze, Silver, Gold). What functionality is more appropriate?

- A. A single global rate limit shared by all consumers
- B. SLA-based policies in API Manager
- C. IP whitelisting with the same quota for every consumer
- D. Manually disable the API during peak times

**Correct answer:** SLA-based policies in API Manager

## Q45 (m5_q252)
**Question:** One option states: 'In a good MuleSoft architecture, it is better to duplicate APIs than adjust existing contracts to enable reuse.' How should the ideal candidate respond?

- A. Agree, to avoid dependencies
- B. Disagree; the strategy values reuse, well-designed contracts, and minimization of duplication
- C. It depends on the team's mood
- D. Accept the approach without questioning it

**Correct answer:** Disagree; the strategy values reuse, well-designed contracts, and minimization of duplication
