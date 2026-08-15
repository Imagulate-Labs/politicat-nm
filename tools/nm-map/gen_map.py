# -*- coding: utf-8 -*-
# PolitíCat NM — vintage pictorial county map generator.
# Reads nm_counties_svg.json (projected county paths) and emits:
#   nm_map_fragment.svg  — the SVG to inline into explore.html
#   nm_map_preview.html  — standalone preview with site fonts
import json, math

BASE = r"C:\Users\alexi\AppData\Local\Temp\claude\c--projects-politicat-nm\37426826-b003-4494-b4d9-1e53671b6373\scratchpad"
geo = json.load(open(BASE + r"\nm_counties_svg.json", encoding="utf-8"))

# same projection constants as make_nm_svg.py
LON0, LON1 = -109.050172, -103.002199
LAT0, LAT1 = 31.332175, 36.999702
MIDLAT = (LAT0 + LAT1) / 2
KX = math.cos(math.radians(MIDLAT))
SX = 1000.0 / ((LON1 - LON0) * KX)

def P(lon, lat):
    return round((lon - LON0) * KX * SX, 1), round((LAT1 - lat) * SX, 1)

VW, VH = geo['viewW'], geo['viewH']  # 1000 x 1132.6

# ---------------- palette ----------------
FILLS = {
 'sage':'#aec98c','butter':'#f2d992','coral':'#e59b6f','rose':'#de9a90',
 'dteal':'#9cc4b4','sand':'#e0c084','lavender':'#c7abd6'
}
COUNTY_COLOR = {
 'San Juan':'butter','Rio Arriba':'sage','Taos':'coral','Colfax':'dteal','Union':'butter',
 'McKinley':'rose','Sandoval':'dteal','Los Alamos':'coral','Santa Fe':'butter','Mora':'sand',
 'Harding':'sage','San Miguel':'lavender','Quay':'coral','Curry':'dteal','Bernalillo':'lavender',
 'Cibola':'sage','Valencia':'coral','Torrance':'dteal','Guadalupe':'butter','De Baca':'rose',
 'Roosevelt':'lavender','Socorro':'sand','Catron':'coral','Lincoln':'sage','Chaves':'butter',
 'Lea':'rose','Eddy':'dteal','Otero':'rose','Doña Ana':'butter','Sierra':'dteal',
 'Grant':'sand','Luna':'sage','Hidalgo':'coral'
}
INK    = '#4a3520'   # label ink
BORDER = '#7c5a36'   # county borders
PARCH  = '#f4e8cd'   # parchment inside frame
SURR   = '#e8d9b4'   # surrounding-states wash
RIVER  = '#5b93b8'
CLAY   = '#b23a48'   # brand clay — banner + route 66

# county label overrides: name -> (dx, dy, size, hide)
LBL = {
 'Los Alamos': (14, -8, 8, True),
 'Bernalillo': (-34, 16, 9, False),
 'Valencia':   (-6, 10, 10, False),
 'Santa Fe':   (2, 26, 10.5, False),
 'Sandoval':   (16, 20, 12, False),
 'Rio Arriba': (10, 26, 12, False),
 'Taos':       (-6, 30, 12, False),
 'Mora':       (6, 10, 11, False),
 'Harding':    (0, 14, 11, False),
 'San Miguel': (6, 16, 11.5, False),
 'Quay':       (0, 22, 11.5, False),
 'Curry':      (-12, 22, 10.5, False),
 'De Baca':    (0, 28, 10, False),
 'Roosevelt':  (-6, 24, 10.5, False),
 'Guadalupe':  (0, 14, 11, False),
 'Colfax':     (-4, 34, 12, False),
 'Union':      (0, 20, 12, False),
 'Doña Ana':   (6, -20, 11, False),
 'Hidalgo':    (6, -26, 10, False),
 'Luna':       (0, 12, 11, False),
 'Grant':      (6, -16, 12, False),
 'Sierra':     (-26, -18, 12, False),
 'Otero':      (-14, 20, 13, False),
 'Eddy':       (-6, 22, 12, False),
 'Lea':        (0, 30, 12, False),
 'Chaves':     (10, 26, 13, False),
 'Lincoln':    (-10, 60, 13, False),
 'Socorro':    (14, 20, 13, False),
 'Catron':     (0, -20, 13, False),
 'Cibola':     (-24, 4, 13, False),
 'McKinley':   (0, 20, 13, False),
 'San Juan':   (0, 30, 13, False),
 'Torrance':   (0, 14, 12, False),
}

