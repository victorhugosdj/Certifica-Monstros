import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

pending = [q for q in questions if "Recém extraído" in q.get("justificativa", "")]
print(f"Questões ainda pendentes de gabarito: {len(pending)}")
for q in pending:
    print(f"  {q['id']} (M{q['modulo']}): {q['pergunta'][:80]}... -> ATUAL: {q['correta_texto'][:50]}")
