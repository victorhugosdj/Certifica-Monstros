# Module 7 - Question Bank (EN)

Total questions: 45

Use this file for focused practice after reading conteudo 7.md.

## Q01 (m7_q298)
**Question:** AnyAirlines wants to prevent each team from creating duplicate integrations for the same system. What role does Anypoint Exchange play in this?

- A. IDE for Mule Flow Development
- B. Central reusable asset catalogue (APIs, connectors, templates, fragments, RPA)
- C. Deploy on-premises tool
- D. RPA Console

**Correct answer:** Central reusable asset catalogue (APIs, connectors, templates, fragments, RPA)

## Q02 (m7_q299)
**Question:** Northern Trail Outfitters (NTO) wants to publish API specifications so Salesforce Flow can consume them via External Services. What kind of asset should be published?

- A. API Specification (RAML/OAS)
- B. API Only Fragments
- C. Connectors Only
- D. Templates Only

**Correct answer:** API Specification (RAML/OAS)

## Q03 (m7_q300)
**Question:** A Flow developer needs to understand which parameters an HR MuleSoft API requires. What is the first recommended step?

- A. View Mule application source code
- B. Please refer to Anypoint Exchange and review interactive API documentation/console
- C. Ask the integration team by email
- D. Access the database directly

**Correct answer:** Please refer to Anypoint Exchange and review interactive API documentation/console

## Q04 (m7_q301)
**Question:** One scenario describes that an organization wants to share connectors, templates and fragments between internal teams only. What type of Exchange should be used?

- A. Public Exchange only
- B. Private organisation exchange
- C. Public GitHub
- D. Shared file server

**Correct answer:** Private organisation exchange

## Q05 (m7_q302)
**Question:** An API is published in Exchange with its specification. What does Exchange automatically offer to help consumers?

- A. Just download the PDF
- B. Interactive console to test calls and navigable documentation
- C. API logs only
- D. Financial reports

**Correct answer:** Interactive console to test calls and navigable documentation

## Q06 (m7_q303)
**Question:** NTO wants to reuse the standard “Address” model in several RAML APIs. What kind of asset is more appropriate?

- A. Complete API specification
- B. API Fragment (for example, a reusable Address data type)
- C. Project template
- D. RPA Asset

**Correct answer:** API Fragment (e.g. dataType Address)

## Q07 (m7_q304)
**Question:** An alternate states that “Exchange only stores APIs, not other types of assets”. How would this be evaluated?

- A. Correct.
- B. False; Exchange also stores connectors, templates, fragments, RPA assets, etc.
- C. True only on-premises
- D. True only for free accounts

**Correct answer:** False; Exchange also stores connectors, templates, fragments, RPA assets, etc.

## Q08 (m7_q305)
**Question:** A company wants to use official connectors for SAP and Oracle developed by MuleSoft and partners. Where are these assets available?

- A. Runtime Manager only
- B. No Anywhere Public Exchange
- C. Only in Composer
- D. Only in RPA Manager

**Correct answer:** No Anywhere Public Exchange

## Q09 (m7_q306)
**Question:** AnyAirlines wants developers to see which projects depend on a particular RAML fragment before changing it. Which Exchange resource helps with that?

- A. API Notebook
- B. Dependency tracking
- C. Viewer
- D. RPA Dashboard

**Correct answer:** Dependency tracking

## Q10 (m7_q307)
**Question:** Exchange is described as the 'first source of truth' before creating any new integration. What does that mean in practice?

- A. Create a new API first and document it later
- B. Consult Exchange to see whether reusable APIs or assets already exist before building something new
- C. Ask the original integration developer before checking any catalog
- D. Use Exchange only for documentation, not for reuse

**Correct answer:** Consult Exchange to see if there are already reusable APIs/actives before developing something new

## Q11 (m7_q308)
**Question:** NTO wants to publish an existing RPA process so that other areas know it can be reused. Where should this be exposed?

- A. Only internal wiki
- B. The RPA Asset in Anypoint Exchange
- C. Only in the RPA Manager
- D. Only in emails

**Correct answer:** The RPA Asset in Anypoint Exchange

## Q12 (m7_q309)
**Question:** An alternative says that “Exchange has no impact on the test, because it is only a visual store”. How could the candidate respond?

