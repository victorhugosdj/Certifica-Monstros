# Module 8 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 8.md.

## Q01 (m8_q343)
**Question:** AnyAirlines wants to orchestrate a complete employee onboarding process across multiple stages and departments. Which component is more appropriate?

- A. A single simple Screen Flow
- B. Salesforce Flow Orchestration
- C. Only MuleSoft RPA
- D. Composer Only

**Correct answer:** Salesforce Flow Orchestration

## Q02 (m8_q344)
**Question:** Northern Trail Outfitters (NTO) needs to understand the basic structure of an orchestration. What is the correct hierarchy?

- A. Step → Stage → Orchestration
- B. Orchestration → Stages → Steps
- C. Stage → Orchestration → Steps
- D. Steps → Orchestration → Stages

**Correct answer:** Orchestration → Stages → Steps

## Q03 (m8_q345)
**Question:** In one scenario, an employee onboarding process is divided into Documentation, IT, and Training. How should this be modeled?

- A. Each activity as a separate Orchestration
- B. Stages representing each logical grouping
- C. Only Steps without Stages
- D. A single giant Step

**Correct answer:** Stages representing each logical grouping

## Q04 (m8_q346)
**Question:** The orchestration has stages that perform Autolaunched Flows without human interaction. What are these steps called?

- A. Interactive Steps
- B. Background Steps
- C. User Tasks
- D. Bot Tasks

**Correct answer:** Background Steps

## Q05 (m8_q347)
**Question:** A step requires a manager to approve a discount on a screen. What kind of Step is that?

- A. Background Step
- B. Interactive Step
- C. System Step
- D. Async Step

**Correct answer:** Interactive Step

## Q06 (m8_q348)
**Question:** A scenario talks about “Work Items” that appear to users in a work queue, associating a specific Flow to be filled out. What does that represent?

- A. Application logs only
- B. Orchestration Work Items
- C. Platform Events
- D. Apex Jobs

**Correct answer:** Orchestration Work Items

## Q07 (m8_q349)
**Question:** NTO wants an interactive stage to be assigned to a group of approvers. What does Orchestration support?

- A. Assignment to individual users only
- B. Assignment to user, group, or queue
- C. Assignment to queues only
- D. Assignment only to the record owner

**Correct answer:** Assignment to user, group, or queue

## Q08 (m8_q350)
**Question:** An exam scenario describes a process that can take days, with multiple actions at different times. Why is Flow Orchestration suitable here?

- A. Because it only runs in batch
- B. Because it manages long-running state, steps, and assignees
- C. Because it replaces APIs
- D. Because no other automation pattern can span time

**Correct answer:** Because it manages long-running state, steps, and assignees

## Q09 (m8_q351)
**Question:** In a Stage, two steps must take at the same time: HR prepares the contract and IT creates the email. How is this modeled?

- A. Sequential Steps within Stage
- B. Parallel steps within the same Stage, which only ends when both conclude
- C. Separate Orchestrations
- D. A single step with conditional logic

**Correct answer:** Parallel steps within the same Stage, which only ends when both conclude

## Q10 (m8_q352)
**Question:** One candidate suggests using only isolated Flows for a process that requires coordination between multiple teams and spaced human tasks. Why can that be inefficient?

- A. Because standard Flows do not support autolaunched logic
- B. Because Orchestration provides an explicit model of stages, steps, and long-running work items
- C. Because Flows cannot call APIs
- D. Because Flows cannot show screens

**Correct answer:** Because Orchestration provides an explicit model of stages, steps, and long-running work items

## Q11 (m8_q353)
**Question:** AnyAirlines wants to ensure audit trail: who approved what, at which stage. What resource helps with that?

- A. Apex Logs Only
- B. Status and history of Orchestration Runs and Work Items
- C. Legacy system logs only
- D. Only saved emails

**Correct answer:** Status and history of Orchestration Runs and Work Items

## Q12 (m8_q354)
**Question:** The same Orchestration will be used across several similar processes with small variations. What does the exam tend to value in that case?

- A. Create a whole new Orchestration for each variation
- B. Reuse orchestration and subflows where it makes sense, avoiding duplication
- C. Place all in Apex
- D. Use only RPA

**Correct answer:** Reuse orchestration and subflows where it makes sense, avoiding duplication

