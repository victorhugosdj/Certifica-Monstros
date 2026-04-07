# Prova 3 - Modulo 2

Use este arquivo como treino rapido do modulo.

1. AnyAirlines reports that a bot suddenly stopped clicking the “Save” button in a web app after a browser update. What is the most appropriate first action?
   A) Rebuild the entire RPA process from scratch
   B) Update the selector (XPath/locator) in RPA Builder and republish
   C) Increase machine CPU and memory
   D) Disable SSL in the browser

2. An exam question describes an 'invalid CPF' being detected by the bot during input validation. How should this failure be classified?
   A) Technical exception
   B) Business exception
   C) Network outage
   D) Infrastructure failure

3. A bot cannot find a window because the application server is down. What's the most appropriate handling?
   A) Treat as business exception and send to human review queue
   B) Treat as a technical exception and implement retry with exponential backoff
   C) Ignore the error and continue processing
   D) Ask the end-user to fix it manually every time

4. NTO wants to provide detailed evidence when a technical error occurs in production. Which design choice best supports troubleshooting?
   A) Disable all logs for performance
   B) Capture screenshots and key context in error handling blocks
   C) Store errors only in local text files on the bot machine
   D) Send only a generic email without details

5. The scenario describes bots using shared Windows accounts that multiple humans also know. Why is this problem from an exam perspective?
   A) It prevents bots from running in Secure Session
   B) It violates security and accountability; credentials should be managed centrally and not shared
   C) It makes bots faster than allowed
   D) It is required for Credential Manager

6. A financial institution requires that no one, including developers, know the current passwords used by bots. Which RPA Manager feature should be emphasized?
   A) Logger configuration
   B) Credential Manager with role-based access
   C) Local Windows registry keys
   D) Recorder encryption

7. During testing, a bot encounters invalid business data and raises a business exception, sending the case to a human analysis. What is the main benefit of this pattern?
   A) Hides technical problems from business users
   B) Ensures that data issues are routed to the right human decision point
   C) Reduces the need for monitoring
   D) Guarantees that no manual work is ever needed

8. A scenario states that multiple RPA processes must be moved from Test to Production while maintaining clear separation of environments. What is a recommended practice?
   A) Use the same credentials and endpoints in all stages
   B) Configure distinctive environments and lifecycles for Test and Production in RPA Manager
   C) Only test directly in Production
   D) Run Test and Production on the same Windows session

9. NTO sees that some robots occasionally fail due to temporary network issues. Which combination best aligns with robust error handling?
   A) Immediate permanent failure on first error
   B) Retry with exponential backoff and escalate if a threshold is exceeded
   C) Infinite retreats without alerting anyone
   D) Manual restore only, without any automation

10. An exam option suggests that “Secure Session requires a human to stay logged into Windows”. Why is this option incorrect?
   A) Secure Session is only for Linux
   B) Secure Session creates its own virtual session and does not need a logged-in user
   C) Secure Session disabled bot execution
   D) Secure Session is only for Composer

11. A company wants to ensure that only authorised operations staff can restore failed bot runs. Where would this control be configured?
   A) In local Windows user accounts only
   B) In RPA Manager roles and permissions
   C) In the browser cache
   D) In Composer project settings

12. A scenario shows a process where the UI changes frequently but APIs are available. Why is choosing RPA over APIs usually the weaker answer?
   A) RPA is better because UI selectors usually adapt more easily than APIs change
   B) Best practice favors API-based integrations when available, reserving RPA for no-API cases
   C) APIs are usually preferable only for external systems, not internal ones
   D) RPA should be preferred whenever more than one system is involved

13. An exam case describes an overnight batch bot that processes thousands of records. What is the most important monitoring consideration?
   A) Manual checking of each desktop in the morning
   B) Centralized logging and dashboards in RPA Manager (and Anypoint Monitoring if APIs are involved)
   C) Relying on users to report problems only
   D) Disabling all alerts to avoid noise

14. NTO wants to avoid running more parallel bots than licensed or than the machine can support. What should be configured?
   A) API rate limiting only
   B) Proper RPA Agent capacity and scheduling aligned with license and hardware
   C) More Screen Flows in Salesforce
   D) Extra Manual Shifts

15. A question offers four statements about error handling in RPA, and only statement 2 follows best practices. Which answer should the candidate choose?
   A) 1 only
   B) 2 only
   C) 3 only
   D) 4 only