- A. Agree; not relevant
- B. Disagree; Exchange is central to reuse, Mocking Service and asset discovery
- C. Depends on the project
- D. Only applications to public APIs

**Correct answer:** Disagree; Exchange is central to reuse, Mocking Service and asset discovery

## Q13 (m7_q310)
**Question:** A team wants to use a “Salesforce ↔ SAP” integration ready template provided by MuleSoft. Where's this template found?

- A. API Manager
- B. Anypoint Exchange
- C. Runtime Manager
- D. RPA Manager

**Correct answer:** Anypoint Exchange

## Q14 (m7_q311)
**Question:** A question contrasts two implementation options for Exchange usage. If only option B preserves reuse and governance, which answer should the candidate choose?

- A. A
- B. B
- C. Both equally
- D. None

**Correct answer:** B

## Q15 (m7_q312)
**Question:** One option says: 'To maximize reuse, always create new assets without recording dependencies.' Why is that a bad idea?

- A. Because Exchange does not support dependencies
- B. Because ignoring dependencies makes it difficult to understand impact and governance
- C. Because dependencies are optional
- D. Because only RPA uses dependencies

**Correct answer:** Because ignoring dependencies makes it difficult to understand impact and governance

## Q16 (m7_q313)
**Question:** AnyAirlines wants the Salesforce Flow team to start integrating a credit API before it is currently implemented. The RAML contract already exist. What resource speeds that up?

- A. Direct Deploy in Production
- B. Exchange Mocking Service, displaying a simulated URL
- C. Only manual tests on Postman
- D. Local Logs

**Correct answer:** Exchange Mocking Service, displaying a simulated URL

## Q17 (m7_q314)
**Question:** Northern Trail Outfitters (NTO) wants external developers to test an API using an interactive console and then request access credentials. Where's this set up?

- A. Runtime Manager
- B. Portal/Exchange API with “Request Access” flow
- C. Anypoint Studio
- D. Compose

**Correct answer:** Portal/Exchange API with “Request Access” flow

## Q18 (m7_q315)
**Question:** One scenario says that the front-end team wants to keep testing against mocks while the backend is still being built. Which practice fits best?

- A. Connect directly to an unstable backend and accept broken tests
- B. Use Mocking Service with example data until the backend is ready
- C. Wait until the backend is complete before validating anything
- D. Build isolated test stubs outside the shared API contract

**Correct answer:** Use Mocking Service with example data until the backend is ready

## Q19 (m7_q316)
**Question:** One option says that 'Mocking Service is not useful for hyperautomation scenarios.' How should this be evaluated?

- A. Correct
- B. False; it is very useful to let Flow, Composer, and RPA advance in parallel
- C. Only correct on-premises
- D. It applies only to public APIs

**Correct answer:** False; it is very useful to allow Flow, Composer and RPA to advance in parallel

## Q20 (m7_q317)
**Question:** NTO wants to separate internal and external consumption from an API, but maintain the same specification. What can Exchange and API Manager offer?

- A. Nothing; duplicate required API
- B. Same contract at Exchange, with different policies and consumers portals
- C. Static documentation only
- D. Logs only

**Correct answer:** Same contract at Exchange, with different policies and consumers portals

## Q21 (m7_q318)
**Question:** A Mule developer wants to create interactive tutorials that perform real API calls within the documentation. Which resource is referenced in the module?

- A. API Notebook
- B. Viewer
- C. RPA Recorder
- D. Functional Monitoring

**Correct answer:** API Notebook

## Q22 (m7_q319)
**Question:** A company wants business teams to navigate integration assets such as APIs, templates, and RPA processes and understand what already exists before opening new requests. Which practice supports that?

- A. Keep everything only in internal Git repositories
- B. Publish and maintain well-documented assets in Exchange
- C. Send emails with code attachments
- D. Rely on the integration team to remember everything

**Correct answer:** Publish and maintain well-documented assets in Exchange

## Q23 (m7_q320)
**Question:** AnyAirlines wants external consumers to request access to an API directly through documentation and receive a Client ID/Secret when approved. What's this flow?

- A. Manual Provisioning in Studio
- B. Request Access Flow in an Exchange Portal API
- C. Process Builder in Salesforce
- D. Manual email only

