# Prova 2 - Modulo 2

Use este arquivo como treino rapido do modulo.

1. AnyAirlines is evaluating several candidate processes for RPA. Which combination best fits the Evaluation phase output in RPA Manager?
   A) A list of UI selectors for each button
   B) A scorecard showing automation fitness and expected ROI
   C) A deployment package for production agents
   D) A log of all bot executions

2. A scenario lists the following order: Build → Evaluation → Production → Test. What is the correct lifecycle sequence in MuleSoft RPA?
   A) Design → Evaluation → Test → Build → Production
   B) Evaluation → Design → Build → Test → Production
   C) Evaluation → Build → Design → Production → Test
   D) Design → Build → Production → Test → Evaluation

3. NTO wants to understand that the workflow implemented in Builder matches the business process diagram. Which standard and phase are most relevant?
   A) BPMN diagram created in the Design phase
   B) JSON schema generated during Build
   C) Swagger definition imported into RPA Manager
   D) ER diagram of the database

4. A candidate solution jumps directly from Recorder output to Production without modifications. Why is this generally wrong?
   A) Recorder already optimizes selectors for all systems
   B) Recorder only generates a skeleton and requirements refining in Builder
   C) Recorder cannot store any actions
   D) Recorder automatically handsles all errors

5. A process automates a web application that changes CSS classes frequently but keeps HTML IDs stable. What is the recommended selector strategy?
   A) Use image-based recognition only
   B) Use stable object-based selectors like IDs or robust XPaths
   C) Use random wait times and screen coordinates
   D) Use manual keyboard navigation only

6. A legacy desktop app has no accessible object model and uses fixed-position buttons. Which two techniques are most likely for RPA to interact with it?
   A) Object-based selectors on HTML elements
   B) Image-based recognition and coordinate-based clicks
   C) Direct SQL access to the backend database
   D) External Services in Salesforce Flow

7. A scenario describes OCR being used to read text from scanned PDFs before entering data into an ERP. Where does this capacity typically live in MuleSoft RPA?
   A) In RPA Manager dashboards
   B) In Builder activities that support OCR engines
   C) In Anypoint Monitoring only
   D) In Salesforce Flow Fault paths

8. During testing, a bot fails when a desktop window takes longer than usual to appear. Which adjustment is most appropriate?
   A) Shorten waits aggressively and rely on retries to compensate
   B) Increase the timeout and capture screenshots on failure for analysis
   C) Replace desktop automation with Composer even though the issue is UI timing
   D) Run the bot only during off-hours so slow windows are less likely

9. NTO wants to distinguish between technical errors (window not found) and business exceptions (invalid ID) in reports. How would the process be designed?
   A) Treat all errors as business exceptions
   B) Use dedicated error handling blocks and raise specific business exceptions for data issues
   C) Ignore exceptions and again on logs only
   D) Let the operating system classify errors automatically

10. A process frequently fails because the target application was updated and a button label changed slightly. Which practice best minimizes future maintenance effort?
   A) Use generic selectors based on window position only
   B) Use robust selectors focusing on stable attributes instead of visible text
   C) Re-record the entry process after every minor change
   D) Abort automation and switch to manual processing

11. A candidate suggests running RPA bots only in attended mode on users' desktops for all critical processes. Which downside does the exam expect you to recognize?
   A) Attended mode cannot use Credential Manager
   B) Attended bots cannot access web applications
   C) It reduces scale and breaks the idea of fully automated, scheduled runs
   D) It removes the ability to log errors

12. A banking process must run at night without any human present, accessing multiple secure systems. Which combination is most aligned with best practices?
   A) Attended bots with passwords typed by operators
   B) Secure Session plus Credential Manager with scheduled execution
   C) Local scripts storing passwords in plain text
   D) Manual night shifts by staff

13. The scenario describes heavy reuse of the same sub-workflow across several RPA processes (for example, open SAP session). How would this be handled?
   A) Duplicate the activities in every process
   B) Create a reusable component and share it as an RPA asset
   C) Implementation it separately in each bot without documentation
   D) Move this logic full into Salesforce Flow

14. A candidate process is being considered mainly because it touches many systems and looks attractive to the RPA team, but it has low volume and unclear rules. What is the recommended decision?
   A) Approve it because touching many systems usually indicates strategic value
   B) Reject it or postpone it until the process is standardized and the value is clear
   C) Automate only the most visible steps first and evaluate the rest later
   D) Split it into multiple bots before the process has been standardized

15. A question contrasts “record-and-playback only” with “structured workflow designed in Builder using BPMN concepts and parameters”. Which option better represent a production-ready approach?
   A) Record-and-playback only, because it's fast
   B) Structured Builder workflow aligned with BPMN design and parameterized data
   C) Manual execution without any automation
   D) Only scripting in external tools, without RPA platform
