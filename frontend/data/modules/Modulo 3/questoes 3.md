# Module 3 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 3.md.

## Q01 (m3_q109)
**Question:** AnyAirlines wants a no-code integration that creates a record in SAP whenever a new Opportunity is closed in Salesforce. Which trigger should be used in Composer?

- A. Scheduler trigger with periodic polling of Salesforce
- B. System event trigger on Salesforce
- C. HTTP Listener trigger exposed for an external caller
- D. A manually started flow run from Composer

**Correct answer:** System event trigger on Salesforce

## Q02 (m3_q110)
**Question:** Northern Trail Outfitters (NTO) needs a flow that runs every night at 02:00 to sync inventory from Google Sheets into Salesforce. Which trigger is most appropriate?

- A. A row-change event trigger on Google Sheets
- B. Scheduler trigger configured for 02:00
- C. HTTP Listener triggered by an external scheduler
- D. A manually started flow run every night

**Correct answer:** Scheduler trigger configured for 02:00

## Q03 (m3_q111)
**Question:** The scenario states: “Business admins must configure integrations between Salesforce, Slack and ServiceNow without writing code.” Which tool is the exam most likely expecting?

- A. Anypoint Studio
- B. MuleSoft Composer
- C. Salesforce Apex
- D. MuleSoft RPA Builder

**Correct answer:** MuleSoft Composer

## Q04 (m3_q112)
**Question:** NTO wants to minimize unnecessary data transfer when using Composer to write to ServiceNow. What is the recommended practice?

- A. Always select all fields
- B. Select only the fields relevant for the flow
- C. Use SOQL to filter fields
- D. Move filtering to RPA

**Correct answer:** Select only the fields relevant for the flow

## Q05 (m3_q113)
**Question:** A flow needs to process every line in a collection returned from Workday. Which Composer element should be used?

- A. If/Else only
- B. For each loop
- C. Separate flows for each item
- D. Multiple HTTP Listeners

**Correct answer:** For each loop

## Q06 (m3_q114)
**Question:** A candidate solution maps a single record from Salesforce directly into a list field in another system, without iteration. What problem is most likely?

- A. Composer will silently fix the mapping
- B. Only the first item will be processed or the mapping will fail
- C. All records will be processed correctly
- D. Composer will automatically create a For Each

**Correct answer:** Only the first item will be processed or the mapping will fail

## Q07 (m3_q115)
**Question:** A scenario requires concatenating first name and last name into a single 'FullName' field inside Composer. Where should this be done?

- A. In an external API only
- B. In the Formula Editor using string functions
- C. In RPA before sending to Composer
- D. Directly in the database

**Correct answer:** In the Formula Editor using string functions

## Q08 (m3_q116)
**Question:** A business user needs to add 30 days to the current date to calculate a due date. Which category of Composer functions is most relevant?

- A. Text functions only
- B. Date functions such as ADD DAYS
- C. Math functions only
- D. Security functions

**Correct answer:** Date functions such as ADD DAYS

## Q09 (m3_q117)
**Question:** AnyAirlines wants to test a Composer flow that is triggered by a new record in Salesforce. What is the correct way to use Test Mode?

- A. Activate Test Mode and perform the real triggering action within the time window
- B. Click “Run” without providing any data
- C. Test Mode is not available for event-based triggers
- D. Use only mocked systems; real data is not allowed

**Correct answer:** Activate Test Mode and perform the real triggering action within the time window

## Q10 (m3_q118)
**Question:** A scenario explains that Composer Test Mode uses real systems and can create real records. What is the main implication for the exam?

- A. It is safe to use in production with any data
- B. Test Mode must be used only in non-production or with test data
- C. Test Mode uses only mock data
- D. Test Mode cannot show run history

**Correct answer:** Test Mode must be used only in non-production or with test data

## Q11 (m3_q119)
**Question:** A flow failures when calling an external system due to a missing required field. What is the expected behavior of Composer?

- A. It retries automatically with different field values
- B. It stops at the failing step and marks the run as failed
- C. It skips the step and continues silently
- D. It corrects the field mapping automatically

**Correct answer:** It stops at the failing step and marks the run as failed

## Q12 (m3_q120)
**Question:** NTO wants to understand what data passed through each step of a failed run. Where should they look?

