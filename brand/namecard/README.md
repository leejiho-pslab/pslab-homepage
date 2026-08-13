# P.S.LAB 명함 (인쇄용)

## 인쇄소에 넘길 파일

| 파일 | 언제 쓰나 |
|---|---|
| `pslab-namecard-print.pdf` | **기본.** 앞면·뒷면이 1·2페이지로 들어간 통합본 |
| `pslab-namecard-front.pdf` | 인쇄소가 면별 업로드를 요구할 때 (앞면) |
| `pslab-namecard-back.pdf` | 인쇄소가 면별 업로드를 요구할 때 (뒷면) |
| `미리보기-*.jpg` | 눈으로 확인용. **인쇄소에 넘기지 말 것** |

## 규격

| 항목 | 값 |
|---|---|
| 재단(완성) 크기 | 90 × 50 mm — 한국 표준 명함 |
| 작업 크기 | 92 × 52 mm (도련 사방 1 mm) |
| 안전 영역 | 재단선 안쪽 3 mm — 모든 글자는 이 안에 있음 |
| 색상 모드 | CMYK |
| 검정 텍스트 | K100 (먹 100) — 4도 검정 미사용, 작은 글씨 번짐 방지 |
| 뒷면 배경 | 리치블랙 C40 M30 Y30 K100 (총 잉크량 200%) |
| 폰트 | Pretendard, 서브셋 임베드 (비임베드 폰트 0개) |
| 이미지 | 없음 — 로고·QR 전부 벡터 |
| TrimBox | PDF에 재단선 명시됨 |

## 앞면 QR

`https://pslab.ai.kr/card` (온라인 명함)로 연결됩니다.
25 × 25 모듈 / 13.6 mm → 모듈 1개 0.54 mm 로 스캔 여유가 충분합니다.
**QR을 바꾸려면 `src/build_card.py` 의 `CARD_URL` 만 고치고 다시 실행**하세요.

## 다시 만들기

```bash
pip install pillow numpy reportlab qrcode pymupdf potracer
npm pack pretendard                      # 폰트(13MB)는 저장소에 넣지 않음
tar xzf pretendard-*.tgz -C . --strip-components=4 \
  package/dist/public/static/alternative/Pretendard-{Regular,Medium,SemiBold,Bold,ExtraBold}.ttf
mkdir -p fonts && mv Pretendard-*.ttf fonts/

python3 src/trace.py        # public/logo.jpg → 벡터 패스 (logo_paths.json)
python3 src/export_svg.py   # → public/brand/*.svg (사이트에서 쓰는 벡터 로고)
python3 src/build_card.py . # → 인쇄용 PDF 3종
```

`src/trace.py` 는 `public/logo.jpg` 를 4배 확대·이진화한 뒤 potrace 로 외곽선을 따
벡터로 바꿉니다. 원본 JPG는 819px라 그대로 인쇄하면 계단현상이 생기므로,
인쇄물·웹 모두 이 벡터 결과를 사용합니다.

## 내용 수정

이름·연락처는 `src/build_card.py` 상단 상수에 모여 있습니다.
온라인 명함(`/card`)의 값은 `lib/card.ts` 에 따로 있으니 **양쪽을 같이** 고치세요.
