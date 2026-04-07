# Prova 3 - Modulo 5

Use este arquivo como treino rapido do modulo.

1. AnyAirlines notes that different teams are building direct integrations to the same legacy system without using common APIs. Which MuleSoft practice fights this problem the most?
   A) Encurage more point-to-point integrations
   B) Create Reusable System/Process APIs and catalog them in Exchange
   C) Migrate everything to spreadsheets
   D) Use only RPA

2. NTO wants to apply Rate Limiting policies to an API without changing Mule code. Which component should be used?
   A) Anypoint Studio
   B) API Manager
   C) Runtime Manager
   D) RPA Manager

3. An exam scenario: a Flow is overloading a legacy system via API, causing crashes. What answer is more aligned?
   A) Scale the legacy system first and keep traffic patterns unchanged
   B) Apply Rate Limiting or SLA-based Tiering in the API to protect the system
   C) Reduce logging to relieve pressure on the system
   D) Expose a second direct integration path that bypasses the API

4. One option suggests exposing an API without any form of authentication to simplify consumption by RPA, Flow, and Composer. How should this be evaluated?
   A) Correct for internal environments
   B) Wrong; policies like Client ID Enforcement are recommended even in critical internal scenarios
   C) Recommended in the exam
   D) Neutral

5. A company wants to ensure that only Salesforce infrastructure IPs access a given API. What policy is used?
   A) Rate Limiting
   B) IP Whitelisting
   C) Client ID Enforcement
   D) JWT Validation

6. In one scenario, several critical APIs are part of a hyperautomation flow. What combination helps you see availability and errors in real time?
   A) Local server logs only
   B) Anypoint Monitoring with dashboards and Log Search
   C) Manual user emails
   D) Only the RPA console

7. One item describes a “shock” system because one Flow Fired Thousands of simultaneous requests. The correct alternative probably talks about:
   A) Scale vColors Only
   B) Combine Rate Limiting and, if necessary, adjust capacity (vColors/workers)
   C) Permanently turn off Flow
   D) Migrate to manual integrations

8. NTO wants to monitor not only whether an API is up, but also whether it responds correctly to critical scenarios. What resource is being referenced?
   A) Viewer
   B) Functional Monitoring
   C) Exchange
   D) API Notebook

9. One option says: 'Whenever a new consumer appears, create a new API just for that consumer, even if a generic API already exists.' Why is this usually wrong?
   A) Because APIs cannot have more than one consumer
   B) Because it violates reuse and increases coupling, going against the API-led model
   C) Because no API can be generic
   D) Because API Manager does not support multiple policies

10. In one scenario, an Experience API makes heavy transformations and multiple system aggregations. There is already a Process API that does the same. Which option is more aligned?
   A) Keep Double Logic in the Experience API
   B) Centralize transformation in Process API and maintain Finer experience
   C) Migrate everything to System APIs
   D) Remove Process API

11. A team argues that there is no need to publish assets in Exchange because everyone already knows where the code is. Why is that architecturally weak?
   A) Because Exchange is contractually mandatory
   B) Because without a central catalog, reuse, discovery, and governance become much harder
   C) Because APIs do not work without Exchange
   D) Because Runtime Manager depends on Exchange

12. AnyAirlines wants RPA, Flow, and Composer to use the same customer API. Which design is most consistent with MuleSoft strategy?
   A) Each tool calls a separate wrapper API owned by its team
   B) All tools call the same governed API published in Anypoint Platform
   C) Only Flow uses the governed API while the other tools integrate directly
   D) Keep RPA and Composer on direct connectors to move faster

13. An exam question mentions 'Shared Load Balancer' (SLB). What does it represent?
   A) The RPA bot concentrator
   B) The default load balancer that provides a public URL for APIs in CloudHub
   C) An exclusive component of Runtime Fabric
   D) A Salesforce authentication module

14. NTO wants to limit traffic to an API based on each consumer's access plan (e.g. Bronze, Silver, Gold). What functionality is more appropriate?
   A) A single global rate limit shared by all consumers
   B) SLA-based policies in API Manager
   C) IP whitelisting with the same quota for every consumer
   D) Manually disable the API during peak times

15. One option states: 'In a good MuleSoft architecture, it is better to duplicate APIs than adjust existing contracts to enable reuse.' How should the ideal candidate respond?
   A) Agree, to avoid dependencies
   B) Disagree; the strategy values reuse, well-designed contracts, and minimization of duplication
   C) It depends on the team's mood
   D) Accept the approach without questioning it
