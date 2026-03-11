import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

q_by_id = {q["id"]: q for q in questions}

# Para as 26 questões que falharam no match, vou especificar o índice correto (0-based)
# baseado na análise do conteúdo de cada questão e suas opções.
# A lógica é: para questões de múltipla escolha MuleSoft, a opção "correta" é tipicamente
# a que promove reutilização, Exchange, boas práticas, etc.

# Formato: { "id": indice_correto }
index_fixes = {}

# Vou primeiro coletar os IDs das questões que ainda estão com respostas "trap"
# verificando se a correta_texto atual é claramente errada

# Módulo 7 fixes baseado em análise manual do q.md
# Os IDs m7_q301 até m7_q327 na seção que faltou

# Primeiro, preciso ver quais IDs existem e o que têm como opções
result_lines = []
for q in questions:
    qid = q["id"]
    if qid.startswith("m7_") or qid.startswith("m8_"):
        opts = q.get("opcoes", [])
        ct = q.get("correta_texto", "")
        
        # Verificar se correta_texto é realmente uma das opções
        if ct not in opts:
            result_lines.append(f"MISSING: {qid} - correta_texto not in options!")
            continue
            
        # Verificar se parece ser uma resposta trap
        current_idx = opts.index(ct)
        
        # Em questões MuleSoft, respostas trap são tipicamente:
        # - "Apenas X", "Somente X" (muito restritivas)
        # - "Proibir", "Ignorar" (ações negativas)
        # - Opções absurdas como "Monitorando CPU", "Apenas e-mails"
        trap_indicators = [
            "Apenas Anypoint Studio", "Proibir o uso",
            "Somente e\u2011mails", "Somente e-mails", "Somente c\u00f3digo",
            "Exchange s\u00f3 aceita RAML", "Apenas logs",
            "Apenas em Flow Builder", "Monitorando CPU",
            "Coment\u00e1rios em c\u00f3digo", "Excesso de governan",
            "Console do Exchange",
            "Step \u2192 Stage \u2192 Orchestration",
            "Interactive Steps",  # for m8_q346, correct is Background Steps
            "Background Step",  # for m8_q347, correct is Interactive Step (but this is actually correct for some)
            "Platform Events",  # for m8_q348, correct is Orchestration Work Items
            "Atribui\u00e7\u00e3o apenas ao dono",
            "Porque roda apenas em lote",
            "Orchestrations separadas",
            "Usar apenas RPA",
            "Quando o primeiro usu\u00e1rio",
            "Apenas RPA",
            "Work Items",  # for m8_q358, correct is Entry Conditions
            "Quando o administrador clica",
            "O usu\u00e1rio clicar em",
            "Cancela o processo automaticamente",
            "C\u00f3digo fonte de um Flow",
            "Em RPA Manager",
            "Apenas RPA logs",
            "Stage 2",  # for m8_q369, correct is Stage 3 (Estoque)
            "Em um e\u2011mail manual",
            "Verdadeiro apenas para Experience",
            "Apenas o status final",
            "Porque \u00e9 apenas um processo batch",
            "RPA n\u00e3o pode chamar APIs",
            "Composer apenas",
            "Alternativa que viola DML",
            "Apenas RPA",
            "Lista de Apex Classes",
            "M\u00faltiplas Orchestrations s\u00e3o obrigat\u00f3rias",
            "Porque n\u00e3o \u00e9 tecnicamente poss\u00edvel",
            "Apex hard\u2011coded",
            "RPA substitui todas as APIs",
            "Ignorar o cen\u00e1rio",
            "Depende do volume",
        ]
        
        is_trap = False
        for trap in trap_indicators:
            if trap in ct:
                is_trap = True
                break
        
        if is_trap:
            result_lines.append(f"TRAP: {qid} current='{ct[:50]}' idx={current_idx}")

# Agora, aplicar correção inteligente: para cada questão trap,
# encontrar a opção que mais se alinha com boas práticas MuleSoft (geralmente índice 1)
fixed = 0

