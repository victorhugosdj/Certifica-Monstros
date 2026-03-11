/**
 * CONFIGURAÇÕES GLOBAIS
 */
const MODULES = [
  { id: 1, code: "M1", title: "Módulo 1: Melhores Práticas de Hiperautomação", weight: "20%" },
  { id: 2, code: "M2", title: "Módulo 2: MuleSoft RPA", weight: "17%" },
  { id: 3, code: "M3", title: "Módulo 3: MuleSoft Composer", weight: "12%" },
  { id: 4, code: "M4", title: "Módulo 4: Salesforce Flow", weight: "13%" },
  { id: 5, code: "M5", title: "Módulo 5: Anypoint Platform & APIs", weight: "15%" },
  { id: 6, code: "M6", title: "Módulo 6: Monitoring & API Manager", weight: "7%" },
  { id: 7, code: "M7", title: "Módulo 7: Anypoint Exchange", weight: "8%" },
  { id: 8, code: "M8", title: "Módulo 8: Flow Orchestration", weight: "8%" }
];

const MODULE_CONTENT_CACHE = {};
let CURRENT_USER = null;
