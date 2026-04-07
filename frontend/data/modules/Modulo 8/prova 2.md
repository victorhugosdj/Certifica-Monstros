# Prova 2 - Modulo 8

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants Stage "IT" to start only after Stage "Documentation" is successfully approved. What concept applies?
   A) Work Items
   B) Entry Conditions
   C) Exit Conditions
   D) Platform Events

2. Northern Trail Outfitters (NTO) needs to define when a Step is considered completed. In an interactive stage, what is the typical criterion?
   A) When the user completes the associated Screen Flow
   B) When the administrator clicks "approve everything"
   C) When the system sends an email
   D) When the record is created

3. In a Background Step, which event usually determines Exit Condition?
   A) User click “Save”
   B) The completion of Autolaunched Flow implementing logic
   C) End of business day
   D) The execution of an Apex Trigger

4. A scenario describes a Step that should be started only when a certain field of the record is in “Approved” status. Where's this set up?
   A) In Work Guide
   B) In Step/Stage Entry Condition
   C) In Apex only
   D) In Process Builder

5. A manager wants certain tasks to go to a queue rather than to a specific user so any team member can pick them up. How is that supported?
   A) Assignment per user only
   B) Interactive Step Assignment to Queue
   C) Direct allocation to the RPA
   D) Assignment to API Manager

6. NTO needs a user to clearly see which pending tasks exist for them on a given record. Which UI component is used?
   A) Work Guide on the Salesforce record
   B) Default task list only
   C) RPA Screen
   D) Exchange console

7. In a test scenario, two steps must run in parallel within the same Stage. When is Stage considered finished?
   A) When any one of them ends
   B) When all parallel mandatory Steps are completed
   C) When the administrator decides
   D) When an API returns 200

8. AnyAirlines wants to pause a process until an external event is completed. How does Orchestration handle that?
   A) Does not support pauses
   B) Maintains orchestration state and waits for the responsible step or flow to complete
   C) Automatically cancels the process
   D) Moves everything to Apex

9. A candidate confuses an Orchestration Run with an individual Flow. What is the best definition of an Orchestration Run?
   A) Flow source code
   B) A specific execution of the complete orchestration, with all its Stages and Steps
   C) An API Manager log
   D) An Apex execution

10. One scenario shows that several executions of the same Orchestration are in different states (in progress, paused, completed). Where's this viewed?
   A) Raw logs only
   B) On the Orchestration Runs page
   C) In RPA Manager
   D) In Exchange

11. NTO needs to debug why a purchasing process got stuck in a specific Stage. What resource helps?
   A) Debug from Orchestration, inspecting variables between Stages
   B) Apex logs only
   C) Exchange Only
   D) RPA logs only

12. An example process has Stage 1 - Request, Stage 2 - Approval, Stage 3 - Inventory check (background), and Stage 4 - Procurement. Which stage would most likely call a MuleSoft API?
   A) Stage 1
   B) Stage 2
   C) Stage 3 (Inventory check) via a Background Step
   D) Stage 4

13. AnyAirlines wants a “Compliance Review” step to be required only if the order value is greater than a limit. Where would this logic be configured?
   A) In API Policy
   B) In the Entry Condition of the Compliance Step/Stage
   C) In Monitoring logs
   D) In a manual email

14. One option says that 'Background Steps cannot call APIs; they only update local fields.' Based on the module, how should this be evaluated?
   A) True
   B) False; Background Steps run Flows, which can call MuleSoft APIs and other services
   C) True only in Sandbox
   D) True only for Experience Cloud

15. NTO wants to know who currently owns a stalled process. What information combination does Orchestration provide?
   A) System logs only
   B) Orchestration Runs and Work Items, showing which step, user, or queue currently owns the process
   C) Only the creation date
   D) Only the final status
