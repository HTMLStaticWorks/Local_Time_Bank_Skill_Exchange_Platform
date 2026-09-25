import re

files = [
    "how-it-works.html",
    "browse-skills.html",
    "member-stories.html",
    "contact.html"
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We are looking for an <h1> tag, followed by whitespace and a <p> tag.
    # We want to add max-w-2xl mx-auto to that <p> tag's class attribute.
    
    def replacer(match):
        h1 = match.group(1)
        p_start = match.group(2)
        p_class = match.group(3)
        p_rest = match.group(4)
        
        # Remove existing max-w-* and mx-auto if any
        new_class = re.sub(r'max-w-\w+|mx-auto', '', p_class)
        new_class = " ".join(new_class.split()) + " max-w-2xl mx-auto"
        
        return f'{h1}{p_start}class="{new_class}"{p_rest}'

    # regex to match h1 block then p block
    pattern = re.compile(r'(<h1[^>]*>.*?</h1>\s*)(<p\s+)class="([^"]*)"([^>]*>)', re.DOTALL | re.IGNORECASE)
    
    # We only want to replace the first occurrence (the hero section)
    new_content = pattern.sub(replacer, content, count=1)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes in {file_path}")
