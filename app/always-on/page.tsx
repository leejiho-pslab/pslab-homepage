import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealLink from "@/components/RevealLink";
import HeroVideo from "@/components/HeroVideo";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, AO_SERVICE } from "@/lib/schema";
import { BROCHURE } from "@/lib/site";
import { AO_VIDEO } from "@/lib/assets";

export const metadata: Metadata = {
  title: "ALWAYS ON — SNS 채널 자동화 솔루션",
  description:
    "매일 관리하지 않아도 브랜드 자산이 쌓입니다. 인스타그램·네이버 블로그·구글 블로그·스레드·유튜브 5개 채널을 매일 자동 발행하는 P.S.LAB의 SNS 채널 자동화 솔루션. 조사·기획·제작·발행 전 과정 자동화.",
  keywords: ["ALWAYS ON", "SNS 자동화", "인스타그램 자동 발행", "블로그 자동화", "콘텐츠 자동화 솔루션", "SNS 채널 대행"],
  alternates: { canonical: "/always-on" },
  openGraph: { title: "ALWAYS ON — SNS 채널 자동화 솔루션", description: "5개 채널을 매일 자동 발행. 하루치가 아니라 1년치가 쌓입니다.", url: "/always-on" },
};

const JOURNEY = [
  { no: "1", title: "발견", sub: "스쳐 지나가다 처음 봅니다", desc: "인스타그램 — 카드뉴스로 첫 눈도장 · 스레드 — 대화 속 입소문" },
  { no: "2", title: "검색", sub: "이름과 후기를 검색해 봅니다", desc: "네이버 블로그 — 네이버 검색의 답 · 구글 블로그 — 구글 검색·SEO" },
  { no: "3", title: "확신", sub: "믿을 만한지 살펴봅니다", desc: "유튜브 — 30초 쇼츠로 생생하게 · 발행 기록 — 꾸준함이 곧 신뢰" },
  { no: "4", title: "단골", sub: "구매하고, 다시 찾아옵니다", desc: "피드 재노출 — 잊히지 않게 · 소식·대화 — 팬으로 이어짐" },
];

const REALITY = [
  { title: "하나 — 사람을 씁니다", desc: "직원이나 대행사에 맡깁니다. 매달 수백만 원이 고정으로 나갑니다." },
  { title: "둘 — 며칠 하다 멈춥니다", desc: "바빠지면 손을 놓습니다. 채널은 몇 주째 방치됩니다." },
  { title: "셋 — 시작을 못합니다", desc: "'나중에'가 반복됩니다. 경쟁사가 앞서가는 걸 지켜만 봅니다." },
];

const PROMISES = [
  { no: "01", title: "안 올려도 올라갑니다", desc: "사람이 없어도 매일 자동 발행" },
  { no: "02", title: "멈추지 않습니다", desc: "24시간 쉬지 않고 자동 운영" },
  { no: "03", title: "지금 시작합니다", desc: "세팅만 하면 오늘부터 가동" },
];

const STEPS = [
  { no: "STEP 1", title: "조사 · 기획", desc: "시장·경쟁사·키워드를 살펴 반응 나올 주제를 잡습니다.", arrow: "→" },
  { no: "STEP 2", title: "글·이미지·영상 제작", desc: "브랜드 무드에 맞는 말투의 글과 카드·쇼츠를 자동으로 만듭니다.", arrow: "→" },
  { no: "STEP 3", title: "5채널 동시 발행", desc: "매일 정해진 시각에 다섯 채널로 한 번에.", arrow: "→" },
  { no: "STEP 4", title: "성과 학습 · 최적화", desc: "반응을 학습해 다음 포스팅을 더 정교하게 다듬습니다.", arrow: "↻" },
];

