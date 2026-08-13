from PIL import Image
import numpy as np, potrace, json

SRC = "/home/user/pslab-homepage/public/logo.jpg"
im = Image.open(SRC).convert("L")
# 4배 확대 후 이진화 → JPG 압축 노이즈 제거 + 곡선 정밀도 확보
S = 4
im = im.resize((im.width*S, im.height*S), Image.LANCZOS)
a = np.array(im)
bmp = (a < 128)                      # True = 검정(잉크)
print("bitmap", bmp.shape, "ink px", int(bmp.sum()))

bitmap = potrace.Bitmap(bmp)
path = bitmap.trace(turdsize=8, alphamax=1.0, opticurve=1, opttolerance=0.2)

# 커브 → SVG path d 문자열 (원본 픽셀 좌표계로 되돌림)
def curves_to_paths(path, scale):
    out = []
    for curve in path:
        d = []
        sp = curve.start_point; sx, sy = sp.x, sp.y
        d.append(f"M{sx/scale:.3f},{sy/scale:.3f}")
        for seg in curve:
            if seg.is_corner:
                c = seg.c; e = seg.end_point
                d.append(f"L{c.x/scale:.3f},{c.y/scale:.3f}L{e.x/scale:.3f},{e.y/scale:.3f}")
            else:
                c1, c2, e = seg.c1, seg.c2, seg.end_point
                d.append(f"C{c1.x/scale:.3f},{c1.y/scale:.3f} {c2.x/scale:.3f},{c2.y/scale:.3f} {e.x/scale:.3f},{e.y/scale:.3f}")
        d.append("Z")
        out.append("".join(d))
    return out

paths = curves_to_paths(path, S)
print("paths:", len(paths))
open("logo_paths.json","w").write(json.dumps({"w": im.width//S, "h": im.height//S, "paths": paths}))

svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {im.width//S} {im.height//S}"><path fill="#000" fill-rule="evenodd" d="{"".join(paths)}"/></svg>'
open("logo_full.svg","w").write(svg)
print("wrote logo_full.svg", len(svg), "bytes")
