# P.S.LAB 홈페이지

16년차 온라인 종합광고대행사 **P.S.LAB(문제 해결 연구소)** 공식 홈페이지.
SNS 채널 자동화 솔루션 **ALWAYS ON** 운영사.

> **독립 프로젝트**: 이 저장소는 `leejiho-pslab` 계정의 다른 프로젝트(생활정보 블로그 자동발행,
> `leejiho-pslab/site`)와 완전히 분리된 별도 저장소입니다. 코드·브랜치·배포·도메인이 전혀 겹치지
> 않으며, `main` 브랜치 하나로 단독 운영됩니다.

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

## ⚠️ 자산 자체 호스팅 이관 (배포 후 권장 작업)

현재 아래 자산은 외부 URL을 참조합니다. 방문자 브라우저에서는 정상 표시되지만, 안정성을 위해
자체 호스팅으로 옮기는 것을 권장합니다. **이관 시 `lib/assets.ts` 파일만 수정**하면 됩니다.

1. **배경 영상 2개** (히어로 / ALWAYS ON) — 현재 CloudFront 임시 URL. 만료 가능성 있음.
   → 영상을 `public/videos/` 에 넣고 `HERO_VIDEO`, `AO_VIDEO` 값을 `/videos/hero.mp4` 등으로 교체.
2. **포트폴리오 이미지 49개** — 현재 자사 imweb CDN(`cdn.imweb.me`) 참조.
   → 이미지를 `public/portfolio/` 에 넣고 `IMWEB_BASE` 를 `/portfolio/` 로 교체(파일명 정리 필요).

## 연락처

이지호 소장 · 010-9929-5736 · CEO@PSLAB.AI.KR