# ---------------- rivers ----------------
RIO_GRANDE = [(-105.72,37.00),(-105.71,36.75),(-105.74,36.55),(-105.68,36.32),(-105.83,36.16),
 (-106.06,36.06),(-106.10,35.93),(-106.15,35.78),(-106.22,35.62),(-106.30,35.48),
 (-106.55,35.30),(-106.65,35.08),(-106.68,34.85),(-106.74,34.60),(-106.85,34.35),
 (-106.89,34.06),(-106.92,33.80),(-107.00,33.55),(-107.18,33.35),(-107.20,33.15),
 (-107.28,32.90),(-107.20,32.75),(-107.15,32.62),(-106.95,32.45),(-106.78,32.32),
 (-106.62,32.10),(-106.53,31.90),(-106.49,31.78)]
PECOS = [(-105.66,35.74),(-105.40,35.50),(-105.20,35.35),(-104.95,35.18),(-104.75,35.05),
 (-104.68,34.94),(-104.45,34.70),(-104.24,34.47),(-104.35,34.20),(-104.42,33.90),
 (-104.50,33.60),(-104.52,33.39),(-104.45,33.10),(-104.40,32.84),(-104.30,32.60),
 (-104.23,32.42),(-104.10,32.20),(-104.05,32.00)]
SAN_JUAN_R = [(-107.55,36.85),(-107.90,36.80),(-108.22,36.73),(-108.55,36.75),(-108.83,36.72),(-109.04,36.90)]
CANADIAN = [(-104.85,36.85),(-104.70,36.55),(-104.55,36.30),(-104.35,36.05),(-104.30,35.80),
 (-104.10,35.55),(-103.80,35.45),(-103.55,35.40),(-103.30,35.42),(-103.01,35.45)]
GILA = [(-108.10,33.35),(-108.35,33.20),(-108.55,33.05),(-108.75,32.95),(-108.90,32.85),(-109.04,32.78)]

ROUTE66 = [(-103.01,35.20),(-103.35,35.18),(-103.72,35.17),(-104.20,35.05),(-104.68,34.94),
 (-105.20,35.00),(-105.68,35.03),(-106.05,35.02),(-106.40,35.06),(-106.65,35.08),
 (-107.20,35.10),(-107.85,35.15),(-108.35,35.35),(-108.74,35.52),(-109.04,35.62)]

def poly(points):
    pts = [P(lon, lat) for lon, lat in points]
    return 'M' + ' L'.join(f"{x} {y}" for x, y in pts)

# ---------------- cities ----------------
# name, lon, lat, anchor(start|middle|end), dx, dy, capital?
CITIES = [
 ('Farmington',   -108.22,36.73,'start',  5,-4, False),
 ('Gallup',       -108.74,35.52,'start',  5,12, False),
 ('Grants',       -107.85,35.15,'middle', 0,-7, False),
 ('Albuquerque',  -106.65,35.08,'start',  7, 3, False),
 ('Santa Fe',     -105.94,35.69,'start',  7, 1, True),
 ('Taos',         -105.57,36.41,'start',  6, 3, False),
 ('Raton',        -104.44,36.90,'start',  5, 9, False),
 ('Las Vegas',    -105.22,35.59,'start',  6, 5, False),
 ('Clayton',      -103.18,36.45,'end',   -5, 3, False),
 ('Tucumcari',    -103.72,35.17,'middle', 0,-7, False),
 ('Santa Rosa',   -104.68,34.94,'start',  5,10, False),
 ('Clovis',       -103.20,34.40,'end',   -5, 0, False),
 ('Portales',     -103.33,34.19,'end',   -5, 8, False),
 ('Roswell',      -104.52,33.39,'start',  6, 2, False),
 ('Carlsbad',     -104.23,32.42,'start',  6, 2, False),
 ('Hobbs',        -103.14,32.71,'end',   -5, 8, False),
 ('Alamogordo',   -105.96,32.90,'start',  6, 3, False),
 ('Las Cruces',   -106.78,32.32,'start',  7, 0, False),
 ('Deming',       -107.76,32.27,'middle', 0,12, False),
 ('Silver City',  -108.28,32.77,'end',   -5,-2, False),
 ('Socorro',      -106.89,34.06,'start',  6, 2, False),
 ('T or C',       -107.25,33.13,'start',  7, 0, False),
 ('Los Alamos',   -106.31,35.89,'end',   -5,-2, False),
 ('Chama',        -106.58,36.90,'end',   -6, 3, False),
 ('Ruidoso',      -105.67,33.33,'start',  6, 3, False),
]

