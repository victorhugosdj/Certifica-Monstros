/**
 * UTILS - Shared Helper Functions
 */

const Utils = {
    /**
     * Calcula a acurácia em porcentagem
     */
    computeAccuracy(correct, total) {
        if (!total || total === 0) return 0;
        return (correct / total) * 100;
    },

    /**
     * Formata um valor numérico para exibição de porcentagem (ex: 85.5%)
     */
    formatPercent(value) {
        return (value || 0).toLocaleString('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).replace('0,', ''); // Ajuste para o formato esperado (ex: 75,0% -> 75,0%)
        // Nota: O toLocaleString com 'percent' multiplica por 100. Nosso value já é 0-100.
        // Retornamos um fallback simples se o acima for confuso:
        // return (value || 0).toFixed(1).replace('.', ',') + '%';
    },

    // Versão mais simples e direta para o projeto
    formatPct(value) {
        return (value || 0).toFixed(1).replace('.', ',') + '%';
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Cria um slug a partir de um texto
     */
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    },

    /**
     * Sistema de Notificação UI (Toast)
     */
    notify(message, type = "info", timeout = 4000) {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;

        container.appendChild(toast);

        const closeBtn = toast.querySelector(".toast-close");
        closeBtn.onclick = () => toast.classList.add("fade-out");

        toast.addEventListener("animationend", (e) => {
            if (toast.classList.contains("fade-out")) {
                toast.remove();
            }
        });

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add("fade-out");
                // Fallback remove if animation doesn't fire
                setTimeout(() => { if (toast.parentElement) toast.remove(); }, 500);
            }
        }, timeout);
    },
    /**
     * Renderiza um texto Markdown simples para HTML
     */
    renderMarkdown(md) {
        if (!md) return "";
        const lines = md.split(/\r?\n/);
        let html = "";
        let inUl = false;
        let inOl = false;
        lines.forEach(rawLine => {
            const line = rawLine.trimEnd();
            if (!line) {
                if (inUl) { html += "</ul>"; inUl = false; }
                if (inOl) { html += "</ol>"; inOl = false; }
                return;
            }
            if (line.startsWith("# ")) {
                if (inUl) { html += "</ul>"; inUl = false; }
                if (inOl) { html += "</ol>"; inOl = false; }
                const t = line.slice(2).trim();
                const id = "h-" + this.slugify(t);
                html += `<h1 id="${id}">${this.applyInlineMarkdown(this.escapeHtml(t))}</h1>`;
                return;
            }
            if (line.startsWith("## ")) {
                if (inUl) { html += "</ul>"; inUl = false; }
                if (inOl) { html += "</ol>"; inOl = false; }
                const t = line.slice(3).trim();
                const id = "h-" + this.slugify(t);
                html += `<h2 id="${id}">${this.applyInlineMarkdown(this.escapeHtml(t))}</h2>`;
                return;
            }
            if (line.startsWith("### ")) {
                if (inUl) { html += "</ul>"; inUl = false; }
                if (inOl) { html += "</ol>"; inOl = false; }
                const t = line.slice(4).trim();
                const id = "h-" + this.slugify(t);
                html += `<h3 id="${id}">${this.applyInlineMarkdown(this.escapeHtml(t))}</h3>`;
                return;
            }
            if (line === "---") {
                if (inUl) { html += "</ul>"; inUl = false; }
                if (inOl) { html += "</ol>"; inOl = false; }
                html += "<hr />";
                return;
            }
            const ulMatch = line.match(/^[-*]\s+(.*)$/);
            if (ulMatch) {
                if (!inUl) { if (inOl) { html += "</ol>"; inOl = false; } html += "<ul>"; inUl = true; }
                html += `<li>${this.applyInlineMarkdown(this.escapeHtml(ulMatch[1]))}</li>`;
                return;
            }
            const olMatch = line.match(/^\d+\.\s+(.*)$/);
            if (olMatch) {
                if (!inOl) { if (inUl) { html += "</ul>"; inUl = false; } html += "<ol>"; inOl = true; }
                html += `<li>${this.applyInlineMarkdown(this.escapeHtml(olMatch[1]))}</li>`;
                return;
            }
            html += `<p>${this.applyInlineMarkdown(this.escapeHtml(line))}</p>`;
        });
        if (inUl) html += "</ul>";
        if (inOl) html += "</ol>";
        return html;
    },

    /**
     * Aplica negrito simples em Markdown
     */
    applyInlineMarkdown(text) {
        return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    },
};

// Tornar global para compatibilidade com o código atual durante a migração
window.computeAccuracy = Utils.computeAccuracy;
window.formatPercent = Utils.formatPct;
window.escapeHtml = Utils.escapeHtml;
window.slugify = Utils.slugify;
window.notify = Utils.notify;
window.renderMarkdown = Utils.renderMarkdown.bind(Utils);
window.Utils = Utils;
