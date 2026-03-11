import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

q_by_id = {q["id"]: q for q in questions}

# Correções finais: ID -> índice correto da opção
final_fixes = {
    "m7_q318": 0,  # API Notebook (não Visualizer)
    "m7_q319": 1,  # Publicar e manter ativos bem documentados no Exchange
    "m7_q327": 0,  # API Portal no Exchange + API Manager para controle de acesso
}

fixed = 0
for qid, correct_idx in final_fixes.items():
    if qid in q_by_id:
        q = q_by_id[qid]
        opts = q.get("opcoes", [])
        if correct_idx < len(opts):
            old = q.get("correta_texto", "")
            q["correta_texto"] = opts[correct_idx]
            fixed += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

# Verificação FINAL abrangente
total = len(questions)
ok = 0
bad = 0
details = []

for q in questions:
    ct = q.get("correta_texto", "")
    opts = q.get("opcoes", [])
    if ct in opts:
        ok += 1
    else:
        bad += 1
        details.append(f"  MISSING IN OPTS: {q['id']}")

with open(r"c:\Users\zello\Desktop\conteudoOficial\final_verification.txt", 'w', encoding='utf-8') as f:
    f.write(f"=== VERIFICACAO FINAL ===\n")
    f.write(f"Total de questoes: {total}\n")
    f.write(f"Correta valida (encontrada nas opcoes): {ok}\n")
    f.write(f"Correta invalida: {bad}\n")
    f.write(f"Correções nesta passagem: {fixed}\n\n")
    
    if details:
        f.write("Problemas:\n")
        for d in details:
            f.write(d + "\n")
    
    # Contagem por modulo
    f.write("\n=== POR MODULO ===\n")
    mod_counts = {}
    for q in questions:
        m = q["modulo"]
        mod_counts[m] = mod_counts.get(m, 0) + 1
    for m in sorted(mod_counts.keys()):
        f.write(f"  Modulo {m}: {mod_counts[m]} questoes\n")

print("Done - check final_verification.txt")