const CHANS = [
  { name: "인스타그램", type: "카드뉴스 · 6장 캐러셀", desc: "핵심 인사이트를 저장하고 싶은 3~6장으로 재구성합니다.", points: ["첫 장에 강한 후킹으로 넘겨보게", "저장·공유가 늘도록 마지막 장에 명확한 결론", "발행 카드와 참여·좋아요를 대시보드에 정리"] },
  { name: "네이버 블로그", type: "검색 최적화 장문 글", desc: "키워드 검색량·경쟁도를 조사해 노려볼 주제를 선정합니다.", points: ["검색에 걸리도록 제목·본문 구조화", "최신 SEO/GEO 흐름 반영", "블로그 지수를 꾸준히 관리해 노출 확대"] },
  { name: "구글 블로그", type: "정보성 아티클 · SEO", desc: "구글 검색까지 노리는 깊이 있는 글을 발행합니다.", points: ["대표 이미지 + 본문 이미지로 읽기 좋게", "해외·전문 검색 유입까지 확장", "최신 SEO/GEO 흐름 반영"] },
  { name: "스레드", type: "짧은 대화형 인사이트", desc: "실시간 이슈를 가볍고 빠르게 다룹니다.", points: ["댓글·재게시로 대화 유도", "브랜드를 친근하게 각인", "발행 글과 조회·반응을 함께 정리"] },
  { name: "유튜브", type: "5~15초 쇼츠 영상", desc: "후킹 → 핵심 → 행동 유도 3단 구성의 쇼츠를 만듭니다.", points: ["배경·자막·음악까지 자동 제작", "알고리즘 노출로 신규 도달 확대", "쇼츠 영상과 조회수를 채널 탭에 정리"] },
];

const FEED = [
  { label: "인스타그램 — 카드뉴스 6장", status: "오늘 18:00 발행 완료", dot: "var(--ok)" },
  { label: "네이버 블로그 — SEO 장문 글", status: "오늘 18:00 발행 완료", dot: "var(--ok)" },
  { label: "유튜브 — 12초 쇼츠", status: "오늘 18:00 발행 완료", dot: "var(--ok)" },
  { label: "스레드 — 대화형 인사이트", status: "내일 18:00 예약됨", dot: "var(--d-muted)" },
];

const VALUES = [
  { label: "사람 1명 인건비 대체", num: "월 300만 원", sub: "조사·기획·제작·업로드를 대신" },
  { label: "대행사 5채널 대체", num: "월 500만 원+", sub: "채널별 대행비 절감" },
  { label: "회수되는 내 시간", num: "월 40시간+", sub: "주 10시간 → 본업에 집중" },
  { label: "쌓이는 콘텐츠 자산", num: "연 700개+", sub: "검색에 남는 영구 자산" },
];

const eyebrow = { margin: "0 0 18px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", color: "var(--d-muted)" } as const;
const dash = { margin: 0, background: "var(--d-card2)", borderRadius: 10, padding: 18 } as const;

