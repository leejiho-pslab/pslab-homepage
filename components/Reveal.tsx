"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode, type ElementType } from "react";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  // Link 등에 전달할 추가 속성(href 등)
  [key: string]: unknown;
};

// 스크롤 진입 시 등장하는 요소 (IntersectionObserver). data-delay 스태거를 delay(ms)로.
export default function Reveal({ as, delay = 0, className = "", style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
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

  const Tag = (as || "div") as ElementType;
  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  );
}