- A. In the operating system event viewer
- B. In Composer Run History, inspecting data pills for each step
- C. In Anypoint Studio logs
- D. Only in Salesforce debug logs

**Correct answer:** In Composer Run History, inspecting data pills for each step

## Q13 (m3_q121)
**Question:** A candidate claims that Composer can replace all Anypoint APIs because it can call many systems directly. Why is this not aligned with best practices?

- A. Composer cannot call any external system
- B. Composer is intended for simpler, low-to-medium complexity integrations, not full API-led architectures
- C. Anypoint APIs cannot be reused
- D. The exam does not treat Composer as a replacement for API-led architecture

**Correct answer:** Composer is intended for simpler, low-to-medium complexity integrations, not full API-led architectures

## Q14 (m3_q122)
**Question:** The scenario requires Composer to be invoked from an external, custom web application on demand. Which trigger should be used?

- A. System event trigger fired by a connected SaaS app
- B. Scheduler trigger combined with periodic polling
- C. HTTP Listener trigger
- D. A manually started integration run from Composer

**Correct answer:** HTTP Listener trigger

## Q15 (m3_q123)
**Question:** A business admin asks which environment is recommended to build and test new Composer flows before moving to production. What's the best answer?

- A. Directly in the production org
- B. In a sandbox or dedicated non-production environment
- C. In any org, there is no difference
- D. In a local file system

**Correct answer:** In a sandbox or dedicated non-production environment

## Q16 (m3_q124)
**Question:** NTO has a flow that must apply different tax rates depending on the country of the customer. Which Composer feature should be used to branch the logic?

- A. For Each
- B. If/Else block
- C. HTTP Listener
- D. Scheduler

**Correct answer:** If/Else block

## Q17 (m3_q125)
**Question:** A scenario describes receiving a list of order items from Salesforce and needing to create one record in an ERP system for each item. Which structure is most appropriate?

- A. Single action outside any loop
- B. Multiple parallel flows
- C. For each loop around the ERP creation step
- D. Repeated HTTP Listener calls

**Correct answer:** For each loop around the ERP creation step

## Q18 (m3_q126)
**Question:** AnyAirlines wants to normalize customer names by trimming spaces and converting them to upper case before sending them to an external system. Which function combination is correct?

- A. LOWER + CONCAT
- B. TRIM + UPPER
- C. FORMAT DATE + TRIM
- D. RAND + UPPER

**Correct answer:** TRIM + UPPER

## Q19 (m3_q127)
**Question:** A flow must calculate a due date 10 days after the invoice date and send it to another system. Which Composer feature handles this?

- A. Math functions only
- B. Date functions in Formula Editor (e.g. ADD DAYS)
- C. Manual calculation outside the flow
- D. RPA bot functions

**Correct answer:** Date functions in Formula Editor (e.g. ADD DAYS)

## Q20 (m3_q128)
**Question:** A candidate suggests storing complex JSON in a text field and parsing it manually in another system. Which alternative better matches Composer best practices?

- A. Use structured mapping with data pills instead of opaque JSON strings
- B. Always store data as CSV in text fields
- C. Use only static text values
- D. Use RPA to parse JSON

**Correct answer:** Use structured mapping with data pills instead of opaque JSON strings

## Q21 (m3_q129)
**Question:** A scenario describes frequent failures because values sent to the destination system are null. What is the best way to handle this in Composer?

- A. Ignore null values
- B. Use If/Else blocks to validate data before calling the destination
- C. Disable validation in the destination system
- D. Rely only on retries

**Correct answer:** Use If/Else blocks to validate data before calling the destination

## Q22 (m3_q130)
**Question:** NTO wants to see exactly which values we passed to a connector action during the last run without re-executing the flow. Where can they find this?

- A. System debug logs only
- B. Composer Run History, expanding the specific execution
- C. Local browser cache
- D. Salesforce Setup Audit Trail

**Correct answer:** Composer Run History, expanding the specific execution

## Q23 (m3_q131)
**Question:** In Test Mode, how long does Composer typically wait for the trigger event before timing out?

- A. A few seconds only
- B. Approximately 10 minutes, depending on configuration
- C. 24 hours
- D. It does not wait; it runs immediately

**Correct answer:** Approximately 10 minutes, depending on configuration

