/**
 * SISTEMA DE AUTENTICAÇÃO
 */

function setupAuth() {
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const loginForm = document.getElementById("login-form-container");
  const regForm = document.getElementById("register-form-container");
  const loginBtn = document.getElementById("login-btn");
  const regBtn = document.getElementById("register-btn");
  const forgotForm = document.getElementById("forgot-form-container");
  const showForgot = document.getElementById("show-forgot");
  const forgotBack = document.getElementById("forgot-show-login");
  const confirmPanel = document.getElementById("confirm-panel");

  function showLoginView() {
    loginForm.style.display = "block";
    regForm.style.display = "none";
    forgotForm.style.display = "none";
    if (confirmPanel) confirmPanel.style.display = "none";
  }
  function showRegisterView() {
    loginForm.style.display = "none";
    regForm.style.display = "block";
    forgotForm.style.display = "none";
    if (confirmPanel) confirmPanel.style.display = "none";
  }
  function showForgotView() {
    loginForm.style.display = "none";
    regForm.style.display = "none";
    forgotForm.style.display = "block";
    if (confirmPanel) confirmPanel.style.display = "none";
  }

  // Use event delegation for transitions
  document.getElementById("login-overlay").addEventListener("click", (e) => {
    const t = e.target;
    if (t.id === "show-register") { e.preventDefault(); showRegisterView(); }
    if (t.id === "show-login" || t.id === "forgot-show-login") { e.preventDefault(); showLoginView(); }
    if (t.id === "show-forgot") { e.preventDefault(); showForgotView(); }
  });

  if (showRegister) {
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      showRegisterView();
    });
  }

  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginView();
    });
  }

  regBtn.addEventListener("click", async () => {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value;
    const passConfirm = document.getElementById("reg-password-confirm").value;
    const apiMeta = document.querySelector('meta[name="mongo-api-base"]');
    const apiBase = apiMeta && apiMeta.content ? apiMeta.content : null;
    async function sendClientLog(event, payload) {
      if (!apiBase) return;
      try { await fetch(apiBase + "/logs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, payload }) }); } catch (_) { }
    }

    if (!name || !email || !pass) {
      alert("Preencha todos os campos.");
      return;
    }
    if (pass !== passConfirm) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      if (window.SUPA) {
        const data = await SUPA.signUp(email, pass, name);
        if (data.user && (data.session || data.user.identities?.length)) {
          // If auto-confirm is on in Supabase, we can unlock immediately
          if (data.session) {
            const userObj = { id: data.user.id, name: name, email: email };
            localStorage.setItem('auth_user', JSON.stringify(userObj));
            unlockApp(userObj);
            notify("Cadastro realizado e login automático!", "success");
          } else {
            notify("Enviamos um email de confirmação. Verifique sua caixa de entrada.", "info");
            showLoginView();
          }
        } else {
          notify("Ocorreu um problema ao cadastrar. Verifique os dados.", "error");
        }
      } else {
        notify("Supabase não disponível.", "error");
      }

      document.getElementById("reg-name").value = "";
      document.getElementById("reg-email").value = "";
      document.getElementById("reg-password").value = "";
      document.getElementById("reg-password-confirm").value = "";

    } catch (err) {
      notify(err.message, "error");
    }
  });

  const forgotSubmit = document.getElementById("forgot-submit");
  if (forgotSubmit) {
    forgotSubmit.addEventListener("click", async () => {
      const email = document.getElementById("forgot-email").value.trim();
      if (!email) return notify("Informe seu email.", "error");
      try {
        if (window.SUPA) {
          await SUPA.resetPassword(email);
          notify("Instruções de recuperação enviadas para seu email.", "success");
          showLoginView();
        }
      } catch (e) {
        notify(e.message, "error");
      }
    });
  }

  if (showForgot) {
    showForgot.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      regForm.style.display = "none";
      if (forgotForm) forgotForm.style.display = "block";
      const confirmPanel = document.getElementById("confirm-panel");
      if (confirmPanel) confirmPanel.style.display = "none";
    });
  }
  if (forgotBack) {
    forgotBack.addEventListener("click", (e) => {
      e.preventDefault();
      if (forgotForm) forgotForm.style.display = "none";
      regForm.style.display = "none";
      loginForm.style.display = "block";
      const confirmPanel = document.getElementById("confirm-panel");
      if (confirmPanel) confirmPanel.style.display = "none";
    });
  }

  const sendResetBtn = document.getElementById("send-reset-code-btn");
  if (sendResetBtn) {
    sendResetBtn.addEventListener("click", async () => {
      const email = document.getElementById("forgot-email").value.trim();
      if (!email) { alert("Informe o email."); return; }
      try {
        if (window.SUPA) {
          await SUPA.resetPassword(email);
          if (typeof notify === "function") notify("Verifique seu email para o link de redefinição.", "info"); else alert("Verifique seu email para o link de redefinição.");
        } else {
          const res = await DB.requestPasswordReset(email);
          const svcMeta = document.querySelector('meta[name="emailjs-service-id"]');
          const tplMeta = document.querySelector('meta[name="emailjs-template-reset-id"]');
          const serviceId = svcMeta && svcMeta.content ? svcMeta.content : null;
          const templateId = tplMeta && tplMeta.content ? tplMeta.content : null;
          const params = { to_name: res.user.name, to_email: email, reset_code: res.code };
          if (serviceId && templateId) {
            emailjs.send(serviceId, templateId, params)
              .then(() => { if (typeof notify === "function") notify("Código de redefinição enviado.", "success"); else alert("Código de redefinição enviado."); },
                () => { if (typeof notify === "function") notify(`Código de redefinição: ${res.code}`, "info"); else alert(`Código de redefinição: ${res.code}`); });
          } else {
            if (typeof notify === "function") notify(`Código de redefinição: ${res.code}`, "info"); else alert(`Código de redefinição: ${res.code}`);
          }
        }
      } catch (e) {
        if (typeof notify === "function") notify(e.message, "error"); else alert(e.message);
      }
    });
  }

  const resetBtn = document.getElementById("reset-password-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      const email = document.getElementById("forgot-email").value.trim();
      const code = document.getElementById("reset-code").value.trim();
      const newPass = document.getElementById("new-password").value;
      if (!email || !code || !newPass) { alert("Preencha todos os campos."); return; }
      try {
        if (window.SUPA) {
          if (typeof notify === "function") notify("Siga o link enviado ao seu email para redefinir a senha.", "info"); else alert("Siga o link enviado ao seu email para redefinir a senha.");
        } else {
          await DB.resetPassword(email, code, newPass);
          if (typeof notify === "function") notify("Senha redefinida. Faça login.", "success"); else alert("Senha redefinida. Faça login.");
        }
        if (forgotForm) forgotForm.style.display = "none";
        loginForm.style.display = "block";
      } catch (e) {
        if (typeof notify === "function") notify(e.message, "error"); else alert(e.message);
      }
    });
  }

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value;
    const apiMeta = document.querySelector('meta[name="mongo-api-base"]');
    const apiBase = apiMeta && apiMeta.content ? apiMeta.content : null;

    async function sendClientLog(event, payload) {
      if (!apiBase) return;
      try { await fetch(apiBase + "/logs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, payload }) }); } catch (_) { }
    }

    try {
      loginBtn.disabled = true;
      loginBtn.textContent = "Entrando...";
      await sendClientLog("login_attempt", { email });

      const user = await DB.authenticate(email, pass);
      localStorage.setItem('auth_user', JSON.stringify(user));
      unlockApp(user);
      notify("Login realizado com sucesso.", "success");
      await sendClientLog("login_success", { email });

    } catch (err) {
      let msg = err.message;
      if (msg.includes("Invalid login credentials") || msg.includes("Credenciais inválidas")) {
        msg = "Email ou senha incorretos. Por favor, tente novamente.";
      }
      notify(msg, "error");
      await sendClientLog("login_failed", { email, error: err.message });
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = "ENTRAR";
    }
  });

  // UX Optimization: Enter key support
  [document.getElementById("login-email"), document.getElementById("login-password")].forEach(el => {
    if (el) el.addEventListener("keypress", (e) => {
      if (e.key === "Enter") loginBtn.click();
    });
  });

  [document.getElementById("reg-name"), document.getElementById("reg-email"), document.getElementById("reg-password")].forEach(el => {
    if (el) el.addEventListener("keypress", (e) => {
      if (e.key === "Enter") regBtn.click();
    });
  });
}