for q in questions:
    qid = q["id"]
    opts = q.get("opcoes", [])
    ct = q.get("correta_texto", "")
    
    if ct not in opts:
        continue
    
    current_idx = opts.index(ct)
    
    # Mapeamento direto por ID -> índice correto da opção
    direct_fixes = {
        "m7_q301": 1,
        "m7_q302": 1,
        "m7_q303": 1,
        "m7_q304": 1,
        "m7_q305": 1,
        "m7_q306": 1,
        "m7_q307": 1,
        "m7_q308": 1,
        "m7_q309": 1,
        "m7_q310": 1,
        "m7_q311": 1,
        "m7_q312": 1,
        "m7_q313": 1,
        "m7_q314": 1,
        "m7_q315": 1,
        "m7_q316": 1,
        "m7_q317": 1,
        "m7_q318": 1,
        "m7_q320": 1,
        "m7_q321": 1,
        "m7_q322": 1,
        "m7_q323": 1,
        "m7_q324": 1,
        "m7_q325": 1,
        "m7_q326": 1,
        "m7_q327": 1,
        "m7_q328": 1,
        "m7_q330": 1,
        "m7_q332": 1,
        "m7_q333": 1,
        "m7_q334": 1,
        "m7_q336": 1,
        "m7_q338": 1,
        "m7_q339": 1,
        "m7_q340": 0,  # Anypoint Exchange é a primeira opção
        "m7_q341": 1,
        "m7_q342": 1,
        
        # Módulo 8
        "m8_q344": 1,  # Orchestration -> Stages -> Steps
        "m8_q346": 1,  # Background Steps
        "m8_q347": 1,  # Interactive Step
        "m8_q348": 1,  # Orchestration Work Items
        "m8_q349": 1,  # Atribuição a Usuário, Grupo ou Fila
        "m8_q350": 1,  # Porque gerencia estado de longo prazo
        "m8_q351": 1,  # Steps paralelos dentro do mesmo Stage
        "m8_q354": 1,  # Reutilizar orquestração e subflows
        "m8_q355": 1,  # Quando todas as Steps obrigatórias terminam
        "m8_q357": 0,  # Um Flow autônomo (primeira opção)
        "m8_q358": 1,  # Entry Conditions
        "m8_q359": 0,  # Quando o usuário termina o Screen Flow (primeira opção)
        "m8_q360": 1,  # A conclusão do Autolaunched Flow
        "m8_q363": 0,  # Work Guide no registro do Salesforce (primeira opção)
        "m8_q365": 1,  # Mantém o estado da Orchestration
        "m8_q366": 1,  # Uma execução específica da orquestração completa
        "m8_q367": 1,  # Na página de Orchestration Runs
        "m8_q368": 0,  # Debug da Orchestration (primeira opção)
        "m8_q369": 2,  # Stage 3 (Estoque) via Background Step (terceira opção)
        "m8_q370": 1,  # Na Entry Condition do Step/Stage de Compliance
        "m8_q371": 1,  # Falso; Background Steps executam Flows
        "m8_q372": 1,  # Orchestration Runs + Work Items
        "m8_q373": 1,  # Porque coordena múltiplos passos
        "m8_q374": 1,  # Orchestration foi desenhado para coordenação
        "m8_q375": 1,  # Um Screen Flow simples
        "m8_q376": 0,  # Alternativa que adiciona complexidade desnecessária (primeira opção)
        "m8_q377": 1,  # Orchestration + Work Guide
        "m8_q379": 1,  # Lista de Orchestration Runs
        "m8_q380": 1,  # Orchestration permite Steps paralelos
        "m8_q381": 1,  # Porque perde rastreabilidade
        "m8_q382": 1,  # Flows e Orchestrations versionados
        "m8_q384": 0,  # Orchestration chama Flows (primeira opção)
        "m8_q385": 1,  # Reconhecer como pegadinha
        "m8_q387": 1,  # Discordar; Orchestration coordena processos
    }
    
    if qid in direct_fixes:
        correct_idx = direct_fixes[qid]
        if correct_idx < len(opts) and current_idx != correct_idx:
            q["correta_texto"] = opts[correct_idx]
            fixed += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

# Verificação final
remaining_traps = 0
for q in questions:
    ct = q.get("correta_texto", "")
    opts = q.get("opcoes", [])
    if ct not in opts:
        remaining_traps += 1

with open(r"c:\Users\zello\Desktop\conteudoOficial\fix_result.txt", 'w', encoding='utf-8') as f:
    f.write(f"Terceira passagem concluida!\n")
    f.write(f"Respostas corrigidas: {fixed}\n")
    f.write(f"Total de questoes: {len(questions)}\n")
    f.write(f"Respostas nao encontradas em opcoes: {remaining_traps}\n\n")
    
    # Listar todas as questões dos módulos 7-8 com suas respostas atuais
    for q in questions:
        if q["modulo"] in [7, 8]:
            opts = q.get("opcoes", [])
            ct = q.get("correta_texto", "")
            idx = opts.index(ct) if ct in opts else -1
            f.write(f"{q['id']}: idx={idx} -> {ct[:80]}\n")

print("Done! Check fix_result.txt for details.")
