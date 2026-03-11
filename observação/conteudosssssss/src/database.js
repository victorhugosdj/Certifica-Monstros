/**
 * DATABASE SERVICE (database.js)
 * Strict Supabase Implementation (No Fallbacks)
 */

const DB = {
  async init() {
    if (!window.SUPABASE) {
      console.error("CRITICAL: Supabase não detectado. O sistema não funcionará corretamente.");
      if (typeof notify === "function") notify("Erro de Conexão: Banco de dados indisponível.", "error");
    } else {
      console.log("DB: Conectado ao Supabase.");
    }
  },

  // ---- PROGRESSO DE MÓDULOS ----
  async getProgress(userId) {
    if (!window.SUPABASE) return { modules: {} };
    const { data, error } = await window.SUPABASE.from('progress').select('modules').eq('user_id', userId).maybeSingle();
    if (error) {
      console.error("Erro ao buscar progresso:", error);
      return { modules: {} };
    }
    return data ? { modules: data.modules || {} } : { modules: {} };
  },

  async saveProgress(userId, moduleState) {
    if (!window.SUPABASE) return;
    const { error } = await window.SUPABASE.from('progress').upsert({
      user_id: userId,
      modules: moduleState.modules,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
    if (error) console.error("Erro ao salvar progresso:", error);
  },

  // ---- RANKING E MÉTRICAS ----
  async getRanking() {
    if (!window.SUPABASE) return [];
    const { data, error } = await window.SUPABASE.from('metrics')
      .select('*')
      .order('consolidatedCount', { ascending: false })
      .order('globalAccuracy', { ascending: false })
      .limit(10);
    if (error) {
      console.error("Erro ao buscar ranking:", error);
      return [];
    }
    return data;
  },

  // ---- RASCUNHO DE PROVAS ----
  async getExamDraft(userId, moduleCode) {
    if (!window.SUPABASE) return null;
    const { data, error } = await window.SUPABASE.from('drafts').select('*').eq('id', `${userId}_${moduleCode}`).maybeSingle();
    if (error) {
      console.error("Erro ao buscar rascunho:", error);
      return null;
    }
    return data;
  },

  async saveExamDraft(userId, moduleCode, draft) {
    if (!window.SUPABASE) return;
    const row = { id: `${userId}_${moduleCode}`, userId, moduleCode, ...draft, updatedAt: new Date().toISOString() };
    const { error } = await window.SUPABASE.from('drafts').upsert(row);
    if (error) console.error("Erro ao salvar rascunho:", error);
  },

  async clearExamDraft(userId, moduleCode) {
    if (!window.SUPABASE) return;
    const { error } = await window.SUPABASE.from('drafts').delete().eq('id', `${userId}_${moduleCode}`);
    if (error) console.error("Erro ao limpar rascunho:", error);
  }
};
