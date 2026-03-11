/**
 * Markdown Question Parser
 * Converte arquivos .md de provas em objetos de questões JSON.
 */

const Parser = {
    /**
     * Converte o texto MD em uma lista de questões
     * Exemplo de formato esperado:
     * 1. Qual é o comando para listar arquivos?
     *    A) ls
     *    B) cd
     *    C) mkdir
     *    D) rm
     *    Correta: A
     *    Justificativa: O comando ls é usado para listar o conteúdo de um diretório.
     */
    parseExam(mdText, moduleCode) {
        if (!mdText) return [];

        const questions = [];
        // Divide por números de questão (ex: "1. ", "2. ", "10. ") em novas linhas
        const blocks = mdText.split(/\n(?=\d+\.\s+)/);

        blocks.forEach((block, index) => {
            const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length < 3) return;

            const questionObj = {
                id: `${moduleCode}-q${index + 1}`,
                text: "",
                options: [],
                correct: 0,
                justification: "",
                topics: [] // Pode ser expandido se houver tags no MD
            };

            let currentSection = 'text';

            lines.forEach(line => {
                // Texto da questão
                if (line.match(/^\d+\.\s+/)) {
                    questionObj.text = line.replace(/^\d+\.\s+/, "").trim();
                    currentSection = 'text';
                    return;
                }

                // Opções (A) B) C) D) E))
                const optMatch = line.match(/^([A-E])\)\s+(.*)$/i);
                if (optMatch) {
                    questionObj.options.push(optMatch[2].trim());
                    return;
                }

                // Resposta Correta
                const correctMatch = line.match(/^Correta:\s*([A-E])/i);
                if (correctMatch) {
                    const letter = correctMatch[1].toUpperCase();
                    questionObj.correct = letter.charCodeAt(0) - 65; // A=0, B=1, ...
                    return;
                }

                // Justificativa
                const justMatch = line.match(/^Justificativa:\s*(.*)$/i);
                if (justMatch) {
                    questionObj.justification = justMatch[1].trim();
                    currentSection = 'justification';
                    return;
                }

                // Se não for nenhum dos anteriores e estivermos na justificativa, acumula
                if (currentSection === 'justification') {
                    questionObj.justification += " " + line;
                } else if (currentSection === 'text' && !line.match(/^[A-E]\)/i)) {
                    questionObj.text += " " + line;
                }
            });

            if (questionObj.text && questionObj.options.length > 0) {
                questions.push(questionObj);
            }
        });

        return questions;
    }
};

window.QuestionParser = Parser;
