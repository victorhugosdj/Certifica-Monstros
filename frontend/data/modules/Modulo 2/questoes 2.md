# Module 2 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 2.md.

## Q01 (m2_q1)
**Question:** AnyAirlines wants to automate a stable, repetitive back-office process currently executed by an operator in a legacy Windows application. There is in the API available. What is the most appropriate first technology choice?

- A. MuleSoft Composer with HTTP trigger
- B. MuleSoft RPA Builder creating the UI automation process
- C. Salesforce Flow with External Services
- D. Anypoint Platform Experience API only

**Correct answer:** MuleSoft RPA Builder creating the UI automation process

## Q02 (m2_q2)
**Question:** Northern Trail Outfitters (NTO) wants to decide whether a candidate process is suitable for RPA. Which characteristic is the strongest indication of a good fit?

- A. Process changes its steps every week
- B. Process is ad-hoc and creative
- C. Process is rule-based, high volume and stable over time
- D. Process is performed once per year by executions

**Correct answer:** Process is rule-based, high volume and stable over time

## Q03 (m2_q3)
**Question:** A question describes the Evaluation phase inside RPA Manager. What is the most efficient way to use this phase according to best practices?

- A. To configure attended robots on users’ desktops
- B. To estimate automation potential and business value before building
- C. To employment processes directly to production workers
- D. To record user clicks automatically

**Correct answer:** To estimate automation potential and business value before building

## Q04 (m2_q63)
**Question:** A company wants traceability of who approved which bot process and when it went to production. Which RPA Manager capacity is most relevant?

- A. Credential Manager
- B. Process Operations dashboards
- C. Lifecycle with stages like Evaluation, Design, Build, Test, Production
- D. Recorder exports

**Correct answer:** Lifecycle with stages like Evaluation, Design, Build, Test, Production

## Q05 (m2_q64)
**Question:** A scenario describes a new process that is still being redesigned by the business team and frequently changes the system steps. What is the best recommendation?

- A. Automate the current version immediately and accept frequent redesigns later
- B. Wait until the process is stable before committing to RPA
- C. Build the bot now and stabilize the business process after deployment
- D. Keep the process manual for the long term, even if it later becomes stable

**Correct answer:** Wait until the process is stable before committing to RPA

## Q06 (m2_q65)
**Question:** NTO needs to ensure that passwords used by bots are never visible to RPA developers. Which component should be enhanced in the answer?

- A. Local configuration files on the bot machine
- B. Credential Manager in RPA Manager
- C. Comments inside the workflow activities
- D. Environment variables on developers’ laptops

**Correct answer:** Credential Manager in RPA Manager

## Q07 (m2_q66)
**Question:** A candidate solution stores credentials in an Excel file read by the bot at runtime. Why is this not aligned with MuleSoft RPA best practices?

- A. Bots cannot read Excel files
- B. Excel files cannot be versioned
- C. Credentials must be stored securely and centrally in Credential Manager
- D. RPA Manager does not allow bots to access files

**Correct answer:** Credentials must be stored securely and centrally in Credential Manager

## Q08 (m2_q67)
**Question:** A bank wants to run multiple independent RPA processes in parallel on the same infrastructure to maximize ROI. Which concept is most relevant?

- A. Background Steps
- B. Workers in CloudHub
- C. RPA Agents configured to handle multiple processes
- D. Visualforce pages

**Correct answer:** RPA Agents configured to handle multiple processes

## Q09 (m2_q68)
**Question:** One scenario says: 'The bot must run even when no human is logged into Windows and no monitor is attached.' Which feature enables this behavior?

- A. Desktop recording mode
- B. Secure Session on the RPA Agent
- C. Only attended robots reported by users
- D. Composer test mode

**Correct answer:** Secure Session on the RPA Agent

## Q10 (m2_q69)
**Question:** A process is being moved from Test to Production in RPA Manager. What is the primary expectation before switching the lifecycle stage?

- A. The Recorder file compiles successively
- B. The process has at least one failure to validate logs
- C. The process executed successfully in a controlled test environment
- D. The process is regulated only once in sandbox

**Correct answer:** The process executed successfully in a controlled test environment

## Q11 (m2_q70)
**Question:** NTO wants to analyze savings and business impact of RPA automations. Which RPA Manager capability best supports this?

- A. UI Automation activities in Builder
- B. Analysis Dashboard (ROI and time savings)
- C. Recorder playback feature
- D. Local Windows Task Scheduler

**Correct answer:** Analysis Dashboard (ROI and time savings)

## Q12 (m2_q71)
**Question:** A candidate suggests using Composer instead of RPA for a legacy desktop application with no APIs but simple, low-volume usage. Which argument best supports choosing RPA instead?

