# Module 6 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 6.md.

## Q01 (m6_q253)
**Question:** AnyAirlines wants real-time visibility on response time, error rate, and CPU usage of APIs that support a hyperautomation flow. Which component is more appropriate?

- A. Anypoint Studio
- B. Anypoint Monitoring
- C. Designer API
- D. RPA Manager

**Correct answer:** Anypoint Monitoring

## Q02 (m6_q254)
**Question:** Northern Trail Outfitters (NTO) needs to quickly search logs from a specific API to understand why a Salesforce Flow received a 500 error. What resource should be used?

- A. Log Search at Anypoint Monitoring
- B. Only local log files on server
- C. End-user emails
- D. Browser Console

**Correct answer:** Log Search at Anypoint Monitoring

## Q03 (m6_q255)
**Question:** One scenario describes dashboards with error charts, latency, and throughput for the credit APIs. What functionality is being used?

- A. Anypoint Monitoring Custom Dashboards
- B. API Notebook
- C. Exchange Portal
- D. Visualforce Reports

**Correct answer:** Anypoint Monitoring Custom Dashboards

## Q04 (m6_q256)
**Question:** A company needs to apply security and traffic control policies (Rate Limiting, Client ID Enforcement) to existing APIs. Which component is responsible?

- A. Runtime Manager
- B. API Manager
- C. Anypoint Studio
- D. RPA Manager

**Correct answer:** API Manager

## Q05 (m6_q257)
**Question:** A question presents two endpoint options: Basic Endpoint and Proxy Endpoint. Why would someone choose Proxy Endpoint?

- A. To avoid monitoring
- B. To put a proxy layer in front of the API and apply policies without changing the original code
- C. Because Basic Endpoint does not support HTTP
- D. Because Proxy only works with CloudHub

**Correct answer:** To put a proxy layer in front of the API and apply policies without changing the original code

## Q06 (m6_q258)
**Question:** NTO wants to protect critical APIs exposed to tools like Flow and Composer, requiring each consumer to identify itself. Which policy should be used?

- A. IP Whitelisting
- B. Client ID Enforcement
- C. Rate Limiting only
- D. None; just use HTTP

**Correct answer:** Client ID Enforcement

## Q07 (m6_q259)
**Question:** A scenario talks about limiting requests to prevent a poor configured Composer from taking down a legacy system. What policy does that serve?

- A. Client ID Enforcement
- B. Rate Limiting / Throttling
- C. IP Whitelisting
- D. JWT Validation

**Correct answer:** Rate Limiting / Throttling

## Q08 (m6_q260)
**Question:** A company wants to ensure that only IP addresses from Salesforce infrastructure can access a given API. Which policy should be applied?

- A. SLA Tiers
- B. IP Whitelisting
- C. COLORS
- D. Retry Policy

**Correct answer:** IP Whitelisting

## Q09 (m6_q261)
**Question:** AnyAirlines wants to see a visual map showing how APIs connect to each other in their ecosystem. Which resource is more appropriate?

- A. Viewer
- B. Functional Monitoring
- C. Exchange Docs
- D. Designer API

**Correct answer:** Viewer

## Q10 (m6_q262)
**Question:** A question describes periodic automated tests that call APIs to verify not only availability but also correct responses. What is being described?

- A. Unit tests in Studio
- B. Functional Monitoring
- C. Server logs
- D. Health System Check

**Correct answer:** Functional Monitoring

## Q11 (m6_q263)
**Question:** NTO needs to see, in one place, logs of all Mule applications to facilitate troubleshooting across flows involving multiple APIs. What advantage of Anypoint Monitoring is being highlighted?

- A. Local logs in each worker
- B. Log Centralization with Log Search
- C. CPU dashboards only
- D. Notebook API Only

**Correct answer:** Log Centralization with Log Search

## Q12 (m6_q264)
**Question:** An alternate states that “API Manager completely replaces Anypoint Monitoring”. How would this be evaluated?

- A. Correct.
- B. Wrong; API Manager governments endpoints and policies, Monitoring focuses on observation and metrics
- C. True only in CloudHub
- D. True only on-premises

**Correct answer:** Wrong; API Manager governments endpoints and policies, Monitoring focuses on observation and metrics

## Q13 (m6_q265)
**Question:** A team wants to be automatically notified by Slack when the error rate of an API exceeds a certain limit. What functionality is used?

