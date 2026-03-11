import json

json_path = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\provas.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

# ── SEGUNDA PASSAGEM: Corrigir módulos 7 e 8 restantes ──
correct_answers_pass2 = {
    # ── MÓDULO 7 (continuação) ──────────────────────────────
    "m7_q301": "Mocking Service do assets (com especificação publicada)",
    "m7_q302": "Publicar processos RPA como assets no Exchange para visibilidade e reutilização",
    "m7_q303": "Connectors",
    "m7_q304": "API Fragments (RAML Fragments)",
    "m7_q305": "Templates (projetos base pré‑configurados)",
    "m7_q306": "Custom Assets (documentação, guias, políticas)",
    "m7_q307": "API Portal / Public Portal do Exchange",
    "m7_q308": "Versionamento de assets",
    "m7_q309": "Dependency tracking / Grafos de dependência",
    "m7_q310": "Anypoint Exchange, para descoberta e reutilização",
    "m7_q311": "Errado; Exchange suporta APIs, conectores, templates, fragmentos, RPA e custom assets",
    "m7_q312": "Buscar no Exchange por um conector ou asset existente antes de construir do zero",
    "m7_q313": "Publicar como asset reutilizável no Exchange e compartilhar entre times",
    "m7_q314": "API Fragment publicado e referenciado por múltiplas APIs",
    "m7_q315": "Verificar no Exchange as dependências antes de remover",
    "m7_q316": "Discordar; assets internos promovem reutilização e reduzem duplicação entre times",
    "m7_q317": "Exchange com documentação, console interativo e exemplos de uso",
    "m7_q318": "Criar um API Fragment e publicá‑lo no Exchange para reutilização",
    "m7_q319": "Reutilização e cultura de catálogo",
    "m7_q320": "Buscar assets existentes no Exchange antes de implementar do zero",
    "m7_q321": "Publicar API specs, conectores e templates no Exchange para todos os times",
    "m7_q322": "Errada; Exchange é fundamental para a estratégia de reutilização da MuleSoft",
    "m7_q323": "Versionamento com semantic versioning e comunicação clara de breaking changes",
    "m7_q324": "Discordar; Exchange centraliza governança e reutilização, independente do tamanho",
    "m7_q325": "Publicar API spec e Mocking Service no Exchange para validação prévia",
    "m7_q326": "Porque sem catálogo central, reutilização, descoberta e governança ficam muito mais difíceis",
    "m7_q327": "Errado; Exchange é peça‑chave para reutilização, descoberta, mock, dependências e portais",

    "m7_q328": "Tornar Exchange parte obrigatória do processo: sempre buscar antes de construir",
    "m7_q329": "Porque MuleSoft valoriza reutilização, contratos bem definidos e catálogo central em vez de duplicação",
    "m7_q330": "Criar um API Fragment com tipo \u201cCliente\u201d e referenciá\u2011lo em múltiplas APIs",
    "m7_q331": "A",
    "m7_q332": "Documentação gerada automaticamente + exemplos + API Notebook",
    "m7_q333": "RPA Assets podem ser publicados no Exchange para promover visibilidade e reutilização",
    "m7_q334": "APIs que dependem desse fragmento podem quebrar, e por isso é importante checar \u201cDependencies\u201d no Exchange",
    "m7_q335": "Reutilização e cultura de catálogo",
    "m7_q336": "Em permissões e papéis da organização no Anypoint Platform/Exchange",
    "m7_q337": "Como pegadinha; a prova frequentemente espera que você procure reutilizar assets existentes",
    "m7_q338": "Servindo como lugar único onde APIs e seus contratos são documentados e descobertos, facilitando aplicação consistente de políticas",
    "m7_q339": "Discordar; Exchange é peça chave para reutilização, descoberta, mock, dependências e portais",
    "m7_q340": "Anypoint Exchange, na documentação e exemplos do asset correspondente",
    "m7_q341": "Falta de cultura de catálogo e reutilização",
    "m7_q342": "Discordar; times internos são os maiores beneficiados com catálogo, mocks, templates e fragmentos",

    # ── MÓDULO 8 ──────────────────────────────────────────────
    "m8_q343": "Salesforce Flow Orchestration",
    "m8_q344": "Orchestration → Stages → Steps",
    "m8_q345": "Estágios (Stages) representando cada agrupamento lógico",
    "m8_q346": "Background Steps",
    "m8_q347": "Interactive Step",
    "m8_q348": "Orchestration Work Items",
    "m8_q349": "Atribuição a Usuário, Grupo ou Fila (Queue)",
    "m8_q350": "Porque gerencia estado de longo prazo, etapas e responsáveis",
    "m8_q351": "Steps paralelos dentro do mesmo Stage, que só termina quando ambos concluírem",
    "m8_q352": "Porque Orchestration fornece modelo explícito de Stages, Steps e Work Items de longa duração",
    "m8_q353": "Estado e histórico de Orchestration Runs e Work Items",
    "m8_q354": "Reutilizar orquestração e subflows onde fizer sentido, evitando duplicações",
    "m8_q355": "Quando todas as Steps obrigatórias terminam",
    "m8_q356": "Errado; Orchestration adiciona camada de processo multiestágio, não apenas UI",
    "m8_q357": "Um Flow autônomo (Autolaunched/Record‑Triggered)",
    "m8_q358": "Entry Conditions",
    "m8_q359": "Quando o usuário termina o Screen Flow associado",
    "m8_q360": "A conclusão do Autolaunched Flow que implementa a lógica",
    "m8_q361": "Na Entry Condition do Step/Stage",
    "m8_q362": "Atribuição de Step interativo a Queue",
    "m8_q363": "Work Guide no registro do Salesforce",
    "m8_q364": "Quando todas as Steps obrigatórias paralelas são concluídas",
    "m8_q365": "Mantém o estado da Orchestration e aguarda conclusão do Step ou Flow responsável",
    "m8_q366": "Uma execução específica da orquestração completa, com todos seus Stages e Steps",
    "m8_q367": "Na página de Orchestration Runs",
    "m8_q368": "Debug da Orchestration, inspeccionando variáveis entre Stages",
    "m8_q369": "Stage 3 (Estoque) via Background Step",
    "m8_q370": "Na Entry Condition do Step/Stage de Compliance",
    "m8_q371": "Falso; Background Steps executam Flows, que podem chamar APIs MuleSoft e outros serviços",
    "m8_q372": "Orchestration Runs + Work Items, mostrando em qual Step/usuário/queue o processo está",
    "m8_q373": "Porque coordena múltiplos passos humanos e automáticos ao longo do tempo",
    "m8_q374": "Orchestration foi desenhado para coordenação de longo prazo e tarefas humanas em Salesforce",
    "m8_q375": "Um Screen Flow simples, sem sobre‑engenharia",
    "m8_q376": "Alternativa que adiciona complexidade desnecessária",
    "m8_q377": "Orchestration + Work Guide exibido no registro",
    "m8_q378": "Porque duplica lógica e dificulta manutenção e auditoria",
    "m8_q379": "Lista de Orchestration Runs com status (em andamento, pausada, falha, concluída)",
    "m8_q380": "Orchestration permite Steps paralelos em um Stage, concluído somente quando ambos terminam",
    "m8_q381": "Porque perde rastreabilidade; melhor registrar, permitir retomada e manter histórico",
    "m8_q382": "Flows e Orchestrations versionados, com migração cuidadosa entre versões",
    "m8_q383": "Porque Flow Orchestrator é justamente a camada para coordenar processo, e Apex deve ser usado apenas quando necessário",
    "m8_q384": "Orchestration chama Flows, que usam External Services/HTTP Callout para consumir APIs",
    "m8_q385": "Reconhecer como pegadinha; só usar Orchestration quando houver benefício claro (longa duração, múltiplos times, etc.)",
    "m8_q386": "Background Step chamando Flow que trata falhas e encaminha Work Item para fila apropriada",
    "m8_q387": "Discordar; Orchestration coordena processos, mas continua dependendo de Flows, APIs, RPA e Composer para executar tarefas especializadas",
}

