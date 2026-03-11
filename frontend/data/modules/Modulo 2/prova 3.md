---
# 📝 Prova 3 – Módulo 2: Erros, Segurança e Cenários de Prova
---

1. AnyAirlines reports that a bot suddenly stopped clicking the “Save” button in a web app after a browser update. What is the most appropriate first action?
   A. Rebuild the entire RPA process from scratch  
   B. Update the selector (XPath/locator) in RPA Builder and republish  
   C. Increase machine CPU and memory  
   D. Disable SSL in the browser  

2. An exam question describes “CPF inválido” being detected by the bot when validating input data. How should this failure be classified?
   A. Technical exception  
   B. Business exception  
   C. Network outage  
   D. Infrastructure failure  

3. A bot cannot find a window because the application server is down. What is the most appropriate handling?
   A. Treat as business exception and send to human review queue  
   B. Treat as technical exception and implement retry with exponential backoff  
   C. Ignore the error and continue processing  
   D. Ask the end‑user to fix it manually every time  

4. NTO wants to provide detailed evidence when a technical error occurs in production. Which design choice best supports troubleshooting?
   A. Disable all logs for performance  
   B. Capture screenshots and key context in error handling blocks  
   C. Store errors only in local text files on the bot machine  
   D. Send only a generic email without details  

5. A scenario describes bots using shared Windows accounts that multiple humans also know. Why is this problematic from an exam perspective?
   A. It prevents bots from running in Secure Session  
   B. It violates security and auditability; credentials should be managed centrally and not shared  
   C. It makes bots faster than allowed  
   D. It is required for Credential Manager  

6. A financial institution requires that no one, including developers, knows the actual passwords used by bots. Which RPA Manager feature should be emphasized?
   A. Logger configuration  
   B. Credential Manager with role‑based access  
   C. Local Windows registry keys  
   D. Recorder encryption  

7. During testing, a bot encounters invalid business data and raises a business exception, sending the case to a human analyst. What is the main benefit of this pattern?
   A. Hides technical problems from business users  
   B. Ensures that data issues are routed to the right human decision point  
   C. Reduces the need for monitoring  
   D. Guarantees that no manual work is ever needed  

8. A scenario states that multiple RPA processes must be moved from Test to Production while maintaining clear separation of environments. What is a recommended practice?
   A. Use the same credentials and endpoints in all stages  
   B. Configure distinct environments and lifecycles for Test and Production in RPA Manager  
   C. Only test directly in Production  
   D. Run Test and Production on the same Windows session  

9. NTO sees that some robots occasionally fail due to temporary network issues. Which combination best aligns with robust error handling?
   A. Immediate permanent failure on first error  
   B. Retry with exponential backoff and escalation if threshold is exceeded  
   C. Infinite retries without alerting anyone  
   D. Manual restart only, without any automation  

10. An exam option suggests that “Secure Session requires a human to stay logged into Windows”. Why is this option incorrect?
    A. Secure Session is only for Linux  
    B. Secure Session creates its own virtual session and does not need a logged‑in user  
    C. Secure Session disables bot execution  
    D. Secure Session is only for Composer  

11. A company wants to ensure that only authorized operations staff can restart failed bot runs. Where should this control be configured?
    A. In local Windows user accounts only  
    B. In RPA Manager roles and permissions  
    C. In the browser cache  
    D. In Composer project settings  

12. A scenario shows a process where UI changes frequently and APIs are available. The option proposes using RPA instead of APIs. Why is this likely a “trap” answer?
    A. RPA cannot interact with UIs  
    B. Best practice prefers API‑based integrations when usable, keeping RPA for no‑API cases  
    C. APIs are always slower than RPA  
    D. Exams never mention RPA  

13. An exam case describes an overnight batch bot that processes thousands of records. What is the most important monitoring consideration?
    A. Manual checking of each desktop in the morning  
    B. Centralized logging and dashboards in RPA Manager (and Anypoint Monitoring if APIs are involved)  
    C. Relying on users to report problems only  
    D. Disabling all alerts to avoid noise  

14. NTO wants to avoid running more parallel bots than licensed or than the machine can support. What should be configured?
    A. API rate limiting only  
    B. Proper RPA Agent capacity and scheduling aligned with license and hardware  
    C. More Screen Flows in Salesforce  
    D. Extra manual shifts  

15. A question offers the following four choices about handling errors in RPA:
    1) Ignore errors  
    2) Raise generic failures only  
    3) Separate technical and business exceptions with targeted handling  
    4) Stop using RPA  
    Which choice is most aligned with MuleSoft RPA best practices?
    A. 1 only  
    B. 2 only  
    C. 3 only  
    D. 4 only
