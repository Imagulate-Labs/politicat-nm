# -*- coding: utf-8 -*-
# Splice the generated pictorial SVG into explore.html, replacing the tile-grid container.
BASE = r"C:\Users\alexi\AppData\Local\Temp\claude\c--projects-politicat-nm\37426826-b003-4494-b4d9-1e53671b6373\scratchpad"
PAGE = r"c:\projects\politicat-nm\explore.html"

svg = open(BASE + r"\nm_map_fragment.svg", encoding="utf-8").read()
html = open(PAGE, encoding="utf-8").read()

old_map = '<div class="county-map" id="countyMap" role="list" aria-label="Select a New Mexico county"></div>'
new_map = '<div class="nm-map-wrap" id="countyMap">\n' + svg + '\n            </div>'
assert old_map in html, "map container not found"
html = html.replace(old_map, new_map)

old_scale = '<div class="map-scale" aria-label="Registered voter scale"><span>Fewer registered voters</span><i></i><i></i><i></i><i></i><span>More</span></div>'
new_hint = '<p class="map-hint">🐾 Tap any county to open its civic snapshot — or use the dropdown above.</p>'
assert old_scale in html, "map scale not found"
html = html.replace(old_scale, new_hint)

html = html.replace('aria-label="New Mexico county voter map"', 'aria-label="New Mexico county map"')

open(PAGE, 'w', encoding='utf-8', newline='\n').write(html)
print("spliced OK,", len(html)//1024, "KB total")
