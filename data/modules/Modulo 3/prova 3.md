# Prova 3 - Modulo 3

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants to build a mission-critical, high-volume integration reused by many teams. One option is “implement everything in Composer”. Why is this likely wrong?
   A) Composer does not support SaaS connectors
   B) High-volume, reusable integrations belong in Anypoint APIs, not in Composer alone
   C) Composer cannot send HTTP requests
   D) Composer cannot be monitored

2. NTO wants business admins to quickly connect Salesforce and Slack for simple notifications without involving developers. Which combination is most aligned with exam expectations?
   A) Anypoint Studio + DataWeave
   B) MuleSoft Composer + Slack connector
   C) Custom Java microservice
   D) RPA bot posting to Slack

3. A scenario states that an integration must be easily consumable by multiple channels (web, mobile, partners) and governed with policies like rate limiting. Which is the best place for the core logic?
   A) Composer flow
   B) Anypoint Platform APIs
   C) Local scripts
   D) Only RPA

4. An exam item offers two options, and only option B preserves reuse and cleaner architecture. Which should the candidate choose?
   A) A
   B) B
   C) Both are equivalent.
   D) None supported

5. A candidate suggests using Composer to perform heavy data transformations that already exist in a Process API. What is the better approach?
   A) Duplicate logic in Composer
   B) Reuse Process API and keep transformation centered on it
   C) Move logic to RPA
   D) Implement all logic in Screen Flows

6. A process uses Composer to trigger MuleSoft RPA via its connector for screen automation in a legacy system. What typical pattern does this illustrate?
   A) Compose as “light orchestration” and RPA as “heavy execution”
   B) RPA as Composer orchestrator
   C) APIs replacing Composer
   D) Only use of HTTP Listener

7. AnyAirlines has a Composer flow that fails frequently due to destination system unavailability. Which strategy is most reasonable in this context?
   A) Blindly retry infinite times on Composer
   B) Validate data and, when possible, move critical logic to APIs with appropriate policies and retry
   C) Ignore all faults
   D) Remove logs to 'improve performance'

8. An option claims that Composer supports complex 'try/catch' structures like a full programming language. Why is that likely a trap answer?
   A) Because Composer does not support any kind of logic
   B) Because Composer has limited logic; it is recommended to validate before and treat errors in a simple way
   C) Because Composer is just an IDE
   D) Because Composer is just like Anypoint Studio

9. NTO wants to understand that integrations built by business users do not bypass corporate APIs and governance. Which guideline is most appropriate?
   A) Composer should always call systems directly
   B) Composer should consume existing APIs when available, instead of going straight to the backend
   C) Composer should never be used with APIs
   D) Composer should replace API Manager

10. The scenario describes a one-off load of thousands of historical records. One answer suggests building a permanent Composer flow for this. Why is this potentially not ideal?
   A) Composer can't handle any volume
   B) For punctual migration, dedicated tools or temporary scripts may be more suitable
   C) Composer has no connectors for SaaS
   D) Composer only runs in production

11. An exam question presents three statements, and the scenario indicates that A, B, and C are all valid together. Which answer should the candidate choose?
   A) Just A is correct
   B) A, B and C are correct and complementary
   C) Just C is correct
   D) None are correct.

12. A candidate chooses an option where Composer directly manipulates database tables of a core system instead of calling a System API. Why is this problematic?
   A) Because databases cannot be accessed
   B) Because it ignores API-led, governance and reuse of the existing System API
   C) Because Composer does not support connections
   D) Because System APIs cannot be versioned

13. AnyAirlines wants to give non-technical users autonomy while still keeping control over integration changes. Which governance model is more aligned with the exam?
   A) Each team builds flows without any guidelines
   B) A C4E defining patterns, reusable assets, and support for citizen integrators
   C) Only a central team can create any integration
   D) All integrations must be done only by Java developers

14. A scenario compares two solutions, and Option 1 is the only one that respects API-led layering and reuse. Which answer should the candidate choose?
   A) Option 1, as it respects API-led and reuse
   B) Option 2, because it is “more direct”
   C) Both are equivalent.
   D) None supported

15. A question mixes API-led layers and tools in a way that keeps Composer consuming reusable APIs rather than bypassing them. How should this be evaluated?
   A) Wrong because Composer should never consume APIs
   B) In line with the MuleSoft strategy for reuse and separation of responsibilities
   C) Wrong as Process APIs should not exist
   D) Wrong because RPA should replace Composer
