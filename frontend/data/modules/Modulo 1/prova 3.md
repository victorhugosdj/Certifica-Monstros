# Prova 3 - Modulo 1

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants to expose flight status to partners, mobile apps and internal portals. What is the most efficient high-level design?
   A) One monolithic API mixing database calls and UI logic
   B) Separate, duplicated APIs for each consumer
   C) System APIs for core data plus Process and Experience APIs for each channel
   D) Only RPA bots reading from the reservation system

2. A scenario offers the option to rebuild a Customer System API from scratch even though one already exists. Why is this typically wrong?
   A) Existing APIs cannot be reused
   B) MuleSoft discourages versioning of APIs
   C) It violates the principle of reuse and increases maintenance
   D) System APIs are not allowed to expose customer data

3. NTO needs a quick proof-of-concept integration from Salesforce to a legacy mainframe with no APIs. Which answer best reflects MuleSoft guidance?
   A) Start with MuleSoft RPA to simulate user interactions
   B) Wait until a new REST API is built before doing anything
   C) Use Composer directly against the database tables
   D) Only manual rekeying is acceptable

4. In an exam question, one option suggests performing complex aggregations in the Experience API, while another suggests doing that work in the Process API. Which is more aligned with API-led architecture?
   A) Experience API, because consumer-facing APIs should also own the orchestration
   B) Process API, because it centralizes business logic and orchestration
   C) Either Experience or Process API, depending mainly on which team owns the integration
   D) System API, because all reusable logic should stay closest to the source system

5. A flow uses RPA to match data from a legacy claims system and then sends the result to Salesforce. Where should retries and timeouts for unstable connectivity primarily be configured?
   A) Inside the Salesforce page layout
   B) In the integration/API layer that receives or calls the RPA process
   C) Inside the user’s browser
   D) Nowhere; failures should be ignored

6. A candidate chooses an option that adds Salesforce Flow Orchestration plus multiple new APIs when a simple synchronous API call from a Screen Flow would suffice. What kind of trap is this?
   A) An option that improves channel-specific flexibility
   B) An option that adds unnecessary complexity
   C) An option that centralizes reusable logic in fewer layers
   D) An option that reduces coupling between Salesforce and downstream APIs

7. An exam item describes a need for one-time data migration from a CSV file into Salesforce. Which is the most appropriate integration approach?
   A) Full API-led architecture with three layers
   B) Complex RPA automation mimicking user input
   C) Native Salesforce data import tools or simple integration
   D) Building long-running orchestrations with many stages

8. A scenario gives two options: call a Process API that orchestrates multiple System APIs, or let Composer call each underlying system separately. Which is typically preferred?
   A) Composer calling all systems directly to speed up delivery for one channel
   B) The Process API orchestrating System APIs, reused by Composer and other clients
   C) An Experience API orchestrating the underlying systems for consumer-specific reuse
   D) Separate point-to-point integrations for each consumer to keep teams autonomous

9. A hyperautomation design includes Composer, RPA, Flow and multiple APIs. Which guiding principle helps keep this architecture maintainable?
   A) Push every responsibility to a single tool
   B) Use each tool for the role it is strong at and maximize reuse
   C) Duplicate logic in each layer for redundantness
   D) Prefer UI automation over APIs whenever possible

10. An option claims that creating separate APIs for each consumer application improves reuse. Why is this misleading?
   A) MuleSoft does not support multiple APIs
   B) True reuse comes from generic System/Process APIs with Experience APIs only when needed
   C) Experience APIs cannot be consumer-specific
   D) Reuse is unrelated to API design

11. A company wants to validate that its architecture still follows best practices one year after go-live. Which practice best supports this?
   A) Letting each team evolve integrations independently and reviewing issues only when they appear
   B) Reviewing assets published in Anypoint Exchange and enforcing reuse policies
   C) Rewriting the integration portfolio on a fixed annual cycle
   D) Moving older integrations to RPA wherever possible to simplify governance

12. In a multi-choice question, two options look good, but one ignores API-led layers and directly couples front-end to databases. How would this influence the choice?
   A) Prefer the option that respects API-led separation, even if more subtle
   B) Prefer the option that bypasses layers for performance
   C) Both are equally acceptable
   D) Choose randomly if both see possible

13. A scenario describes a business user who must maintain a simple integration without developer support. Which integration tool is the exam most likely to expect?
   A) Anypoint Studio with complex DataWeave scripts
   B) MuleSoft Composer with guided interface
   C) Custom Java microservices
   D) Low-level HTTP clients

14. NTO needs a fast temporary workaround using RPA while the proper APIs are being built. Which statement best matches MuleSoft best practice?
   A) RPA should permanently replace API-based integrations
   B) RPA can act as a bridge, but long-term strategy should be API-led
   C) RPA and APIs should never coexist
   D) APIs are only for external consumers

15. An exam option describes calling the same System API from multiple Experience APIs and from RPA or Composer flows. How should this be interpreted?
   A) As an anti-pattern that must be avoided
   B) As strong evidence of reuse and correct layering
   C) As a sign that the System API is too generic
   D) As a violation of security principles
