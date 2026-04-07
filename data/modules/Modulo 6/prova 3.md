# Prova 3 - Modulo 6

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants to ensure that integrations from different teams do not bring down a legacy system via APIs. Which combination best reflections the recommended approach?
   A) No limitations; relying on teams
   B) Apply Rate Limiting/SLA policies and monitor with dashboards and alerts
   C) Disable all integrations
   D) Use only RPA

2. One option suggests exposing internal APIs without authentication to simplify access by RPA and Flow. Why is that a bad practice?
   A) Because internal APIs cannot be used
   B) Because it ignores basic security; policies like Client ID Enforcement are recommended
   C) Because authentication APIs don't work with Flow
   D) Because Anypoint Monitoring does not support internal APIs

3. NTO has multiple critical APIs chained into a hyperautomation process. What best represents a mature strategy?
   A) Monitor only the last API in the chain and infer the rest
   B) Monitor the main APIs and apply policies with awareness of each dependency's impact
   C) Reduce observability on intermediate APIs to save cost
   D) Rely only on RPA or front-end monitoring to detect failures

4. A new external client needs access to an API. What is the expected flow on the MuleSoft platform?
   A) The client accesses the API portal, requests access, and receives an approved Client ID and Secret
   B) The client receives direct access to the backend
   C) The client calls the API without authentication
   D) The client needs an administrative user in Anypoint Platform

5. A candidate chooses an option that says: “To avoid limits, it is best to remove Rate Limiting from APIs that support RPA and Flows”. How would this be read?
   A) Correct; limits hinder automations
   B) Trick; limits protection systems and help maintain stability
   C) Correct for internal systems only
   D) Correct if there are too many consumers

6. AnyAirlines wants to apply different consumer rules to Gold, Silver and Bronze customers. Which functionality fits best?
   A) IP Whitelisting
   B) SLA-Based Policies in API Manager
   C) Static Limiting Rate Only
   D) Logs Only

7. One option suggests creating duplicate copies of an API to separate internal and external traffic instead of using policies and management. Why is this usually wrong?
   A) Because you can't have more than one API
   B) Because duplication increases complexity and decreases reuse, rather than using appropriate governance
   C) Because policies don't work on internal APIs
   D) Because only RPA can use internal APIs

8. NTO wants critical API incidents to be quickly reported to the correct teams. Which combination is more aligned?
   A) Dashboards reviewed manually every morning
   B) Alerts configured in Channel-integrated Monitoring email or Slack
   C) Depend on customers to report incidents
   D) Weekly incident summary meeting

9. An issue shows that an API is configured as Basic Endpoint, directly in runtime. In what situation does Proxy Endpoint make more sense?
   A) When no policy is soight
   B) When you want to put a proxy between consumer and backend, without touching the original API code
   C) When you want to remove monitoring
   D) When API is in beta

10. One candidate proposes disabling detailed logs as a primary solution to performance problems without any analysis. Why is that a weak answer?
   A) Because logs never affect performance
   B) Because it treats symptoms blindly without understanding metrics or root causes
   C) Because Monitoring does not use logs
   D) Because API Manager ignores logs

11. AnyAirlines wants evidence that their architecture is health: stable times, few failures, applied policies. Which tool combination supports this view?
   A) Studio Only
   B) Anypoint Monitoring + API Manager (politics, analytics, SLAs)
   C) Exchange Only
   D) RPA Manager only

12. One alternate states: “The APIs are internal, there is no need for security policies or control of those who consume.” How could the candidate respond?
   A) Agree, because security is only for external APIs
   B) Disagree; even internal, critical APIs need governance and access control
   C) Depends on the network team
   D) True only in Sandbox

13. NTO wants a quick way to view, in production, who is consuming each API and what volume per consumer. What component helps?
   A) API Manager (analytics and consumer metrics)
   B) Studio
   C) Exchange
   D) Flow Builder

14. A question shows a flow where Flow -> API -> legacy system. One answer suggests disabling Rate Limiting to reduce error peaks. What is the exam trying to test?
   A) That limits are always bad
   B) That removing Rate Limiting can worsen the problem and overload the legacy system
   C) That Flow does not support limits
   D) That APIs do not need protection

15. The final alternate says: “Good governance means never to touch policies or monitoring after the first configuration.” What is the vision of best practice?
   A) Correct; initial setting is enough
   B) Mistake; governance and monitoring are continued, adjusted according to use and incidents
   C) Correct only in production
   D) Correct only for internal APIs