## Q13 (m8_q355)
**Question:** NTO wants certain steps to be optional and others mandatory within a Stage. What defines the Stage conclusion?

- A. When any Step ends
- B. When all mandatory Steps end
- C. When the first user opens the Work Guide
- D. When the administrator manually marks it complete

**Correct answer:** When all mandatory Steps end

## Q14 (m8_q356)
**Question:** An alternate says that “Flow Orchestration is just a new name for any Screen Flow”. How would this be evaluated?

- A. Correct.
- B. Wrong; Orchestration adds a multistage process layer, not just UI
- C. True only in Sandbox
- D. True only in production

**Correct answer:** Wrong; Orchestration adds a multistage process layer, not just UI

## Q15 (m8_q357)
**Question:** A process described in the exam involves a short sequence, no human interaction, and fully synchronous execution. Which tool will probably be preferred instead of Orchestration?

- A. An autolaunched Flow
- B. A multistage Orchestration with stage tracking
- C. An RPA bot automating the user interface end to end
- D. A Composer flow coordinating several SaaS actions

**Correct answer:** An autolaunched Flow

## Q16 (m8_q358)
**Question:** AnyAirlines wants Stage "IT" to start only after Stage "Documentation" is successfully approved. What concept applies?

- A. Work Items
- B. Entry Conditions
- C. Exit Conditions
- D. Platform Events

**Correct answer:** Entry Conditions

## Q17 (m8_q359)
**Question:** Northern Trail Outfitters (NTO) needs to define when a Step is considered completed. In an interactive stage, what is the typical criterion?

- A. When the user completes the associated Screen Flow
- B. When the administrator clicks "approve everything"
- C. When the system sends an email
- D. When the record is created

**Correct answer:** When the user completes the associated Screen Flow

## Q18 (m8_q360)
**Question:** In a Background Step, which event usually determines Exit Condition?

- A. User click “Save”
- B. The completion of Autolaunched Flow implementing logic
- C. End of business day
- D. The execution of an Apex Trigger

**Correct answer:** The completion of Autolaunched Flow implementing logic

## Q19 (m8_q361)
**Question:** A scenario describes a Step that should be started only when a certain field of the record is in “Approved” status. Where's this set up?

- A. In Work Guide
- B. In Step/Stage Entry Condition
- C. In Apex only
- D. In Process Builder

**Correct answer:** In Step/Stage Entry Condition

## Q20 (m8_q362)
**Question:** A manager wants certain tasks to go to a queue rather than to a specific user so any team member can pick them up. How is that supported?

- A. Assignment per user only
- B. Interactive Step Assignment to Queue
- C. Direct allocation to the RPA
- D. Assignment to API Manager

**Correct answer:** Interactive Step Assignment to Queue

## Q21 (m8_q363)
**Question:** NTO needs a user to clearly see which pending tasks exist for them on a given record. Which UI component is used?

- A. Work Guide on the Salesforce record
- B. Default task list only
- C. RPA Screen
- D. Exchange console

**Correct answer:** Work Guide on the Salesforce record

## Q22 (m8_q364)
**Question:** In a test scenario, two steps must run in parallel within the same Stage. When is Stage considered finished?

- A. When any one of them ends
- B. When all parallel mandatory Steps are completed
- C. When the administrator decides
- D. When an API returns 200

**Correct answer:** When all parallel mandatory Steps are completed

## Q23 (m8_q365)
**Question:** AnyAirlines wants to pause a process until an external event is completed. How does Orchestration handle that?

- A. Does not support pauses
- B. Maintains orchestration state and waits for the responsible step or flow to complete
- C. Automatically cancels the process
- D. Moves everything to Apex

**Correct answer:** Maintains orchestration state and waits for the responsible step or flow to complete

## Q24 (m8_q366)
**Question:** A candidate confuses an Orchestration Run with an individual Flow. What is the best definition of an Orchestration Run?

- A. Flow source code
- B. A specific execution of the complete orchestration, with all its Stages and Steps
- C. An API Manager log
- D. An Apex execution

**Correct answer:** A specific execution of the complete orchestration, with all its Stages and Steps

## Q25 (m8_q367)
**Question:** One scenario shows that several executions of the same Orchestration are in different states (in progress, paused, completed). Where's this viewed?

- A. Raw logs only
- B. On the Orchestration Runs page
- C. In RPA Manager
- D. In Exchange

