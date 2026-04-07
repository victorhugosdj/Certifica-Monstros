# Prova 3 - Modulo 4

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants a Screen Flow to call a MuleSoft API that is already published as an Experience API. What is the most API-led-aligned approach?
   A) Flow directly calls the database, ignoring the API
   B) Flow consumes the Experience API via External Services
   C) Flow uses RPA to check the system
   D) Flow uses only calculated fields without integration

2. NTO already has a System API for ERP and a Process API for credit rules. One candidate suggests that Screen Flow should call the System API directly. What is the most aligned option?
   A) Have Flow call the System API directly and rebuild the credit rules in Flow
   B) Have Flow consume a Process or Experience API, reusing the existing orchestration
   C) Use Composer as the main orchestration layer even though the APIs already exist
   D) Use RPA to query ERP screens for all credit validation logic

3. A Flow integration question presents two alternatives. If only option B preserves reuse and separation of concerns, which answer should the candidate choose?
   A) A
   B) B
   C) Both
   D) None

4. A Screen Flow collects claim data and triggers an RPA bot that updates a legacy system. What does the exam probably want to reinforce?
   A) Flow as the human interaction layer in hyperautomation
   B) RPA as the main user interface
   C) Replacing APIs with Flow
   D) Composer replacing Flow

5. One option suggests putting all data transformation logic into Screen Flow even though a Process API already exists for that purpose. Why is this usually a bad choice?
   A) Flows cannot transform data
   B) API-led best practices place reusable business logic in the Process API, not in the UI layer
   C) Process APIs do not support multiple consumers
   D) Process APIs are not covered in the exam

6. One scenario says that when a sale is closed, Flow must 1) trigger RPA for a legacy logistics system, 2) call an SMS API, and 3) register logs. Which component should coordinate this automation?
   A) Let the RPA bot orchestrate the SMS, logging, and legacy updates
   B) Record-Triggered Flow with integration calls
   C) Use Composer as the main coordinator by polling Salesforce for closed sales
   D) Implement the orchestration entirely in Apex triggers

7. In one question, an option proposes using Flow Orchestration for an extremely simple one-step process that a single Record-Triggered Flow could handle. What kind of mistake is this?
   A) A technically impossible alternative
   B) An alternative that adds unnecessary complexity
   C) An alternative that ignores reuse
   D) An alternative that violates DML limits

8. A company plans a Flow that, on record update, calls several subflows and multiple serial APIs, creating a risk of hitting limits. Which approach is more mature?
   A) Keep the design and add more retries inside the same record-triggered Flow
   B) Rethink the architecture using Process APIs, bulkification, and, if necessary, Orchestration
   C) Shift the serial calls to RPA while keeping the orchestration unchanged
   D) Turn off validations to shorten execution time

9. NTO wants routing decisions such as which queue receives a case to remain configurable and reusable. What does the exam tend to prefer?
   A) Logic spread across several Apex triggers
   B) Centralized reusable Flow logic or subflows
   C) Logic in local scripts
   D) Logic only in the external API

10. One option says: 'To ensure performance, connect Flow directly to the database, avoiding APIs and Exchange.' Why is that incorrect?
   A) Salesforce cannot access databases
   B) This breaks API-led connectivity, governance, and asset reuse
   C) It does not support governed APIs
   D) Exchange is optional only for RPA

11. One scenario shows: Flow -> API without a contract -> nobody knows who consumes the API. What improvement is more aligned with the MuleSoft strategy?
   A) Leave it as it is
   B) Publish the specification in Exchange, use External Services, and apply policies in API Manager
   C) Replace the API with direct database queries
   D) Migrate all logic to RPA

12. One question describes a team creating multiple Flows that make redundant calls to different APIs with duplicate logic. What response is more aligned with C4E vision?
   A) Allow duplication for speed
   B) Create reusable Process and Experience APIs and document them in Exchange for Flow consumption
   C) Discontinue the use of Flow
   D) Create a separate Flow for each team without standards

13. One option suggests that when an API fails, it is best to let Flow break silently so the user does not notice. How would this be evaluated?
   A) Acceptable if the user sees success while support is notified later
   B) Wrong; error should be handled via Fault Paths and appropriate feedback
   C) Acceptable only when the failing API is not business-critical
   D) Correct when the error comes from an external system

14. In a typical scenario of hyperautomation, what role does Salesforce Flow play in relation to RPA, Composer and APIs?
   A) Act as the UI layer and event trigger, consuming APIs, RPA, and Composer
   B) Replace all other components
   C) Just run nightly jobs
   D) Act only as a test tool

15. One option says: 'Build a new complex Flow that duplicates the behavior of an existing Experience API so the team does not depend on Integration.' Why is that probably wrong?
   A) Flows cannot consume APIs
   B) It ignores reuse of existing APIs and increases technical debt
   C) Experience APIs cannot be called by Flow
   D) It has no meaningful architectural impact
