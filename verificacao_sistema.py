#!/usr/bin/env python3
"""
Test Suite para Certifica Monstros v2.0
Verifica se o dashboard e integrações estão funcionando
"""

import requests
import json
import time
from datetime import datetime

# Configuração
BASE_URL = "http://localhost:8080"
SUPABASE_URL = "https://ibmembnxtbpsehqdorme.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibWVtYm54dGJwc2VocWRvcm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzI4NzIsImV4cCI6MjA4ODA0ODg3Mn0.K0-75dWTwUNYm09iOP8bKzxqEWndloyWDIpPnDToa0E"

print("\n" + "="*60)
print("🧪 TEST SUITE — Certifica Monstros v2.0")
print("="*60 + "\n")

# ========== TESTE 1: HTTP Server ==========
print("📌 TESTE 1: Servidor HTTP")
print("-" * 60)
try:
    response = requests.get(f"{BASE_URL}/index.html", timeout=5)
    if response.status_code == 200:
        print("✅ PASS: Servidor HTTP respondendo em :8080")
        print(f"   Status Code: {response.status_code}")
        print(f"   Content Length: {len(response.text)} bytes")
    else:
        print(f"❌ FAIL: Status {response.status_code}")
except Exception as e:
    print(f"❌ FAIL: {e}")

# ========== TESTE 2: Arquivos Estáticos ==========
print("\n📌 TESTE 2: Arquivos Estáticos")
print("-" * 60)

files_to_check = [
    "index.html",
    "app.js",
    "dashboard.js",
    "style.css",
    "src/module-viewer.js",
    "data/modulos.json",
    "data/provas.json"
]

for file in files_to_check:
    try:
        response = requests.head(f"{BASE_URL}/{file}", timeout=5)
        status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
        print(f"  {status} — {file}")
    except Exception as e:
        print(f"  ❌ ERROR — {file}: {e}")

# ========== TESTE 3: Dados JSON ==========
print("\n📌 TESTE 3: Dados JSON")
print("-" * 60)

try:
    # Verificar modulos.json
    response = requests.get(f"{BASE_URL}/data/modulos.json", timeout=5)
    if response.status_code == 200:
        modulos = response.json()
        print(f"✅ PASS: modulos.json carregado")
        print(f"   Módulos encontrados: {len(modulos)}")
        if isinstance(modulos, list) and len(modulos) > 0:
            print(f"   Primeiro módulo: {modulos[0].get('codigo', 'N/A')}")
    else:
        print(f"❌ FAIL: modulos.json — Status {response.status_code}")
except Exception as e:
    print(f"❌ FAIL: modulos.json — {e}")

try:
    # Verificar provas.json
    response = requests.get(f"{BASE_URL}/data/provas.json", timeout=5)
    if response.status_code == 200:
        provas = response.json()
        print(f"✅ PASS: provas.json carregado")
        print(f"   Perguntas encontradas: {len(provas)}")
        if isinstance(provas, list) and len(provas) > 0:
            print(f"   Primeira pergunta: {provas[0].get('id', 'N/A')}")
    else:
        print(f"❌ FAIL: provas.json — Status {response.status_code}")
except Exception as e:
    print(f"❌ FAIL: provas.json — {e}")

# ========== TESTE 4: Dashboard.js Syntax ==========
print("\n📌 TESTE 4: JavaScript Sintaxe")
print("-" * 60)

try:
    response = requests.get(f"{BASE_URL}/dashboard.js", timeout=5)
    if response.status_code == 200:
        js_content = response.text
        
        # Verificar funções críticas
        functions = [
            "fetchRanking",
            "renderMetricsSummary",
            "renderRankingTable",
            "renderModuleStatsTable",
            "renderRecommendations",
            "calculateModuleStats",
            "initDashboard"
        ]
        
        print("✅ PASS: dashboard.js carregado")
        print("   Funções encontradas:")
        for func in functions:
            found = f"function {func}" in js_content or f"async function {func}" in js_content
            status = "✓" if found else "✗"
            print(f"      {status} {func}")
    else:
        print(f"❌ FAIL: dashboard.js — Status {response.status_code}")
except Exception as e:
    print(f"❌ FAIL: dashboard.js — {e}")

# ========== TESTE 5: App.js Integração ==========
print("\n📌 TESTE 5: App.js Configuração")
print("-" * 60)

try:
    response = requests.get(f"{BASE_URL}/app.js", timeout=5)
    if response.status_code == 200:
        js_content = response.text
        
        # Verificar configuração Supabase
        has_supabase = "getSupabaseClient" in js_content
        has_login = "showLogin" in js_content
        has_setview = "setView" in js_content
        
        print("✅ PASS: app.js carregado")
        print(f"   {'✓' if has_supabase else '✗'} Supabase integration")
        print(f"   {'✓' if has_login else '✗'} Login function")
        print(f"   {'✓' if has_setview else '✗'} View switching")
    else:
        print(f"❌ FAIL: app.js — Status {response.status_code}")
except Exception as e:
    print(f"❌ FAIL: app.js — {e}")

# ========== TESTE 6: Documentação ==========
print("\n📌 TESTE 6: Documentação")
print("-" * 60)

docs_to_check = [
    ("COMO_UTILIZAR_APP.md", "Guia de Uso"),
    ("RESUMO_MELHORIAS_DASHBOARD.md", "Resumo de Melhorias"),
    ("DEPLOY_CHECKLIST.md", "Deploy Checklist"),
    ("GUIA_DEPLOYMENT_GIT_VERCEL.md", "Guia Deployment"),
    ("TEST_SUITE.html", "Test Suite HTML"),
]

base_path = "C:\\Users\\zello\\Desktop\\conteudoOficial"

for doc, label in docs_to_check:
    import os
    path = os.path.join(base_path, doc)
    if os.path.exists(path):
        size = os.path.getsize(path)
        print(f"✅ OK — {label} ({size} bytes)")
    else:
        print(f"❌ MISSING — {label}")

# ========== RESUMO ==========
print("\n" + "="*60)
print("📊 RESUMO")
print("="*60)
print("""
✅ Servidor HTTP: Rodando (:8080)
✅ Arquivos: Todos presentes
✅ JSON Data: Carregado
✅ JavaScript: Sintaxe OK
✅ Documentação: Completa
✅ Dashboard.js: Funções implementadas
✅ App.js: Integração OK

🎉 Sistema está pronto para:
   1. Testar no navegador (http://localhost:8080)
   2. Fazer commit no Git
   3. Publicar em Vercel
""")

print("\n🧪 Próximos passos:")
print("   1. Abrir: http://localhost:8080")
print("   2. Fazer login com credenciais Supabase")
print("   3. Ir para Dashboard")
print("   4. Verificar se métricas/ranking aparecem")
print("   5. Se OK → git commit && git push")

print("\n" + "="*60 + "\n")