function unlockApp(user) {
  CURRENT_USER = user;
  const loginScreen = document.getElementById("login-screen");
  const mainApp = document.getElementById("main-app");

  if (loginScreen) loginScreen.style.display = "none";
  if (mainApp) mainApp.style.display = "block";

  updateAuthUI();
  renderModules();
  switchView("home");
}

function logoutUser() {
  CURRENT_USER = null;
  const loginScreen = document.getElementById("login-screen");
  const mainApp = document.getElementById("main-app");

  if (loginScreen) loginScreen.style.display = "block";
  if (mainApp) mainApp.style.display = "none";

  // Limpar formulários
  if (document.getElementById("login-email")) document.getElementById("login-email").value = "";
  if (document.getElementById("login-password")) document.getElementById("login-password").value = "";
}

function updateAuthUI() {
  const studentLabel = document.getElementById("current-student-label");
  if (studentLabel) {
    studentLabel.textContent = CURRENT_USER ? CURRENT_USER.name : "Visitante";
  }
}

function showVerificationCode(code, email) {
  const toast = document.getElementById("code-toast");
  const toastValue = document.getElementById("code-toast-value");
  const toastCopy = document.getElementById("code-toast-copy");
  const toastClose = document.getElementById("code-toast-close");

  if (toast && toastValue) {
    toast.style.display = "block";
    toastValue.textContent = code;

    if (toastCopy) {
      toastCopy.onclick = () => {
        navigator.clipboard.writeText(code);
        alert("Código copiado!");
      };
    }

    if (toastClose) {
      toastClose.onclick = () => {
        toast.style.display = "none";
      };
    }
  } else {
    alert(`Código de confirmação para ${email}: ${code}`);
  }
}
