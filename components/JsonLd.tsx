// 구조화 데이터를 <script type="application/ld+json"> 로 출력
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD는 신뢰된 정적 데이터라 안전
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