- A. Composer does not support any SaaS connectors
- B. RPA is the only tool here that can interact through the UI when no API exists
- C. Composer cannot call HTTP endpoints
- D. RPA is always cheaper than Composer

**Correct answer:** RPA is the only tool here that can interact through the UI when no API exists

## Q13 (m2_q72)
**Question:** The scenario requires business or operations users to monitor bot health and restore failed items. Which interface should they primarily use?

- A. RPA Builder
- B. RPA Manager - Process Operations
- C. Anypoint Studio
- D. Local bot logs only

**Correct answer:** RPA Manager - Process Operations

## Q14 (m2_q73)
**Question:** A process candidate has extremely low volume but high financial impact and is performed monthly. What is the most appropriate guidance for the exam?

- A. Reject it because monthly execution never justifies automation
- B. Consider RPA only if the process is complex but stable and rules-based
- C. Prefer attended RPA because low frequency removes the need for structured design
- D. Route it to Composer because monthly cadence is the main deciding factor

**Correct answer:** Consider RPA only if the process is complex but stable and rules-based

## Q15 (m2_q74)
**Question:** A company wants to avoid building multiple RPA processes that log into the same system with different credentials and logic. Which practice best links with C4E and reuse?

- A. Duplicate login logic in every bot for flexibility
- B. Publish a shared login automation as an RPA asset in Exchange
- C. Force all teams to build their own logins from scratch
- D. Move all logins to unmanaged scripts outside RPA

**Correct answer:** Publish a shared login automation as an RPA asset in Exchange

## Q16 (m2_q75)
**Question:** AnyAirlines is evaluating several candidate processes for RPA. Which combination best fits the Evaluation phase output in RPA Manager?

- A. A list of UI selectors for each button
- B. A scorecard showing automation fitness and expected ROI
- C. A deployment package for production agents
- D. A log of all bot executions

**Correct answer:** A scorecard showing automation fitness and expected ROI

## Q17 (m2_q76)
**Question:** A scenario lists the following order: Build → Evaluation → Production → Test. What is the correct lifecycle sequence in MuleSoft RPA?

- A. Design → Evaluation → Test → Build → Production
- B. Evaluation → Design → Build → Test → Production
- C. Evaluation → Build → Design → Production → Test
- D. Design → Build → Production → Test → Evaluation

**Correct answer:** Evaluation → Design → Build → Test → Production

## Q18 (m2_q77)
**Question:** NTO wants to understand that the workflow implemented in Builder matches the business process diagram. Which standard and phase are most relevant?

- A. BPMN diagram created in the Design phase
- B. JSON schema generated during Build
- C. Swagger definition imported into RPA Manager
- D. ER diagram of the database

**Correct answer:** BPMN diagram created in the Design phase

## Q19 (m2_q78)
**Question:** A candidate solution jumps directly from Recorder output to Production without modifications. Why is this generally wrong?

- A. Recorder already optimizes selectors for all systems
- B. Recorder only generates a skeleton and requirements refining in Builder
- C. Recorder cannot store any actions
- D. Recorder automatically handsles all errors

**Correct answer:** Recorder only generates a skeleton and requirements refining in Builder

## Q20 (m2_q79)
**Question:** A process automates a web application that changes CSS classes frequently but keeps HTML IDs stable. What is the recommended selector strategy?

- A. Use image-based recognition only
- B. Use stable object-based selectors like IDs or robust XPaths
- C. Use random wait times and screen coordinates
- D. Use manual keyboard navigation only

**Correct answer:** Use stable object-based selectors like IDs or robust XPaths

## Q21 (m2_q80)
**Question:** A legacy desktop app has no accessible object model and uses fixed-position buttons. Which two techniques are most likely for RPA to interact with it?

- A. Object-based selectors on HTML elements
- B. Image-based recognition and coordinate-based clicks
- C. Direct SQL access to the backend database
- D. External Services in Salesforce Flow

**Correct answer:** Image-based recognition and coordinate-based clicks

## Q22 (m2_q81)
**Question:** A scenario describes OCR being used to read text from scanned PDFs before entering data into an ERP. Where does this capacity typically live in MuleSoft RPA?

- A. In RPA Manager dashboards
- B. In Builder activities that support OCR engines
- C. In Anypoint Monitoring only
- D. In Salesforce Flow Fault paths

**Correct answer:** In Builder activities that support OCR engines

## Q23 (m2_q82)
**Question:** During testing, a bot fails when a desktop window takes longer than usual to appear. Which adjustment is most appropriate?

