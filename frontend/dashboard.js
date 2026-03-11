/*
  dashboard.js - Dashboard com métricas, ranking de usuários e desempenho por módulo
  
  ESTRUTURA:
  1. Buscar dados do usuário e provas
  2. Renderizar resumo de métricas (topo)
  3. Renderizar ranking de usuários
  4. Renderizar desempenho por módulo
  5. Renderizar recomendações
  6. Renderizar questões desafiadoras
*/

// ========== BUSCAR METRICAS ==========

async function fetchUserMetrics(userId) {
  try {
    const res = await apiFetch(`/api/metrics/${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error('Falha ao buscar métricas');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Busca ranking de usuários (TOP 10) do Supabase
 * @returns {Promise<Array>} Array com { user, score, totalCorrected, totalAttempted }
 */
async function fetchRanking() {
  try {
    if (!supabase) {
      console.warn('Supabase não disponível');
      return [];
    }

    // Buscar TOP 10 usuários por número de acertos
    const { data, error } = await supabase
      .from('responses')
      .select('user_id, is_correct')
      .order('user_id', { ascending: true });

    if (error) throw error;

    // Processar dados
    const userStats = {};
    data?.forEach(response => {
      if (!userStats[response.user_id]) {
        userStats[response.user_id] = { correct: 0, total: 0 };
      }
      userStats[response.user_id].total += 1;
      if (response.is_correct) {
        userStats[response.user_id].correct += 1;
      }
    });

    // Converter para array e ordenar
    const ranking = Object.entries(userStats)
      .map(([userId, stats]) => ({
        userId,
        correct: stats.correct,
        total: stats.total,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
        userName: userId.substring(0, 12) // Usar primeiros 12 caracteres do ID
      }))
      .sort((a, b) => {
        // Ordenar por: 1) percentage DESC, 2) total DESC
        if (b.percentage !== a.percentage) return b.percentage - a.percentage;
        return b.total - a.total;
      })
      .slice(0, 10); // TOP 10

    return ranking;
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    return [];
  }
}

function getUserErrors(userId) {
  try {
    return JSON.parse(localStorage.getItem(`certifica_errors_${userId}`) || '{}');
  } catch {
    return {};
  }
}

/**
 * Renderizar resumo de métricas (TOPO do dashboard)
 */
function renderMetricsSummary(userId, stats) {
  const container = document.getElementById('dashboard-root');
  
  const html = [];
  html.push('<div class="card" style="background:linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(100, 150, 255, 0.15));padding:20px;margin-bottom:20px;border-radius:8px;">');
  html.push('<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;">');
  
  // Card 1: Total de Questões
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #2196F3;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#4CAF50;">${stats.overall.total}</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Questões Respondidas</div>');
  html.push('</div>');
  
  // Card 2: Acertos
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #4CAF50;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#4CAF50;">${stats.overall.correct}</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Acertos</div>');
  html.push('</div>');
  
  // Card 3: Acurácia %
  const acuracy = stats.overall.percentage;
  const acuracyColor = acuracy >= 80 ? '#4CAF50' : acuracy >= 60 ? '#FFC107' : '#FF5252';
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid ' + acuracyColor + ';">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:${acuracyColor};">${acuracy}%</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Taxa de Acerto</div>');
  html.push('</div>');
  
  // Card 4: Módulos Completos
  const modulosComDados = Object.values(stats.byModule).filter(m => m.total > 0).length;
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #FF9800;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#FF9800;">${modulosComDados}/8</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Módulos com Progresso</div>');
  html.push('</div>');
  
  html.push('</div>');
  html.push('</div>');
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.appendChild(wrapper.firstElementChild);
}

/**
 * Renderizar ranking de usuários (TOP 10)
 */
function renderRankingTable(currentUserId, ranking) {
  const container = document.getElementById('dashboard-root');
  
  const html = [];
  html.push('<div class="card" style="margin-bottom:20px;">');
  html.push('<h3>🏆 Ranking de Usuários (TOP 10)</h3>');
  
  if (!ranking || ranking.length === 0) {
    html.push('<p style="color:#aaa;">Sem dados de ranking ainda. Faça mais simulados!</p>');
    html.push('</div>');
  } else {
    html.push('<table class="table" style="width:100%;">');
    html.push('<thead><tr style="border-bottom:2px solid rgba(255,255,255,0.2);">');
    html.push('<th style="text-align:center;width:40px;">🥇</th>');
    html.push('<th>Usuário</th>');
    html.push('<th style="text-align:center;">Acertos</th>');
    html.push('<th style="text-align:center;">Total</th>');
    html.push('<th style="text-align:center;">Acurácia</th>');
    html.push('</tr></thead><tbody>');
    
    ranking.forEach((user, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      const isCurrentUser = user.userId === currentUserId;
      const bgColor = isCurrentUser ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255,255,255,0.02)';
      const fontWeight = isCurrentUser ? 'bold' : 'normal';
      
      html.push(`<tr style="background:${bgColor};border-bottom:1px solid rgba(255,255,255,0.1);font-weight:${fontWeight};">`);
      html.push(`<td style="text-align:center;font-size:18px;">${medal}</td>`);
      html.push(`<td>${user.userName}${isCurrentUser ? ' (você)' : ''}</td>`);
      html.push(`<td style="text-align:center;">${user.correct}</td>`);
      html.push(`<td style="text-align:center;">${user.total}</td>`);
      html.push(`<td style="text-align:center;font-weight:700;color:#4CAF50;">${user.percentage}%</td>`);
      html.push('</tr>');
    });
    
    html.push('</tbody></table>');
    html.push('</div>');
  }
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.appendChild(wrapper.firstElementChild);
}


function sortChallengingQuestions(errors) {
  return Object.entries(errors)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

function renderChallengingList(userId) {
  const container = document.getElementById('dashboard-root');
  if (!container) return;

  const errors = getUserErrors(userId);
  const list = sortChallengingQuestions(errors);

  const html = [];
  html.push('<div class="card">');
  html.push('<h3>Questões Desafiadoras</h3>');

  if (!list.length) {
    html.push('<p>Nenhuma questão com histórico de erros ainda. Faça alguns simulados para preencher esta lista.</p>');
  } else {
    html.push('<table class="table"><thead><tr><th>Questão</th><th>Erros</th><th>Ação</th></tr></thead><tbody>');
    list.forEach(item => {
      const moduleIdMatch = item.id.match(/m(\d+)_/i);
      const moduleId = moduleIdMatch ? Number(moduleIdMatch[1]) : null;
      html.push(`<tr><td><code>${item.id}</code></td><td>${item.count}</td><td><button class="btn btn-secondary" data-module="${moduleId}" data-refazer="true">Refazer</button></td></tr>`);
    });
    html.push('</tbody></table>');
  }

  html.push('</div>');
  container.innerHTML = html.join('');

  container.querySelectorAll('button[data-refazer="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = Number(btn.dataset.module);
      if (moduleId) {
        window.gerarSimulado(moduleId, true);
      }
    });
  });
}

/**
 * Calcular percentual de acerto por módulo
 * @param {string} userId - ID do usuário
 * @param {Array} allProvas - Lista de todas as provas
 * @returns {Object} { byModule: {1: {correct, total, pct}, ...}, overall: {...} }
 */
function calculateModuleStats(userId, allProvas) {
  const errors = getUserErrors(userId);
  const stats = {
    byModule: {},
    overall: { correct: 0, total: 0, percentage: 0 }
  };

  // Inicializar módulos 1-8
  for (let i = 1; i <= 8; i++) {
    stats.byModule[i] = { correct: 0, total: 0, percentage: 0, errorCount: 0 };
  }

  // Contar erros por módulo
  Object.keys(errors).forEach(questionId => {
    const prova = allProvas.find(p => p.id === questionId);
    if (prova) {
      const module = Number(prova.modulo);
      if (stats.byModule[module]) {
        stats.byModule[module].errorCount += errors[questionId];
      }
    }
  });

  // Estimar acertos (simplificado: assumir 2 tentativas por questão errada)
  allProvas.forEach(prova => {
    const module = Number(prova.modulo);
    if (stats.byModule[module]) {
      stats.byModule[module].total += 1;
      
      if (errors[prova.id]) {
        // Se está em erros, consideramos que acertou (1 vez) e errou (X vezes)
        stats.byModule[module].correct += 1;
      } else {
        // Se não tem histórico, assumir que fez certo
        stats.byModule[module].correct += 1;
      }
    }
  });

  // Calcular percentuais
  Object.keys(stats.byModule).forEach(moduleId => {
    const mod = stats.byModule[moduleId];
    mod.percentage = mod.total > 0 ? Math.round((mod.correct / mod.total) * 100) : 0;
    stats.overall.correct += mod.correct;
    stats.overall.total += mod.total;
  });

  stats.overall.percentage = stats.overall.total > 0 
    ? Math.round((stats.overall.correct / stats.overall.total) * 100) 
    : 0;

  return stats;
}

/**
 * Renderizar tabela de desempenho por módulo
 */
function renderModuleStatsTable(userId, allProvas) {
  const container = document.getElementById('dashboard-root');
  const stats = calculateModuleStats(userId, allProvas);

  const html = [];
  html.push('<div class="card" style="overflow-x:auto;">');
  html.push('<h3>📊 Desempenho por Módulo</h3>');
  html.push('<table class="table" style="min-width:400px;"><thead><tr>');
  html.push('<th>Módulo</th><th>Certas</th><th>Erradas</th><th>Acerto %</th><th>Status</th>');
  html.push('</tr></thead><tbody>');

  for (let i = 1; i <= 8; i++) {
    const mod = stats.byModule[i];
    const erradas = Math.max(0, mod.total - mod.correct);
    const status = mod.percentage >= 80 ? '✅ Excelent' :
                   mod.percentage >= 70 ? '🟢 Bom' :
                   mod.percentage >= 50 ? '🟡 Médio' :
                   mod.total === 0 ? '⏳ Sem dados' : '🔴 Baixo';

    html.push(`<tr style="border-bottom:1px solid rgba(255,255,255,0.1);">`);
    html.push(`<td><strong>Módulo ${i}</strong></td>`);
    html.push(`<td>${mod.correct}</td>`);
    html.push(`<td>${erradas}</td>`);
    html.push(`<td style="font-weight:700;color:#4CAF50;">${mod.percentage}%</td>`);
    html.push(`<td>${status}</td>`);
    html.push(`</tr>`);
  }

  html.push('</tbody></table>');
  html.push('<div style="margin-top:16px;padding:12px;background:rgba(76, 175, 80, 0.1);border-radius:4px;">');
  html.push(`<strong>Desempenho Geral:</strong> ${stats.overall.percentage}% `);
  html.push(`(${stats.overall.correct} certas de ${stats.overall.total})`);
  html.push('</div>');
  html.push('</div>');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.insertBefore(wrapper.firstElementChild, container.firstChild.nextSibling);
}

/**
 * Renderizar recomendações personalizadas
 */
function renderRecommendations(userId, allProvas) {
  const container = document.getElementById('dashboard-root');
  const stats = calculateModuleStats(userId, allProvas);

  const modulesBaixo = Object.keys(stats.byModule)
    .filter(mid => stats.byModule[mid].percentage > 0 && stats.byModule[mid].percentage < 70)
    .sort((a, b) => stats.byModule[a].percentage - stats.byModule[b].percentage);

  const modulesAlto = Object.keys(stats.byModule)
    .filter(mid => stats.byModule[mid].percentage >= 80)
    .sort((a, b) => stats.byModule[b].percentage - stats.byModule[a].percentage);

  const html = [];
  html.push('<div class="card" style="background:linear-gradient(135deg, rgba(100,200,255,0.1), rgba(150,150,255,0.1));border-left:4px solid #2196F3;">');
  html.push('<h3>💡 Recomendações Personalizadas</h3>');

  if (stats.overall.total === 0) {
    html.push('<p>👋 Bem-vindo! Comece fazendo simulados para receber recomendações.</p>');
  } else {
    if (modulesAlto.length > 0) {
      html.push(`<p>🌟 <strong>Excelente trabalho!</strong> Você está indo muito bem em:`);
      modulesAlto.forEach(mid => {
        html.push(`<br/> • Módulo ${mid} (${stats.byModule[mid].percentage}%)`);
      });
      html.push('</p>');
    }

    if (modulesBaixo.length > 0) {
      html.push(`<p>📚 <strong>Foco em:</strong> Revise estes módulos com baixo desempenho:`);
      modulesBaixo.forEach(mid => {
        html.push(`<br/> • <strong>Módulo ${mid}</strong> (${stats.byModule[mid].percentage}%) `);
        html.push(`<button class="btn btn-secondary" style="padding:4px 8px;font-size:0.85em;" data-module="${mid}" data-refazer="true">Refazer</button>`);
      });
      html.push('</p>');
    }

    const progressPercent = Math.round((stats.overall.percentage / 100) * 100);
    html.push('<div style="margin-top:12px;">');
    html.push(`<p><strong>Progresso Geral: ${progressPercent}%</strong></p>`);
    html.push(`<div style="width:100%;height:8px;background:#333;border-radius:4px;overflow:hidden;">`);
    html.push(`<div style="width:${progressPercent}%;height:100%;background:#4CAF50;transition:width 0.3s;"></div>`);
    html.push('</div>');
    html.push('</div>');
  }

  html.push('</div>');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  const rec = wrapper.firstElementChild;
  container.insertBefore(rec, container.firstChild);

  // Bind buttons
  rec.querySelectorAll('button[data-refazer="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = Number(btn.dataset.module);
      if (moduleId && typeof gerarSimulado === 'function') {
        gerarSimulado(moduleId, true);
      }
    });
  });
}

function renderRadarChart(data) {
  data = data || { labels: [], values: [] };
  const canvasId = 'dashboard-radar';
  let canvas = document.getElementById(canvasId);
  if (!canvas) {
    const container = document.getElementById('dashboard-root');
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '24px';
    wrapper.innerHTML = `<div class="card"><h3>Dificuldade por módulo</h3><canvas id="${canvasId}" style="width:100%;height:260px"></canvas></div>`;
    container.appendChild(wrapper);
    canvas = document.getElementById(canvasId);
  }

  new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Dificuldade (%)',
        data: data.values,
        backgroundColor: 'rgba(255, 77, 77, 0.25)',
        borderColor: 'rgba(255, 77, 77, 0.9)',
        pointBackgroundColor: 'rgba(255, 255, 255, 0.85)'
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255,255,255,0.15)'
          },
          angleLines: {
            color: 'rgba(255,255,255,0.12)'
          },
          pointLabels: {
            color: '#ddd'
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

async function initDashboard() {
  if (!CURRENT_USER) return;

  try {
    const container = document.getElementById('dashboard-root');
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';

    // Adicionar loading
    container.innerHTML = '<div class="card"><p>⏳ Carregando dashboard...</p></div>';

    // Carregar dados
    const allProvas = await loadProvas();
    const stats = calculateModuleStats(CURRENT_USER.id, allProvas);
    const ranking = await fetchRanking();

    // Limpar de novo
    container.innerHTML = '';

    // ==== RENDERIZAR EM ORDEM ====
    
    // 1. RESUMO DE MÉTRICAS (topo)
    renderMetricsSummary(CURRENT_USER.id, stats);
    
    // 2. RANKING DE USUÁRIOS
    renderRankingTable(CURRENT_USER.id, ranking);
    
    // 3. DESEMPENHO POR MÓDULO
    renderModuleStatsTable(CURRENT_USER.id, allProvas);
    
    // 4. RECOMENDAÇÕES
    renderRecommendations(CURRENT_USER.id, allProvas);
    
    // 5. QUESTÕES DESAFIADORAS
    renderChallengingList(CURRENT_USER.id);
    
    // 6. GRÁFICO RADAR (se disponível)
    const metrics = await fetchUserMetrics(CURRENT_USER.id);
    if (metrics && metrics.grafico_radar) {
      renderRadarChart(metrics.grafico_radar);
    }

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    document.getElementById('dashboard-root').innerHTML = `
      <div class="card" style="background:rgba(200, 40, 40, 0.1);border-left:4px solid #c62828;color:#ffcdd2;">
        <h3>❌ Erro ao carregar dashboard</h3>
        <p>${error.message || 'Verifique sua conexão e tente novamente.'}</p>
      </div>
    `;
  }
}

window.initDashboard = initDashboard;
