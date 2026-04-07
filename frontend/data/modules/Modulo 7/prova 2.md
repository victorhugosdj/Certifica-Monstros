# Prova 2 - Modulo 7

Use este arquivo como treino rapido do modulo.

1. AnyAirlines wants the Salesforce Flow team to start integrating a credit API before it is currently implemented. The RAML contract already exist. What resource speeds that up?
   A) Direct Deploy in Production
   B) Exchange Mocking Service, displaying a simulated URL
   C) Only manual tests on Postman
   D) Local Logs

2. Northern Trail Outfitters (NTO) wants external developers to test an API using an interactive console and then request access credentials. Where's this set up?
   A) Runtime Manager
   B) Portal/Exchange API with “Request Access” flow
   C) Anypoint Studio
   D) Compose

3. One scenario says that the front-end team wants to keep testing against mocks while the backend is still being built. Which practice fits best?
   A) Connect directly to an unstable backend and accept broken tests
   B) Use Mocking Service with example data until the backend is ready
   C) Wait until the backend is complete before validating anything
   D) Build isolated test stubs outside the shared API contract

4. One option says that 'Mocking Service is not useful for hyperautomation scenarios.' How should this be evaluated?
   A) Correct
   B) False; it is very useful to let Flow, Composer, and RPA advance in parallel
   C) Only correct on-premises
   D) It applies only to public APIs

5. NTO wants to separate internal and external consumption from an API, but maintain the same specification. What can Exchange and API Manager offer?
   A) Nothing; duplicate required API
   B) Same contract at Exchange, with different policies and consumers portals
   C) Static documentation only
   D) Logs only

6. A Mule developer wants to create interactive tutorials that perform real API calls within the documentation. Which resource is referenced in the module?
   A) API Notebook
   B) Viewer
   C) RPA Recorder
   D) Functional Monitoring

7. A company wants business teams to navigate integration assets such as APIs, templates, and RPA processes and understand what already exists before opening new requests. Which practice supports that?
   A) Keep everything only in internal Git repositories
   B) Publish and maintain well-documented assets in Exchange
   C) Send emails with code attachments
   D) Rely on the integration team to remember everything

8. AnyAirlines wants external consumers to request access to an API directly through documentation and receive a Client ID/Secret when approved. What's this flow?
   A) Manual Provisioning in Studio
   B) Request Access Flow in an Exchange Portal API
   C) Process Builder in Salesforce
   D) Manual email only

9. One option suggests that 'Mocking Service should be used in production forever because it simplifies the backend.' Why is that incorrect?
   A) Because mocks are never allowed
   B) Because Mocking Service is for testing and parallel development, not for replacing the backend in production
   C) Because only RPA uses mocks
   D) Because Flow does not work with mocks

10. A candidate needs to identify where to find request and response examples for an API. What location is most expected?
   A) API source code only
   B) Interactive asset documentation and console on Exchange
   C) Former team emails
   D) Production logs

11. NTO wants to control who can see certain sensitive assets, such as internal finance APIs. How does Exchange help?
   A) It doesn't help; everything is always public
   B) Allows you to configure visibility and asset access permissions
   C) API Only Manager does that
   D) Only logs control access

12. A team launches a new version of an API, but wants to keep the previous one for some consumers. How does Exchange contribute here?
   A) Does not support versions
   B) Allows asset versioning and documentation for multiple active versions
   C) Automatically removes old versions
   D) Shows only the latest version

13. AnyAirlines also wants to register templates and reference integration examples to accelerate future projects. How should these appear in Exchange?
   A) Only APIs
   B) Templates and samples published as assets
   C) As logs
   D) The workers

14. An alternate states that “only MuleSoft public APIs can be placed in Exchange; not internal company APIs”. How would this be treated?
   A) Correct.
   B) False; organisations may have Private exports with their own internal assets
   C) True only in CloudHub
   D) True only for RAML

15. A team wants to create a developer portal for a specific API, with branding, docs and access button. What combination of features supports this?
   A) API Portal in Exchange + API Manager for Access Control
   B) Runtime Manager Only
   C) Just Anypoint Studio
   D) RPA Manager only
