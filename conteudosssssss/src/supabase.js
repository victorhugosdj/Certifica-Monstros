; (function () {
  function getClient() {
    return window.SUPABASE || null;
  }
  async function signUp(email, password, name) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase não configurado.");

    // 1. Auth SignUp
    const { data: authData, error: authError } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin
      }
    });
    if (authError) throw new Error(authError.message);

    // 2. Create Profile entry
    if (authData && authData.user) {
      const { error: profileError } = await sb.from('profiles').insert({
        user_id: authData.user.id,
        display_name: name || email.split('@')[0],
        pontuacao: 0,
        unlocked_badges: []
      });
      if (profileError) console.warn("Erro ao criar perfil:", profileError.message);
    }

    return authData;
  }
  async function signIn(email, password) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase não configurado.");
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message || "Email ou senha incorretos");
    return data;
  }
  async function resetPassword(email) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase não configurado.");
    const { data, error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if (error) throw new Error(error.message);
    return data;
  }
  async function getUserProfile(userId) {
    const sb = getClient();
    if (!sb) return null;
    const { data, error } = await sb.from('profiles').select('*').eq('user_id', userId).maybeSingle();
    if (error) console.error("Erro ao buscar perfil:", error.message);
    return data;
  }
  async function getUser() {
    const sb = getClient();
    if (!sb) return null;
    const { data } = await sb.auth.getUser();
    if (data && data.user) {
      const profile = await getUserProfile(data.user.id);
      return { ...data.user, profile };
    }
    return null;
  }
  async function verifyOTP(email, token) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase não configurado.");
    const { data, error } = await sb.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    if (error) throw new Error(error.message);
    return data;
  }
  window.SUPA = { signUp, signIn, resetPassword, getUser, getUserProfile, verifyOTP };
})(); 
