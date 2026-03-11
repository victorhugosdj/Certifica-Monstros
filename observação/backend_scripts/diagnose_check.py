import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"
out_path = r"c:\Users\zello\Desktop\conteudoOficial\diagnose2.txt"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

q_by_id = {q["id"]: q for q in questions}

check_ids = [
    "m7_q301", "m7_q302", "m7_q303", "m7_q304", "m7_q305", "m7_q306",
    "m7_q307", "m7_q308", "m7_q309", "m7_q310", "m7_q311", "m7_q312",
    "m7_q313", "m7_q314", "m7_q315", "m7_q316", "m7_q317", "m7_q318",
    "m7_q319", "m7_q320", "m7_q321", "m7_q322", "m7_q323", "m7_q324",
    "m7_q325", "m7_q326", "m7_q327"
]

with open(out_path, 'w', encoding='utf-8') as out:
    for qid in check_ids:
        q = q_by_id.get(qid)
        if q:
            ct = q.get("correta_texto", "")
            out.write(f"\n=== {qid} ===\n")
            out.write(f"P: {q['pergunta'][:150]}\n")
            for i, opt in enumerate(q.get("opcoes", [])):
                marker = " <-- CURRENT" if opt == ct else ""
                out.write(f"  [{i}] {opt}{marker}\n")

print("Done - check diagnose2.txt")