- A. Anypoint Monitoring Alerts
- B. Local logs only
- C. API Designer comments
- D. RPA email step

**Correct answer:** Anypoint Monitoring Alerts

## Q14 (m6_q266)
**Question:** A scenario shows that Flow receives “Too Many Requests” (429) from a managed API. What does that probably indicate?

- A. Authentication error
- B. Rate Limiting or SLA Policy applied in API Manager
- C. Hardware failure
- D. DNS failure

**Correct answer:** Rate Limiting or SLA Policy applied in API Manager

## Q15 (m6_q267)
**Question:** One candidate says that internal APIs do not need monitoring, only public ones. What view is aligned with the exam?

- A. Correct; only public-facing APIs require monitoring
- B. Mistake; Internal APIs are critical in hyperautomation chains and should be monitored
- C. It depends on whether the API is customer-facing
- D. Only user-facing automation tools such as RPA need monitoring

**Correct answer:** Mistake; Internal APIs are critical in hyperautomation chains and should be monitored

## Q16 (m6_q268)
**Question:** AnyAirlines notices that the response time of an API has greatly increased, but worker CPU usage is low. Which conclusion is more likely?

- A. Problem with API infrastructure
- B. Destination system problem (e.g. slow database)
- C. API Manager Failed
- D. Network failure between CloudHub and internet

**Correct answer:** Destination system problem (e.g. slow database)

## Q17 (m6_q269)
**Question:** Northern Trail Outfitters (NTO) constantly sees CPU at 100% for a critical API. Which action is more aligned?

- A. Throttle all consumers first, even if the demand is legitimate
- B. Increase vCores or the number of workers (vertical/horizontal scaling)
- C. Reduce logging detail to free runtime resources
- D. Wait until users report errors before scaling

**Correct answer:** Increase vCores or the number of workers (vertical/horizontal scaling)

## Q18 (m6_q270)
**Question:** A hyperautomation stream starts in Salesforce Flow, calls for a MuleSoft API, which in turn calls for a legacy system. Flow gets 500. Where would the team look first?

- A. Flow Logs Only
- B. Log Search in Anypoint Monitoring to understand error at API level
- C. End user logs only
- D. DNS Settings

**Correct answer:** Log Search in Anypoint Monitoring to understand error at API level

## Q19 (m6_q271)
**Question:** In one scenario, RPA and Composer consume the same stock API. Suddenly, the legacy system begins to stop. Which combination is more appropriate?

- A. Scale only RPA
- B. Apply Rate Limiting/SLA Tiers and, if necessary, adjust backend capacity
- C. Disable monitoring
- D. Allow unrestricted traffic

**Correct answer:** Apply Rate Limiting/SLA Tiers and, if necessary, adjust backend capacity

## Q20 (m6_q272)
**Question:** NTO wants to differentiate infrastructure problems (CPU/memory) from application problems. What set of views help?

- A. Local logs only
- B. Infra + Application metric Dashboards in Anypoint Monitoring
- C. CPU graphics only
- D. Requests only count

**Correct answer:** Infra + Application metric Dashboards in Anypoint Monitoring

## Q21 (m6_q273)
**Question:** A graph shows the error rate increasing along with latency while CPU remains low. What does that suggest?

- A. API infrastructure bottleneck
- B. Bottleneck in the destination system or an external dependency
- C. RPA error
- D. DNS problem

**Correct answer:** Bottleneck in the destination system or an external dependency

## Q22 (m6_q274)
**Question:** A company wants to proactively detect when a critical API has stopped responding to a specific scenario before users complain. What resource to use?

- A. Functional Monitoring with scheduled tests
- B. Log Console Only
- C. Only high CPU alerts
- D. Only occasional manual tests

**Correct answer:** Functional Monitoring with scheduled tests

## Q23 (m6_q275)
**Question:** AnyAirlines observes traffic peaks generated by a rich configured Flow, causing batch failures. What more mature response?

- A. Disable Flow without parsing
- B. Adjust Flow design and in parallel configure Rate Limiting and Alerts
- C. Duplicate API
- D. Ignore, wait for volume to drop

**Correct answer:** Adjust Flow design and in parallel configure Rate Limiting and Alerts

## Q24 (m6_q276)
**Question:** NTO needs to investigate a specific case where an order failed in an API chain. Which approach is more efficient?

- A. Ask the user for screen prints
- B. Correlate logs of the execution of that request via Anypoint Monitoring
- C. Uninstall API
- D. Read all logs every day manually

