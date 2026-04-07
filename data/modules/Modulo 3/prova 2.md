# Prova 2 - Modulo 3

Use este arquivo como treino rapido do modulo.

1. NTO has a flow that must apply different tax rates depending on the country of the customer. Which Composer feature should be used to branch the logic?
   A) For Each
   B) If/Else block
   C) HTTP Listener
   D) Scheduler

2. A scenario describes receiving a list of order items from Salesforce and needing to create one record in an ERP system for each item. Which structure is most appropriate?
   A) Single action outside any loop
   B) Multiple parallel flows
   C) For each loop around the ERP creation step
   D) Repeated HTTP Listener calls

3. AnyAirlines wants to normalize customer names by trimming spaces and converting them to upper case before sending them to an external system. Which function combination is correct?
   A) LOWER + CONCAT
   B) TRIM + UPPER
   C) FORMAT DATE + TRIM
   D) RAND + UPPER

4. A flow must calculate a due date 10 days after the invoice date and send it to another system. Which Composer feature handles this?
   A) Math functions only
   B) Date functions in Formula Editor (e.g. ADD DAYS)
   C) Manual calculation outside the flow
   D) RPA bot functions

5. A candidate suggests storing complex JSON in a text field and parsing it manually in another system. Which alternative better matches Composer best practices?
   A) Use structured mapping with data pills instead of opaque JSON strings
   B) Always store data as CSV in text fields
   C) Use only static text values
   D) Use RPA to parse JSON

6. A scenario describes frequent failures because values sent to the destination system are null. What is the best way to handle this in Composer?
   A) Ignore null values
   B) Use If/Else blocks to validate data before calling the destination
   C) Disable validation in the destination system
   D) Rely only on retries

7. NTO wants to see exactly which values we passed to a connector action during the last run without re-executing the flow. Where can they find this?
   A) System debug logs only
   B) Composer Run History, expanding the specific execution
   C) Local browser cache
   D) Salesforce Setup Audit Trail

8. In Test Mode, how long does Composer typically wait for the trigger event before timing out?
   A) A few seconds only
   B) Approximately 10 minutes, depending on configuration
   C) 24 hours
   D) It does not wait; it runs immediately

9. AnyAirlines wants to reuse the same Composer connection to Salesforce across several flows. What's the best practice?
   A) Create a new connection in every flow
   B) Use shared connections configured once and referenced by several flows
   C) Store credentials directly in each step
   D) Use only anonymous connections

10. A candidate solution catches a failed call to an external system and sends a descriptive error message to a Slack channel. What does this represent?
   A) Misuse of Composer
   B) A valid pattern for basic error notification
   C) Unsupported integration type
   D) Replacement for all logging needs

11. A scenario compares two implementation options, and only Option B preserves validation and safer processing. Which should the candidate choose?
   A) Option A
   B) Option B
   C) Both are identical
   D) Neither is supported

12. NTO wants to avoid partial processing where only the first element of a list is handled. Which Composer concept must be configured correctly?
   A) Triggers
   B) For Each loops around list operations
   C) Only the HTTP Listener
   D) The sandbox org type

13. A candidate flow uses Composer to orchestrate many complex system interactions, heavy transformations and advanced error handling. What limitation should you keep in mind for the exam?
   A) Composer cannot interact with SaaS systems
   B) Composer is designed for simpler logic; complex orchestration and transformations belong in Anypoint APIs
   C) Composer does not support If/Else
   D) Composer cannot call RPA

14. A scenario describes the need to test a Composer flow without impacting real SAP production data. Which approach is best?
   A) Use Test Mode in a sandbox connected to a SAP test environment
   B) Use Test Mode directly against SAP production
   C) Composer cannot be tested
   D) Test only by reading logs

15. An exam item shows three plausible options and one that bypasses all validation, sending raw data directly to the destination. What kind of trap is this?
   A) Alternative technically possible but unsafe or fragile
   B) Alternative over-reuse
   C) Alternative that uses many streams
   D) Alternative that follows all good practices