- A. Shorten waits aggressively and rely on retries to compensate
- B. Increase the timeout and capture screenshots on failure for analysis
- C. Replace desktop automation with Composer even though the issue is UI timing
- D. Run the bot only during off-hours so slow windows are less likely

**Correct answer:** Increase the timeout and capture screenshots on failure for analysis

## Q24 (m2_q83)
**Question:** NTO wants to distinguish between technical errors (window not found) and business exceptions (invalid ID) in reports. How would the process be designed?

- A. Treat all errors as business exceptions
- B. Use dedicated error handling blocks and raise specific business exceptions for data issues
- C. Ignore exceptions and again on logs only
- D. Let the operating system classify errors automatically

**Correct answer:** Use dedicated error handling blocks and raise specific business exceptions for data issues

## Q25 (m2_q84)
**Question:** A process frequently fails because the target application was updated and a button label changed slightly. Which practice best minimizes future maintenance effort?

- A. Use generic selectors based on window position only
- B. Use robust selectors focusing on stable attributes instead of visible text
- C. Re-record the entry process after every minor change
- D. Abort automation and switch to manual processing

**Correct answer:** Use robust selectors focusing on stable attributes instead of visible text

## Q26 (m2_q85)
**Question:** A candidate suggests running RPA bots only in attended mode on users' desktops for all critical processes. Which downside does the exam expect you to recognize?

- A. Attended mode cannot use Credential Manager
- B. Attended bots cannot access web applications
- C. It reduces scale and breaks the idea of fully automated, scheduled runs
- D. It removes the ability to log errors

**Correct answer:** It reduces scale and breaks the idea of fully automated, scheduled runs

## Q27 (m2_q86)
**Question:** A banking process must run at night without any human present, accessing multiple secure systems. Which combination is most aligned with best practices?

- A. Attended bots with passwords typed by operators
- B. Secure Session plus Credential Manager with scheduled execution
- C. Local scripts storing passwords in plain text
- D. Manual night shifts by staff

**Correct answer:** Secure Session plus Credential Manager with scheduled execution

## Q28 (m2_q87)
**Question:** The scenario describes heavy reuse of the same sub-workflow across several RPA processes (for example, open SAP session). How would this be handled?

- A. Duplicate the activities in every process
- B. Create a reusable component and share it as an RPA asset
- C. Implementation it separately in each bot without documentation
- D. Move this logic full into Salesforce Flow

**Correct answer:** Create a reusable component and share it as an RPA asset

## Q29 (m2_q88)
**Question:** A candidate process is being considered mainly because it touches many systems and looks attractive to the RPA team, but it has low volume and unclear rules. What is the recommended decision?

- A. Approve it because touching many systems usually indicates strategic value
- B. Reject it or postpone it until the process is standardized and the value is clear
- C. Automate only the most visible steps first and evaluate the rest later
- D. Split it into multiple bots before the process has been standardized

**Correct answer:** Reject it or postpone it until the process is standardized and the value is clear

## Q30 (m2_q89)
**Question:** A question contrasts “record-and-playback only” with “structured workflow designed in Builder using BPMN concepts and parameters”. Which option better represent a production-ready approach?

- A. Record-and-playback only, because it's fast
- B. Structured Builder workflow aligned with BPMN design and parameterized data
- C. Manual execution without any automation
- D. Only scripting in external tools, without RPA platform

**Correct answer:** Structured Builder workflow aligned with BPMN design and parameterized data

## Q31 (m2_q90)
**Question:** AnyAirlines reports that a bot suddenly stopped clicking the “Save” button in a web app after a browser update. What is the most appropriate first action?

- A. Rebuild the entire RPA process from scratch
- B. Update the selector (XPath/locator) in RPA Builder and republish
- C. Increase machine CPU and memory
- D. Disable SSL in the browser

**Correct answer:** Update the selector (XPath/locator) in RPA Builder and republish

## Q32 (m2_q91)
**Question:** An exam question describes an 'invalid CPF' being detected by the bot during input validation. How should this failure be classified?

- A. Technical exception
- B. Business exception
- C. Network outage
- D. Infrastructure failure

**Correct answer:** Business exception

## Q33 (m2_q92)
**Question:** A bot cannot find a window because the application server is down. What's the most appropriate handling?

- A. Treat as business exception and send to human review queue
- B. Treat as a technical exception and implement retry with exponential backoff
- C. Ignore the error and continue processing
- D. Ask the end-user to fix it manually every time

**Correct answer:** Treat as technical exception and implement retry with exponential backoff

## Q34 (m2_q93)
**Question:** NTO wants to provide detailed evidence when a technical error occurs in production. Which design choice best supports troubleshooting?