**Correct answer:** Request Access Flow in an Exchange Portal API

## Q24 (m7_q321)
**Question:** One option suggests that 'Mocking Service should be used in production forever because it simplifies the backend.' Why is that incorrect?

- A. Because mocks are never allowed
- B. Because Mocking Service is for testing and parallel development, not for replacing the backend in production
- C. Because only RPA uses mocks
- D. Because Flow does not work with mocks

**Correct answer:** Because Mocking Service is for testing and parallel development, not to replace the backend in production

## Q25 (m7_q322)
**Question:** A candidate needs to identify where to find request and response examples for an API. What location is most expected?

- A. API source code only
- B. Interactive asset documentation and console on Exchange
- C. Former team emails
- D. Production logs

**Correct answer:** Interactive asset documentation and console on Exchange

## Q26 (m7_q323)
**Question:** NTO wants to control who can see certain sensitive assets, such as internal finance APIs. How does Exchange help?

- A. It doesn't help; everything is always public
- B. Allows you to configure visibility and asset access permissions
- C. API Only Manager does that
- D. Only logs control access

**Correct answer:** Allows you to configure visibility and asset access permissions

## Q27 (m7_q324)
**Question:** A team launches a new version of an API, but wants to keep the previous one for some consumers. How does Exchange contribute here?

- A. Does not support versions
- B. Allows asset versioning and documentation for multiple active versions
- C. Automatically removes old versions
- D. Shows only the latest version

**Correct answer:** Allows asset versioning and documentation for multiple active versions

## Q28 (m7_q325)
**Question:** AnyAirlines also wants to register templates and reference integration examples to accelerate future projects. How should these appear in Exchange?

- A. Only APIs
- B. Templates and samples published as assets
- C. As logs
- D. The workers

**Correct answer:** Templates and samples published as assets

## Q29 (m7_q326)
**Question:** An alternate states that “only MuleSoft public APIs can be placed in Exchange; not internal company APIs”. How would this be treated?

- A. Correct.
- B. False; organisations may have Private exports with their own internal assets
- C. True only in CloudHub
- D. True only for RAML

**Correct answer:** False; organisations may have Private exports with their own internal assets

## Q30 (m7_q327)
**Question:** A team wants to create a developer portal for a specific API, with branding, docs and access button. What combination of features supports this?

- A. API Portal in Exchange + API Manager for Access Control
- B. Runtime Manager Only
- C. Just Anypoint Studio
- D. RPA Manager only

**Correct answer:** API Portal in Exchange + API Manager for Access Control

## Q31 (m7_q328)
**Question:** AnyAirlines notes that even with Exchange, teams still create duplicate integrations. What practice helps to change this behavior?

- A. Ban the use of Exchange
- B. Make Exchange a mandatory part of the process: always search before building
- C. Use PDF documentation only
- D. Maintain only verbal communication

**Correct answer:** Make Exchange a mandatory part of the process: always search before building

## Q32 (m7_q329)
**Question:** One option suggests always writing new code in each project so teams do not depend on shared assets. Why does that contradict MuleSoft's vision?

- A. Because new code is always slower
- B. Because MuleSoft values reuse, well-defined contracts and central catalogue rather than duplication
- C. Because Exchange does not support multiple consumers
- D. Because APIs cannot be replicated

**Correct answer:** Because MuleSoft values reuse, well-defined contracts and central catalogue rather than duplication

## Q33 (m7_q330)
**Question:** NTO wants to ensure that all projects use a unique “Customer” model in RAML. Which combination is more aligned?

- A. Create the 'Customer' type in each individual API
- B. Create an API Fragment with a 'Customer' type and reference it from multiple APIs
- C. Keep it only in external documentation
- D. Store it only in the database

**Correct answer:** Create an API Fragment with a 'Customer' type and reference it from multiple APIs

## Q34 (m7_q331)
**Question:** A question presents two Exchange-related options. If only option A follows the module's best practices, which answer should the candidate choose?

- A. A
- B. B
- C. Both
- D. None

**Correct answer:** A

## Q35 (m7_q332)
**Question:** AnyAirlines wants new developers to quickly learn how to use an internal API without having to talk to the original team. Which Exchange feature helps?

