/**
 * SISTEMA DE MEDALHAS E CONQUISTAS
 */

const BADGES = [
    { id: 'first_steps', icon: '🎖️', title: 'Primeiros Passos', desc: 'Concluiu o primeiro simulado.' },
    { id: 'unbeatable', icon: '🔥', title: 'Imbatível', desc: 'Acertou 15/15 em qualquer módulo.' },
    { id: 'scholar', icon: '📚', title: 'Estudioso', desc: 'Completou a leitura dos 8 módulos.' }
];

const BadgeManager = {
    async checkAchievements(userId, moduleState) {
        if (!window.SUPABASE) return;

        const { data: profile } = await window.SUPABASE.from('profiles').select('unlocked_badges').eq('id', userId).single();
        if (!profile) return;

        const unlocked = profile.unlocked_badges || [];
        const newBadges = [];

        // 🎖️ Primeiros Passos
        if (!unlocked.includes('first_steps')) {
            const total = Object.values(moduleState.modules || {}).reduce((acc, ms) => acc + (ms.totalAnswered || 0), 0);
            if (total > 0) newBadges.push('first_steps');
        }

        // 🔥 Imbatível
        if (!unlocked.includes('unbeatable')) {
            const perfect = Object.values(moduleState.modules || {}).some(ms => ms.correctCount === 15);
            if (perfect) newBadges.push('unbeatable');
        }

        // 📚 Estudioso
        // Note: For now we'll simulate this if modules read is not directly tracked, 
        // or we can add a check if they clicked "Estudar Conteúdo" for all 8.
        if (!unlocked.includes('scholar')) {
            const readModules = JSON.parse(localStorage.getItem('read_modules') || '[]');
            if (readModules.length >= 8) newBadges.push('scholar');
        }

        if (newBadges.length > 0) {
            const updated = [...new Set([...unlocked, ...newBadges])];
            await window.SUPABASE.from('profiles').update({ unlocked_badges: updated }).eq('id', userId);

            newBadges.forEach(id => {
                const badge = BADGES.find(b => b.id === id);
                if (badge) {
                    notify(`🏆 Conquista Desbloqueada: ${badge.title}!`, "success", 6000);
                }
            });
        }
    },

    renderBadges(unlockedIds) {
        const container = document.createElement('div');
        container.className = 'badges-grid';

        BADGES.forEach(badge => {
            const isUnlocked = unlockedIds.includes(badge.id);
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            badgeEl.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-info">
                    <div class="badge-title">${badge.title}</div>
                    <div class="badge-desc">${badge.desc}</div>
                </div>
            `;
            container.appendChild(badgeEl);
        });

        return container;
    }
};

window.BadgeManager = BadgeManager;
