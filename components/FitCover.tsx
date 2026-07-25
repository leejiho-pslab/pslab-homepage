import type { CSSProperties, ReactNode } from "react";
import { cdnImg } from "@/lib/assets";

// 포트폴리오 커버: 인물·제품이 잘리지 않도록 원본 전체(contain)를 보여주고,
// 남는 여백은 같은 이미지를 블러 처리한 배경(cover)으로 자연스럽게 채운다.
export default function FitCover({
  img,
  aspect,
  radius = 14,
  children,
}: {
  img: string;
  aspect: string;
  radius?: number;
  children: ReactNode;
}) {
  const url = `url(${cdnImg(img)})`;
  const layer: CSSProperties = { position: "absolute", inset: 0, backgroundImage: url, backgroundPosition: "center" };
  return (
    <div style={{ position: "relative", aspectRatio: aspect, borderRadius: radius, overflow: "hidden", background: "#e8e8e5" }}>
      {/* 블러 채움 레이어 */}
      <div style={{ ...layer, backgroundSize: "cover", filter: "blur(22px) saturate(1.05)", transform: "scale(1.2)" }} />
      {/* 원본 전체 레이어 (잘림 없음) */}
      <div style={{ ...layer, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />
      {/* 텍스트 가독용 그라데이션 */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,.42) 100%)" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "clamp(12px, 3.2vw, 28px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#fff",
          textShadow: "0 1px 14px rgba(0,0,0,.35)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
