import os, sys
sys.path.insert(0, "."); import logolib

OUT = "/home/user/pslab-homepage/public/brand"
os.makedirs(OUT, exist_ok=True)

def part_svg(name, pad=0):
    bx0, by0, bx1, by1 = logolib.BBOX[name]
    w, h = bx1 - bx0, by1 - by0
    ds = "".join(logolib.PATHS[i] for i in logolib.GROUPS[name])
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx0-pad:.2f} {by0-pad:.2f} {w+2*pad:.2f} {h+2*pad:.2f}" '
            f'fill="currentColor" role="img"><path fill-rule="evenodd" d="{ds}"/></svg>')

for n in ("symbol", "wordmark", "tagline"):
    open(f"{OUT}/{n}.svg", "w").write(part_svg(n))
    b = logolib.BBOX[n]
    print(f"{n:9s} {b[2]-b[0]:7.1f} x {b[3]-b[1]:6.1f}  aspect {logolib.ASPECT[n]:.3f}")

# 세로형 락업 (심볼 위 / 워드마크 / 태그라인)
def lockup_vertical():
    S, W, T_ = logolib.BBOX["symbol"], logolib.BBOX["wordmark"], logolib.BBOX["tagline"]
    parts, y = [], 0.0
    gapA, gapB = 62.0, 26.0
    for name, bb, gap in (("symbol", S, gapA), ("wordmark", W, gapB), ("tagline", T_, 0)):
        w, h = bb[2]-bb[0], bb[3]-bb[1]
        parts.append((name, bb, w, h, y)); y += h + gap
    total_h, total_w = y, max(p[2] for p in parts)
    g = []
    for name, bb, w, h, oy in parts:
        ds = "".join(logolib.PATHS[i] for i in logolib.GROUPS[name])
        dx, dy = (total_w - w)/2 - bb[0], oy - bb[1]
        g.append(f'<g transform="translate({dx:.2f} {dy:.2f})"><path fill-rule="evenodd" d="{ds}"/></g>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w:.2f} {total_h:.2f}" '
            f'fill="currentColor" role="img">{"".join(g)}</svg>')

# 가로형 락업 (심볼 왼쪽 / 오른쪽에 워드마크+태그라인)
def lockup_horizontal():
    S, W, T_ = logolib.BBOX["symbol"], logolib.BBOX["wordmark"], logolib.BBOX["tagline"]
    sh = S[3]-S[1]; sw = S[2]-S[0]
    scale = 1.0
    wh = W[3]-W[1]; ww = W[2]-W[0]
    th = T_[3]-T_[1]; tw = T_[2]-T_[0]
    inner = wh * 0.42
    block_h = wh + inner + th
    gap = sw * 0.44
    total_w = sw + gap + max(ww, tw)
    total_h = max(sh, block_h)
    top = (total_h - block_h) / 2
    g = []
    def add(name, bb, dx, dy):
        ds = "".join(logolib.PATHS[i] for i in logolib.GROUPS[name])
        g.append(f'<g transform="translate({dx-bb[0]:.2f} {dy-bb[1]:.2f})"><path fill-rule="evenodd" d="{ds}"/></g>')
    add("symbol", S, 0, (total_h - sh)/2)
    add("wordmark", W, sw + gap, top)
    add("tagline", T_, sw + gap, top + wh + inner)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w:.2f} {total_h:.2f}" '
            f'fill="currentColor" role="img">{"".join(g)}</svg>')

open(f"{OUT}/logo-vertical.svg","w").write(lockup_vertical())
open(f"{OUT}/logo-horizontal.svg","w").write(lockup_horizontal())
for f in sorted(os.listdir(OUT)):
    print(" ", f, os.path.getsize(f"{OUT}/{f}"), "bytes")