## Q24 (m3_q132)
**Question:** AnyAirlines wants to reuse the same Composer connection to Salesforce across several flows. What's the best practice?

- A. Create a new connection in every flow
- B. Use shared connections configured once and referenced by several flows
- C. Store credentials directly in each step
- D. Use only anonymous connections

**Correct answer:** Use shared connections configured once and referenced by several flows

## Q25 (m3_q133)
**Question:** A candidate solution catches a failed call to an external system and sends a descriptive error message to a Slack channel. What does this represent?

- A. Misuse of Composer
- B. A valid pattern for basic error notification
- C. Unsupported integration type
- D. Replacement for all logging needs

**Correct answer:** A valid pattern for basic error notification

## Q26 (m3_q134)
**Question:** A scenario compares two implementation options, and only Option B preserves validation and safer processing. Which should the candidate choose?

- A. Option A
- B. Option B
- C. Both are identical
- D. Neither is supported

**Correct answer:** Option B

## Q27 (m3_q135)
**Question:** NTO wants to avoid partial processing where only the first element of a list is handled. Which Composer concept must be configured correctly?

- A. Triggers
- B. For Each loops around list operations
- C. Only the HTTP Listener
- D. The sandbox org type

**Correct answer:** For Each loops around list operations

## Q28 (m3_q136)
**Question:** A candidate flow uses Composer to orchestrate many complex system interactions, heavy transformations and advanced error handling. What limitation should you keep in mind for the exam?

- A. Composer cannot interact with SaaS systems
- B. Composer is designed for simpler logic; complex orchestration and transformations belong in Anypoint APIs
- C. Composer does not support If/Else
- D. Composer cannot call RPA

**Correct answer:** Composer is designed for simpler logic; complex orchestration and transformations belong in Anypoint APIs

## Q29 (m3_q137)
**Question:** A scenario describes the need to test a Composer flow without impacting real SAP production data. Which approach is best?

- A. Use Test Mode in a sandbox connected to a SAP test environment
- B. Use Test Mode directly against SAP production
- C. Composer cannot be tested
- D. Test only by reading logs

**Correct answer:** Use Test Mode in a sandbox connected to a SAP test environment

## Q30 (m3_q138)
**Question:** An exam item shows three plausible options and one that bypasses all validation, sending raw data directly to the destination. What kind of trap is this?

- A. Alternative technically possible but unsafe or fragile
- B. Alternative over-reuse
- C. Alternative that uses many streams
- D. Alternative that follows all good practices

**Correct answer:** Alternative technically possible but unsafe or fragile

## Q31 (m3_q139)
**Question:** AnyAirlines wants to build a mission-critical, high-volume integration reused by many teams. One option is “implement everything in Composer”. Why is this likely wrong?

- A. Composer does not support SaaS connectors
- B. High-volume, reusable integrations belong in Anypoint APIs, not in Composer alone
- C. Composer cannot send HTTP requests
- D. Composer cannot be monitored

**Correct answer:** High-volume, reusable integrations belong in Anypoint APIs, not in Composer alone

## Q32 (m3_q140)
**Question:** NTO wants business admins to quickly connect Salesforce and Slack for simple notifications without involving developers. Which combination is most aligned with exam expectations?

- A. Anypoint Studio + DataWeave
- B. MuleSoft Composer + Slack connector
- C. Custom Java microservice
- D. RPA bot posting to Slack

**Correct answer:** MuleSoft Composer + Slack connector

## Q33 (m3_q141)
**Question:** A scenario states that an integration must be easily consumable by multiple channels (web, mobile, partners) and governed with policies like rate limiting. Which is the best place for the core logic?

- A. Composer flow
- B. Anypoint Platform APIs
- C. Local scripts
- D. Only RPA

**Correct answer:** Anypoint Platform APIs

## Q34 (m3_q142)
**Question:** An exam item offers two options, and only option B preserves reuse and cleaner architecture. Which should the candidate choose?

- A. A
- B. B
- C. Both are equivalent.
- D. None supported

**Correct answer:** B

## Q35 (m3_q143)
**Question:** A candidate suggests using Composer to perform heavy data transformations that already exist in a Process API. What is the better approach?

- A. Duplicate logic in Composer
- B. Reuse Process API and keep transformation centered on it
- C. Move logic to RPA
- D. Implement all logic in Screen Flows

