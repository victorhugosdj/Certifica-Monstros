/**
 * MOTOR DE PROVAS (EXAM ENGINE) - Logic Only
 */

let PROVAS_JSON_CACHE = null;

async function fetchProvasJson() {
  if (PROVAS_JSON_CACHE) return PROVAS_JSON_CACHE;
  try {
    const res = await fetch("data/provas.json");
    if (!res.ok) throw new Error("Erro fetch provas");
    PROVAS_JSON_CACHE = await res.json();
    return PROVAS_JSON_CACHE;
  } catch (e) {
    console.warn("provas.json não encontrado", e);
    return [];
  }
}

const ExamEngine = {
  async loadPool(moduloId) {
    const bank = await fetchProvasJson();
    return bank.filter(q => q.modulo === moduloId);
  },

  /**
   * Gera um simulado de 15 questões baseado no critério
   */
  generateExam(moduloId, apenasErros, state, fullPool) {
    const moduleCode = `M${moduloId}`;
    const moduleState = getModuleState(state, moduleCode);
    let pool = fullPool;

    if (apenasErros) {
      const errors = moduleState.errorBank || [];
      pool = pool.filter(q => errors.includes(q.id));
      if (pool.length < 15) {
        const others = fullPool.filter(q => !pool.find(p => p.id === q.id));
        pool = [...pool, ...others.sort(() => 0.5 - Math.random())];
      }
    } else {
      const unmastered = pool.filter(q => {
        const qStats = moduleState.questionStats[q.id];
        return !qStats || qStats.streak < 1;
      });
      if (unmastered.length < 15) {
        const others = pool.filter(q => !unmastered.find(u => u.id === q.id));
        pool = [...unmastered, ...others.sort(() => 0.5 - Math.random())];
      } else {
        pool = unmastered;
      }
    }

    return pool.sort(() => 0.5 - Math.random()).slice(0, 15);
  },

  /**
   * Inicia a prova (Ponto de entrada do UI)
   */
  async start(moduleCode, examType) {
    const moduleInfo = MODULES.find(m => m.code === moduleCode);
    const state = await loadState();
    const fullPool = await this.loadPool(moduleInfo.id);
    const questions = this.generateExam(moduleInfo.id, examType === "REFORCO", state, fullPool);

    ExamUI.openModal();
    ExamUI.renderExamList(moduleInfo, questions, examType, () => this.grade(moduleCode, questions));
  },

  /**
   * Avalia as respostas da prova
   */
  async grade(moduleCode, questions) {
    const state = await loadState();
    const moduleState = getModuleState(state, moduleCode);
    let correctCount = 0;
    const wrongQuestions = [];

    questions.forEach(q => {
      const inputName = `q_${q.id}`;
      const radios = Array.from(document.querySelectorAll(`input[name="${inputName}"]`));
      const selected = radios.find(r => r.checked);
      const answerText = selected ? selected.value : "";
      const isCorrect = answerText === q.correta_texto;

      if (!moduleState.questionStats[q.id]) {
        moduleState.questionStats[q.id] = { total: 0, correct: 0, wrong: 0, streak: 0 };
      }
      const stats = moduleState.questionStats[q.id];
      stats.total += 1;
      moduleState.totalAnswered += 1;

      if (isCorrect) {
        stats.correct += 1;
        stats.streak += 1;
        moduleState.correctCount += 1;
        correctCount += 1;
        if (stats.streak >= 2) {
          moduleState.errorBank = (moduleState.errorBank || []).filter(id => id !== q.id);
        }
      } else {
        stats.wrong += 1;
        stats.streak = 0;
        if (!moduleState.errorBank) moduleState.errorBank = [];
        if (!moduleState.errorBank.includes(q.id)) moduleState.errorBank.push(q.id);

        wrongQuestions.push({
          id: q.id,
          pergunta: q.pergunta,
          corretaText: q.correta_texto,
          respostaText: answerText || "Não respondida",
          justificativa: q.justificativa
        });
      }
    });

    moduleState.attempts += 1;
    await saveState(state);

    // 🆕 Enviar respostas ao backend se usuário está logado
    if (CURRENT_USER && window.salvarRespostasNoBackend) {
      const responses = questions.map(q => ({
        id: q.id,
        correct: q.correta_texto === (
          document.querySelector(`input[name="q_${q.id}"]:checked`)?.value || ""
        )
      }));
      
      // Enviar de forma assíncrona (não bloqueia UI)
      window.salvarRespostasNoBackend(CURRENT_USER.id, moduleInfo.id, responses);
    }

    // Check for achievements if user is logged in
    if (window.BadgeManager && CURRENT_USER) {
      BadgeManager.checkAchievements(CURRENT_USER.id, state);
    }

    ExamUI.renderSummary({
      accuracy: computeAccuracy(correctCount, questions.length),
      correct: correctCount,
      total: questions.length
    }, wrongQuestions);

    renderModules();
  }
};

// Aliases para compatibilidade legada
window.renderExam = (m, t) => ExamEngine.start(m, t);
window.startExamSequential = (m, t) => ExamEngine.start(m, t); 