# ---------------- landmarks ----------------
# emoji, lon, lat, label, label_dy, emoji_size
MARKS = [
 ('🎈', -106.62,35.26,'', 0, 30),
 ('🛸', -104.48,33.64,'UFO COUNTRY · 1947', -14, 28),
 ('🦇', -104.46,32.17,'CARLSBAD CAVERNS', 16, 26),
 ('🌶️',-107.10,32.60,'HATCH CHILE', 16, 24),
 ('⚛️', -106.44,36.03,'', 0, 20),
 ('📡', -107.62,34.08,'VERY LARGE ARRAY', 16, 24),
 ('🥧', -108.15,34.32,'PIE TOWN', 15, 20),
 ('🐻', -105.50,33.70,"SMOKEY BEAR'S HOME", -16, 24),
 ('🤠', -104.20,34.42,"BILLY THE KID'S GRAVE", 16, 22),
 ('🤿', -104.66,35.08,'BLUE HOLE', -18, 18),
 ('⛷️', -105.45,36.62,'TAOS SKI VALLEY', 15, 22),
 ('🚂', -106.42,36.94,'', 0, 24),
 ('🌋', -103.97,36.80,'CAPULIN VOLCANO', 16, 22),
 ('🏕️',-105.00,36.44,'PHILMONT', 15, 20),
 ('🚀', -107.00,32.94,'SPACEPORT AMERICA', 16, 24),
 ('🌲', -108.50,33.40,'GILA WILDERNESS', 16, 24),
 ('🐄', -103.55,34.72,'', 0, 22),
 ('🛢️',-103.52,32.45,'OIL PATCH', 15, 22),
 ('🐎', -105.78,33.37,'', 0, 20),
 ('🏺', -107.96,36.06,'CHACO CANYON', 16, 22),
]

# plain small-caps labels (no emoji): text, lon, lat, size, italic?
PLAIN = [
 ('NAVAJO NATION',        -108.55,36.28, 10.5, False),
 ('JICARILLA APACHE NATION',-106.98,36.58, 9.5, False),
 ('MESCALERO APACHE RES.', -105.52,32.97, 9.5, False),
 ('ZUNI PUEBLO',          -108.68,35.14, 9.5, False),
 ('ACOMA SKY CITY',       -107.55,34.76, 9.5, False),
 ('TRINITY SITE · 1945',  -106.45,33.66, 9.0, False),
 ('WHITE SANDS',          -106.32,32.78, 10.0, False),
 ('SHIPROCK',             -108.84,36.62, 9.5, False),
 ('ELEPHANT BUTTE',       -106.92,33.35, 9.0, False),
 ('BOSQUE DEL APACHE',    -107.38,33.72, 9.0, False),
]

def esc(s):
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')

def slug(name):
    return name.lower().replace('ñ','n').replace(' ','-')

S = []
w = S.append

# margins: left/right 45, top 45, bottom 120 (banner/compass live in-frame)
X0, Y0, XW, YH = -45, -45, 1090, VH + 45 + 118
w(f'<svg class="nm-map" xmlns="http://www.w3.org/2000/svg" viewBox="{X0} {Y0} {XW} {YH}" role="group" aria-label="Pictorial map of New Mexico. Every county is a button; select one to see its voter snapshot.">')

# ---- defs ----
w('''<defs>
<filter id="nmWobble" x="-3%" y="-3%" width="106%" height="106%">
  <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="3" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/>
</filter>
<filter id="nmShadow" x="-6%" y="-6%" width="112%" height="112%">
  <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#5a3a1b" flood-opacity="0.35"/>
</filter>
</defs>''')

