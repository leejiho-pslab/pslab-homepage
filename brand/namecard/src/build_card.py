"""P.S.LAB 명함 인쇄용 PDF 생성.

한국 온라인 인쇄소(레드프린팅·성원애드피아 등) 표준 규격:
  재단(완성) 90 x 50 mm / 작업(도련 포함) 92 x 52 mm / 도련 사방 1mm
  안전영역: 재단선 안쪽 3mm / CMYK / 검정 텍스트 K100 / 벡터·폰트 임베드
"""
import os, sys, qrcode
from reportlab.pdfgen import canvas as rlcanvas
from reportlab.lib.units import mm
from reportlab.lib.colors import CMYKColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import logolib

for w in ["Regular", "Medium", "SemiBold", "Bold", "ExtraBold"]:
    pdfmetrics.registerFont(TTFont("P-" + w, f"{HERE}/fonts/Pretendard-{w}.ttf"))

# ---------------- 규격 ----------------
TRIM_W, TRIM_H = 90 * mm, 50 * mm
BLEED = 1 * mm
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED

# ---------------- 색상(CMYK) ----------------
K100  = CMYKColor(0, 0, 0, 1)            # 텍스트·로고용 먹 100 (작은 글씨 번짐 방지)
K60   = CMYKColor(0, 0, 0, 0.60)
K45   = CMYKColor(0, 0, 0, 0.45)
WHITE = CMYKColor(0, 0, 0, 0)
RICH  = CMYKColor(0.40, 0.30, 0.30, 1)   # 넓은 검정 면용 리치블랙(총 잉크량 200%)

# ---------------- 내용 ----------------
NAME, TITLE = "이지호", "소장"
BRAND, TAG = "P.S.LAB", "문제 해결 연구소"
PHONE = "010-9929-5736"
EMAIL = "ceo@pslab.ai.kr"
SITE_URL = "pslab.ai.kr"
INSTA = "@_pslab"
CARD_URL = "https://pslab.ai.kr/card"


def T(x_mm_, y_mm_from_top):
    """재단선 기준(mm, 좌상단 원점, y아래방향) → PDF 좌표(포인트)."""
    return BLEED + x_mm_ * mm, PAGE_H - BLEED - y_mm_from_top * mm


def qr_matrix(data):
    q = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=1, border=0)
    q.add_data(data); q.make(fit=True)
    return q.get_matrix()


def draw_qr(c, data, x, y_top, size, color=K100):
    """QR을 벡터 사각형으로 직접 그린다(래스터 없음 → 인쇄 시 완벽하게 선명)."""
    m = qr_matrix(data)
    n = len(m)
    cell = size / n
    c.setFillColor(color)
    for r, row in enumerate(m):
        run = None
        for col in range(n + 1):
            on = col < n and row[col]
            if on and run is None:
                run = col
            elif not on and run is not None:
                c.rect(x + run * cell, y_top - (r + 1) * cell, (col - run) * cell, cell, fill=1, stroke=0)
                run = None
    return n


