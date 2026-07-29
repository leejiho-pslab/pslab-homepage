# P.S.LAB 홈페이지

16년차 온라인 종합광고대행사 **P.S.LAB(문제 해결 연구소)** 공식 홈페이지.
SNS 채널 자동화 솔루션 **ALWAYS ON** 운영사.

- **기술 스택**: Next.js 16 (App Router) · React 19 · TypeScript
- **페이지(5)**: `/` 홈 · `/about` · `/portfolio` · `/always-on` · `/contact`
- **디자인**: 디자인 시안(`.dc.html`)을 픽셀 충실도로 재구현. 디자인 토큰은 `app/globals.css` 상단 CSS 변수에 정의.

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버
```

## 배포 (Vercel)

이 저장소를 Vercel에 연결하면 `main` 브랜치 푸시 시 자동 배포됩니다. 별도 설정 불필요(Next.js 자동 인식).
커스텀 도메인: `pslab.ai.kr`.

## 프로젝트 구조

```
app/
  layout.tsx           # 폰트·메타데이터·전역
  globals.css          # 디자인 토큰 · 공통 컴포넌트 클래스 · 반응형
  page.tsx             # 홈
  about/ portfolio/ always-on/ contact/   # 서브 페이지
components/
  Header, Footer       # 공통 헤더/푸터
  Reveal, RevealLink   # 스크롤 진입 애니메이션
  CountUp              # 숫자 카운트업
  HeroVideo            # 히어로 배경 영상(autoplay 가드 + 패럴랙스 + 폴백)
  PortfolioCarousel    # 홈 자동 캐러셀
  PortfolioGrid        # 포트폴리오 필터 그리드(49개 브랜드)
  ContactForm          # 문의 폼(mailto 전송)
lib/
  site.ts              # 회사 정보·연락처·내비
  works.ts             # 포트폴리오 49개 데이터
  assets.ts            # 외부 자산 URL (영상·이미지 CDN) — 자체 호스팅 이관 지점
```

## 자산 자체 호스팅

1. ✅ **배경 영상 2개** (히어로 / ALWAYS ON) — **2026-07-29 이관 완료.**
   `public/videos/hero.mp4`, `public/videos/always-on.mp4` 를 서빙합니다.
   이전에는 CloudFront 임시 URL을 참조해 만료 시 영상이 폴백으로 떨어질 위험이 있었습니다.
   교체하려면 같은 이름으로 mp4 를 덮어쓰면 됩니다.
   (이관 작업은 `.github/workflows/vendor-videos.yml` 로 수행 — 원본 URL에서 받아
   유효성 확인 후 커밋. 재사용할 일이 없으면 삭제해도 됩니다.)
2. ⚠️ **포트폴리오 이미지 49개** — 아직 자사 imweb CDN(`cdn.imweb.me`) 참조.
   → 이미지를 `public/portfolio/` 에 넣고 `IMWEB_BASE` 를 `/portfolio/` 로 교체(파일명 정리 필요).

## 연락처

이지호 소장 · 010-9929-5736 · CEO@PSLAB.AI.KR