- A. Execution logs only
- B. Documentation automatically generated + examples + API Notebook
- C. Old emails only
- D. Binary code only

**Correct answer:** Documentation automatically generated + examples + API Notebook

## Q36 (m7_q333)
**Question:** One option suggests that RPA processes do not need to appear in Exchange because they are not APIs. How does the module contradict that?

- A. RPA is not mentioned in the module
- B. RPA assets can be published in Exchange to promote visibility and reuse
- C. Exchange only accepts RAML
- D. RPA should use a separate catalog

**Correct answer:** RPA assets can be published in Exchange to promote visibility and reuse

## Q37 (m7_q334)
**Question:** NTO plans to delete an old RAML fragment without checking dependencies. What risk does the evidence want you to recognize?

- A. None; fragments are not used in production
- B. APIs that depend on this fragment can break, and so it is important to check “Dependencies” in Exchange
- C. Only logs will be affected
- D. Only RPA will be affected

**Correct answer:** APIs that depend on this fragment can break, and so it is important to check “Dependencies” in Exchange

## Q38 (m7_q335)
**Question:** One question states that before creating a new API, the team must always check Exchange for existing assets. What concept does that reinforce?

- A. Strong pairing
- B. Reuse and catalogue culture
- C. Focus only on code
- D. Default rejection

**Correct answer:** Reuse and catalogue culture

## Q39 (m7_q336)
**Question:** AnyAirlines wants to control which teams can publish new assets in Exchange and who can only consume. Where is this control set up?

- A. API Manager only
- B. In organization permissions and roles in Anypoint Platform / Exchange
- C. Runtime Manager only
- D. Only in Flow Builder

**Correct answer:** In organization permissions and roles in Anypoint Platform / Exchange

## Q40 (m7_q337)
**Question:** One option says: 'To save time, it is best to ignore Exchange and assume we always need to build something new.' How should this be treated?

- A. Reasonable for fast-moving prototype teams
- B. Incorrect; the exam usually expects you to check for reusable assets first
- C. Correct if the scenario does not mention Exchange explicitly
- D. Preferred when teams want to avoid shared dependencies

**Correct answer:** Incorrect; the exam usually expects you to check for reusable assets first

## Q41 (m7_q338)
**Question:** NTO wants to standardize security policies for all APIs in a domain. How can Exchange help indirectly?

- A. Saving only logs
- B. Serving as a unique place where APIs and their contracts are documented and discovered, facilitating consistent policy application
- C. Applying policies directly
- D. CPU Monitoring

**Correct answer:** Serving as a unique place where APIs and their contracts are documented and discovered, facilitating consistent policy application

## Q42 (m7_q339)
**Question:** One option suggests that 'using Exchange is optional and does not bring clear benefits.' Based on the module, what response is more aligned?

- A. Agreement; it's just a window
- B. Disagree; Exchange is a key piece for reuse, discovery, mock, dependencies and portals
- C. Depends on the type of API
- D. Only materials for public APIs

**Correct answer:** Disagree; Exchange is a key piece for reuse, discovery, mock, dependencies and portals

## Q43 (m7_q340)
**Question:** AnyAirlines wants to share, with front-end teams, examples of API calls that will be used in Flutter and React. What's the best location?

- A. Anypoint Exchange in the documentation and examples of the matching asset
- B. Single emails
- C. Private Chat
- D. Code comments

**Correct answer:** Anypoint Exchange in the documentation and examples of the matching asset

## Q44 (m7_q341)
**Question:** A team finds an API already available in Exchange but creates another identical one anyway. What does that indicate from the module's point of view?

- A. Mature architecture
- B. Lack of catalogue culture and reuse
- C. Correct Use of Exchange
- D. Excess of governance

**Correct answer:** Lack of catalogue culture and reuse

## Q45 (m7_q342)
**Question:** The final alternate states: “Exchange is only to show APIs to external teams, it has no value for internal teams”. How could the candidate respond?

- A. Agree
- B. Disagree; internal teams benefit most from catalogs, mocks, templates and fragments
- C. Depends on the size of the company
- D. True only in small organizations

**Correct answer:** Disagree; internal teams benefit most from catalogs, mocks, templates and fragments
