import { SITE } from "@/lib/site";

export default function Footer({
  dark,
  wide,
  tag = "온라인 종합광고대행사",
}: {
  dark?: boolean;
  wide?: boolean;
  tag?: string;
}) {
  return (
    <footer className={`footer${wide ? " wide" : ""}${dark ? " dark" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="f-name">P.S.LAB</span>
        <span className="f-tag">문제 해결 연구소 · {tag}</span>
      </div>
      <div className="f-contact">
        <span>{SITE.contact.manager}</span>
        <span>{SITE.contact.phone}</span>
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
      </div>
    </footer>
  );
}
