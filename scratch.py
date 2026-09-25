import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to find grids that have 3 items. 
    # Usually these look like:
    # <div class="grid md:grid-cols-3 gap-8">
    #   <div class="...">...</div>
    #   <div class="...">...</div>
    #   <div class="...">...</div>
    # </div>
    
    # Actually, a simpler way is to just find md:grid-cols-3 and lg:grid-cols-3 and replace them 
    # with md:grid-cols-2 lg:grid-cols-3, but wait, what about centering the 3rd item?
    # It's much easier to just add a CSS rule to style.css!
