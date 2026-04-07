# Prova 1 - Modulo 8

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants to orchestrate a complete employee onboarding process across multiple stages and departments. Which component is more appropriate?
   A) A single simple Screen Flow
   B) Salesforce Flow Orchestration
   C) Only MuleSoft RPA
   D) Composer Only

2. Northern Trail Outfitters (NTO) needs to understand the basic structure of an orchestration. What is the correct hierarchy?
   A) Step → Stage → Orchestration
   B) Orchestration → Stages → Steps
   C) Stage → Orchestration → Steps
   D) Steps → Orchestration → Stages

3. In one scenario, an employee onboarding process is divided into Documentation, IT, and Training. How should this be modeled?
   A) Each activity as a separate Orchestration
   B) Stages representing each logical grouping
   C) Only Steps without Stages
   D) A single giant Step

4. The orchestration has stages that perform Autolaunched Flows without human interaction. What are these steps called?
   A) Interactive Steps
   B) Background Steps
   C) User Tasks
   D) Bot Tasks

5. A step requires a manager to approve a discount on a screen. What kind of Step is that?
   A) Background Step
   B) Interactive Step
   C) System Step
   D) Async Step

6. A scenario talks about “Work Items” that appear to users in a work queue, associating a specific Flow to be filled out. What does that represent?
   A) Application logs only
   B) Orchestration Work Items
   C) Platform Events
   D) Apex Jobs

7. NTO wants an interactive stage to be assigned to a group of approvers. What does Orchestration support?
   A) Assignment to individual users only
   B) Assignment to user, group, or queue
   C) Assignment to queues only
   D) Assignment only to the record owner

8. An exam scenario describes a process that can take days, with multiple actions at different times. Why is Flow Orchestration suitable here?
   A) Because it only runs in batch
   B) Because it manages long-running state, steps, and assignees
   C) Because it replaces APIs
   D) Because no other automation pattern can span time

9. In a Stage, two steps must take at the same time: HR prepares the contract and IT creates the email. How is this modeled?
   A) Sequential Steps within Stage
   B) Parallel steps within the same Stage, which only ends when both conclude
   C) Separate Orchestrations
   D) A single step with conditional logic

10. One candidate suggests using only isolated Flows for a process that requires coordination between multiple teams and spaced human tasks. Why can that be inefficient?
   A) Because standard Flows do not support autolaunched logic
   B) Because Orchestration provides an explicit model of stages, steps, and long-running work items
   C) Because Flows cannot call APIs
   D) Because Flows cannot show screens

11. AnyAirlines wants to ensure audit trail: who approved what, at which stage. What resource helps with that?
   A) Apex Logs Only
   B) Status and history of Orchestration Runs and Work Items
   C) Legacy system logs only
   D) Only saved emails

12. The same Orchestration will be used across several similar processes with small variations. What does the exam tend to value in that case?
   A) Create a whole new Orchestration for each variation
   B) Reuse orchestration and subflows where it makes sense, avoiding duplication
   C) Place all in Apex
   D) Use only RPA

13. NTO wants certain steps to be optional and others mandatory within a Stage. What defines the Stage conclusion?
   A) When any Step ends
   B) When all mandatory Steps end
   C) When the first user opens the Work Guide
   D) When the administrator manually marks it complete

14. An alternate says that “Flow Orchestration is just a new name for any Screen Flow”. How would this be evaluated?
   A) Correct.
   B) Wrong; Orchestration adds a multistage process layer, not just UI
   C) True only in Sandbox
   D) True only in production

15. A process described in the exam involves a short sequence, no human interaction, and fully synchronous execution. Which tool will probably be preferred instead of Orchestration?
   A) An autolaunched Flow
   B) A multistage Orchestration with stage tracking
   C) An RPA bot automating the user interface end to end
   D) A Composer flow coordinating several SaaS actions
