"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  overlay: string; // 오버레이 그라데이션 CSS
  mediaOpacity?: number;
  factor?: number; // 패럴랙스 계수
  scale?: boolean; // 스크롤 시 확대 여부
};

// 히어로 배경 영상: autoplay 가드 + 스크롤 패럴랙스 + 영상 실패 시 그라데이션 폴백
export default function HeroVideo({ src, overlay, mediaOpacity = 1, factor = 0.28, scale = true }: Props) {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const nudge = () => {
      const v = vidRef.current;
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    };
    nudge();
    window.addEventListener("pointerdown", nudge, { once: true });
    window.addEventListener("scroll", nudge, { once: true, passive: true });

    const onScroll = () => {
      const el = mediaRef.current;
      if (!el) return;
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y < h) {
        el.style.transform = scale
          ? `translateY(${y * factor}px) scale(${1 + (y / h) * 0.08})`
          : `translateY(${y * factor}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", nudge);
    };
  }, [factor, scale]);

  return (
    <div ref={mediaRef} style={{ position: "absolute", inset: 0, opacity: mediaOpacity }}>
      {!failed && (
        <video
          ref={vidRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: overlay }} />
    </div>
  );
}
