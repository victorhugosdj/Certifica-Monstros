# Module 4 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 4.md.

## Q01 (m4_q157)
**Question:** AnyAirlines wants a guided screen for agents to capture claim details in Salesforce and then send the data to an API. Which type of Flow is more appropriate?

- A. Autolaunched Flow
- B. Screen Flow
- C. Schedule-Triggered Flow
- D. Record-Triggered Flow

**Correct answer:** Screen Flow

## Q02 (m4_q158)
**Question:** Northern Trail Outfitters (NTO) requires that, when a new Agreement is created, automation runs immediately without a user interface. Which Flow type should be used?

- A. Screen Flow
- B. Record-Triggered Flow
- C. Flow Orchestration
- D. Scheduled External Flow

**Correct answer:** Record-Triggered Flow

## Q03 (m4_q159)
**Question:** A scenario describes a complex back-office flow that should be called both by Apex and by an Orchestration. Which Flow type is best suited as a reusable building block?

- A. Screen Flow
- B. Autolaunched Flow
- C. Record-Triggered Flow
- D. Workflow Rule

**Correct answer:** Autolaunched Flow

## Q04 (m4_q160)
**Question:** AnyAirlines wants that whenever an Opportunity is marked “Close Won”, a RPA process be called via External Services. Where should this call be?

- A. In an independent Screen Flow
- B. In a Record-Triggered Flow in Opportunity
- C. In a Flow Orchestration without trigger
- D. In an Apex Trigger only

**Correct answer:** In a Record-Triggered Flow in Opportunity

## Q05 (m4_q161)
**Question:** NTO wants to ensure that the same Record-Triggered Flow is reusable between environments (Sandbox → Production). What does this definition of flow represent?

- A. Flow Metadata migrated by change sets or DevOps
- B. Salesforce Logs
- C. PDF Documentation
- D. External Java code

**Correct answer:** Flow Metadata migrated by change sets or DevOps

## Q06 (m4_q162)
**Question:** A candidate suggests using only Apex for all automations, ignoring Flows. Why isn't this aligned with Salesforce's current position?

- A. Apex is obsolete.
- B. Salesforce encourages the use of Flow as the main declarative engine, reserving Apex for very complex logic
- C. Flow does not support integrations
- D. Flows cannot be tested

**Correct answer:** Salesforce encourages the use of Flow as the main declarative engine, reserving Apex for very complex logic

## Q07 (m4_q163)
**Question:** A Screen Flow collects customer data and then needs to call a MuleSoft API to validate credit limit. Which Flow feature should be used to declaratively use the specification of this API?

- A. Platform Events
- B. External Services
- C. Inbound Email Services
- D. Apex REST Callout written manually

**Correct answer:** External Services

## Q08 (m4_q164)
**Question:** A scenario describes a Flow that needs to call a simple HTTP endpoint without having an OpenAPI or RAML file. What feature can be used?

- A. HTTP Callout configured directly in Flow
- B. Apex HTTP classes only
- C. Workflow Rules Only
- D. Visualforce Pages

**Correct answer:** HTTP Callout configured directly in Flow

## Q09 (m4_q165)
**Question:** AnyAirlines wants to use Einstein Bot to collect information from a passenger and then call a backoffice process via Flow. Which relationship is more correct?

- A. Bot calls Flow, calling APIs/RPA
- B. Flow calls Bot, calling APIs
- C. RPA calls Bot, who calls Flow
- D. Composer calls Bot directly

**Correct answer:** Bot calls Flow, calling APIs/RPA

## Q10 (m4_q166)
**Question:** NTO wants part of the calculation logic to be reused in several Flows. What resource does Flow help with this reuse?

- A. Subflows
- B. Process Builder
- C. Workflow Rules
- D. Approval Processes

**Correct answer:** Subflows

## Q11 (m4_q167)
**Question:** A scenario states that a Flow should process several records at once, but it is handling only one at a time and hitting governor limits. Which principle should be remembered?

- A. Flow Bulkification
- B. Only use of Apex
- C. Disable platform boundaries
- D. Use RPA instead of Flow

**Correct answer:** Flow Bulkification

## Q12 (m4_q168)
**Question:** A team wants a Flow to run in response to an external event published by MuleSoft. Which Salesforce resource is most appropriate for this case?

- A. Email Services
- B. Platform Events as a trigger
- C. Custom Metadata Types
- D. Static Resources

**Correct answer:** Platform Events as a trigger

