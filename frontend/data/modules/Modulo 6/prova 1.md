# Prova 1 - Modulo 6

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants real-time visibility on response time, error rate, and CPU usage of APIs that support a hyperautomation flow. Which component is more appropriate?
   A) Anypoint Studio
   B) Anypoint Monitoring
   C) Designer API
   D) RPA Manager

2. Northern Trail Outfitters (NTO) needs to quickly search logs from a specific API to understand why a Salesforce Flow received a 500 error. What resource should be used?
   A) Log Search at Anypoint Monitoring
   B) Only local log files on server
   C) End-user emails
   D) Browser Console

3. One scenario describes dashboards with error charts, latency, and throughput for the credit APIs. What functionality is being used?
   A) Anypoint Monitoring Custom Dashboards
   B) API Notebook
   C) Exchange Portal
   D) Visualforce Reports

4. A company needs to apply security and traffic control policies (Rate Limiting, Client ID Enforcement) to existing APIs. Which component is responsible?
   A) Runtime Manager
   B) API Manager
   C) Anypoint Studio
   D) RPA Manager

5. A question presents two endpoint options: Basic Endpoint and Proxy Endpoint. Why would someone choose Proxy Endpoint?
   A) To avoid monitoring
   B) To put a proxy layer in front of the API and apply policies without changing the original code
   C) Because Basic Endpoint does not support HTTP
   D) Because Proxy only works with CloudHub

6. NTO wants to protect critical APIs exposed to tools like Flow and Composer, requiring each consumer to identify itself. Which policy should be used?
   A) IP Whitelisting
   B) Client ID Enforcement
   C) Rate Limiting only
   D) None; just use HTTP

7. A scenario talks about limiting requests to prevent a poor configured Composer from taking down a legacy system. What policy does that serve?
   A) Client ID Enforcement
   B) Rate Limiting / Throttling
   C) IP Whitelisting
   D) JWT Validation

8. A company wants to ensure that only IP addresses from Salesforce infrastructure can access a given API. Which policy should be applied?
   A) SLA Tiers
   B) IP Whitelisting
   C) COLORS
   D) Retry Policy

9. AnyAirlines wants to see a visual map showing how APIs connect to each other in their ecosystem. Which resource is more appropriate?
   A) Viewer
   B) Functional Monitoring
   C) Exchange Docs
   D) Designer API

10. A question describes periodic automated tests that call APIs to verify not only availability but also correct responses. What is being described?
   A) Unit tests in Studio
   B) Functional Monitoring
   C) Server logs
   D) Health System Check

11. NTO needs to see, in one place, logs of all Mule applications to facilitate troubleshooting across flows involving multiple APIs. What advantage of Anypoint Monitoring is being highlighted?
   A) Local logs in each worker
   B) Log Centralization with Log Search
   C) CPU dashboards only
   D) Notebook API Only

12. An alternate states that “API Manager completely replaces Anypoint Monitoring”. How would this be evaluated?
   A) Correct.
   B) Wrong; API Manager governments endpoints and policies, Monitoring focuses on observation and metrics
   C) True only in CloudHub
   D) True only on-premises

13. A team wants to be automatically notified by Slack when the error rate of an API exceeds a certain limit. What functionality is used?
   A) Anypoint Monitoring Alerts
   B) Local logs only
   C) API Designer comments
   D) RPA email step

14. A scenario shows that Flow receives “Too Many Requests” (429) from a managed API. What does that probably indicate?
   A) Authentication error
   B) Rate Limiting or SLA Policy applied in API Manager
   C) Hardware failure
   D) DNS failure

15. One candidate says that internal APIs do not need monitoring, only public ones. What view is aligned with the exam?
   A) Correct; only public-facing APIs require monitoring
   B) Mistake; Internal APIs are critical in hyperautomation chains and should be monitored
   C) It depends on whether the API is customer-facing
   D) Only user-facing automation tools such as RPA need monitoring
