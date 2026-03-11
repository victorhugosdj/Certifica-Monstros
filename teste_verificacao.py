#!/usr/bin/env python3
"""
SCRIPT DE VERIFICAÇÃO COMPLETO - Certifica Monstros
Executa testes para validar todas as ligações e integrações.

Uso:
    python teste_verificacao.py

Requisitos:
    pip install requests python-dotenv
"""

import json
import os
import sys
from pathlib import Path
from typing import Dict, Any, List, Tuple
from dotenv import load_dotenv
import time

# Cores para terminal
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

# Caregar variáveis de ambiente
load_dotenv()

class VerificadorCertifica:
    def __init__(self):
        self.tests_passed = 0
        self.tests_failed = 0
        self.warnings = 0
        self.base_dir = Path(__file__).parent
        self.results = []
        
    def print_header(self, texto):
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.BLUE}{texto}{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}\n")
    
    def print_test(self, resultado, nome, detalhes=""):
        if resultado == "✅":
            self.tests_passed += 1
            print(f"{Colors.GREEN}{resultado} {nome}{Colors.RESET}")
        elif resultado == "❌":
            self.tests_failed += 1
            print(f"{Colors.RED}{resultado} {nome}{Colors.RESET}")
        else:  # ⚠️
            self.warnings += 1
            print(f"{Colors.YELLOW}{resultado} {nome}{Colors.RESET}")
        
        if detalhes:
            print(f"   └─ {detalhes}")
        
        self.results.append((resultado, nome, detalhes))
    
    def run_all_tests(self):
        """Executa todos os testes"""
        self.print_header("🧪 TESTE DE VERIFICAÇÃO - Certifica Monstros")
        
        # Testes de Estrutura
        self.test_estrutura_arquivos()
        
        # Testes de Configuração
        self.test_configuracao()
        
        # Testes de JSON
        self.test_integridade_json()
        
        # Testes de Backend
        self.test_backend_estrutura()
        
        # Testes de Frontend
        self.test_frontend_estrutura()
        
        # Testes de Segurança
        self.test_seguranca()
        
        # Testes de API (se backend estiver rodando)
        self.test_api_endpoints()
        
        # Resumo Final
        self.print_summary()
    
    def test_estrutura_arquivos(self):
        """Verifica se todos os arquivos necessários existem"""
        self.print_header("📁 Teste 1: Estrutura de Arquivos")
        
        arquivos_esperados = {
            'backend/main.py': 'Backend FastAPI',
            'backend/database.py': 'Database helpers',
            'backend/requirements.txt': 'Dependências Python',
            'frontend/index.html': 'HTML principal',
            'frontend/app.js': 'Lógica da app',
            'frontend/style.css': 'Estilos',
            'frontend/src/auth.js': 'Autenticação',
            'frontend/src/database.js': 'Database frontend',
            'frontend/src/exam-engine.js': 'Motor de provas',
            'frontend/data/modulos.json': 'Configuração módulos',
            'frontend/data/provas.json': 'Questões',
            'LIFECYCLE.md': 'Documentação',
        }
        
        for arquivo, descricao in arquivos_esperados.items():
            caminho = self.base_dir / arquivo
            if caminho.exists():
                tamanho = caminho.stat().st_size / 1024  # KB
                self.print_test("✅", f"{arquivo}", f"{tamanho:.1f} KB")
            else:
                self.print_test("❌", f"{arquivo}", "FALTANDO")
    
    def test_configuracao(self):
        """Verifica configurações de ambiente"""
        self.print_header("⚙️  Teste 2: Configuração de Ambiente")
        
        env_vars = {
            'SUPABASE_URL': 'URL do Supabase',
            'SUPABASE_KEY': 'Chave anon do Supabase',
            'SUPABASE_SERVICE_KEY': 'Chave de serviço Supabase',
        }
        
        for var, descricao in env_vars.items():
            valor = os.getenv(var)
            if valor:
                masked = valor[:20] + '...' if len(valor) > 20 else valor
                self.print_test("✅", f"{var}", f"Configurado: {masked}")
            else:
                self.print_test("⚠️", f"{var}", "NÃO CONFIGURADO (será necessário em produção)")
        
        # Verificar index.html
        index_path = self.base_dir / 'frontend' / 'index.html'
        if index_path.exists():
            conteudo = index_path.read_text(encoding='utf-8')
            if 'YOUR-SUPABASE-URL' in conteudo or 'YOUR_SUPABASE_ANON_KEY' in conteudo:
                self.print_test("⚠️", "index.html", "Meta tags de Supabase ainda com placeholder")
            else:
                self.print_test("✅", "index.html", "Meta tags configuradas")
            
            if 'http://localhost:8000' in conteudo:
                self.print_test("✅", "API Base URL", "Configurado para http://localhost:8000")
    
    def test_integridade_json(self):
        """Verifica integridade dos arquivos JSON"""
        self.print_header("📊 Teste 3: Integridade de JSON")
        
        json_files = {
            'frontend/data/modulos.json': 'Módulos',
            'frontend/data/provas.json': 'Questões',
        }
        
        for arquivo, descricao in json_files.items():
            caminho = self.base_dir / arquivo
            try:
                with open(caminho, 'r', encoding='utf-8') as f:
                    dados = json.load(f)
                
                if isinstance(dados, list):
                    self.print_test("✅", f"{descricao} (JSON válido)", f"{len(dados)} itens")
                    
                    # Verificar estrutura específica
                    if arquivo.endswith('modulos.json'):
                        if len(dados) == 8:
                            self.print_test("✅", "Módulos", "8 módulos encontrados")
                        else:
                            self.print_test("⚠️", "Módulos", f"Esperado 8, encontrado {len(dados)}")
                    
                    elif arquivo.endswith('provas.json'):
                        # Verificar campos obrigatórios
                        campos_obrigatorios = {'id', 'modulo', 'pergunta', 'opcoes', 'correta_texto'}
                        primeira_questao = dados[0]
                        campos_faltando = campos_obrigatorios - set(primeira_questao.keys())
                        
                        if campos_faltando:
                            self.print_test("❌", "Questões", f"Campos faltando: {campos_faltando}")
                        else:
                            self.print_test("✅", "Questões", f"Estrutura OK, {len(dados)} questões")
                        
                        # Verificar questões com resposta ausente
                        sem_resposta = [q.get('id') for q in dados if not q.get('correta_texto')]
                        if sem_resposta:
                            self.print_test("❌", "Questões sem resposta", f"{len(sem_resposta)} questões")
                
            except json.JSONDecodeError as e:
                self.print_test("❌", f"{descricao}", f"JSON inválido: {str(e)[:50]}")
            except FileNotFoundError:
                self.print_test("❌", f"{descricao}", "Arquivo não encontrado")
    
    def test_backend_estrutura(self):
        """Verifica estrutura e imports do backend"""
        self.print_header("🔧 Teste 4: Estrutura Backend")
        
        main_py = self.base_dir / 'backend' / 'main.py'
        try:
            conteudo = main_py.read_text(encoding='utf-8')
            
            # Verificar imports
            imports_obrigatorios = {
                'from fastapi import FastAPI': 'FastAPI',
                'from fastapi.middleware.cors': 'CORS middleware',
                'from .database import': 'Database imports',
            }
            
            for import_str, descricao in imports_obrigatorios.items():
                if import_str in conteudo:
                    self.print_test("✅", f"Import: {descricao}", "Presente")
                else:
                    self.print_test("❌", f"Import: {descricao}", "FALTANDO")
            
            # Verificar endpoints
            endpoints = {
                '@app.get("/")': 'GET / (root)',
                '@app.get("/metrics")': 'GET /metrics',
                '@app.post("/api/responses")': 'POST /api/responses',
            }
            
            for endpoint, descricao in endpoints.items():
                if endpoint in conteudo:
                    self.print_test("✅", f"Endpoint: {descricao}", "Implementado")
                else:
                    self.print_test("❌", f"Endpoint: {descricao}", "NÃO IMPLEMENTADO")
            
            # Verificar CORS
            if 'allow_origins=["*"]' in conteudo:
                self.print_test("❌", "CORS", "⚠️ CRÍTICO: allow_origins=['*'] expõe API")
            
        except FileNotFoundError:
            self.print_test("❌", "main.py", "Arquivo não encontrado")
    
    def test_frontend_estrutura(self):
        """Verifica estrutura do frontend"""
        self.print_header("🎨 Teste 5: Estrutura Frontend")
        
        arquivos_js = [
            'frontend/app.js',
            'frontend/src/auth.js',
            'frontend/src/database.js',
            'frontend/src/exam-engine.js',
            'frontend/src/config.js',
        ]
        
        for arquivo in arquivos_js:
            caminho = self.base_dir / arquivo
            try:
                conteudo = caminho.read_text(encoding='utf-8')
                linhas = len(conteudo.split('\n'))
                
                # Verificar funções críticas
                if arquivo == 'frontend/app.js':
                    if 'function apiFetch' in conteudo:
                        self.print_test("✅", "app.js", f"apiFetch definida ({linhas} linhas)")
                    else:
                        self.print_test("⚠️", "app.js", "apiFetch não encontrada")
                
                elif arquivo == 'frontend/src/database.js':
                    if 'async getProgress' in conteudo:
                        self.print_test("✅", "database.js", f"Database functions ({linhas} linhas)")
                    else:
                        self.print_test("❌", "database.js", "Database functions incompletas")
                
            except FileNotFoundError:
                self.print_test("❌", arquivo, "Não encontrado")
    
    def test_seguranca(self):
        """Verifica problemas de segurança"""
        self.print_header("🔒 Teste 6: Segurança")
        
        # Verificar .gitignore
        gitignore_path = self.base_dir / '.gitignore'
        if gitignore_path.exists():
            conteudo = gitignore_path.read_text(encoding='utf-8')
            if '.env' in conteudo:
                self.print_test("✅", ".gitignore", ".env está no .gitignore")
            else:
                self.print_test("❌", ".gitignore", ".env NÃO está no .gitignore - RISCO!")
        else:
            self.print_test("⚠️", ".gitignore", "Arquivo não existe")
        
        # Verificar se .env existe e está no gitignore
        env_file = self.base_dir / '.env'
        if env_file.exists():
            self.print_test("⚠️", ".env", "Arquivo .env existe (certifique-se está no .gitignore)")
        
        # Verificar CORS no backend
        main_py = self.base_dir / 'backend' / 'main.py'
        conteudo = main_py.read_text(encoding='utf-8')
        if 'allow_origins=["*"]' in conteudo:
            self.print_test("❌", "CORS", "🔴 CRÍTICO: Aceita qualquer origem")
        else:
            self.print_test("✅", "CORS", "Configurado com origens específicas")
    
    def test_api_endpoints(self):
        """Testa endpoints da API se backend estiver rodando"""
        self.print_header("🚀 Teste 7: Endpoints da API")
        
        try:
            import requests
        except ImportError:
            self.print_test("⚠️", "requests", "pip install requests para testar API")
            return
        
        backend_url = "http://localhost:8000"
        endpoints = [
            ("GET", "/", "Root"),
            ("GET", "/metrics", "Métricas gerais"),
        ]
        
        for metodo, endpoint, descricao in endpoints:
            try:
                url = f"{backend_url}{endpoint}"
                response = requests.get(url, timeout=2)
                
                if response.status_code == 200:
                    self.print_test("✅", f"{metodo} {endpoint}", f"{descricao} OK")
                else:
                    self.print_test("⚠️", f"{metodo} {endpoint}", f"Status {response.status_code}")
                    
            except requests.exceptions.ConnectionError:
                self.print_test("⚠️", f"{metodo} {endpoint}", "Backend não está rodando em http://localhost:8000")
                break
            except Exception as e:
                self.print_test("⚠️", f"{metodo} {endpoint}", f"Erro: {str(e)[:40]}")
    
    def print_summary(self):
        """Imprime resumo final"""
        self.print_header("📈 RESUMO DE TESTES")
        
        total = self.tests_passed + self.tests_failed + self.warnings
        
        print(f"{Colors.GREEN}✅ Passou: {self.tests_passed}{Colors.RESET}")
        print(f"{Colors.RED}❌ Falhou: {self.tests_failed}{Colors.RESET}")
        print(f"{Colors.YELLOW}⚠️  Avisos: {self.warnings}{Colors.RESET}")
        print(f"\n{Colors.BOLD}Total: {total} testes{Colors.RESET}")
        
        # Calcular score
        if total > 0:
            score = (self.tests_passed / total) * 100
            if score >= 80:
                print(f"\n{Colors.GREEN}{Colors.BOLD}Score: {score:.1f}% - ✅ BOAS CONDIÇÕES{Colors.RESET}")
            elif score >= 60:
                print(f"\n{Colors.YELLOW}{Colors.BOLD}Score: {score:.1f}% - ⚠️  NECESSITA MELHORIAS{Colors.RESET}")
            else:
                print(f"\n{Colors.RED}{Colors.BOLD}Score: {score:.1f}% - ❌ CRÍTICO{Colors.RESET}")
        
        print(f"\n{Colors.BOLD}Próximos passos recomendados:{Colors.RESET}")
        print("1. Revisar os testes com status ❌")
        print("2. Executar: python -m backend.main para iniciar backend")
        print("3. Abrir frontend com Live Server")
        print("4. Testar fluxo de login e simulado")
        print("5. Verificar ANALISE_COMPLETA.md para detalhes\n")


if __name__ == "__main__":
    verificador = VerificadorCertifica()
    verificador.run_all_tests()
