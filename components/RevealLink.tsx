"use client";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// 스크롤 진입 애니메이션 + Next Link 를 겸하는 컴포넌트 (버튼/링크용)
export default function RevealLink({
  href,
  delay = 0,
  className = "",
  style,
  children,
}: {
  href: string;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          window.setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Link href={href} ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Link>
  );
}
