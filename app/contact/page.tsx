import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "광고대행이든 ALWAYS ON 도입이든, 브랜드의 상황을 남겨주시면 하루 안에 연락드립니다. P.S.LAB 이지호 소장.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />

      <section className="pad-sec grid-2 stack-sm" style={{ padding: "220px 40px 150px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 90 }}>
        <div>
          <Reveal as="p" className="eyebrow" style={{ margin: "0 0 30px" }}>CONTACT</Reveal>
          <h1 style={{ margin: 0, fontSize: "clamp(40px,5.5vw,78px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.03em" }}>
            <Reveal as="span" style={{ display: "block" }}>풀고 싶은 문제를</Reveal>
            <Reveal as="span" delay={140} style={{ display: "block" }}>들려주세요</Reveal>
          </h1>
          <Reveal as="p" delay={280} style={{ margin: "40px 0 0", fontSize: 17, lineHeight: 1.75, color: "var(--sub)", maxWidth: 440 }}>
            광고대행이든, ALWAYS ON 도입이든 좋습니다. 브랜드의 상황을 남겨주시면 하루 안에 연락드립니다.
          </Reveal>
          <Reveal delay={360} style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 18, borderTop: "1px solid var(--border)", paddingTop: 36 }}>
            <div style={{ display: "flex", gap: 20, fontSize: 16 }}>
              <span style={{ width: 80, color: "var(--muted)", fontSize: 14 }}>담당</span>
              <span style={{ fontWeight: 700 }}>{SITE.contact.manager}</span>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 16 }}>
              <span style={{ width: 80, color: "var(--muted)", fontSize: 14 }}>전화</span>
              <a href={`tel:${SITE.contact.phone}`} style={{ fontWeight: 700 }}>{SITE.contact.phone}</a>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 16 }}>
              <span style={{ width: 80, color: "var(--muted)", fontSize: 14 }}>이메일</span>
              <a href={`mailto:${SITE.contact.email}`} style={{ fontWeight: 700 }}>{SITE.contact.email}</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <ContactForm />
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
