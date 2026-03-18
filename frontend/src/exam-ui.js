/**
 * EXAM UI - DOM Manipulation & Rendering for Exams
 */

const ExamUI = {
  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
  /**
   * Abre o modal de prova e prepara o container
   */
  openModal() {
    const modal = document.getElementById("exam-modal");
    if (modal) modal.style.display = "flex";
    document.body.classList.add("exam-mode");
  },

  /**
   * Fecha o modal de prova
   */
  closeModal() {
    const modal = document.getElementById("exam-modal");
    if (modal) modal.style.display = "none";
    document.body.classList.remove("exam-mode");
    switchView("home");
  },

  /**
   * Renderiza a interface da prova (Modo Simples/Lista)
   */
  renderExamList(moduleInfo, questions, examType, onFinish) {
    const container = document.getElementById("exam-container");
    if (!container) return;

    if (!questions.length) {
      container.innerHTML = `
        <div class="exam-header">
          <h2>${moduleInfo.code} • ${moduleInfo.title}</h2>
          <p class="exam-meta">Não há questões disponíveis para este critério.</p>
        </div>
        <div class="exam-actions">
          <button class="btn-secondary" id="close-exam-btn">Fechar Prova</button>
        </div>
      `;
      document.getElementById("close-exam-btn").onclick = () => this.closeModal();
      return;
    }

    const modeLabel = examType === "REFORCO" ? "Reforço Banco de Erros" : "Simulado de Aprendizado";

    const questionsHtml = questions.map((q, idx) => {
      // Embaralhar opções aleatoriamente
      const shuffled = q.opcoes.map((opt, origIdx) => ({ text: opt, origIdx }))
        .sort(() => 0.5 - Math.random());
      const optionsHtml = shuffled.map((item, i) => {
        const letter = String.fromCharCode(65 + i);
        return `
          <li>
            <input type="radio" id="q_${q.id}_${letter}" name="q_${q.id}" value="${item.text}" />
            <label for="q_${q.id}_${letter}"><strong>${letter})</strong> ${item.text}</label>
          </li>
        `;
      }).join("");

      return `
        <div class="question-card" data-question-id="${q.id}">
          <div class="question-title">${idx + 1}. ${q.pergunta}</div>
          <ul class="options-list">${optionsHtml}</ul>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="exam-header">
        <h2>${moduleInfo.code} • ${moduleInfo.title}</h2>
        <p class="exam-meta">${modeLabel} • ${questions.length} questões</p>
      </div>
      <form id="exam-form">
        ${questionsHtml}
        <div class="exam-actions">
          <button type="submit" class="btn-primary">Finalizar Simulado</button>
          <button type="button" class="btn-secondary" id="cancel-exam-btn">Desistir</button>
        </div>
      </form>
      <div id="exam-summary" class="exam-summary" style="display:none;"></div>
    `;

    document.getElementById("cancel-exam-btn").onclick = () => {
      if (confirm("Deseja realmente desistir da prova?")) this.closeModal();
    };

    const form = document.getElementById("exam-form");
    form.onsubmit = (e) => {
      e.preventDefault();
      onFinish();
    };
  },

  /**
   * Renderiza o resumo do resultado da prova
   */
  renderSummary(metrics, wrongQuestions) {
    const summary = document.getElementById("exam-summary");
    if (!summary) return;

    summary.style.display = "block";
    const accuracyText = formatPercent(metrics.accuracy);
    const accuracyClass = metrics.accuracy >= 70 ? "good" : (metrics.accuracy >= 40 ? "medium" : "bad");

    let wrongList = "<p>Parabéns! Desempenho excelente.</p>";
    if (wrongQuestions.length) {
      wrongList = "<ul>" + wrongQuestions.map(w => `
        <li class="wrong-question-item">
          <div class="wrong-question-header"><strong>${w.id}</strong></div>
          <div class="wrong-question-body">
            <p>Sua resposta: <span class="text-danger">${w.respostaText}</span></p>
            <p>Correta: <span class="text-success">${w.corretaText}</span></p>
            <p class="justification"><em>${w.justificativa}</em></p>
            ${Array.isArray(w.refs) && w.refs.length ? `
              <p class="justification">
                <span>References:</span>
                ${w.refs.map(r => {
                  const url = this.escapeHtml(r);
                  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
                }).join(" • ")}
              </p>
            ` : ""}
          </div>
        </li>
      `).join("") + "</ul>";
    }

    summary.innerHTML = `
      <div class="summary-card glass-card">
        <h3 class="exam-summary-accuracy ${accuracyClass}">Resultado: ${accuracyText}</h3>
        <p>Acertos: ${metrics.correct} de ${metrics.total}</p>
        <div class="wrong-questions-review">
          <h4>Revisão de Erros:</h4>
          ${wrongList}
        </div>
        <button class="btn-primary" id="finish-summary-btn">Voltar para Home</button>
      </div>
    `;

    document.getElementById("finish-summary-btn").onclick = () => {
      this.closeModal();
    };
  }
};

window.ExamUI = ExamUI;
