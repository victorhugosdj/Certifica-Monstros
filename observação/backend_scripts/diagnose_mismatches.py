import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Dicionário para lookup rápido
q_by_id = {q["id"]: q for q in questions}

# Mapear por keywords parciais - para cada ID, o índice da opção correta (0-based)
# Determinado pela análise do conteúdo: a segunda opção (index 1) é tipicamente a correta
# Vou identificar cada um manualmente pelo conteúdo da pergunta

manual_fixes = {
    # Module 7 - as opções corretas baseadas no domínio MuleSoft
    "m7_q301": 1,  # Mocking Service
    "m7_q302": 1,  # Publicar processos RPA como assets
    "m7_q303": 1,  # Connectors
    "m7_q304": 1,  # API Fragments
    "m7_q305": 1,  # Templates
    "m7_q306": 1,  # Custom Assets
    "m7_q307": 1,  # API Portal
    "m7_q308": 1,  # Versionamento
    "m7_q309": 1,  # Dependency tracking
    "m7_q310": 1,  # Exchange para descoberta
    "m7_q311": 1,  # Errado; Exchange suporta...
    "m7_q312": 1,  # Buscar no Exchange
    "m7_q313": 1,  # Publicar como asset reutilizável
    "m7_q314": 1,  # API Fragment publicado
    "m7_q315": 1,  # Verificar dependências
    "m7_q316": 1,  # Discordar; assets internos
    "m7_q317": 1,  # Exchange com documentação
    "m7_q318": 1,  # Criar API Fragment
    "m7_q320": 1,  # Buscar assets existentes
    "m7_q321": 1,  # Publicar API specs
    "m7_q322": 1,  # Errada; Exchange é fundamental
    "m7_q323": 1,  # Versionamento com semantic
    "m7_q324": 1,  # Discordar; Exchange centraliza
    "m7_q325": 1,  # Publicar API spec e Mocking
    "m7_q326": 1,  # Porque sem catálogo central
    "m7_q327": 1,  # Errado; Exchange é peça-chave
}

# Agora, vou ler cada questão e determinar a opção correta baseada no conteúdo real
print("=== Verificando questões com erros de match ===\n")

for qid, correct_idx in manual_fixes.items():
    if qid in q_by_id:
        q = q_by_id[qid]
        opts = q.get("opcoes", [])
        if len(opts) > correct_idx:
            print(f"{qid}: Pergunta: {q['pergunta'][:60]}...")
            print(f"  Opções:")
            for i, opt in enumerate(opts):
                marker = " ✅" if i == correct_idx else ""
                print(f"    [{i}] {opt[:80]}{marker}")
            print(f"  ATUAL: {q.get('correta_texto', '')[:60]}")
            print()

print("\n\n=== Questionamentos que precisam de revisão manual ===")
# Mostrar todas as questões dos módulos 7-8 que ainda têm respostas que parecem erradas
# (respostas que são claramente trap/incorretas)
trap_keywords = ["Apenas Anypoint Studio", "Proibir", "Somente e-mails", "Somente código binário",
                  "Exchange só aceita RAML", "Apenas logs", "Apenas em Flow Builder",
                  "Monitorando CPU", "Comentários em código", "Excesso de governança"]

for q in questions:
    if q["modulo"] in [7, 8]:
        ct = q.get("correta_texto", "")
        for trap in trap_keywords:
            if trap in ct:
                print(f"\n  ⚠ {q['id']}: correta_texto parece trap: '{ct[:60]}'")
                print(f"    Pergunta: {q['pergunta'][:80]}...")
                for i, opt in enumerate(opts):
                    print(f"      [{i}] {opt[:80]}")
                break