# ================= 앞면 =================
def front(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    LEFT = 7.0            # 재단선에서 좌측 여백(mm) — 안전선 3mm보다 여유
    # --- 가로형 로고 락업 ---
    sym_h = 9.2
    x, y = T(LEFT, 5.6)
    sym_w = logolib.draw(c, "symbol", x, y, sym_h * mm, K100) / mm

    gap = 2.8
    tx = LEFT + sym_w + gap
    wm_h, tg_h, inner = 3.5, 1.75, 1.35
    block_h = wm_h + inner + tg_h
    top = 5.6 + (sym_h - block_h) / 2
    x, y = T(tx, top)
    logolib.draw(c, "wordmark", x, y, wm_h * mm, K100)
    x, y = T(tx, top + wm_h + inner)
    logolib.draw(c, "tagline", x, y, tg_h * mm, K100)

    # --- 우상단 업종 한 줄 ---
    c.setFont("P-Medium", 6.0)
    c.setFillColor(K45)
    x, y = T(90 - LEFT, 12.6)
    c.drawRightString(x, y, "16년차 온라인 종합광고대행사")

    # --- 이름 + 직급 ---
    base = 27.0
    c.setFillColor(K100)
    c.setFont("P-ExtraBold", 15)
    x, y = T(LEFT, base)
    c.drawString(x, y, NAME)
    nw = pdfmetrics.stringWidth(NAME, "P-ExtraBold", 15)
    c.setFont("P-Medium", 8.4)
    c.setFillColor(K60)
    c.drawString(x + nw + 2.4 * mm, y + 0.6, TITLE)

    # --- 강조 바 ---
    c.setFillColor(K100)
    x, y = T(LEFT, base + 3.2)
    c.rect(x, y, 11 * mm, 0.9 * mm, fill=1, stroke=0)

    # --- 연락처 ---
    rows = [("M", PHONE), ("E", EMAIL), ("W", SITE_URL), ("IG", INSTA)]
    top = 34.8
    step = 3.5
    for i, (label, val) in enumerate(rows):
        yy = top + i * step
        x, y = T(LEFT, yy)
        c.setFont("P-Bold", 5.6)
        c.setFillColor(K45)
        c.drawString(x, y, label)
        c.setFont("P-SemiBold", 7.6)
        c.setFillColor(K100)
        c.drawString(x + 5.4 * mm, y, val)

    # --- QR (온라인 명함) ---
    qs = 13.6
    qx = 90 - 7.0 - qs
    x, y = T(qx, 28.2)
    draw_qr(c, CARD_URL, x, y, qs * mm, K100)
    c.setFont("P-Medium", 5.2)
    c.setFillColor(K45)
    x, y = T(qx + qs / 2, 28.2 + qs + 3.2)
    c.drawCentredString(x, y, "온라인 명함")


# ================= 뒷면 =================
def back(c):
    c.setFillColor(RICH)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)   # 도련까지 꽉 채움

    cx = 45.0
    sym_h = 13.6
    sym_w = logolib.ASPECT["symbol"] * sym_h
    x, y = T(cx - sym_w / 2, 9.4)
    logolib.draw(c, "symbol", x, y, sym_h * mm, WHITE)

    wm_h = 4.4
    wm_w = logolib.ASPECT["wordmark"] * wm_h
    x, y = T(cx - wm_w / 2, 26.4)
    logolib.draw(c, "wordmark", x, y, wm_h * mm, WHITE)

    tg_h = 1.95
    tg_w = logolib.ASPECT["tagline"] * tg_h
    x, y = T(cx - tg_w / 2, 33.0)
    logolib.draw(c, "tagline", x, y, tg_h * mm, WHITE)

    line = "BRAND · PERFORMANCE · CONTENT · ALWAYS ON"
    fs, cs = 5.4, 1.5
    w = pdfmetrics.stringWidth(line, "P-SemiBold", fs) + cs * (len(line) - 1)
    x, y = T(cx, 42.6)
    to = c.beginText(x - w / 2, y)
    to.setFont("P-SemiBold", fs)
    to.setFillColor(CMYKColor(0, 0, 0, 0.18))         # 검정 위 옅은 회색 = 은은한 라인
    to.setCharSpace(cs)
    to.textOut(line)
    c.drawText(to)


def _canvas(path):
    c = rlcanvas.Canvas(
        path,
        pagesize=(PAGE_W, PAGE_H),
        # 기본값 Helvetica 는 임베드되지 않아 인쇄소 프리플라이트에서 반려된다.
        # 시작 폰트를 임베드 폰트로 지정해 비임베드 폰트 참조 자체를 없앤다.
        initialFontName="P-Regular",
        # 재단선/도련선을 PDF 에 명시 → 인쇄소가 어디서 자를지 정확히 인식
        bleedBox=(0, 0, PAGE_W, PAGE_H),
        trimBox=(BLEED, BLEED, BLEED + TRIM_W, BLEED + TRIM_H),
        enforceColorSpace="CMYK",
    )
    c.setTitle("P.S.LAB 명함 (인쇄용)")
    c.setAuthor("P.S.LAB")
    c.setSubject("90x50mm 재단 / 92x52mm 작업(도련 1mm) / CMYK")
    return c


def build(outdir):
    os.makedirs(outdir, exist_ok=True)
    # 1) 앞뒤 2페이지 통합본 — 대부분의 인쇄소가 이 형식을 받는다
    c = _canvas(f"{outdir}/pslab-namecard-print.pdf")
    front(c); c.showPage(); back(c); c.showPage(); c.save()
    # 2) 앞·뒤 분리본 — 면별 업로드를 요구하는 인쇄소용
    for name, fn in (("front", front), ("back", back)):
        c = _canvas(f"{outdir}/pslab-namecard-{name}.pdf")
        fn(c); c.showPage(); c.save()
    for f in sorted(os.listdir(outdir)):
        print(" ", f, os.path.getsize(f"{outdir}/{f}"), "bytes")


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else f"{HERE}/out")
