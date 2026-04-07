# Prova 1 - Modulo 5

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants to modernize point-to-point integrations and adopt a more governed architecture. Which approach is more aligned with MuleSoft?
   A) Add more direct system integrations
   B) Implement API-led connectivity with System, Process, and Experience layers
   C) Use only RPA and Composer
   D) Build a giant integration monolith

2. Northern Trail Outfitters (NTO) needs to access SAP data in a reusable way for multiple projects. What type of API should be created first?
   A) Experience API
   B) System API to expose SAP data
   C) Process API
   D) Only one batch job

3. A company needs to combine customer data (CRM) and inventory data (ERP) in a 'Create Order' process. Which layer does that normally belong to?
   A) System API
   B) Process API
   C) Experience API
   D) Only in the database

4. A mobile app needs a specific and simplified payload to display requests to an end-user. Which layer should expose this interface?
   A) System API
   B) Process API
   C) Experience API
   D) Internal Bank API

5. In a test scenario, one option suggests placing all data transformation directly into System APIs. Why is this usually incorrect?
   A) System APIs cannot transform data
   B) Business transformations and orchestration mainly belong in Process APIs
   C) Experience APIs cannot consume System APIs
   D) Only RPA should transform data

6. The test presents a cycle: Design → Simulate → Implementation → Deploy → Manage. What platform does that describe?
   A) Compose
   B) Anypoint Platform (API Designer, Mocking Service, Studio, Runtime Manager, API Manager)
   C) Salesforce Setup
   D) Operating system

7. NTO wants Flow and RPA teams to start working before current API implementation. Which resource is more relevant?
   A) Mocking Service of Anypoint Exchange
   B) Only logs in production
   C) Functional Monitoring
   D) Viewer

8. One exam question talks about unlocking data from central systems and isolating destination complexity. Which layer is being described?
   A) Experience API
   B) Process API
   C) System API
   D) Exchange Asset

9. A company publishes an API specification in Exchange so Salesforce Flow can consume it via External Services. What asset is being published?
   A) API Fragment
   B) API Specification (RAML/OAS)
   C) Project template
   D) RPA Asset

10. In one scenario, multiple teams want to consume the same API of customers for different use cases. Which approach is more efficient?
   A) Create an identical new API for each team
   B) Expose a reusable System API and, when necessary, Experience specific APIs
   C) Use only point-to-point integrations
   D) Restrict API uses to a single team

11. AnyAirlines needs access control, rate limiting and central API monitoring. Which component is primarily responsible for this?
   A) Anypoint Studio
   B) Runtime Manager
   C) API Manager
   D) RPA Manager

12. One option says that 'Experience APIs must directly access databases without System APIs to reduce hops.' How should this be evaluated?
   A) Correct; this reduces latency
   B) Wrong; this violates API-led separation of responsibilities
   C) Acceptable only for RPA
   D) Recommended by MuleSoft

13. A team wants to edit API contracts, get feedback and simulate calls before implementing code. What tool is used in the Design phase?
   A) Anypoint Studio
   B) API Designer
   C) Runtime Manager
   D) Viewer

14. NTO needs to choose the right layer to expose data to a customer service application in Salesforce without exposing internal system details. What's the best option?
   A) System API
   B) Process API
   C) Salesforce-specific Experience API
   D) Direct connection to the database

15. One option says that 'API-led Connectivity is just a name for any set of APIs without clear rules.' What is the correct reading?
   A) True
   B) False; API-Led clearly defines System, Process, and Experience API roles focusing on reuse and governance
   C) Depends on the project
   D) Only applications to on-premises