## Q13 (m4_q169)
**Question:** A candidate suggests using Screen Flow for all logic, including scenarios without user interaction. Why can this be a bad choice?

- A. Screen Flow does not support integrations
- B. Autolaunched Flow is more suitable for logic without UI, facilitating reuse and orchestration
- C. Screen Flow does not support subflows
- D. Screen Flow cannot use External Services

**Correct answer:** Autolaunched Flow is more suitable for logic without UI, facilitating reuse and orchestration

## Q14 (m4_q170)
**Question:** A Record-Triggered Flow performs mass updates but is failing because of DML limits. Which practice is more aligned with good design?

- A. DML within loops without grouping records
- B. Use bulkification patterns and avoid DML in loops
- C. Always reduce the number of processed records
- D. Move everything to RPA

**Correct answer:** Use bulkification patterns and avoid DML in loops

## Q15 (m4_q171)
**Question:** An exam scenario shows simple CRM automation with declarative logic and no need for complex code. Which tool is typically preferred?

- A. Apex triggers only
- B. Salesforce Flow
- C. MuleSoft RPA
- D. Custom Java Services

**Correct answer:** Salesforce Flow

## Q16 (m4_q172)
**Question:** AnyAirlines wants a Screen Flow to consume an API published in Anypoint Platform using an OpenAPI contract. Which way is recommended?

- A. Create Apex HTTP callout manually
- B. Import specification via External Services and use Action in Flow
- C. Use HTTP Callout only without contract
- D. Create RPA to call API

**Correct answer:** Import specification via External Services and use Action in Flow

## Q17 (m4_q173)
**Question:** NTO has a scenario where Flow needs to call an API whose contract is still under construction, but there is a Mocking Service available at Exchange. How can this be enjoyed?

- A. You can't. Flow requirements real API
- B. External Services can point to the Mocking Service URL for testing
- C. Only Composer can use Mocking Service
- D. Only RPA can use Mocking Service

**Correct answer:** External Services can point to the Mocking Service URL for testing

## Q18 (m4_q174)
**Question:** An Einstein Bot collects the customer's order number and needs to get the status via MuleSoft. Which sequence is more aligned with the recommended architecture?

- A. Bot → RPA → Database directly
- B. Bot → Flow → Anypoint API → Order system
- C. Bot → Composer → Sheet
- D. Bot → Apex batch anonymous

**Correct answer:** Bot → Flow → Anypoint API → Order system

## Q19 (m4_q175)
**Question:** A Flow calling an External Service fails with a 500 error from the API. Which Flow feature should be used to handle this failure in a controlled manner?

- A. Element default Path
- B. Fault Path
- C. Infinite Loop
- D. Debug feature only

**Correct answer:** Fault Path

## Q20 (m4_q176)
**Question:** In a scenario, Flow needs to log in and create an internal case whenever an external API call fails. Where should that logic be?

- A. Inside Fault Path associated with callout action
- B. Outside Flow, only Apex
- C. In the client who called Flow
- D. In a Workflow Rule

**Correct answer:** Inside Fault Path associated with callout action

## Q21 (m4_q177)
**Question:** NTO wants to automate Record-Triggered Flows tests to ensure they don't break after changes. Which resource is more appropriate?

- A. Flow Test (declarative tool)
- B. Debug manual testing only
- C. Production execution logs
- D. Apex Tests Only

**Correct answer:** Flow Test (declarative tool)

## Q22 (m4_q178)
**Question:** An exam scenario highlights the Debug Flow tool. What major advantage does it offer?

- A. Replaces all automated tests
- B. Allows you to run the Flow as a specific user and inspect paths and variable values
- C. Shows text logs only
- D. Works only for Screen Flows

**Correct answer:** Allows you to run the Flow as a specific user and inspect paths and variable values

## Q23 (m4_q179)
**Question:** A Flow Triggered by registration is intermittently failing because of an unstable API. Which combination is more appropriate?

- A. Retry the same failed step indefinitely without capturing context
- B. Handle the failure via Fault Path and, if needed, record the error for reprocessing
- C. Pause the flow and require an administrator to restart it every time
- D. Move the integration into another tool without explicit error handling

**Correct answer:** Handle the failure via Fault Path and, if needed, record the error for reprocessing

## Q24 (m4_q180)
**Question:** AnyAirlines wants to use Einstein Bot as the initial layer and, depending on the API response, direct the case to a human agent. Where should this decision be made?

- A. In the database
- B. In the Flow that Bot invokes, based on API return
- C. Only in the RPA
- D. Only in Apex

