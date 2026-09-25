import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # The block we want to match:
    # <a href="signup.html" ...>Sign Up</a>
    # <button id="theme-toggle" ...
    # ...
    # </button>
    # <button id="rtl-toggle" ...
    # ...
    # </button>
    
    # Let's do a more robust regex or string replacement.
    
    pattern = re.compile(
        r'(<a href="signup\.html"[^>]*>Sign Up</a>)\s*'
        r'(<button id="theme-toggle"[\s\S]*?</button>)\s*'
        r'(<button id="rtl-toggle"[\s\S]*?</button>)',
        re.MULTILINE
    )
    
    def replacer(match):
        signup = match.group(1)
        theme = match.group(2)
        rtl = match.group(3)
        # Assuming the indentation matches the first one. Let's just put newlines and match indent.
        return f"{rtl}\n                    {theme}\n                    {signup}"

    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