# ---- parchment ground + frame ----
w(f'<rect x="{X0}" y="{Y0}" width="{XW}" height="{YH}" fill="{SURR}"/>')
w(f'<rect x="{X0+10}" y="{Y0+10}" width="{XW-20}" height="{YH-20}" fill="none" stroke="{BORDER}" stroke-width="3" opacity=".85"/>')
w(f'<rect x="{X0+17}" y="{Y0+17}" width="{XW-34}" height="{YH-34}" fill="{PARCH}" stroke="{BORDER}" stroke-width="1.2" opacity=".95"/>')

# neighbor state labels
NEIGH = [('COLO.',400,-8,0),('OKLA.',985,-8,0),
         ('ARIZ.',-26,520,-90),('TEXAS',1030,640,90),
         ('TEXAS',498,1052,0),('MEXICO',225,1104,0)]
for t,x,y,rot in NEIGH:
    tr = f' transform="rotate({rot} {x} {y})"' if rot else ''
    w(f'<text x="{x}" y="{y}" font-family="Libre Franklin,sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="{BORDER}" opacity=".7" text-anchor="middle"{tr}>{t}</text>')

# four corners tick — small cross at the corner + label just inside San Juan
fx, fy = P(-109.045, 36.999)
w(f'<path d="M{fx-8} {fy} H{fx+8} M{fx} {fy-8} V{fy+8}" stroke="{BORDER}" stroke-width="1.6" opacity=".9" pointer-events="none"/>')
w(f'<text x="{fx+58}" y="{fy+14}" font-family="Libre Franklin,sans-serif" font-size="8.5" font-weight="700" letter-spacing="1" fill="{BORDER}" opacity=".85" text-anchor="middle" pointer-events="none">FOUR CORNERS</text>')

# ---- counties (shadow wraps wobble) ----
w('<g filter="url(#nmShadow)"><g filter="url(#nmWobble)">')
w(f'<g id="nmCounties" stroke="#6b4a28" stroke-width="1.8" stroke-linejoin="round">')
for c in geo['counties']:
    fill = FILLS[COUNTY_COLOR[c['name']]]
    nm = esc(c['name'])
    w(f'<path class="county-shape" d="{c["path"]}" fill="{fill}" data-county="{slug(c["name"])}" data-name="{nm}" tabindex="0" role="button" aria-label="{nm} County"/>')
w('</g></g></g>')

# ---- rivers ----
w(f'<g fill="none" stroke="{RIVER}" stroke-linecap="round" stroke-linejoin="round" opacity=".75" pointer-events="none">')
w(f'<path d="{poly(RIO_GRANDE)}" stroke-width="3.4"/>')
w(f'<path d="{poly(PECOS)}" stroke-width="2.2"/>')
w(f'<path d="{poly(SAN_JUAN_R)}" stroke-width="2.2"/>')
w(f'<path d="{poly(CANADIAN)}" stroke-width="1.8"/>')
w(f'<path d="{poly(GILA)}" stroke-width="1.8"/>')
w('</g>')
# river labels
rx, ry = P(-106.98, 34.62)
w(f'<text x="{rx}" y="{ry}" font-family="Fraunces,Georgia,serif" font-style="italic" font-size="11" fill="{RIVER}" text-anchor="middle" transform="rotate(-72 {rx} {ry})" pointer-events="none">Rio Grande</text>')
px, py = P(-104.15, 34.05)
w(f'<text x="{px}" y="{py}" font-family="Fraunces,Georgia,serif" font-style="italic" font-size="10" fill="{RIVER}" text-anchor="middle" transform="rotate(-65 {px} {py})" pointer-events="none">Pecos</text>')

# ---- route 66 ----
w(f'<path d="{poly(ROUTE66)}" fill="none" stroke="{CLAY}" stroke-width="2.4" stroke-dasharray="9 6" stroke-linecap="round" opacity=".8" pointer-events="none"/>')
for lon, lat in [(-103.32,35.34),(-107.5,35.12)]:
    x, y = P(lon, lat)
    w(f'<g pointer-events="none"><circle cx="{x}" cy="{y-14}" r="9" fill="{PARCH}" stroke="{CLAY}" stroke-width="1.6"/>'
      f'<text x="{x}" y="{y-10.5}" font-family="Libre Franklin,sans-serif" font-size="9" font-weight="800" fill="{CLAY}" text-anchor="middle">66</text></g>')

