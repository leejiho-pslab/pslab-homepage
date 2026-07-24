import Link from "next/link";
import { NAV } from "@/lib/site";

// active: 현재 페이지 경로("/about" 등) · dark: ALWAYS ON 다크 헤더
export default function Header({ active, dark }: { active?: string; dark?: boolean }) {
  return (
    <header className={`header${dark ? " dark" : ""}`}>
      <Link href="/" className="brand" aria-label="P.S.LAB 홈">
        {!dark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logo.jpg" alt="P.S.LAB 로고" className="brand-logo" />
        )}
        <span className="brand-name">P.S.LAB</span>
        <span className="brand-tag">문제 해결 연구소</span>
      </Link>
      <nav className="nav">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={active === n.href ? "active" : ""}
            style={n.dot ? { display: "flex", alignItems: "center", gap: 7 } : undefined}
          >
            {n.label}
            {n.dot && <span className="dot" />}
          </Link>
        ))}
        <Link href="/contact" className={`btn ${dark ? "btn-pill-light" : "btn-pill-dark"}`}>
          문의하기
        </Link>
      </nav>
    </header>
  );
}