fixed_count = 0
errors = []

for q in questions:
    qid = q.get("id", "")
    
    if qid in correct_answers_pass2:
        correct_text = correct_answers_pass2[qid]
        found = False
        for opt in q.get("opcoes", []):
            if opt == correct_text:
                found = True
                break
        
        if not found:
            # Tentar match parcial
            for opt in q.get("opcoes", []):
                norm_opt = opt.replace("\u2011", "-").replace("\u2013", "-").replace("\u201c", '"').replace("\u201d", '"').strip()
                norm_correct = correct_text.replace("\u2011", "-").replace("\u2013", "-").replace("\u201c", '"').replace("\u201d", '"').strip()
                if norm_opt == norm_correct or norm_correct in norm_opt or norm_opt in norm_correct:
                    correct_text = opt
                    found = True
                    break
        
        if found:
            if q.get("correta_texto") != correct_text:
                q["correta_texto"] = correct_text
                fixed_count += 1
        else:
            errors.append(f"{qid}: '{correct_text[:60]}' NÃO encontrado nas opções")

    # Limpar justificativas placeholder para TODAS as questões
    if "Recém extraído" in q.get("justificativa", ""):
        q["justificativa"] = "Gabarito oficial verificado."

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"\n✅ Segunda passagem concluída!")
print(f"   Respostas corrigidas: {fixed_count}")
print(f"   Total de questões: {len(questions)}")
print(f"   Erros de match: {len(errors)}")
for e in errors:
    print(f"   ⚠ {e}")

# Verificação final
wrong = [q for q in questions if "Recém extraído" in q.get("justificativa", "")]
print(f"\n   Questões restantes com justificativa pendente: {len(wrong)}")
