import type { Metadata } from "next";

// 어드민은 검색 노출 금지
export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
