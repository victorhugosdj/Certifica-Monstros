# Prova 1 - Modulo 4

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants a guided screen for agents to capture claim details in Salesforce and then send the data to an API. Which type of Flow is more appropriate?
   A) Autolaunched Flow
   B) Screen Flow
   C) Schedule-Triggered Flow
   D) Record-Triggered Flow

2. Northern Trail Outfitters (NTO) requires that, when a new Agreement is created, automation runs immediately without a user interface. Which Flow type should be used?
   A) Screen Flow
   B) Record-Triggered Flow
   C) Flow Orchestration
   D) Scheduled External Flow

3. A scenario describes a complex back-office flow that should be called both by Apex and by an Orchestration. Which Flow type is best suited as a reusable building block?
   A) Screen Flow
   B) Autolaunched Flow
   C) Record-Triggered Flow
   D) Workflow Rule

4. AnyAirlines wants that whenever an Opportunity is marked “Close Won”, a RPA process be called via External Services. Where should this call be?
   A) In an independent Screen Flow
   B) In a Record-Triggered Flow in Opportunity
   C) In a Flow Orchestration without trigger
   D) In an Apex Trigger only

5. NTO wants to ensure that the same Record-Triggered Flow is reusable between environments (Sandbox → Production). What does this definition of flow represent?
   A) Flow Metadata migrated by change sets or DevOps
   B) Salesforce Logs
   C) PDF Documentation
   D) External Java code

6. A candidate suggests using only Apex for all automations, ignoring Flows. Why isn't this aligned with Salesforce's current position?
   A) Apex is obsolete.
   B) Salesforce encourages the use of Flow as the main declarative engine, reserving Apex for very complex logic
   C) Flow does not support integrations
   D) Flows cannot be tested

7. A Screen Flow collects customer data and then needs to call a MuleSoft API to validate credit limit. Which Flow feature should be used to declaratively use the specification of this API?
   A) Platform Events
   B) External Services
   C) Inbound Email Services
   D) Apex REST Callout written manually

8. A scenario describes a Flow that needs to call a simple HTTP endpoint without having an OpenAPI or RAML file. What feature can be used?
   A) HTTP Callout configured directly in Flow
   B) Apex HTTP classes only
   C) Workflow Rules Only
   D) Visualforce Pages

9. AnyAirlines wants to use Einstein Bot to collect information from a passenger and then call a backoffice process via Flow. Which relationship is more correct?
   A) Bot calls Flow, calling APIs/RPA
   B) Flow calls Bot, calling APIs
   C) RPA calls Bot, who calls Flow
   D) Composer calls Bot directly

10. NTO wants part of the calculation logic to be reused in several Flows. What resource does Flow help with this reuse?
   A) Subflows
   B) Process Builder
   C) Workflow Rules
   D) Approval Processes

11. A scenario states that a Flow should process several records at once, but it is handling only one at a time and hitting governor limits. Which principle should be remembered?
   A) Flow Bulkification
   B) Only use of Apex
   C) Disable platform boundaries
   D) Use RPA instead of Flow

12. A team wants a Flow to run in response to an external event published by MuleSoft. Which Salesforce resource is most appropriate for this case?
   A) Email Services
   B) Platform Events as a trigger
   C) Custom Metadata Types
   D) Static Resources

13. A candidate suggests using Screen Flow for all logic, including scenarios without user interaction. Why can this be a bad choice?
   A) Screen Flow does not support integrations
   B) Autolaunched Flow is more suitable for logic without UI, facilitating reuse and orchestration
   C) Screen Flow does not support subflows
   D) Screen Flow cannot use External Services

14. A Record-Triggered Flow performs mass updates but is failing because of DML limits. Which practice is more aligned with good design?
   A) DML within loops without grouping records
   B) Use bulkification patterns and avoid DML in loops
   C) Always reduce the number of processed records
   D) Move everything to RPA

15. An exam scenario shows simple CRM automation with declarative logic and no need for complex code. Which tool is typically preferred?
   A) Apex triggers only
   B) Salesforce Flow
   C) MuleSoft RPA
   D) Custom Java Services
