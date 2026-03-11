import json
import re

def build_modules_json():
    input_file = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\sql\conteudo.md"
    output_file = r"c:\Users\zello\Desktop\conteudoOficial\conteudosssssss\data\modulos.json"
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Regex para encontrar os módulos. Eles começam com '# 📚 Módulo X'
    parts = re.split(r'(?=# 📚 Módulo \d+)', content)
    
    modules_list = []
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
            
        match = re.search(r'# 📚 Módulo (\d+)', part)
        if match:
            mod_num = match.group(1)
            
            modules_list.append({
                "codigo": f"M{mod_num}",
                "markdown": part
            })
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(modules_list, f, indent=2, ensure_ascii=False)
        
    print(f"Sucesso! {len(modules_list)} módulos processados e salvos em modulos.json.")

if __name__ == "__main__":
    build_modules_json()
