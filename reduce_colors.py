import re

file_path = "browse-skills.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace text-yellow-400 with text-primary
content = content.replace("text-yellow-400", "text-primary")

# Replace bg-secondary/10 text-secondary with bg-primary/10 text-primary
content = content.replace("bg-secondary/10 text-secondary", "bg-primary/10 text-primary")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated {file_path}")
