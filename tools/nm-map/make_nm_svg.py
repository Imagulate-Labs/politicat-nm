# Convert Census 2010 5m county GeoJSON -> NM county SVG paths + centroids.
# Projection: equirectangular scaled by cos(mid-lat) — fine at state scale.
import json, math, io, sys

SRC = r"C:\Users\alexi\AppData\Local\Temp\claude\c--projects-politicat-nm\37426826-b003-4494-b4d9-1e53671b6373\scratchpad\us_counties_5m.json"
OUT = r"C:\Users\alexi\AppData\Local\Temp\claude\c--projects-politicat-nm\37426826-b003-4494-b4d9-1e53671b6373\scratchpad\nm_counties_svg.json"
PREVIEW = r"C:\Users\alexi\AppData\Local\Temp\claude\c--projects-politicat-nm\37426826-b003-4494-b4d9-1e53671b6373\scratchpad\nm_preview.svg"

# FIPS -> canonical display name (site convention: Doña Ana with tilde)
FIPS_NAMES = {
 '001':'Bernalillo','003':'Catron','005':'Chaves','006':'Cibola','007':'Colfax',
 '009':'Curry','011':'De Baca','013':'Doña Ana','015':'Eddy','017':'Grant',
 '019':'Guadalupe','021':'Harding','023':'Hidalgo','025':'Lea','027':'Lincoln',
 '028':'Los Alamos','029':'Luna','031':'McKinley','033':'Mora','035':'Otero',
 '037':'Quay','039':'Rio Arriba','041':'Roosevelt','043':'Sandoval','045':'San Juan',
 '047':'San Miguel','049':'Santa Fe','051':'Sierra','053':'Socorro','055':'Taos',
 '057':'Torrance','059':'Union','061':'Valencia'
}

raw = json.load(open(SRC, encoding='latin-1'))
feats = [f for f in raw['features'] if f['properties']['STATE'] == '35']
print(f"NM counties found: {len(feats)}")

def rings_of(geom):
    if geom['type'] == 'Polygon':
        return [geom['coordinates']]
    return geom['coordinates']  # MultiPolygon

# collect bounds
all_pts = [pt for f in feats for poly in rings_of(f['geometry']) for ring in poly for pt in ring]
lons = [p[0] for p in all_pts]; lats = [p[1] for p in all_pts]
lon0, lon1 = min(lons), max(lons); lat0, lat1 = min(lats), max(lats)
midlat = (lat0 + lat1) / 2
kx = math.cos(math.radians(midlat))
print(f"lon [{lon0:.3f},{lon1:.3f}] lat [{lat0:.3f},{lat1:.3f}] midlat {midlat:.2f}")

W = 1000.0
sx = W / ((lon1 - lon0) * kx)
H = (lat1 - lat0) * sx
print(f"viewBox 0 0 {W:.0f} {H:.1f}")

def proj(lon, lat):
    x = (lon - lon0) * kx * sx
    y = (lat1 - lat) * sx
    return x, y

def fmt(v):
    s = f"{v:.1f}"
    return s.rstrip('0').rstrip('.') if '.' in s else s

counties = []
total_pts = 0
for f in feats:
    fips = f['properties']['COUNTY']
    name = FIPS_NAMES[fips]
    d_parts = []
    npts = 0
    best_ring = None; best_area = -1
    for poly in rings_of(f['geometry']):
        for ri, ring in enumerate(poly):
            pts = [proj(lon, lat) for lon, lat in ring]
            npts += len(pts)
            d = 'M' + 'L'.join(f"{fmt(x)} {fmt(y)}" for x, y in pts) + 'Z'
            d_parts.append(d)
            if ri == 0:
                # shoelace area + centroid on outer ring
                a = cx = cy = 0.0
                for i in range(len(pts) - 1):
                    x0, y0 = pts[i]; x1, y1 = pts[i+1]
                    cross = x0*y1 - x1*y0
                    a += cross; cx += (x0+x1)*cross; cy += (y0+y1)*cross
                if abs(a) > best_area:
                    best_area = abs(a)
                    best_ring = (cx/(3*a), cy/(3*a)) if a else (pts[0][0], pts[0][1])
    total_pts += npts
    counties.append({
        'fips': '35' + fips, 'name': name,
        'path': ''.join(d_parts),
        'cx': round(best_ring[0], 1), 'cy': round(best_ring[1], 1),
        'points': npts
    })

counties.sort(key=lambda c: c['name'])
print(f"total points: {total_pts}")
for c in counties:
    print(f"  {c['name']:<12} {c['points']:>4} pts  centroid ({c['cx']},{c['cy']})")

json.dump({'viewW': round(W,1), 'viewH': round(H,1), 'counties': counties},
          open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# preview svg
buf = io.StringIO()
buf.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.1f}">\n')
buf.write('<rect width="100%" height="100%" fill="#f6edd8"/>\n')
for i, c in enumerate(counties):
    hue = (i * 47) % 360
    buf.write(f'<path d="{c["path"]}" fill="hsl({hue} 40% 75%)" stroke="#7a5c3a" stroke-width="1.5"/>\n')
for c in counties:
    buf.write(f'<text x="{c["cx"]}" y="{c["cy"]}" font-size="13" text-anchor="middle" font-family="Georgia">{c["name"]}</text>\n')
buf.write('</svg>\n')
open(PREVIEW, 'w', encoding='utf-8').write(buf.getvalue())
print("wrote", OUT, "and preview")