- A. Disable all logs for performance
- B. Capture screenshots and key context in error handling blocks
- C. Store errors only in local text files on the bot machine
- D. Send only a generic email without details

**Correct answer:** Capture screenshots and key context in error handling blocks

## Q35 (m2_q94)
**Question:** The scenario describes bots using shared Windows accounts that multiple humans also know. Why is this problem from an exam perspective?

- A. It prevents bots from running in Secure Session
- B. It violates security and accountability; credentials should be managed centrally and not shared
- C. It makes bots faster than allowed
- D. It is required for Credential Manager

**Correct answer:** It violates security and accountability; credentials should be managed centrally and not shared

## Q36 (m2_q95)
**Question:** A financial institution requires that no one, including developers, know the current passwords used by bots. Which RPA Manager feature should be emphasized?

- A. Logger configuration
- B. Credential Manager with role-based access
- C. Local Windows registry keys
- D. Recorder encryption

**Correct answer:** Credential Manager with role-based access

## Q37 (m2_q96)
**Question:** During testing, a bot encounters invalid business data and raises a business exception, sending the case to a human analysis. What is the main benefit of this pattern?

- A. Hides technical problems from business users
- B. Ensures that data issues are routed to the right human decision point
- C. Reduces the need for monitoring
- D. Guarantees that no manual work is ever needed

**Correct answer:** Ensures that data issues are routed to the right human decision point

## Q38 (m2_q97)
**Question:** A scenario states that multiple RPA processes must be moved from Test to Production while maintaining clear separation of environments. What is a recommended practice?

- A. Use the same credentials and endpoints in all stages
- B. Configure distinctive environments and lifecycles for Test and Production in RPA Manager
- C. Only test directly in Production
- D. Run Test and Production on the same Windows session

**Correct answer:** Configure distinctive environments and lifecycles for Test and Production in RPA Manager

## Q39 (m2_q98)
**Question:** NTO sees that some robots occasionally fail due to temporary network issues. Which combination best aligns with robust error handling?

- A. Immediate permanent failure on first error
- B. Retry with exponential backoff and escalate if a threshold is exceeded
- C. Infinite retreats without alerting anyone
- D. Manual restore only, without any automation

**Correct answer:** Retry with exponential backoff and escalate if a threshold is exceeded

## Q40 (m2_q99)
**Question:** An exam option suggests that “Secure Session requires a human to stay logged into Windows”. Why is this option incorrect?

- A. Secure Session is only for Linux
- B. Secure Session creates its own virtual session and does not need a logged-in user
- C. Secure Session disabled bot execution
- D. Secure Session is only for Composer

**Correct answer:** Secure Session creates its own virtual session and does not need a logged-in user

## Q41 (m2_q100)
**Question:** A company wants to ensure that only authorised operations staff can restore failed bot runs. Where would this control be configured?

- A. In local Windows user accounts only
- B. In RPA Manager roles and permissions
- C. In the browser cache
- D. In Composer project settings

**Correct answer:** In RPA Manager roles and permissions

## Q42 (m2_q101)
**Question:** A scenario shows a process where the UI changes frequently but APIs are available. Why is choosing RPA over APIs usually the weaker answer?

- A. RPA is better because UI selectors usually adapt more easily than APIs change
- B. Best practice favors API-based integrations when available, reserving RPA for no-API cases
- C. APIs are usually preferable only for external systems, not internal ones
- D. RPA should be preferred whenever more than one system is involved

**Correct answer:** Best practice favors API-based integrations when available, reserving RPA for no-API cases

## Q43 (m2_q102)
**Question:** An exam case describes an overnight batch bot that processes thousands of records. What is the most important monitoring consideration?

- A. Manual checking of each desktop in the morning
- B. Centralized logging and dashboards in RPA Manager (and Anypoint Monitoring if APIs are involved)
- C. Relying on users to report problems only
- D. Disabling all alerts to avoid noise

**Correct answer:** Centralized logging and dashboards in RPA Manager (and Anypoint Monitoring if APIs are involved)

## Q44 (m2_q103)
**Question:** NTO wants to avoid running more parallel bots than licensed or than the machine can support. What should be configured?

- A. API rate limiting only
- B. Proper RPA Agent capacity and scheduling aligned with license and hardware
- C. More Screen Flows in Salesforce
- D. Extra Manual Shifts

**Correct answer:** Proper RPA Agent capacity and scheduling aligned with license and hardware

## Q45 (m2_q104)
**Question:** A question offers four statements about error handling in RPA, and only statement 2 follows best practices. Which answer should the candidate choose?

- A. 1 only
- B. 2 only
- C. 3 only
- D. 4 only

**Correct answer:** 2 only
