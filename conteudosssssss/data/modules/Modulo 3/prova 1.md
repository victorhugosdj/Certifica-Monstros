---
# 📝 Prova 1 – Módulo 3: Fundamentos de MuleSoft Composer
---

1. AnyAirlines wants a no‑code integration that creates a record in SAP whenever a new Opportunity is closed in Salesforce. Which trigger should be used in Composer?
   A. Scheduler trigger  
   B. System event trigger on Salesforce  
   C. HTTP Listener trigger  
   D. Manual run only  

2. Northern Trail Outfitters (NTO) needs a flow that runs every night at 02:00 to sync inventory from Google Sheets into Salesforce. Which trigger is most appropriate?
   A. System event trigger on Google Sheets  
   B. Scheduler trigger configured for 02:00  
   C. HTTP Listener triggered by an external system  
   D. No trigger; Composer does not support schedules  

3. A scenario states: “Business admins must configure integrations between Salesforce, Slack and ServiceNow without writing code.” Which tool is the exam most likely expecting?
   A. Anypoint Studio  
   B. MuleSoft Composer  
   C. Salesforce Apex  
   D. MuleSoft RPA Builder  

4. NTO wants to minimize unnecessary data transfer when using Composer to query ServiceNow. What is the recommended practice?
   A. Always select all fields  
   B. Select only the fields relevant for the flow  
   C. Use SOQL to filter fields  
   D. Move filtering to RPA  

5. A flow needs to process every line in a collection returned from Workday. Which Composer element should be used?
   A. If/Else only  
   B. For Each loop  
   C. Separate flows for each item  
   D. Multiple HTTP Listeners  

6. A candidate solution maps a single record from Salesforce directly into a list field in another system, without iteration. What problem is most likely?
   A. Composer will silently fix the mapping  
   B. Only the first item will be processed or the mapping will fail  
   C. All records will be processed correctly  
   D. Composer will automatically create a For Each  

7. A scenario describes the need to concatenate first name and last name into a single “FullName” field inside Composer. Where should this be done?
   A. In an external API only  
   B. In the Formula Editor using string functions  
   C. In RPA before sending to Composer  
   D. Directly in the database  

8. A business user needs to add 30 days to the current date to calculate a due date. Which category of Composer functions is most relevant?
   A. Text functions only  
   B. Date functions such as ADD_DAYS  
   C. Math functions only  
   D. Security functions  

9. AnyAirlines wants to test a Composer flow that is triggered by a new record in Salesforce. What is the correct way to use Test Mode?
   A. Activate Test Mode and perform the real triggering action within the time window  
   B. Click “Run” without providing any data  
   C. Test Mode is not available for event‑based triggers  
   D. Use only mocked systems; real data is not allowed  

10. A scenario explains that Composer Test Mode uses real systems and can create real records. What is the main implication for the exam?
    A. It is safe to use in production with any data  
    B. Test Mode must be used only in non‑production orgs or with test data  
    C. Test Mode uses only mock data  
    D. Test Mode cannot show run history  

11. A flow fails when calling an external system due to a missing required field. What is the expected behavior of Composer?
    A. It retries automatically with different field values  
    B. It stops at the failing step and marks the run as failed  
    C. It skips the step and continues silently  
    D. It fixes the field mapping automatically  

12. NTO wants to understand what data passed through each step of a failed run. Where should they look?
    A. In the operating system event viewer  
    B. In Composer Run History, inspecting data pills for each step  
    C. In Anypoint Studio logs  
    D. Only in Salesforce debug logs  

13. A candidate claims that Composer can replace all Anypoint APIs because it can call any system. Why is this not aligned with best practices?
    A. Composer cannot call any external system  
    B. Composer is intended for simpler, low‑to‑medium complexity integrations, not full API‑led architectures  
    C. Anypoint APIs cannot be reused  
    D. Exams do not consider Composer a valid tool  

14. A scenario requires Composer to be invoked from an external, custom web application on demand. Which trigger should be used?
    A. System event trigger  
    B. Scheduler trigger  
    C. HTTP Listener trigger  
    D. No trigger, only manual run  

15. A business admin asks which environment is recommended to build and test new Composer flows before moving to production. What is the best answer?
    A. Directly in the production org  
    B. In a sandbox or dedicated non‑production environment  
    C. In any org, there is no difference  
    D. In a local file system  