**Correct answer:** Correlate logs of the execution of that request via Anypoint Monitoring

## Q25 (m6_q277)
**Question:** One RPA botfires thousands of calls, generating 429 errors. What does this indicate and which action best combinations?

- A. Indicates authentication problem; exchange credentials
- B. Indicates break of Rate Limit; review bot policy and call pattern
- C. Indicates API is offline
- D. DNS error indications

**Correct answer:** Indicates break of Rate Limit; review bot policy and call pattern

## Q26 (m6_q278)
**Question:** One candidate states: 'It is not necessary to set up alerts, because the team checks dashboards every day.' How does the exam tend to evaluate that?

- A. Correct
- B. Limited; automatic alerts are essential to respond quickly to incidents
- C. Valid only in production
- D. Enough for critical environments

**Correct answer:** Limited; automatic alerts are essential to respond quickly to incidents

## Q27 (m6_q279)
**Question:** A scenario shows that an API is up, but calls to a specific endpoint fail. What combination of resources helps with the analysis?

- A. Worker status only
- B. Detailed logs and Functional Monitoring for that endpoint
- C. CPU dashboards only
- D. RPA logs only

**Correct answer:** Detailed logs and Functional Monitoring for that endpoint

## Q28 (m6_q280)
**Question:** AnyAirlines wants to reduce the MTTR (Mean Time To Solve) to integration failures. Which practice is more aligned?

- A. Rely on user emails and support tickets
- B. Configure clear monitoring, alerts, and dashboards for key APIs
- C. Scale workers whenever an alert appears, before diagnosis
- D. Reduce logging to simplify the platform

**Correct answer:** Configure clear monitoring, alerts and dashboards for key APIs

## Q29 (m6_q281)
**Question:** A team observes that failures began right after a deployment. What should be evaluated in Monitoring?

- A. No metrics, because some instability is expected
- B. Compare metrics before and after the deploy (errors, latency, throughput)
- C. Local logs only
- D. Only the number of workers

**Correct answer:** Compare metrics before and after the deploy (errors, latency, throughput)

## Q30 (m6_q282)
**Question:** One option suggests that to solve performance problems, the best strategy is always to add more vCores without analyzing detailed metrics. How should this be seen?

- A. Correct in all cases
- B. Misleading; you must first identify whether the bottleneck is in the application, infrastructure, or destination system
- C. Acceptable only on-premises
- D. Acceptable only in CloudHub

**Correct answer:** Misleading; you must first identify whether the bottleneck is in the application, infrastructure, or destination system

## Q31 (m6_q283)
**Question:** AnyAirlines wants to ensure that integrations from different teams do not bring down a legacy system via APIs. Which combination best reflections the recommended approach?

- A. No limitations; relying on teams
- B. Apply Rate Limiting/SLA policies and monitor with dashboards and alerts
- C. Disable all integrations
- D. Use only RPA

**Correct answer:** Apply Rate Limiting/SLA policies and monitor with dashboards and alerts

## Q32 (m6_q284)
**Question:** One option suggests exposing internal APIs without authentication to simplify access by RPA and Flow. Why is that a bad practice?

- A. Because internal APIs cannot be used
- B. Because it ignores basic security; policies like Client ID Enforcement are recommended
- C. Because authentication APIs don't work with Flow
- D. Because Anypoint Monitoring does not support internal APIs

**Correct answer:** Because it ignores basic security; policies like Client ID Enforcement are recommended

## Q33 (m6_q285)
**Question:** NTO has multiple critical APIs chained into a hyperautomation process. What best represents a mature strategy?

- A. Monitor only the last API in the chain and infer the rest
- B. Monitor the main APIs and apply policies with awareness of each dependency's impact
- C. Reduce observability on intermediate APIs to save cost
- D. Rely only on RPA or front-end monitoring to detect failures

**Correct answer:** Monitor the main APIs and apply policies with awareness of each dependency's impact

## Q34 (m6_q286)
**Question:** A new external client needs access to an API. What is the expected flow on the MuleSoft platform?

- A. The client accesses the API portal, requests access, and receives an approved Client ID and Secret
- B. The client receives direct access to the backend
- C. The client calls the API without authentication
- D. The client needs an administrative user in Anypoint Platform

**Correct answer:** Client accesses API Portal, requests access and receipts Client ID/Secret approved