# ---- white sands blobs ----
wx, wy = P(-106.35, 32.92)
w(f'<g pointer-events="none" opacity=".9"><ellipse cx="{wx}" cy="{wy}" rx="26" ry="11" fill="#fdfaf1" stroke="#d8c9a5" stroke-width="1"/>'
  f'<ellipse cx="{wx-14}" cy="{wy+9}" rx="16" ry="7" fill="#fdfaf1" stroke="#d8c9a5" stroke-width="1"/>'
  f'<ellipse cx="{wx+16}" cy="{wy+8}" rx="13" ry="6" fill="#fdfaf1" stroke="#d8c9a5" stroke-width="1"/></g>')

# elephant butte lake blob
ex, ey = P(-107.17, 33.30)
w(f'<ellipse cx="{ex}" cy="{ey}" rx="6" ry="13" fill="{RIVER}" opacity=".65" pointer-events="none" transform="rotate(12 {ex} {ey})"/>')

# shiprock monolith
sx_, sy_ = P(-108.84, 36.69)
w(f'<path d="M{sx_-7} {sy_+6} L{sx_-2} {sy_-8} L{sx_} {sy_-2} L{sx_+2} {sy_-9} L{sx_+7} {sy_+6} Z" fill="#8a6a48" stroke="{INK}" stroke-width=".8" pointer-events="none"/>')

# bosque birds
bx, by = P(-106.98, 33.79)
for i,(dx,dy) in enumerate([(0,0),(12,-6),(24,2)]):
    w(f'<path d="M{bx+dx-5} {by+dy} q5 -6 10 0 q-5 -3 -10 0Z" fill="none" stroke="{INK}" stroke-width="1.1" opacity=".7" pointer-events="none"/>')

# ---- county names ----
w(f'<g pointer-events="none" font-family="Fraunces,Georgia,serif" fill="{INK}" text-anchor="middle" style="letter-spacing:.4px">')
for c in geo['counties']:
    dx, dy, size, hide = LBL.get(c['name'], (0, 0, 12, False))
    if hide: continue
    disp = c['name'].upper()
    w(f'<text x="{c["cx"]+dx}" y="{c["cy"]+dy}" font-size="{size}" font-weight="600" opacity=".78">{esc(disp)}</text>')
w('</g>')

# ---- cities ----
w(f'<g pointer-events="none">')
for name, lon, lat, anch, dx, dy, cap in CITIES:
    x, y = P(lon, lat)
    if cap:
        w(f'<path d="M{x} {y-6} L{x+1.8} {y-1.8} L{x+6} {y-1.4} L{x+2.8} {y+1.6} L{x+3.8} {y+6} L{x} {y+3.4} L{x-3.8} {y+6} L{x-2.8} {y+1.6} L{x-6} {y-1.4} L{x-1.8} {y-1.8} Z" fill="{CLAY}" stroke="{INK}" stroke-width=".6"/>')
    else:
        w(f'<circle cx="{x}" cy="{y}" r="2.6" fill="{INK}"/>')
    w(f'<text x="{x+dx}" y="{y+dy}" font-family="Libre Franklin,sans-serif" font-size="10.5" font-weight="700" fill="{INK}" text-anchor="{ {"start":"start","middle":"middle","end":"end"}[anch] }">{esc(name)}</text>')
w('</g>')

# ---- landmarks ----
w('<g pointer-events="none">')
for emoji, lon, lat, label, ldy, esize in MARKS:
    x, y = P(lon, lat)
    w(f'<text x="{x}" y="{y}" font-size="{esize}" text-anchor="middle">{emoji}</text>')
    if label:
        w(f'<text x="{x}" y="{y+ldy}" font-family="Libre Franklin,sans-serif" font-size="8.5" font-weight="800" letter-spacing=".6" fill="{INK}" opacity=".82" text-anchor="middle">{esc(label)}</text>')
