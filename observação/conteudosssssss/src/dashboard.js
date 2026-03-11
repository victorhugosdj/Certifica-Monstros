/**
 * DASHBOARD E MÉTRICAS
 */

function computeDashboardMetrics() {
  const state = loadState();
  const modules = MODULES.map(m => {
    const ms = getModuleState(state, m.code);
    const acc = computeAccuracy(ms.correctCount, ms.totalAnswered);
    return {
      code: m.code,
      title: m.title,
      weight: m.weight,
      accuracy: acc,
      attempts: ms.attempts,
      totalAnswered: ms.totalAnswered,
      pendingQuestions: (ms.errorBank || []).length
    };
  });

  let globalAnswered = 0;
  let globalCorrect = 0;
  const questionList = [];

  modules.forEach(m => {
    globalAnswered += m.totalAnswered;
    globalCorrect += (m.accuracy / 100) * m.totalAnswered;
  });
  const globalAccuracy = computeAccuracy(globalCorrect, globalAnswered);

  // Recoleta estatísticas de questões para a lista de desafiadoras
  Object.entries(state.modules || {}).forEach(([moduleCode, ms]) => {
    Object.entries(ms.questionStats || {}).forEach(([qid, qs]) => {
      if (!qs.total) return;
      questionList.push({
        moduleCode,
        id: qid,
        total: qs.total,
        correct: qs.correct,
        wrong: qs.wrong,
        streak: qs.streak,
        accuracy: computeAccuracy(qs.correct, qs.total)
      });
    });
  });

  const hardestModule = [...modules]
    .filter(m => m.totalAnswered >= 5)
    .sort((a, b) => a.accuracy - b.accuracy)[0] || null;

  return {
    modules,
    globalAccuracy,
    globalAnswered,
    questions: questionList,
    hardestModule
  };
}