export default function AlwaysOnPage() {
  return (
    <main className="dark" style={{ background: "#0c0c0c", color: "#f5f5f2" }}>
      <JsonLd data={breadcrumb([{ name: "홈", path: "/" }, { name: "ALWAYS ON", path: "/always-on" }])} />
      <JsonLd data={AO_SERVICE} />
      <Header active="/always-on" dark />

      {/* AO 히어로 */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <HeroVideo
          src={AO_VIDEO}
          mediaOpacity={0.65}
          overlay="linear-gradient(180deg,rgba(12,12,12,.55) 0%,rgba(12,12,12,.1) 45%,rgba(12,12,12,.92) 90%,#0c0c0c 100%)"
          factor={0.25}
          scale={false}
        />
        <div className="pad-sec" style={{ position: "relative", width: "100%", padding: "0 40px 72px", display: "flex", flexDirection: "column", gap: 26 }}>
          <Reveal as="p" style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, letterSpacing: ".32em", color: "#d8d8d4" }}>P.S.LAB — SNS 채널 자동화 솔루션</Reveal>
          <h1 style={{ margin: 0, fontSize: "clamp(52px,8vw,124px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-.02em", fontFamily: "var(--font-mono)" }}>
            <Reveal as="span" delay={80} style={{ display: "block" }}>ALWAYS ON</Reveal>
          </h1>
          <Reveal delay={200}>
            <a
              href={BROCHURE.href}
              download={BROCHURE.filename}
              className="btn btn-cta-light"
              style={{ padding: "14px 30px", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              솔루션 소개서 다운로드 <span aria-hidden>↓</span>
            </a>
          </Reveal>
          <Reveal delay={240} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderTop: "1px solid rgba(245,245,242,.25)", paddingTop: 22 }}>
            <p style={{ margin: 0, fontSize: 19, color: "#d8d8d4", fontWeight: 500 }}>매일 관리하지 않아도, 브랜드 자산이 쌓입니다.</p>
            <p style={{ margin: 0, fontSize: 14, color: "var(--d-muted)" }}>인스타그램 · 네이버 블로그 · 구글 블로그 · 스레드 · 유튜브</p>
          </Reveal>
        </div>
      </section>

      {/* 고객 여정 */}
      <section className="pad-sec" style={{ padding: "170px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" style={eyebrow}>왜 온라인 채널인가</Reveal>
        <Reveal as="h2" style={{ margin: "0 0 26px", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-.02em" }}>손님이 단골이 되는 길목마다,<br />채널이 일합니다</Reveal>
        <Reveal as="p" style={{ margin: "0 0 70px", color: "var(--d-muted)", fontSize: 16.5, lineHeight: 1.7, maxWidth: 640 }}>손님은 발견 → 검색 → 확신 → 단골의 여정을 지나갑니다. 다섯 채널은 각자 다른 길목을 지킵니다.</Reveal>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--d-border)", border: "1px solid var(--d-border)" }}>
          {JOURNEY.map((j) => (
            <Reveal key={j.no} style={{ background: "var(--d-card)", padding: "40px 30px", minHeight: 230 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 34, color: "#3a3a37" }}>{j.no}</p>
              <p style={{ margin: "16px 0 10px", fontSize: 22, fontWeight: 800 }}>{j.title}</p>
              <p style={{ margin: "0 0 18px", fontSize: 14, color: "var(--d-muted)" }}>{j.sub}</p>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#d8d8d4" }}>{j.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 현실과 약속 */}
      <section className="pad-sec" style={{ padding: "0 40px 170px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-2 stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <Reveal as="p" style={eyebrow}>그런데, 현실은</Reveal>
            <Reveal as="h3" style={{ margin: "0 0 40px", fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-.02em" }}>매일 5개 채널은,<br />혼자서는 무리입니다</Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {REALITY.map((r) => (
                <Reveal key={r.title} style={{ border: "1px solid var(--d-border)", borderRadius: 14, padding: "26px 28px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "#d8d8d4" }}>{r.title}</p>
                  <p style={{ margin: 0, fontSize: 14.5, color: "var(--d-muted)", lineHeight: 1.65 }}>{r.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal as="p" style={eyebrow}>우리의 약속</Reveal>
            <Reveal as="h3" style={{ margin: "0 0 40px", fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-.02em" }}>이 세 가지 걱정을,<br />한 번에 없앱니다</Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PROMISES.map((p) => (
                <Reveal key={p.no} style={{ background: "#f5f5f2", color: "#0c0c0c", borderRadius: 14, padding: "26px 28px" }}>
                  <p style={{ margin: "0 0 8px", fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>{p.no}</p>
                  <p style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800 }}>{p.title}</p>
                  <p style={{ margin: 0, fontSize: 14.5, color: "#555", lineHeight: 1.6 }}>{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 자동화 프로세스 */}
      <section className="pad-sec" style={{ background: "var(--d-card)", padding: "170px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal as="p" style={eyebrow}>어떻게 돌아가나요</Reveal>
          <Reveal as="h2" style={{ margin: "0 0 26px", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-.02em" }}>네 단계가 매일,<br />스스로 반복됩니다</Reveal>
          <Reveal as="p" style={{ margin: "0 0 70px", color: "var(--d-muted)", fontSize: 16.5, lineHeight: 1.7, maxWidth: 640 }}>15년 이상 브랜딩·마케팅 전문가가 브랜드 방향을 직접 잡아드립니다. 그 다음부터는 이 네 단계가 매일 자동으로 돌아갑니다.</Reveal>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {STEPS.map((st) => (
              <Reveal key={st.no} className="step-card" style={{ position: "relative", border: "1px solid var(--d-border)", borderRadius: 16, padding: "38px 30px", minHeight: 220, background: "#0c0c0c" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: ".2em", color: "#666" }}>{st.no}</p>
                <p style={{ margin: "18px 0 12px", fontSize: 20, fontWeight: 800 }}>{st.title}</p>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "var(--d-muted)" }}>{st.desc}</p>
                <span style={{ position: "absolute", right: 22, bottom: 20, fontSize: 20, color: "#3a3a37" }}>{st.arrow}</span>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" style={{ margin: "34px 0 0", textAlign: "center", color: "#666", fontSize: 14, letterSpacing: ".1em" }}>↻ 다시 1번으로 · 매일 자동 반복</Reveal>
        </div>
      </section>

      {/* 채널별 콘텐츠 */}
      <section className="pad-sec" style={{ padding: "170px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" style={eyebrow}>채널별 콘텐츠</Reveal>
        <Reveal as="h2" style={{ margin: "0 0 70px", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-.02em" }}>그냥 올리기만 하지 않습니다</Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {CHANS.map((c) => (
            <Reveal key={c.name} className="chan-row" style={{ display: "grid", gridTemplateColumns: "220px 1fr 1.2fr", gap: 30, alignItems: "start", padding: "44px 8px", borderTop: "1px solid var(--d-border)" }}>
              <div>
                <p style={{ margin: 0, fontSize: 23, fontWeight: 800 }}>{c.name}</p>
                <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "var(--d-muted)" }}>{c.type}</p>
              </div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: "#d8d8d4" }}>{c.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.points.map((pt) => (
                  <span key={pt} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--d-muted)", lineHeight: 1.55 }}>
                    <span style={{ color: "#f5f5f2" }}>■</span>
                    {pt}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 대시보드 · 알림 */}
      <section className="pad-sec" style={{ background: "var(--d-card)", padding: "170px 40px" }}>
        <div className="grid-2 stack-sm" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Reveal as="p" style={eyebrow}>한 화면</Reveal>
            <Reveal as="h2" style={{ margin: "0 0 26px", fontSize: "clamp(30px,3.8vw,50px)", fontWeight: 800, letterSpacing: "-.02em" }}>모든 채널이,<br />이 화면 하나에</Reveal>
            <Reveal as="p" style={{ margin: "0 0 34px", color: "var(--d-muted)", fontSize: 16, lineHeight: 1.75 }}>다섯 채널의 상태·예정·성과를 링크 하나로 어디서든 확인합니다. 설치도, 복잡한 로그인도 없습니다. 콘텐츠 클릭 한 번이면 상세 내용 확인부터 복사·다운로드·수정까지 대시보드 안에서 끝납니다.</Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { k: "예약", v: "발행 시각을 정해두면 끝 — 매일 정해진 시간에 자동 발행" },
                { k: "알림", v: "발행 완료·주간 리포트를 텔레그램으로 실시간 공유" },
                { k: "안심", v: "문제가 생기면 즉시 알림 — 주말·휴일에도 쉬지 않음" },
              ].map((row, i) => (
                <Reveal key={row.k} delay={i * 100} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid var(--d-border)", borderRadius: 12, padding: "18px 22px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 13, color: "#666" }}>{row.k}</span>
                  <span style={{ fontSize: 15, color: "#d8d8d4" }}>{row.v}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150} style={{ border: "1px solid var(--d-border)", borderRadius: 18, background: "#0c0c0c", padding: 26, boxShadow: "0 40px 80px -40px rgba(0,0,0,.8)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, letterSpacing: ".18em", color: "var(--d-muted)" }}>PSLAB — 콘텐츠 관제실</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--d-muted)", letterSpacing: ".14em" }}>
                LIVE<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5f5f2", animation: "pulse 1.6s infinite" }} />
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 10 }}>
              <div style={dash}><p style={{ margin: 0, fontSize: 11, color: "#666", letterSpacing: ".1em" }}>참여율 최고</p><p style={{ margin: "8px 0 0", fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 800 }}>166%</p></div>
              <div style={dash}><p style={{ margin: 0, fontSize: 11, color: "#666", letterSpacing: ".1em" }}>최적 시간대</p><p style={{ margin: "8px 0 0", fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 800 }}>21시</p></div>
              <div style={dash}><p style={{ margin: 0, fontSize: 11, color: "#666", letterSpacing: ".1em" }}>성과 리포트</p><p style={{ margin: "8px 0 0", fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 800 }}>매주</p></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FEED.map((f) => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--d-card2)", borderRadius: 10, padding: "14px 18px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13.5, color: "#d8d8d4" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: f.dot }} />
                    {f.label}
                  </span>
                  <span style={{ fontSize: 12, color: "#666" }}>{f.status}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 가치 환산 */}
      <section className="pad-sec" style={{ padding: "170px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal as="p" style={eyebrow}>돈으로 환산하면</Reveal>
        <Reveal as="h2" style={{ margin: "0 0 70px", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-.02em" }}>이만큼을 대신합니다</Reveal>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--d-border)", border: "1px solid var(--d-border)" }}>
          {VALUES.map((v) => (
            <Reveal key={v.label} style={{ background: "var(--d-card)", padding: "38px 30px" }}>
              <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--d-muted)" }}>{v.label}</p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 800, letterSpacing: "-.01em" }}>{v.num}</p>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, color: "#666" }}>{v.sub}</p>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop: 14, background: "#f5f5f2", color: "#0c0c0c", borderRadius: 14, padding: "34px 38px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>받는 가치 (월 환산)</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 38, fontWeight: 800, letterSpacing: "-.02em" }}>800만 원 +@</span>
        </Reveal>
      </section>

      {/* CTA + 푸터 */}
      <section style={{ borderTop: "1px solid var(--d-border2)" }}>
        <div className="pad-sec" style={{ maxWidth: 1200, margin: "0 auto", padding: "150px 40px 90px", textAlign: "center" }}>
          <Reveal as="p" style={{ margin: "0 0 26px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", color: "var(--d-muted)" }}>지속의 힘 — 365일 · 5채널 · 멈추는 날 0회</Reveal>
          <Reveal as="h2" style={{ margin: 0, fontSize: "clamp(38px,5.5vw,80px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.1 }}>하루치가 아니라,<br />1년치가 쌓입니다</Reveal>
          <RevealLink href="/contact" delay={140} className="btn btn-cta-light" style={{ marginTop: 48, padding: "20px 52px", fontSize: 17 }}>도입 상담하기</RevealLink>
          <Reveal as="p" delay={200} style={{ margin: "20px 0 0" }}>
            <a href={BROCHURE.href} download={BROCHURE.filename} style={{ fontSize: 14, color: "#d8d8d4", textDecoration: "underline", textUnderlineOffset: 4 }}>
              또는 솔루션 소개서 PDF 다운로드 ↓
            </a>
          </Reveal>
          <Reveal as="p" delay={240} style={{ margin: "22px 0 0", fontSize: 14, color: "#666" }}>월 고정비는 상담을 통해 브랜드에 맞게 산정됩니다</Reveal>
        </div>
        <Footer dark tag="SNS 채널 자동화 솔루션" />
      </section>
    </main>
  );
}
