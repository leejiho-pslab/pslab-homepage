"""벡터화된 P.S.LAB 로고를 reportlab 캔버스에 그리는 도우미."""
import json, re

_d = json.load(open(__file__.rsplit("/", 1)[0] + "/logo_paths.json"))
PATHS = _d["paths"]

# 추적 결과를 육안 검수해 구성요소별로 분류 (0번은 JPG 테두리 노이즈라 제외)
GROUPS = {
    "symbol":   [29, 30, 31, 32, 33, 34],           # 전구 + 우상단 점
    "wordmark": [22, 23, 24, 25, 26, 27, 28],       # P.S.LAB
    "tagline":  list(range(1, 22)),                 # 문제 해결 연구소
}

_num = re.compile(r"-?\d+\.?\d*")


def _pts(ds):
    v = [float(x) for x in _num.findall(ds)]
    return list(zip(v[0::2], v[1::2]))


def bbox(name):
    xs, ys = [], []
    for i in GROUPS[name]:
        for x, y in _pts(PATHS[i]):
            xs.append(x); ys.append(y)
    return min(xs), min(ys), max(xs), max(ys)


BBOX = {k: bbox(k) for k in GROUPS}
ASPECT = {k: (b[2] - b[0]) / (b[3] - b[1]) for k, b in BBOX.items()}  # 가로/세로


_tok = re.compile(r"([MLCZ])([^MLCZ]*)")


def draw(c, name, x, y_top, h, color=None):
    """캔버스 c 에 로고 구성요소를 그린다.
    x, y_top : 왼쪽·위 기준 좌표(포인트, PDF 좌표계에서 y_top 은 위쪽 y값)
    h        : 목표 높이(포인트). 가로는 비율대로 자동.
    """
    bx0, by0, bx1, by1 = BBOX[name]
    s = h / (by1 - by0)

    def T(px, py):
        return x + (px - bx0) * s, y_top - (py - by0) * s   # y 뒤집기

    if color is not None:
        c.setFillColor(color)

    p = c.beginPath()
    for i in GROUPS[name]:
        for cmd, body in _tok.findall(PATHS[i]):
            v = [float(t) for t in _num.findall(body)]
            if cmd == "M":
                p.moveTo(*T(v[0], v[1]))
            elif cmd == "L":
                for j in range(0, len(v), 2):
                    p.lineTo(*T(v[j], v[j + 1]))
            elif cmd == "C":
                for j in range(0, len(v), 6):
                    a = T(v[j], v[j + 1]); b = T(v[j + 2], v[j + 3]); e = T(v[j + 4], v[j + 5])
                    p.curveTo(a[0], a[1], b[0], b[1], e[0], e[1])
            elif cmd == "Z":
                p.close()
    # potrace 는 구멍을 역방향으로 그리므로 even-odd 로 채워야 정확하다
    c.drawPath(p, fill=1, stroke=0, fillMode=1)
    return (bx1 - bx0) * s   # 실제 그려진 가로 폭 반환
