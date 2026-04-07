# Prova 3 - Modulo 8

Use este arquivo como treino rapido do modulo.

1. AnyAirlines has a purchasing process: an employee requests an item, a manager approves it, stock is checked through an API, and purchasing approves an external buy if needed. Why is Flow Orchestration indicated?
   A) Because it is just a simple batch process
   B) Because it coordinates multiple human and automated steps over time
   C) Because it replaces all APIs
   D) Because no Flow should be used

2. One option suggests using only RPA to coordinate all human approvals and systems in a week-long process. What is wrong with that approach?
   A) RPA does not support UI
   B) Orchestration is designed for long-running coordination and human tasks in Salesforce
   C) RPA cannot call APIs
   D) Flow does not interact with humans

3. NTO needs to choose between Flow Orchestration and a single Screen Flow for a quick service process that ends in a few minutes within one session. Which option is typically preferred?
   A) Flow Orchestration because it gives more visibility for any process
   B) A simple Screen Flow without over-engineering
   C) An RPA bot started from Salesforce
   D) A Composer flow replacing the screen interaction

4. One option uses Orchestration for a scenario with no human steps and no waits, where everything is short and synchronous. What kind of mistake is this?
   A) An alternative that adds unnecessary complexity
   B) A technically impossible alternative
   C) An alternative that ignores APIs
   D) An alternative that violates DML limits

5. AnyAirlines wants a manager to monitor the progress of a complex process directly on the Account record. What combination supports that?
   A) API logs only
   B) Orchestration plus Work Guide displayed on the record
   C) RPA only
   D) Composer only

6. One option suggests scattering the application logic across several Flows instead of centralizing it in Orchestration and reusable subflows. Why is that a bad practice?
   A) Because Flows cannot have approval logic
   B) Because it duplicates logic and makes maintenance and auditing harder
   C) Because Orchestration cannot call subflows
   D) Because approval APIs are not supported

7. NTO sees several processes stopped at different stages and needs to prioritize where to act. What artifact helps you get this high-level vision?
   A) Apex Class List
   B) List of Orchestration Runs with status (in progress, paused, failed, completed)
   C) Local user machine logs
   D) Case reports only

8. A process lets HR validate documents while IT prepares the environment in parallel. Which answer shows the correct understanding?
   A) Orchestration must always be sequential
   B) Orchestration allows parallel steps within a stage, and the stage completes only when both finish
   C) Multiple orchestrations are mandatory
   D) Only RPA can run in parallel

9. One option says: 'In case of error, it is best to cancel the whole orchestration without recording any status information.' Why is that inappropriate?
   A) Because it is not technically possible
   B) Because it loses traceability; it is better to record status, allow resume, and maintain history
   C) Because errors never occur
   D) Because RPA always manages errors

10. AnyAirlines wants to apply processes to evolve over time, keeping version history. Which combination is more aligned?
   A) Apex hard-coded
   B) Versioned Flows and Orchestrations, with careful migration between versions
   C) Local Scripts
   D) Emails only

11. One option suggests building all process logic in Apex and leaving Orchestration as an empty shell. Why does that not reflect the focus of the module?
   A) Because Apex is not supported
   B) Because Flow Orchestrator should coordinate the process, and Apex should be used only when needed
   C) Because Orchestration cannot call Apex actions
   D) Because the exam does not consider Apex

12. NTO wants to use Orchestration, but also needs to call MuleSoft APIs at certain points in the process. What is the recommended architecture?
   A) Orchestration calls Flows, which use External Services or HTTP Callout to consume APIs
   B) Orchestration directly calls the database
   C) APIs must always call Orchestration
   D) RPA replaces all APIs

13. One question presents a process that is already well served by a Record-Triggered Flow and a few simple automations. One option suggests migrating everything to Orchestration just because it is new. How should this be evaluated?
   A) Adopt Orchestration anyway to standardize on the newest tool
   B) Recognize this as overengineering; use Orchestration only when there is a clear benefit such as long duration, multiple stages, or human work
   C) Move to Orchestration mainly because monitoring will look cleaner
   D) Migrate first and decide later whether the process needed orchestration

14. AnyAirlines wants the process to pause and route work to an analysis queue if the inventory check API fails. How can this be modeled?
   A) Do not record the failure
   B) Use a Background Step that calls a Flow, handles the failure, and routes the Work Item to the appropriate queue
   C) Log the issue only
   D) Use only RPA

15. The final alternate states: “Flow Orchestration completely replaces the need for RPA, Composer and APIs in any hyperautomation scenario.” What answer is more aligned?
   A) Agreement; Orchestration is enough for everything
   B) Disagree; Orchestration coordinates processes, but still depends on Flows, APIs, RPA and Composer to perform specialized tasks
   C) Agreement only for internal processes
   D) Depends on the volume