**Correct answer:** On the Orchestration Runs page

## Q26 (m8_q368)
**Question:** NTO needs to debug why a purchasing process got stuck in a specific Stage. What resource helps?

- A. Debug from Orchestration, inspecting variables between Stages
- B. Apex logs only
- C. Exchange Only
- D. RPA logs only

**Correct answer:** Debug from Orchestration, inspecting variables between Stages

## Q27 (m8_q369)
**Question:** An example process has Stage 1 - Request, Stage 2 - Approval, Stage 3 - Inventory check (background), and Stage 4 - Procurement. Which stage would most likely call a MuleSoft API?

- A. Stage 1
- B. Stage 2
- C. Stage 3 (Inventory check) via a Background Step
- D. Stage 4

**Correct answer:** Stage 3 (Inventory check) via a Background Step

## Q28 (m8_q370)
**Question:** AnyAirlines wants a “Compliance Review” step to be required only if the order value is greater than a limit. Where would this logic be configured?

- A. In API Policy
- B. In the Entry Condition of the Compliance Step/Stage
- C. In Monitoring logs
- D. In a manual email

**Correct answer:** In the Entry Condition of the Compliance Step/Stage

## Q29 (m8_q371)
**Question:** One option says that 'Background Steps cannot call APIs; they only update local fields.' Based on the module, how should this be evaluated?

- A. True
- B. False; Background Steps run Flows, which can call MuleSoft APIs and other services
- C. True only in Sandbox
- D. True only for Experience Cloud

**Correct answer:** False; Background Steps run Flows, which can call MuleSoft APIs and other services

## Q30 (m8_q372)
**Question:** NTO wants to know who currently owns a stalled process. What information combination does Orchestration provide?

- A. System logs only
- B. Orchestration Runs and Work Items, showing which step, user, or queue currently owns the process
- C. Only the creation date
- D. Only the final status

**Correct answer:** Orchestration Runs and Work Items, showing which step, user, or queue currently owns the process

## Q31 (m8_q373)
**Question:** AnyAirlines has a purchasing process: an employee requests an item, a manager approves it, stock is checked through an API, and purchasing approves an external buy if needed. Why is Flow Orchestration indicated?

- A. Because it is just a simple batch process
- B. Because it coordinates multiple human and automated steps over time
- C. Because it replaces all APIs
- D. Because no Flow should be used

**Correct answer:** Because it coordinates multiple human and automatic steps over time

## Q32 (m8_q374)
**Question:** One option suggests using only RPA to coordinate all human approvals and systems in a week-long process. What is wrong with that approach?

- A. RPA does not support UI
- B. Orchestration is designed for long-running coordination and human tasks in Salesforce
- C. RPA cannot call APIs
- D. Flow does not interact with humans

**Correct answer:** Orchestration is designed for long-term coordination and human tasks in Salesforce

## Q33 (m8_q375)
**Question:** NTO needs to choose between Flow Orchestration and a single Screen Flow for a quick service process that ends in a few minutes within one session. Which option is typically preferred?

- A. Flow Orchestration because it gives more visibility for any process
- B. A simple Screen Flow without over-engineering
- C. An RPA bot started from Salesforce
- D. A Composer flow replacing the screen interaction

**Correct answer:** A simple Screen Flow without over-engineering

## Q34 (m8_q376)
**Question:** One option uses Orchestration for a scenario with no human steps and no waits, where everything is short and synchronous. What kind of mistake is this?

- A. An alternative that adds unnecessary complexity
- B. A technically impossible alternative
- C. An alternative that ignores APIs
- D. An alternative that violates DML limits

**Correct answer:** An alternative that adds unnecessary complexity

## Q35 (m8_q377)
**Question:** AnyAirlines wants a manager to monitor the progress of a complex process directly on the Account record. What combination supports that?

- A. API logs only
- B. Orchestration plus Work Guide displayed on the record
- C. RPA only
- D. Composer only

**Correct answer:** Orchestration plus Work Guide displayed on the record

## Q36 (m8_q378)
**Question:** One option suggests scattering the application logic across several Flows instead of centralizing it in Orchestration and reusable subflows. Why is that a bad practice?

- A. Because Flows cannot have approval logic
- B. Because it duplicates logic and makes maintenance and auditing harder
- C. Because Orchestration cannot call subflows
- D. Because approval APIs are not supported

