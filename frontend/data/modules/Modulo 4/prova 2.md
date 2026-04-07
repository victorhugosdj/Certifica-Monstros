# Prova 2 - Modulo 4

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants a Screen Flow to consume an API published in Anypoint Platform using an OpenAPI contract. Which way is recommended?
   A) Create Apex HTTP callout manually
   B) Import specification via External Services and use Action in Flow
   C) Use HTTP Callout only without contract
   D) Create RPA to call API

2. NTO has a scenario where Flow needs to call an API whose contract is still under construction, but there is a Mocking Service available at Exchange. How can this be enjoyed?
   A) You can't. Flow requirements real API
   B) External Services can point to the Mocking Service URL for testing
   C) Only Composer can use Mocking Service
   D) Only RPA can use Mocking Service

3. An Einstein Bot collects the customer's order number and needs to get the status via MuleSoft. Which sequence is more aligned with the recommended architecture?
   A) Bot → RPA → Database directly
   B) Bot → Flow → Anypoint API → Order system
   C) Bot → Composer → Sheet
   D) Bot → Apex batch anonymous

4. A Flow calling an External Service fails with a 500 error from the API. Which Flow feature should be used to handle this failure in a controlled manner?
   A) Element default Path
   B) Fault Path
   C) Infinite Loop
   D) Debug feature only

5. In a scenario, Flow needs to log in and create an internal case whenever an external API call fails. Where should that logic be?
   A) Inside Fault Path associated with callout action
   B) Outside Flow, only Apex
   C) In the client who called Flow
   D) In a Workflow Rule

6. NTO wants to automate Record-Triggered Flows tests to ensure they don't break after changes. Which resource is more appropriate?
   A) Flow Test (declarative tool)
   B) Debug manual testing only
   C) Production execution logs
   D) Apex Tests Only

7. An exam scenario highlights the Debug Flow tool. What major advantage does it offer?
   A) Replaces all automated tests
   B) Allows you to run the Flow as a specific user and inspect paths and variable values
   C) Shows text logs only
   D) Works only for Screen Flows

8. A Flow Triggered by registration is intermittently failing because of an unstable API. Which combination is more appropriate?
   A) Retry the same failed step indefinitely without capturing context
   B) Handle the failure via Fault Path and, if needed, record the error for reprocessing
   C) Pause the flow and require an administrator to restart it every time
   D) Move the integration into another tool without explicit error handling

9. AnyAirlines wants to use Einstein Bot as the initial layer and, depending on the API response, direct the case to a human agent. Where should this decision be made?
   A) In the database
   B) In the Flow that Bot invokes, based on API return
   C) Only in the RPA
   D) Only in Apex

10. NTO needs to decide between External Services and HTTP Callout in a trial scenario. The API already has specification published in Exchange and needs to be reused in multiple Flows. What's the best choice?
   A) HTTP Callout
   B) External Services, to take advantage of the contract and governance
   C) Apex only
   D) Composer Only

11. A Flow consumes an uncontracted API using only a URL and HTTP method. Later, the API gains an OAS specification. What improvement is now preferred?
   A) Keep HTTP Callout for simplicity
   B) Migrate to External Services based on specification
   C) Swap Flow for RPA
   D) Swap Flow for Apex triggers

12. One scenario describes that business analysis needs to simulate different inputs and quickly see Flow's behavior. Which combination is more appropriate?
   A) Flow Test + Debug Tool
   B) Only logs in production
   C) Tests only Apex
   D) Only monitoring in Anypoint

13. Integration between Flow and MuleSoft RPA is implemented via External Services calling the RPA Manager endpoint. What does this represent in terms of hyperautomation?
   A) Use Flow as a human trigger calling RPA processes
   B) Use of RPA as user interface
   C) Replacing APIs with bots
   D) Elimination of Exchange Need

14. In a test scenario, one option suggests deploying a Flow with no testing or debugging and relying only on production. How should this be evaluated?
   A) Correct, because Flow is declarative
   B) Wrong, because Flow Test and Debug are important resources assessed in the exam
   C) Neutral, no impact
   D) Preferable to any automated testing strategy

15. A company wants to ensure that a Record-Triggered Flow calling external APIs does not break when it receives unexpected data. Which practice is more aligned?
   A) Assume that the data is always valid
   B) Validate the data in Flow before calling the API and use Fault Paths to handle failures
   C) Trust API logs only
   D) Disable Flow when errors occur
