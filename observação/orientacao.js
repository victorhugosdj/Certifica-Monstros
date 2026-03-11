const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, 'conteudosssssss');

console.log('====================================================');
console.log('🚀 SCRIPT DE ORIENTAÇÃO - CERTIFICA MONSTROS');
console.log('====================================================\n');

// 1. Verificação de Estrutura Base
console.log('📁 ESTRUTURA DE DIRETÓRIOS E ARQUIVOS:');
const essentialDirs = ['src', 'assets', 'data'];
essentialDirs.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
    if (fs.existsSync(dirPath)) {
        console.log(`  [OK] Diretório /${dir} encontrado.`);
    } else {
        console.log(`  [ERRO] Diretório faltante: /${dir}`);
    }
});

// 2. Verificação de Dados JSON
console.log('\n📊 DADOS E CONTEÚDO (JSON):');
const jsonFiles = [
    { name: 'modulos.json', desc: 'Módulos Teóricos' },
    { name: 'provas.json', desc: 'Questões dos Simulados' }
];

jsonFiles.forEach(file => {
    const filePath = path.join(projectRoot, 'data', file.name);
    if (fs.existsSync(filePath)) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            console.log(`  [OK] ${file.name} (${file.desc}) -> ${data.length} itens detectados.`);
        } catch (e) {
            console.log(`  [ERRO] Falha ao ler ${file.name}: JSON inválido.`);
        }
    } else {
        console.log(`  [ALERTA] Arquivo não encontrado: data/${file.name}`);
    }
});

// 3. Verificação de Arquivos JS Críticos
console.log('\n⚙️  ARQUITETURA JS E COMPONENTES:');
const jsFiles = [
    'app.js', 'auth.js', 'database.js', 'supabase.js', 'exam-engine.js'
];

jsFiles.forEach(file => {
    const filePath = path.join(projectRoot, 'src', file);
    if (fs.existsSync(filePath)) {
        console.log(`  [OK] src/${file} ativo.`);
    } else {
        console.log(`  [ERRO] src/${file} ausente! O sistema pode quebrar.`);
    }
});

// 4. Progresso e Backlog
console.log('\n📋 ORIENTAÇÃO DE PRÓXIMOS PASSOS:');
console.log('  1. Fluxo de Criar Conta: [A FAZER] - Adicionar lógica para mostrar ID único e sucesso claro.');
console.log('  2. Fluxo de Esqueci a Senha: [A FAZER] - Ajustar texto e orientações visuais no modal.');
console.log('  3. Tratamento de Erros no Login: [A FAZER] - Exibir balão vermelho ("Senha Incorreta", etc).');
console.log('  4. Vercel Deploy: [PENDENTE] - Tudo está rodando apenas via Supabase (sem Mock/MongoDB). Pronto para Deploy após UI.');

console.log('\n====================================================');
console.log('✅ Análise Concluída!');
console.log('====================================================');