**Correct answer:** In the Flow that Bot invokes, based on API return

## Q25 (m4_q181)
**Question:** NTO needs to decide between External Services and HTTP Callout in a trial scenario. The API already has specification published in Exchange and needs to be reused in multiple Flows. What's the best choice?

- A. HTTP Callout
- B. External Services, to take advantage of the contract and governance
- C. Apex only
- D. Composer Only

**Correct answer:** External Services, to take advantage of the contract and governance

## Q26 (m4_q182)
**Question:** A Flow consumes an uncontracted API using only a URL and HTTP method. Later, the API gains an OAS specification. What improvement is now preferred?

- A. Keep HTTP Callout for simplicity
- B. Migrate to External Services based on specification
- C. Swap Flow for RPA
- D. Swap Flow for Apex triggers

**Correct answer:** Migrate to External Services based on specification

## Q27 (m4_q183)
**Question:** One scenario describes that business analysis needs to simulate different inputs and quickly see Flow's behavior. Which combination is more appropriate?

- A. Flow Test + Debug Tool
- B. Only logs in production
- C. Tests only Apex
- D. Only monitoring in Anypoint

**Correct answer:** Flow Test + Debug Tool

## Q28 (m4_q184)
**Question:** Integration between Flow and MuleSoft RPA is implemented via External Services calling the RPA Manager endpoint. What does this represent in terms of hyperautomation?

- A. Use Flow as a human trigger calling RPA processes
- B. Use of RPA as user interface
- C. Replacing APIs with bots
- D. Elimination of Exchange Need

**Correct answer:** Use Flow as a human trigger calling RPA processes

## Q29 (m4_q185)
**Question:** In a test scenario, one option suggests deploying a Flow with no testing or debugging and relying only on production. How should this be evaluated?

- A. Correct, because Flow is declarative
- B. Wrong, because Flow Test and Debug are important resources assessed in the exam
- C. Neutral, no impact
- D. Preferable to any automated testing strategy

**Correct answer:** Wrong, because Flow Test and Debug are important resources assessed in the exam

## Q30 (m4_q186)
**Question:** A company wants to ensure that a Record-Triggered Flow calling external APIs does not break when it receives unexpected data. Which practice is more aligned?

- A. Assume that the data is always valid
- B. Validate the data in Flow before calling the API and use Fault Paths to handle failures
- C. Trust API logs only
- D. Disable Flow when errors occur

**Correct answer:** Validate the data in Flow before calling the API and use Fault Paths to handle failures

## Q31 (m4_q187)
**Question:** AnyAirlines wants a Screen Flow to call a MuleSoft API that is already published as an Experience API. What is the most API-led-aligned approach?

- A. Flow directly calls the database, ignoring the API
- B. Flow consumes the Experience API via External Services
- C. Flow uses RPA to check the system
- D. Flow uses only calculated fields without integration

**Correct answer:** Flow consumes the Experience API via External Services

## Q32 (m4_q188)
**Question:** NTO already has a System API for ERP and a Process API for credit rules. One candidate suggests that Screen Flow should call the System API directly. What is the most aligned option?

- A. Have Flow call the System API directly and rebuild the credit rules in Flow
- B. Have Flow consume a Process or Experience API, reusing the existing orchestration
- C. Use Composer as the main orchestration layer even though the APIs already exist
- D. Use RPA to query ERP screens for all credit validation logic

**Correct answer:** Have Flow consume a Process or Experience API, reusing the existing orchestration

## Q33 (m4_q189)
**Question:** A Flow integration question presents two alternatives. If only option B preserves reuse and separation of concerns, which answer should the candidate choose?

- A. A
- B. B
- C. Both
- D. None

**Correct answer:** B

## Q34 (m4_q190)
**Question:** A Screen Flow collects claim data and triggers an RPA bot that updates a legacy system. What does the exam probably want to reinforce?

- A. Flow as the human interaction layer in hyperautomation
- B. RPA as the main user interface
- C. Replacing APIs with Flow
- D. Composer replacing Flow

**Correct answer:** Flow as the human interaction layer in hyperautomation

## Q35 (m4_q191)
**Question:** One option suggests putting all data transformation logic into Screen Flow even though a Process API already exists for that purpose. Why is this usually a bad choice?

- A. Flows cannot transform data
- B. API-led best practices place reusable business logic in the Process API, not in the UI layer
- C. Process APIs do not support multiple consumers
- D. Process APIs are not covered in the exam

**Correct answer:** API-led best practices place reusable business logic in the Process API, not in the UI layer

