

import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    if file == 'dashboard.html' or file == 'login.html' or file == 'signup.html' or file == '404.html' or file == 'coming-soon.html':
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop Nav update
    desktop_pattern = r'(<a href="index\.html"[^>]*>Home</a>)'
    
    if file == 'home-2.html':
        # home-2.html has Home 1 and Home 2 already
        # Let's just add Dashboard after Home 2
        # Desktop
        content = re.sub(r'(<a href="home-2\.html"[^>]*>Home 2</a>)', r'\1\n                        <a href="dashboard.html" class="text-theme-muted hover:text-primary font-medium text-sm uppercase tracking-wide transition-colors">Dashboard</a>', content)
        # Mobile
        content = re.sub(r'(<a href="home-2\.html"[^>]*>Home 2</a>)(?![^<]*Dashboard)', r'\1\n                <a href="dashboard.html" class="block font-medium py-2 border-b border-theme-border/50">Dashboard</a>', content)
    else:
        # Standard pages
        # Desktop (uses 20 spaces indent typically)
        def replace_desktop(match):
            return match.group(1) + '\n                    <a href="home-2.html" class="text-theme-text hover:text-primary transition-colors">Home 2</a>\n                    <a href="dashboard.html" class="text-theme-text hover:text-primary transition-colors">Dashboard</a>'
        
        # Mobile (uses 16 spaces indent typically, has block class)
        def replace_nav(match):
            original = match.group(1)
            if 'block' in original: # It's mobile
                return original + '\n                <a href="home-2.html" class="block text-theme-text py-2">Home 2</a>\n                <a href="dashboard.html" class="block text-theme-text py-2">Dashboard</a>'
            else: # It's desktop
                return original + '\n                    <a href="home-2.html" class="text-theme-text hover:text-primary transition-colors">Home 2</a>\n                    <a href="dashboard.html" class="text-theme-text hover:text-primary transition-colors">Dashboard</a>'

        content = re.sub(desktop_pattern, replace_nav, content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file}")
