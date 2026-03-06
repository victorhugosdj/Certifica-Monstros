/**
 * DATABASE SERVICE (database.js)
 * Modernized with Provider Pattern
 */

const DB_KEYS = {
  PROGRESS: 'cert_app_progress_v3',
  DRAFTS: 'cert_app_drafts_v2',
  METRICS: 'cert_app_metrics_v3',
  USERS: 'cert_app_users_v1'
};

const providers = {
  supabase: {
    async getProgress(userId) {
      const { data, error } = await window.SUPABASE.from('progress').select('modules').eq('user_id', userId).maybeSingle();
      if (error) throw error;
      return data ? { modules: data.modules || {} } : { modules: {} };
    },
    async saveProgress(userId, moduleState) {
      const { error } = await window.SUPABASE.from('progress').upsert({
        user_id: userId,
        modules: moduleState.modules,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      if (error) throw error;
    }
  },
  localStorage: {
    getProgress(userId) {
      const all = JSON.parse(localStorage.getItem(DB_KEYS.PROGRESS)) || {};
      return all[userId] || { modules: {} };
    },
    saveProgress(userId, moduleState) {
      const all = JSON.parse(localStorage.getItem(DB_KEYS.PROGRESS)) || {};
      all[userId] = moduleState;
      localStorage.setItem(DB_KEYS.PROGRESS, JSON.stringify(all));

      this.updateMetricsLocal(userId, moduleState);
    },
    updateMetricsLocal(userId, moduleState) {
      let total = 0, correct = 0, consolidated = 0;
      Object.values(moduleState.modules || {}).forEach(ms => {
        total += ms.totalAnswered || 0;
        correct += ms.correctCount || 0;
        if (total > 0 && (ms.correctCount / ms.totalAnswered) >= 0.8 && ms.totalAnswered >= 5) consolidated++;
      });
      const payload = {
        user_id: userId,
        userName: (window.CURRENT_USER && window.CURRENT_USER.name) || 'Aluno',
        consolidatedCount: consolidated,
        globalAccuracy: total > 0 ? (correct / total) * 100 : 0,
        totalAnswered: total,
        lastUpdate: new Date().toISOString()
      };
      const all = JSON.parse(localStorage.getItem(DB_KEYS.METRICS)) || {};
      all[userId] = payload;
      localStorage.setItem(DB_KEYS.METRICS, JSON.stringify(all));
    }
  }
};

const DB = {
  _current: null,

  async init() {
    if (window.SUPABASE) {
      this._current = providers.supabase;
      console.log("DB: Provider Supabase v3 pronto.");
    } else {
      this._current = providers.localStorage;
      console.log("DB: Provider LocalStorage pronto.");
    }
  },

  // Facade Methods
  async getProgress(userId) { return await this._current.getProgress(userId); },
  async saveProgress(userId, moduleState) {
    await this._current.saveProgress(userId, moduleState);
  },

  async authenticate(email, password) {
    if (window.SUPA) {
      try {
        const authData = await window.SUPA.signIn(email, password);
        const profile = await window.SUPA.getUserProfile(authData.user.id);
        return {
          id: authData.user.id,
          email: authData.user.email,
          name: profile ? profile.display_name : (authData.user.user_metadata?.name || email.split('@')[0]),
          profile: profile
        };
      } catch (e) {
        console.warn("Supabase Auth falhou, tentando Mock...", e.message);
      }
    }

    // Mock Auth Fallback (para testes sem Supabase)
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || {};
    const user = users[email];
    if (user && user.password === password) {
      return { id: user.id, email: user.email, name: user.name, mock: true };
    }
    throw new Error('Credenciais inválidas ou Supabase indisponível.');
  },

  async signUpMock(email, password, name) {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || {};
    if (users[email]) throw new Error("Usuário já existe.");
    const newUser = { id: 'mock_' + Date.now(), email, password, name };
    users[email] = newUser;
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  async getRanking() {
    if (window.SUPABASE) {
      const { data, error } = await window.SUPABASE.from('metrics')
        .select('*')
        .order('consolidatedCount', { ascending: false })
        .order('globalAccuracy', { ascending: false })
        .limit(10);
      return error ? [] : data;
    }
    const metrics = JSON.parse(localStorage.getItem(DB_KEYS.METRICS)) || {};
    return Object.values(metrics).sort((a, b) => b.consolidatedCount - a.consolidatedCount);
  },

  async getExamDraft(userId, moduleCode) {
    if (window.SUPABASE) {
      const { data } = await window.SUPABASE.from('drafts').select('*').eq('id', `${userId}_${moduleCode}`).maybeSingle();
      return data;
    }
    const drafts = JSON.parse(localStorage.getItem(DB_KEYS.DRAFTS)) || {};
    return (drafts[userId] || {})[moduleCode];
  },

  async saveExamDraft(userId, moduleCode, draft) {
    const row = { id: `${userId}_${moduleCode}`, userId, moduleCode, ...draft, updatedAt: new Date().toISOString() };
    if (window.SUPABASE) {
      await window.SUPABASE.from('drafts').upsert(row);
    } else {
      const drafts = JSON.parse(localStorage.getItem(DB_KEYS.DRAFTS)) || {};
      if (!drafts[userId]) drafts[userId] = {};
      drafts[userId][moduleCode] = draft;
      localStorage.setItem(DB_KEYS.DRAFTS, JSON.stringify(drafts));
    }
  },

  async clearExamDraft(userId, moduleCode) {
    if (window.SUPABASE) {
      await window.SUPABASE.from('drafts').delete().eq('id', `${userId}_${moduleCode}`);
    } else {
      const drafts = JSON.parse(localStorage.getItem(DB_KEYS.DRAFTS)) || {};
      if (drafts[userId]) delete drafts[userId][moduleCode];
      localStorage.setItem(DB_KEYS.DRAFTS, JSON.stringify(drafts));
    }
  }
};