function renderDashboard() {
  const container = document.getElementById("dashboard-container");
  if (!container) return;

  const metrics = computeDashboardMetrics();
  const globalAccuracyText = formatPercent(metrics.globalAccuracy);

  let globalClass = "tag-warning";
  if (metrics.globalAccuracy >= 70 && metrics.globalAnswered > 0) globalClass = "tag-success";
  if (metrics.globalAccuracy > 0 && metrics.globalAccuracy < 40) globalClass = "tag-danger";

  const modulesTableRows = metrics.modules
    .map(m => {
      const accText = formatPercent(m.accuracy);
      const accPercent = Math.round(m.accuracy);
      let statusLabel = "Pendente";
      let tagClass = "tag-warning";

      if (m.accuracy >= 70 && m.totalAnswered >= 10) {
        tagClass = "tag-success";
        statusLabel = "Domínio";
      } else if (m.accuracy > 0 && m.accuracy < 40) {
        tagClass = "tag-danger";
        statusLabel = "Crítica";
      } else if (m.totalAnswered > 0) {
        statusLabel = "Média";
      }

      return `
        <tr>
          <td>${m.code}</td>
          <td>${m.title}</td>
          <td>
            <div class="progress-bar-bg" style="height: 12px; border-radius: 6px; background: rgba(255,255,255,0.05);">
              <div class="progress-bar-fill" style="width:${accPercent}%; height: 100%; background: var(--primary); border-radius: 6px;"></div>
            </div>
            <div style="margin-top:4px;"><span class="tag ${tagClass}">${statusLabel} (${accText})</span></div>
          </td>
          <td>${m.totalAnswered}</td>
          <td>${m.pendingQuestions}</td>
          <td>${m.attempts}</td>
        </tr>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="dashboard-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
      <div class="card glass-card">
        <div class="card-title">Visão Geral</div>
        <div class="kpis" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="kpi">
            <div class="kpi-label">Taxa global</div>
            <div class="kpi-value ${globalClass}" style="font-size: 2rem;">${globalAccuracyText}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Respondidas</div>
            <div class="kpi-value" style="font-size: 2rem;">${metrics.globalAnswered}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Módulos</div>
            <div class="kpi-value" style="font-size: 2rem;">${MODULES.length}</div>
          </div>
          <div class="kpi" style="border-left: 3px solid var(--danger); padding-left: 12px;">
            <div class="kpi-label" style="color: var(--danger);">⚠️ Módulo Crítico</div>
            <div class="kpi-value" style="font-size: 1.2rem; font-weight: 800; color: #fff;">
              ${metrics.hardestModule ? metrics.hardestModule.code + ' (' + formatPercent(metrics.hardestModule.accuracy) + ')' : '--'}
            </div>
            <div style="font-size: 0.7rem; color: var(--text-dim);">Menor Aproveitamento</div>
          </div>
        </div>
      </div>
      
      <div class="card glass-card">
        <div class="card-title">Performance por Módulo (%)</div>
        <div style="height: 200px;">
          <canvas id="barChart"></canvas>
        </div>
      </div>

      <div class="card glass-card">
        <div class="card-title">Evolução de Estudo</div>
        <div style="height: 200px;">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
      
      <div class="card glass-card" id="dashboard-ranking-summary">
        <div class="card-title">🏆 Ranking Global (Top 3)</div>
        <div id="dashboard-ranking-list" style="font-size: 0.9rem;">
          Carregando ranking...
        </div>
        <button class="btn-secondary btn-block" onclick="switchView('ranking')" style="margin-top: 12px; font-size: 0.8rem;">Ver Ranking Completo</button>
      </div>
    </div>

    <div class="card glass-card" style="margin-bottom: 24px;">
      <div class="card-title">🎖️ Minhas Conquistas</div>
      <div id="achievements-container">
        <!-- Rendered by BadgeManager -->
      </div>
    </div>

    <div class="card glass-card" style="margin-bottom: 24px;">
      <div class="card-title">Detalhamento por Módulo</div>
      <div style="overflow-x: auto;">
        <table class="table">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Título</th>
              <th style="width: 200px;">Acurácia</th>
              <th>Total</th>
              <th>Erros Ativos</th>
              <th>Tentativas</th>
            </tr>
          </thead>
          <tbody>
            ${modulesTableRows}
          </tbody>
        </table>
      </div>
      <div style="margin-top: 16px;">
        <button id="open-wrong-bank" class="btn-secondary">Acessar Banco de Erros</button>
      </div>
    </div>

    <div class="card glass-card">
      <div class="card-title">💡 Questões Desafiadoras (Retentativas)</div>
      <p style="font-size: 0.9rem; color: var(--text-dim); margin-bottom: 16px;">
        Questões com histórico de erro. Acerte-as 2 vezes seguidas (Streak 2/2) para removê-las desta lista.
      </p>
      <div id="challenging-list">
        ${renderChallengingList(metrics.questions)}
      </div>
    </div>
  `;

  // Inicializar Gráficos e Componentes
  setTimeout(async () => {
    initDashboardCharts(metrics);

    // Render Badges
    const achievementsContainer = document.getElementById("achievements-container");
    if (achievementsContainer && window.BadgeManager && CURRENT_USER) {
      if (window.SUPABASE) {
        const { data: profile } = await window.SUPABASE.from('profiles').select('unlocked_badges').eq('id', CURRENT_USER.id).single();
        if (profile) {
          achievementsContainer.innerHTML = "";
          achievementsContainer.appendChild(BadgeManager.renderBadges(profile.unlocked_badges || []));
          // Proactive check for new achievements
          BadgeManager.checkAchievements(CURRENT_USER.id, loadState());
        }
      }
    }
    // Render Ranking Summary
    const rankingSummaryList = document.getElementById("dashboard-ranking-list");
    if (rankingSummaryList && window.DB) {
      const rankData = await DB.getRanking();
      rankingSummaryList.innerHTML = rankData.slice(0, 3).map((s, i) => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
          <span>${i + 1}º ${s.userName}</span>
          <span style="color: var(--primary); font-weight: 700;">${s.consolidatedCount}</span>
        </div>
      `).join("") || "Nenhum dado disponível.";
    }
  }, 100);

  const btnWrong = document.getElementById("open-wrong-bank");
  if (btnWrong) {
    btnWrong.onclick = () => {
      renderWrongBank();
      switchView("wrong-bank");
    };
  }
}

function renderChallengingList(questions) {
  const list = questions.filter(q => q.streak < 2 && q.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 5);

  if (!list.length) return `<p style="color: var(--text-muted);">Ótimo trabalho! Sem questões críticas no momento.</p>`;

  return `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Módulo</th>
          <th>Erros</th>
          <th>Streak</th>
          <th>Acurácia</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(q => `
          <tr>
            <td><code>${q.id}</code></td>
            <td>${q.moduleCode}</td>
            <td style="color: var(--primary); font-weight: 700;">${q.wrong}</td>
            <td><span style="color: ${q.streak === 1 ? 'var(--success)' : 'var(--text-dim)'};">${q.streak}/2</span></td>
            <td>${formatPercent(q.accuracy)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <div style="margin-top: 10px; font-size: 0.8rem; color: var(--text-dim);">
      * Acerte <strong>2 vezes seguidas</strong> para consolidar.
    </div>
  `;
}

function initDashboardCharts(metrics) {
  const barCtx = document.getElementById('barChart');
  const lineCtx = document.getElementById('lineChart');

  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: metrics.modules.map(m => m.code),
        datasets: [{
          label: 'Acurácia (%)',
          data: metrics.modules.map(m => m.accuracy),
          backgroundColor: metrics.modules.map(m => m.accuracy >= 70 ? 'rgba(16, 185, 129, 0.6)' : (m.accuracy >= 40 ? 'rgba(250, 204, 21, 0.6)' : 'rgba(239, 68, 68, 0.6)')),
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#9ca3af' } },
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#9ca3af' } }
        }
      }
    });
  }

  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: metrics.modules.filter(m => m.totalAnswered > 0).map(m => m.code),
        datasets: [{
          label: 'Evolução',
          data: metrics.modules.filter(m => m.totalAnswered > 0).map(m => m.accuracy),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#9ca3af' } },
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#9ca3af' } }
        }
      }
    });
  }
}


function renderWrongBank() {
  const container = document.getElementById("wrong-bank-container");
  const stateData = loadState();
  const rows = [];
  Object.entries(stateData.modules).forEach(([moduleCode, ms]) => {
    Object.entries(ms.questionStats).forEach(([qid, qs]) => {
      if (!qs.total) return;
      const acc = computeAccuracy(qs.correct, qs.total);
      if (acc >= 70 && qs.streak >= 2) return;
      rows.push({ moduleCode, qid, total: qs.total, wrong: qs.wrong, accuracy: acc });
    });
  });
  rows.sort((a, b) => (b.wrong - a.wrong) || (a.accuracy - b.accuracy));
  const table = rows.length ? `
    <table class="table">
      <thead><tr><th>Módulo</th><th>Questão</th><th>Respondidas</th><th>Erros</th><th>Acurácia</th></tr></thead>
      <tbody>
        ${rows.map(r => {
    const accText = formatPercent(r.accuracy);
    let cls = "tag-warning";
    if (r.accuracy >= 70 && r.total > 0) cls = "tag-success";
    else if (r.accuracy > 0 && r.accuracy < 40) cls = "tag-danger";
    return `<tr><td>${r.moduleCode}</td><td>${r.qid}</td><td>${r.total}</td><td>${r.wrong}</td><td><span class="tag ${cls}">${accText}</span></td></tr>`;
  }).join("")}
      </tbody>
    </table>` : `<p style="font-size:0.9rem; color:#9ca3af;">Sem questões erradas no momento.</p>`;
  container.innerHTML = `
    <div class="card">
      <div class="card-title">Banco de questões erradas</div>
      ${table}
      <div class="exam-actions" style="margin-top:12px;">
        <button class="btn-secondary" id="back-dashboard">Voltar ao dashboard</button>
      </div>
    </div>
  `;
  const back = document.getElementById("back-dashboard");
  if (back) back.onclick = () => switchView("dashboard");
}

async function renderRanking() {
  const container = document.getElementById("ranking-container");
  if (!container) return;
  container.innerHTML = "Carregando ranking...";

  const rankingData = await DB.getRanking();
  const top3 = rankingData.slice(0, 3);

  let podiumHtml = "";
  if (top3.length > 0) {
    podiumHtml = `
      <div class="podium">
        ${top3[1] ? `
          <div class="podium-item">
            <div class="podium-place place-2">2º</div>
            <div class="podium-name">${top3[1].userName}</div>
            <div class="podium-score">${top3[1].consolidatedCount} módulos</div>
          </div>` : ""}
        <div class="podium-item">
          <div class="podium-place place-1">1º</div>
          <div class="podium-name">${top3[0].userName}</div>
          <div class="podium-score">${top3[0].consolidatedCount} módulos</div>
        </div>
        ${top3[2] ? `
          <div class="podium-item">
            <div class="podium-place place-3">3º</div>
            <div class="podium-name">${top3[2].userName}</div>
            <div class="podium-score">${top3[2].consolidatedCount} módulos</div>
          </div>` : ""}
      </div>
    `;
  }

  const tableRows = rankingData.map((s, i) => `
    <tr>
      <td>${i + 1}º</td>
      <td>${s.userName}</td>
      <td>${s.consolidatedCount}</td>
      <td>${formatPercent(s.globalAccuracy)}</td>
      <td>${s.totalAnswered}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <div class="card glass-card" style="margin-bottom: 24px;">
      <div class="card-title">👑 Pódio de Excelência</div>
      <div class="ranking-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        ${rankingData.slice(0, 3).map((s, i) => `
          <div class="ranking-prize-card" style="background: var(--bg-input); border: 1px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'}; border-radius: 16px; padding: 24px; text-align: center; position: relative; overflow: hidden;">
            ${i === 0 ? '<div style="position: absolute; top: 10px; right: 10px; font-size: 1.5rem;">🥇</div>' : ''}
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">${i + 1}º Lugar</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${s.userName}</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${s.consolidatedCount}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Módulos Consolidados</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card glass-card">
      <div class="card-title">Classificação Geral</div>
      <div style="overflow-x: auto;">
        <table class="ranking-table">
          <thead>
            <tr style="text-align: left; color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
              <th style="padding: 12px;">Posição</th>
              <th style="padding: 12px;">Aluno</th>
              <th style="padding: 12px; text-align: center;">Módulos</th>
              <th style="padding: 12px; text-align: center;">Acurácia</th>
              <th style="padding: 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rankingData.map((s, i) => `
              <tr class="ranking-row">
                <td class="rank-pos">${i + 1}º</td>
                <td class="rank-name">${s.userName}</td>
                <td style="text-align: center; font-weight: 600;">${s.consolidatedCount}</td>
                <td style="text-align: center; color: var(--text-dim);">${formatPercent(s.globalAccuracy)}</td>
                <td class="rank-score">${s.totalAnswered}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