**Correct answer:** Reuse Process API and keep transformation centered on it

## Q36 (m3_q144)
**Question:** A process uses Composer to trigger MuleSoft RPA via its connector for screen automation in a legacy system. What typical pattern does this illustrate?

- A. Compose as “light orchestration” and RPA as “heavy execution”
- B. RPA as Composer orchestrator
- C. APIs replacing Composer
- D. Only use of HTTP Listener

**Correct answer:** Compose as “light orchestration” and RPA as “heavy execution”

## Q37 (m3_q145)
**Question:** AnyAirlines has a Composer flow that fails frequently due to destination system unavailability. Which strategy is most reasonable in this context?

- A. Blindly retry infinite times on Composer
- B. Validate data and, when possible, move critical logic to APIs with appropriate policies and retry
- C. Ignore all faults
- D. Remove logs to 'improve performance'

**Correct answer:** Validate data and, when possible, move critical logic to APIs with appropriate policies and retry

## Q38 (m3_q146)
**Question:** An option claims that Composer supports complex 'try/catch' structures like a full programming language. Why is that likely a trap answer?

- A. Because Composer does not support any kind of logic
- B. Because Composer has limited logic; it is recommended to validate before and treat errors in a simple way
- C. Because Composer is just an IDE
- D. Because Composer is just like Anypoint Studio

**Correct answer:** Because Composer has limited logic; it is recommended to validate before and treat errors in a simple way

## Q39 (m3_q147)
**Question:** NTO wants to understand that integrations built by business users do not bypass corporate APIs and governance. Which guideline is most appropriate?

- A. Composer should always call systems directly
- B. Composer should consume existing APIs when available, instead of going straight to the backend
- C. Composer should never be used with APIs
- D. Composer should replace API Manager

**Correct answer:** Composer should consume existing APIs when available, instead of going straight to the backend

## Q40 (m3_q148)
**Question:** The scenario describes a one-off load of thousands of historical records. One answer suggests building a permanent Composer flow for this. Why is this potentially not ideal?

- A. Composer can't handle any volume
- B. For punctual migration, dedicated tools or temporary scripts may be more suitable
- C. Composer has no connectors for SaaS
- D. Composer only runs in production

**Correct answer:** For punctual migration, dedicated tools or temporary scripts may be more suitable

## Q41 (m3_q149)
**Question:** An exam question presents three statements, and the scenario indicates that A, B, and C are all valid together. Which answer should the candidate choose?

- A. Just A is correct
- B. A, B and C are correct and complementary
- C. Just C is correct
- D. None are correct.

**Correct answer:** A, B and C are correct and complementary

## Q42 (m3_q150)
**Question:** A candidate chooses an option where Composer directly manipulates database tables of a core system instead of calling a System API. Why is this problematic?

- A. Because databases cannot be accessed
- B. Because it ignores API-led, governance and reuse of the existing System API
- C. Because Composer does not support connections
- D. Because System APIs cannot be versioned

**Correct answer:** Because it ignores API-led, governance and reuse of the existing System API

## Q43 (m3_q151)
**Question:** AnyAirlines wants to give non-technical users autonomy while still keeping control over integration changes. Which governance model is more aligned with the exam?

- A. Each team builds flows without any guidelines
- B. A C4E defining patterns, reusable assets, and support for citizen integrators
- C. Only a central team can create any integration
- D. All integrations must be done only by Java developers

**Correct answer:** A C4E defining patterns, reusable assets, and support for citizen integrators

## Q44 (m3_q152)
**Question:** A scenario compares two solutions, and Option 1 is the only one that respects API-led layering and reuse. Which answer should the candidate choose?

- A. Option 1, as it respects API-led and reuse
- B. Option 2, because it is “more direct”
- C. Both are equivalent.
- D. None supported

**Correct answer:** Option 1, as it respects API-led and reuse

## Q45 (m3_q153)
**Question:** A question mixes API-led layers and tools in a way that keeps Composer consuming reusable APIs rather than bypassing them. How should this be evaluated?

- A. Wrong because Composer should never consume APIs
- B. In line with the MuleSoft strategy for reuse and separation of responsibilities
- C. Wrong as Process APIs should not exist
- D. Wrong because RPA should replace Composer

**Correct answer:** In line with the MuleSoft strategy for reuse and separation of responsibilities