**Correct answer:** Because it duplicates logic and makes maintenance and auditing harder

## Q37 (m8_q379)
**Question:** NTO sees several processes stopped at different stages and needs to prioritize where to act. What artifact helps you get this high-level vision?

- A. Apex Class List
- B. List of Orchestration Runs with status (in progress, paused, failed, completed)
- C. Local user machine logs
- D. Case reports only

**Correct answer:** List of Orchestration Runs with status (in progress, paused, failed, completed)

## Q38 (m8_q380)
**Question:** A process lets HR validate documents while IT prepares the environment in parallel. Which answer shows the correct understanding?

- A. Orchestration must always be sequential
- B. Orchestration allows parallel steps within a stage, and the stage completes only when both finish
- C. Multiple orchestrations are mandatory
- D. Only RPA can run in parallel

**Correct answer:** Orchestration allows parallel steps within a stage, and the stage completes only when both finish

## Q39 (m8_q381)
**Question:** One option says: 'In case of error, it is best to cancel the whole orchestration without recording any status information.' Why is that inappropriate?

- A. Because it is not technically possible
- B. Because it loses traceability; it is better to record status, allow resume, and maintain history
- C. Because errors never occur
- D. Because RPA always manages errors

**Correct answer:** Because it loses traceability; it is better to record status, allow resume, and maintain history

## Q40 (m8_q382)
**Question:** AnyAirlines wants to apply processes to evolve over time, keeping version history. Which combination is more aligned?

- A. Apex hard-coded
- B. Versioned Flows and Orchestrations, with careful migration between versions
- C. Local Scripts
- D. Emails only

**Correct answer:** Versioned Flows and Orchestrations, with careful migration between versions

## Q41 (m8_q383)
**Question:** One option suggests building all process logic in Apex and leaving Orchestration as an empty shell. Why does that not reflect the focus of the module?

- A. Because Apex is not supported
- B. Because Flow Orchestrator should coordinate the process, and Apex should be used only when needed
- C. Because Orchestration cannot call Apex actions
- D. Because the exam does not consider Apex

**Correct answer:** Because Flow Orchestrator should coordinate the process, and Apex should be used only when needed

## Q42 (m8_q384)
**Question:** NTO wants to use Orchestration, but also needs to call MuleSoft APIs at certain points in the process. What is the recommended architecture?

- A. Orchestration calls Flows, which use External Services or HTTP Callout to consume APIs
- B. Orchestration directly calls the database
- C. APIs must always call Orchestration
- D. RPA replaces all APIs

**Correct answer:** Orchestration calls Flows, which use External Services or HTTP Callout to consume APIs

## Q43 (m8_q385)
**Question:** One question presents a process that is already well served by a Record-Triggered Flow and a few simple automations. One option suggests migrating everything to Orchestration just because it is new. How should this be evaluated?

- A. Adopt Orchestration anyway to standardize on the newest tool
- B. Recognize this as overengineering; use Orchestration only when there is a clear benefit such as long duration, multiple stages, or human work
- C. Move to Orchestration mainly because monitoring will look cleaner
- D. Migrate first and decide later whether the process needed orchestration

**Correct answer:** Recognize this as overengineering; use Orchestration only when there is a clear benefit such as long duration, multiple stages, or human work

## Q44 (m8_q386)
**Question:** AnyAirlines wants the process to pause and route work to an analysis queue if the inventory check API fails. How can this be modeled?

- A. Do not record the failure
- B. Use a Background Step that calls a Flow, handles the failure, and routes the Work Item to the appropriate queue
- C. Log the issue only
- D. Use only RPA

**Correct answer:** Use a Background Step that calls a Flow, handles the failure, and routes the Work Item to the appropriate queue

## Q45 (m8_q387)
**Question:** The final alternate states: “Flow Orchestration completely replaces the need for RPA, Composer and APIs in any hyperautomation scenario.” What answer is more aligned?

- A. Agreement; Orchestration is enough for everything
- B. Disagree; Orchestration coordinates processes, but still depends on Flows, APIs, RPA and Composer to perform specialized tasks
- C. Agreement only for internal processes
- D. Depends on the volume

**Correct answer:** Disagree; Orchestration coordinates processes, but still depends on Flows, APIs, RPA and Composer to perform specialized tasks
