
import re
import json
import os

def extract_questions_from_markdown(markdown_content):
    questions = []
    current_question = None
    lines = markdown_content.split('\n')

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check for question start (e.g., "1. AnyAirlines wants...")
        question_match = re.match(r'^\d+\.\s*(.*)', line)
        if question_match:
            if current_question:
                questions.append(current_question)
            current_question = {
                "question": question_match.group(1).strip(),
                "options": []
            }
        # Check for options (e.g., "A. MuleSoft Composer...")
        elif current_question:
            option_match = re.match(r'^[A-D]\.\s*(.*)', line)
            if option_match:
                current_question["options"].append(option_match.group(1).strip())
    if current_question:
        questions.append(current_question)
    return questions

def process_all_proof_files(file_paths):
    all_modules_questions = {}
    for file_path in file_paths:
        # Extract module name from path (e.g., "Modulo 1" from ".../Modulo 1/prova 1.md")
        module_name_match = re.search(r'Modulo\s*\d+', file_path)
        module_name = module_name_match.group(0) if module_name_match else "Unknown Module"

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        questions = extract_questions_from_markdown(content)
        
        if module_name not in all_modules_questions:
            all_modules_questions[module_name] = []
        all_modules_questions[module_name].extend(questions)
            
    return all_modules_questions

if __name__ == "__main__":
    # This list should be populated with the actual file paths
    # For demonstration, I'll use a placeholder. In the actual execution,
    # the agent will provide the correct list.
    proof_files = [
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 7\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 7\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 7\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 3\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 6\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 3\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 6\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 3\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 6\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 8\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 8\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 1\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 8\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 1\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 1\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 2\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 2\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 2\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 4\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 4\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 5\prova 1.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 4\prova 3.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 5\prova 2.md",
        r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modules\Modulo 5\prova 3.md"
    ]
    
    extracted_data = process_all_proof_files(proof_files)
    print(json.dumps(extracted_data, indent=2, ensure_ascii=False))
