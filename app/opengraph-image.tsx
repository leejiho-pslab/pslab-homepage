import { ImageResponse } from "next/og";

export const alt = "P.S.LAB — Problem Solving Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 카카오톡/페이스북/트위터 공유 시 뜨는 미리보기 이미지 (브랜드 카드)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0c0c0c",
          color: "#f5f5f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, letterSpacing: 14, color: "#8f8f8a", fontWeight: 700 }}>PROBLEM SOLVING LAB</div>
        <div style={{ fontSize: 168, fontWeight: 800, letterSpacing: -4, marginTop: 6 }}>P.S.LAB</div>
        <div style={{ fontSize: 42, color: "#d8d8d4", marginTop: 22 }}>ONLINE ADVERTISING AGENCY · ALWAYS ON</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 44,
            fontSize: 30,
            color: "#8f8f8a",
          }}
        >
          <div style={{ width: 44, height: 3, background: "#f5f5f2" }} />
          pslab.ai.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
