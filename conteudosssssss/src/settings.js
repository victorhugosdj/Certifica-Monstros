/**
 * SISTEMA DE CONFIGURAÇÕES E PERFIL
 */

function setupSettings() {
    const updateProfileBtn = document.getElementById("update-profile-btn");
    const updatePasswordBtn = document.getElementById("update-password-btn");
    const logoutBtn = document.getElementById("logout-btn-ui");

    if (updateProfileBtn) {
        // Popula o nome atual
        if (CURRENT_USER && document.getElementById("settings-display-name")) {
            document.getElementById("settings-display-name").value = CURRENT_USER.name || "";
        }

        updateProfileBtn.onclick = async () => {
            const newName = document.getElementById("settings-display-name").value.trim();
            if (!newName) return notify("O nome não pode estar vazio.", "error");

            try {
                if (window.SUPABASE) {
                    const { error } = await window.SUPABASE.from('profiles').update({ display_name: newName }).eq('id', CURRENT_USER.id);
                    if (error) throw error;
                }

                CURRENT_USER.name = newName;
                localStorage.setItem('auth_user', JSON.stringify(CURRENT_USER));
                updateAuthUI();
                notify("Perfil atualizado com sucesso!", "success");
            } catch (e) {
                notify("Erro ao atualizar perfil: " + e.message, "error");
            }
        };
    }

    if (updatePasswordBtn) {
        updatePasswordBtn.onclick = async () => {
            const newPass = document.getElementById("settings-new-password").value;
            if (newPass.length < 6) return notify("A senha deve ter pelo menos 6 caracteres.", "error");

            try {
                if (window.SUPABASE) {
                    const { error } = await window.SUPABASE.auth.updateUser({ password: newPass });
                    if (error) throw error;
                    notify("Senha alterada com sucesso!", "success");
                } else {
                    notify("Troca de senha disponível apenas no modo Supabase.", "info");
                }
            } catch (e) {
                notify("Erro ao trocar senha: " + e.message, "error");
            }
        };
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            if (confirm("Deseja realmente sair?")) {
                localStorage.removeItem('auth_user');
                location.reload(); // Simplest way to clear app state
            }
        };
    }
}

// Chamar no initApp do app.js
window.setupSettings = setupSettings;