## Q35 (m6_q287)
**Question:** A candidate chooses an option that says: “To avoid limits, it is best to remove Rate Limiting from APIs that support RPA and Flows”. How would this be read?

- A. Correct; limits hinder automations
- B. Trick; limits protection systems and help maintain stability
- C. Correct for internal systems only
- D. Correct if there are too many consumers

**Correct answer:** Trick; limits protection systems and help maintain stability

## Q36 (m6_q288)
**Question:** AnyAirlines wants to apply different consumer rules to Gold, Silver and Bronze customers. Which functionality fits best?

- A. IP Whitelisting
- B. SLA-Based Policies in API Manager
- C. Static Limiting Rate Only
- D. Logs Only

**Correct answer:** SLA-Based Policies in API Manager

## Q37 (m6_q289)
**Question:** One option suggests creating duplicate copies of an API to separate internal and external traffic instead of using policies and management. Why is this usually wrong?

- A. Because you can't have more than one API
- B. Because duplication increases complexity and decreases reuse, rather than using appropriate governance
- C. Because policies don't work on internal APIs
- D. Because only RPA can use internal APIs

**Correct answer:** Because duplication increases complexity and decreases reuse, rather than using appropriate governance

## Q38 (m6_q290)
**Question:** NTO wants critical API incidents to be quickly reported to the correct teams. Which combination is more aligned?

- A. Dashboards reviewed manually every morning
- B. Alerts configured in Channel-integrated Monitoring email or Slack
- C. Depend on customers to report incidents
- D. Weekly incident summary meeting

**Correct answer:** Alerts configured in Channel-integrated Monitoring email or Slack

## Q39 (m6_q291)
**Question:** An issue shows that an API is configured as Basic Endpoint, directly in runtime. In what situation does Proxy Endpoint make more sense?

- A. When no policy is soight
- B. When you want to put a proxy between consumer and backend, without touching the original API code
- C. When you want to remove monitoring
- D. When API is in beta

**Correct answer:** When you want to put a proxy between consumer and backend, without touching the original API code

## Q40 (m6_q292)
**Question:** One candidate proposes disabling detailed logs as a primary solution to performance problems without any analysis. Why is that a weak answer?

- A. Because logs never affect performance
- B. Because it treats symptoms blindly without understanding metrics or root causes
- C. Because Monitoring does not use logs
- D. Because API Manager ignores logs

**Correct answer:** Because it treats symptoms blindly without understanding metrics or root causes

## Q41 (m6_q293)
**Question:** AnyAirlines wants evidence that their architecture is health: stable times, few failures, applied policies. Which tool combination supports this view?

- A. Studio Only
- B. Anypoint Monitoring + API Manager (politics, analytics, SLAs)
- C. Exchange Only
- D. RPA Manager only

**Correct answer:** Anypoint Monitoring + API Manager (politics, analytics, SLAs)

## Q42 (m6_q294)
**Question:** One alternate states: “The APIs are internal, there is no need for security policies or control of those who consume.” How could the candidate respond?

- A. Agree, because security is only for external APIs
- B. Disagree; even internal, critical APIs need governance and access control
- C. Depends on the network team
- D. True only in Sandbox

**Correct answer:** Disagree; even internal, critical APIs need governance and access control

## Q43 (m6_q295)
**Question:** NTO wants a quick way to view, in production, who is consuming each API and what volume per consumer. What component helps?

- A. API Manager (analytics and consumer metrics)
- B. Studio
- C. Exchange
- D. Flow Builder

**Correct answer:** API Manager (analytics and consumer metrics)

## Q44 (m6_q296)
**Question:** A question shows a flow where Flow -> API -> legacy system. One answer suggests disabling Rate Limiting to reduce error peaks. What is the exam trying to test?

- A. That limits are always bad
- B. That removing Rate Limiting can worsen the problem and overload the legacy system
- C. That Flow does not support limits
- D. That APIs do not need protection

**Correct answer:** That removing Rate Limiting can worsen the problem and overload the legacy system

## Q45 (m6_q297)
**Question:** The final alternate says: “Good governance means never to touch policies or monitoring after the first configuration.” What is the vision of best practice?

- A. Correct; initial setting is enough
- B. Mistake; governance and monitoring are continued, adjusted according to use and incidents
- C. Correct only in production
- D. Correct only for internal APIs

**Correct answer:** Mistake; governance and monitoring are continued, adjusted according to use and incidents
