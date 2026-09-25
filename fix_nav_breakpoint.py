import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # In the header: switch nav/action visibility breakpoints from lg to xl
    # 1. Desktop nav: hidden lg:flex  ->  hidden xl:flex
    content = content.replace('class="hidden lg:flex space-x-8 items-center"', 'class="hidden xl:flex space-x-8 items-center"')
    # some pages use slightly different spacing
    content = re.sub(r'(nav class="hidden )lg(:flex space-x-8 items-center")', r'\1xl\2', content)

    # 2. Desktop actions div: hidden lg:flex items-center gap-4
    content = content.replace('class="hidden lg:flex items-center gap-4"', 'class="hidden xl:flex items-center gap-4"')

    # 3. Mobile menu button: lg:hidden -> xl:hidden
    content = content.replace('class="lg:hidden flex items-center gap-2"', 'class="xl:hidden flex items-center gap-2"')

    # 4. Mobile nav dropdown: hidden lg:hidden -> hidden xl:hidden
    content = content.replace('"hidden lg:hidden ', '"hidden xl:hidden ')

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
    else:
        print(f"No changes in {file}")