for text, lon, lat, size, ital in PLAIN:
    x, y = P(lon, lat)
    style = ' font-style="italic"' if ital else ''
    w(f'<text x="{x}" y="{y}" font-family="Libre Franklin,sans-serif" font-size="{size}" font-weight="800" letter-spacing="1" fill="{INK}" opacity=".62" text-anchor="middle"{style}>{esc(text)}</text>')
w('</g>')

# el paso ghost
gx, gy = P(-106.49, 31.80)
w(f'<text x="{gx}" y="{gy+16}" font-family="Fraunces,Georgia,serif" font-style="italic" font-size="9.5" fill="{BORDER}" opacity=".8" text-anchor="middle" pointer-events="none">El Paso · Cd. Juárez</text>')

# ---- paw print trail (Don Gato wandering) ----
PAWS = [(-104.9,31.95,-18),(-105.1,32.35,10),(-105.35,32.62,-8),(-105.2,33.0,14)]
for lon, lat, rot in PAWS:
    x, y = P(lon, lat)
    w(f'<text x="{x}" y="{y}" font-size="15" opacity=".4" text-anchor="middle" transform="rotate({rot} {x} {y})" pointer-events="none">🐾</text>')

# ---- compass rose ----
cx, cy = 470, VH + 48
w(f'''<g pointer-events="none" transform="translate({cx} {cy})">
<path d="M0 -34 L6 -8 L0 -12 L-6 -8 Z" fill="{INK}"/>
<path d="M0 34 L6 8 L0 12 L-6 8 Z" fill="{PARCH}" stroke="{INK}" stroke-width="1"/>
<path d="M-34 0 L-8 -6 L-12 0 L-8 6 Z" fill="{PARCH}" stroke="{INK}" stroke-width="1"/>
<path d="M34 0 L8 -6 L12 0 L8 6 Z" fill="{PARCH}" stroke="{INK}" stroke-width="1"/>
<circle r="7" fill="#f08a24" stroke="{INK}" stroke-width="1.4"/>
<text y="-40" font-family="Fraunces,Georgia,serif" font-size="14" font-weight="700" fill="{INK}" text-anchor="middle">N</text>
</g>''')

# ---- title banner ----
bx0, by0 = 585, VH + 8
w(f'''<g pointer-events="none">
<path d="M{bx0-24} {by0+14} L{bx0-2} {by0+40} L{bx0-2} {by0-12} Z" fill="#8f2b37"/>
<path d="M{bx0+424} {by0+14} L{bx0+402} {by0+40} L{bx0+402} {by0-12} Z" fill="#8f2b37"/>
<rect x="{bx0-2}" y="{by0-26}" width="404" height="74" fill="{CLAY}" stroke="#8f2b37" stroke-width="2"/>
<text x="{bx0+200}" y="{by0+10}" font-family="'Alfa Slab One',serif" font-size="34" fill="{PARCH}" text-anchor="middle" letter-spacing="2">NEW MEXICO</text>
<text x="{bx0+200}" y="{by0+34}" font-family="Fraunces,Georgia,serif" font-style="italic" font-size="14.5" fill="#f6d9b0" text-anchor="middle">La Tierra del Encanto · The Land of Enchantment</text>
<text x="{bx0+200}" y="{by0+62}" font-family="Libre Franklin,sans-serif" font-size="9" font-weight="700" letter-spacing="1.5" fill="{BORDER}" text-anchor="middle" opacity=".8">UN MAPA DE POLITÍCAT · TOCA UN CONDADO — TAP ANY COUNTY</text>
</g>''')

w('</svg>')

svg = '\n'.join(S)
open(BASE + r"\nm_map_fragment.svg", 'w', encoding='utf-8').write(svg)

preview = f'''<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fraunces:ital,wght@0,600;1,600&family=Libre+Franklin:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>body{{background:#e6d7b8;margin:0;padding:30px;display:flex;justify-content:center}}
.card{{background:#fbf6ea;border-radius:18px;padding:22px;box-shadow:0 18px 40px -12px rgba(15,61,62,.3);max-width:880px;width:100%}}
svg{{width:100%;height:auto;display:block}}</style></head>
<body><div class="card">{svg}</div></body></html>'''
open(BASE + r"\nm_map_preview.html", 'w', encoding='utf-8').write(preview)
print(f"fragment: {len(svg)/1024:.1f} KB")