## Q36 (m4_q192)
**Question:** One scenario says that when a sale is closed, Flow must 1) trigger RPA for a legacy logistics system, 2) call an SMS API, and 3) register logs. Which component should coordinate this automation?

- A. Let the RPA bot orchestrate the SMS, logging, and legacy updates
- B. Record-Triggered Flow with integration calls
- C. Use Composer as the main coordinator by polling Salesforce for closed sales
- D. Implement the orchestration entirely in Apex triggers

**Correct answer:** Record-Triggered Flow with integration calls

## Q37 (m4_q193)
**Question:** In one question, an option proposes using Flow Orchestration for an extremely simple one-step process that a single Record-Triggered Flow could handle. What kind of mistake is this?

- A. A technically impossible alternative
- B. An alternative that adds unnecessary complexity
- C. An alternative that ignores reuse
- D. An alternative that violates DML limits

**Correct answer:** An alternative that adds unnecessary complexity

## Q38 (m4_q194)
**Question:** A company plans a Flow that, on record update, calls several subflows and multiple serial APIs, creating a risk of hitting limits. Which approach is more mature?

- A. Keep the design and add more retries inside the same record-triggered Flow
- B. Rethink the architecture using Process APIs, bulkification, and, if necessary, Orchestration
- C. Shift the serial calls to RPA while keeping the orchestration unchanged
- D. Turn off validations to shorten execution time

**Correct answer:** Rethink the architecture using Process APIs, bulkification, and, if necessary, Orchestration

## Q39 (m4_q195)
**Question:** NTO wants routing decisions such as which queue receives a case to remain configurable and reusable. What does the exam tend to prefer?

- A. Logic spread across several Apex triggers
- B. Centralized reusable Flow logic or subflows
- C. Logic in local scripts
- D. Logic only in the external API

**Correct answer:** Centralized reusable Flow logic or subflows

## Q40 (m4_q196)
**Question:** One option says: 'To ensure performance, connect Flow directly to the database, avoiding APIs and Exchange.' Why is that incorrect?

- A. Salesforce cannot access databases
- B. This breaks API-led connectivity, governance, and asset reuse
- C. It does not support governed APIs
- D. Exchange is optional only for RPA

**Correct answer:** This breaks API-led connectivity, governance, and asset reuse

## Q41 (m4_q197)
**Question:** One scenario shows: Flow -> API without a contract -> nobody knows who consumes the API. What improvement is more aligned with the MuleSoft strategy?

- A. Leave it as it is
- B. Publish the specification in Exchange, use External Services, and apply policies in API Manager
- C. Replace the API with direct database queries
- D. Migrate all logic to RPA

**Correct answer:** Publish the specification in Exchange, use External Services, and apply policies in API Manager

## Q42 (m4_q198)
**Question:** One question describes a team creating multiple Flows that make redundant calls to different APIs with duplicate logic. What response is more aligned with C4E vision?

- A. Allow duplication for speed
- B. Create reusable Process and Experience APIs and document them in Exchange for Flow consumption
- C. Discontinue the use of Flow
- D. Create a separate Flow for each team without standards

**Correct answer:** Create reusable Process and Experience APIs and document them in Exchange for Flow consumption

## Q43 (m4_q199)
**Question:** One option suggests that when an API fails, it is best to let Flow break silently so the user does not notice. How would this be evaluated?

- A. Acceptable if the user sees success while support is notified later
- B. Wrong; error should be handled via Fault Paths and appropriate feedback
- C. Acceptable only when the failing API is not business-critical
- D. Correct when the error comes from an external system

**Correct answer:** Wrong; error should be handled via Fault Paths and appropriate feedback

## Q44 (m4_q200)
**Question:** In a typical scenario of hyperautomation, what role does Salesforce Flow play in relation to RPA, Composer and APIs?

- A. Act as the UI layer and event trigger, consuming APIs, RPA, and Composer
- B. Replace all other components
- C. Just run nightly jobs
- D. Act only as a test tool

**Correct answer:** Act as the UI layer and event trigger, consuming APIs, RPA, and Composer

## Q45 (m4_q201)
**Question:** One option says: 'Build a new complex Flow that duplicates the behavior of an existing Experience API so the team does not depend on Integration.' Why is that probably wrong?

- A. Flows cannot consume APIs
- B. It ignores reuse of existing APIs and increases technical debt
- C. Experience APIs cannot be called by Flow
- D. It has no meaningful architectural impact

**Correct answer:** It ignores reuse of existing APIs and increases technical debt
