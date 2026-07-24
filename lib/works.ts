// 포트폴리오 데이터 (49개 브랜드). img는 imweb CDN 경로(자산 이관 시 lib/assets.ts만 교체).
export type Work = { name: string; cat: Category; img: string; desc: string };

export const CATEGORIES = [
  "All",
  "Beauty & Health",
  "Fashion & Luxury",
  "Retail & Commerce",
  "Electronics & Living",
  "Food & Beverage",
  "Kids",
  "Pet",
  "B2B & Financial",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const catEn: Record<string, string> = {
  "Beauty & Health": "BEAUTY & HEALTH",
  "Fashion & Luxury": "FASHION & LUXURY",
  "Retail & Commerce": "RETAIL & COMMERCE",
  "Electronics & Living": "ELECTRONICS & LIVING",
  "Food & Beverage": "FOOD & BEVERAGE",
  Kids: "KIDS",
  Pet: "PET",
  "B2B & Financial": "B2B & FINANCIAL",
};

export const WORKS: Work[] = [
  { name: "킨트", cat: "Fashion & Luxury", img: "20241119/0ea4bcbb4c7c9.jpg", desc: "선물 전문 주얼리 브랜드 — 검색 점유율 확보 및 퍼포먼스 캠페인 운영" },
  { name: "티르리르", cat: "Fashion & Luxury", img: "20241119/8ded389c759be.png", desc: "뮤즈 컬렉션 감성 주얼리 — 컬렉션별 가치 공유 및 뮤즈 활용 구매 유도 캠페인" },
  { name: "안나수이", cat: "Fashion & Luxury", img: "20241119/f25470df2c716.png", desc: "글로벌 디자이너 주얼리 — 국내 인지도 확산 및 뉴 컬렉션 구매 유도 캠페인" },
  { name: "리엘", cat: "Fashion & Luxury", img: "20250325/6480a81d4826a.png", desc: "자사몰 매출 성장으로 W컨셉·29CM 앱 플랫폼 매출 한계 극복, SNS 브랜딩 콘텐츠 확대" },
  { name: "메종YS", cat: "Fashion & Luxury", img: "20250325/524c4401a28b7.png", desc: "포털 기반 퍼포먼스 광고 운영 및 틱톡 콘텐츠 마케팅으로 브랜드 인지도 향상" },
  { name: "소녀레시피", cat: "Fashion & Luxury", img: "20241119/9480a2d26642e.png", desc: "키작녀 쇼핑몰 브랜딩, 자체제작 강화 재구매 마케팅과 영상 콘텐츠로 광고 효율 상승" },
  { name: "히니크", cat: "Fashion & Luxury", img: "20241119/5a0275121eaf8.png", desc: "물류·CS·MD 운영 효율화 컨설팅과 155fit 키작녀 특화 브랜딩" },
  { name: "블러핏", cat: "Fashion & Luxury", img: "20241119/aa55b9da1d5ea.png", desc: "자사몰·에이블리·지그재그 통합 플랫폼 마케팅 기획 및 고객 확장 전략 실행" },
  { name: "더케미", cat: "Fashion & Luxury", img: "20241119/99f3c98b38fdc.png", desc: "디자이너 브랜드 초기 런칭부터 컨설팅 기반 통합 마케팅 운영 기획" },
  { name: "벤셔먼", cat: "Fashion & Luxury", img: "20241119/611f4bb27f710.png", desc: "브리티시 프리미엄 캐주얼 — 퍼포먼스 캠페인으로 자사몰 매출 증대 및 인지도 제고" },
  { name: "레디포넥스트", cat: "Fashion & Luxury", img: "20241119/e5e2cf9bfc56c.png", desc: "MZ 대상 인지도 제고 및 구매 유도, 자사몰·무신사 플랫폼 매출 상승" },
  { name: "매그제이", cat: "Fashion & Luxury", img: "20250325/9cf98966aef27.png", desc: "온·오프라인 통합 마케팅 전략, SNS 콘텐츠와 CRM 분석 기반 재구매 마케팅" },
  { name: "아보르", cat: "Fashion & Luxury", img: "20241119/e6a7371f48a19.png", desc: "디자이너 브랜드 리빌딩 — 자사몰 매출 상승 전략과 메타 캠페인 운영" },
  { name: "마운티아", cat: "Fashion & Luxury", img: "20241119/2ea6d6e1f3ecd.png", desc: "'세상의 모든 길과 함께' — 브랜드 키메시지 전달 캠페인" },
  { name: "플레지룸", cat: "Fashion & Luxury", img: "20241119/07f961dbd9d92.png", desc: "에이블리 캠페인 운영 및 메타 퍼포먼스 광고로 자사몰 매출 증대" },
  { name: "프롬헤드투토", cat: "Fashion & Luxury", img: "20241119/55e938e8a131b.png", desc: "네이버 DA 의존 구조를 SNS 콘텐츠 마케팅으로 전환, 핸드메이드 코트 특화 마케팅" },
  { name: "트로이아르케", cat: "Beauty & Health", img: "20241119/2ab1a1ab09702.png", desc: "1:1 맞춤 에스테틱 — 온라인 통합 마케팅 운영 및 콘텐츠 기반 SNS 바이럴 확산" },
  { name: "제나벨", cat: "Beauty & Health", img: "20241119/62643fabdc9c7.jpg", desc: "피부 전문가의 전문성을 살린 고기능 스킨케어 브랜드 마케팅" },
  { name: "뉴라덤", cat: "Beauty & Health", img: "20241119/f76d9eea54c5d.jpg", desc: "글로벌 바이오 기업 신규 브랜드 런칭 및 제품 인지도 확산" },
  { name: "홈쎄라", cat: "Beauty & Health", img: "20241119/a0cc8e10b8577.png", desc: "국내 최초 HIFU 피부 디바이스 — 브랜딩 콘텐츠 기반 매출 퍼포먼스 운영" },
  { name: "노티프", cat: "Beauty & Health", img: "20241119/4e4bc713fd295.jpg", desc: "웰니스 케어 브랜드 — USP 강조 브랜딩 콘텐츠로 자사 검색량 증가 운영" },
  { name: "로더렛", cat: "Beauty & Health", img: "20241119/5726f39bcba98.png", desc: "영국 프리미엄 향료 기술의 바디케어 — 자사몰 매출 퍼포먼스 운영" },
  { name: "지아자", cat: "Beauty & Health", img: "20241119/5aeabd0e1f79d.png", desc: "폴란드 대표 화장품 브랜딩 및 온라인 판매량 증대" },
  { name: "크나이프", cat: "Beauty & Health", img: "20241119/1ebdd19b48de5.png", desc: "130년 역사의 독일 크나이프 — 브랜딩 및 온라인 판매량 증대" },
  { name: "필웨이", cat: "Retail & Commerce", img: "20241119/988c3be304ce1.jpg", desc: "21년간 국내 최대 명품 거래 플랫폼 — MZ 대상 인지도 제고 및 구매 유도" },
  { name: "더베르", cat: "Retail & Commerce", img: "20241119/bef85a9090f30.jpg", desc: "프리미엄 플라워 브랜드 — SNS 콘텐츠 마케팅으로 정체성 유지 및 자사몰 매출 증가" },
  { name: "키크", cat: "Retail & Commerce", img: "20241119/ac446d21f3c1d.png", desc: "RS 구조 마케팅 전반 운영 — 기능성 제품 이슈 메이킹 및 상세페이지 전략" },
  { name: "비츠조명", cat: "Electronics & Living", img: "20241119/e145668250f35.png", desc: "조명 전문 브랜드 — 지속적인 인지도 제고 및 자사몰 구매 유도" },
  { name: "퍼피유", cat: "Electronics & Living", img: "20241119/d19cc44736783.png", desc: "세계 100여 개국 진출 가전 브랜드 — 한국 공식 런칭 전 인지도 확산" },
  { name: "티앤피세라믹", cat: "Electronics & Living", img: "20241119/bb23dc0493ae3.png", desc: "인스타그램 채널 마케팅 전략 기획 및 프리미엄 제품 인지도 향상" },
  { name: "OBC", cat: "Food & Beverage", img: "20241119/c698b909c468a.png", desc: "WBA 월드베스트 수상 수제맥주 — O2O 브랜딩 & 퍼포먼스 캠페인 운영" },
  { name: "니커버커", cat: "Food & Beverage", img: "20241119/bc7a385fa448b.jpg", desc: "서울 3대 베이글 — 인스타그램 브랜드 홍보와 인플루언서 바이럴 확산" },
  { name: "청담나인", cat: "Food & Beverage", img: "20241119/37f8aeb668240.jpg", desc: "한국의 물랑루즈 콘셉트 재즈 퍼포먼스 바 — 리브랜딩 캠페인" },
  { name: "보뚜", cat: "Food & Beverage", img: "20241119/127537fa72282.png", desc: "아후카틀 아보카도 오일 리뉴얼 런칭 브랜딩 & 퍼포먼스 캠페인" },
  { name: "딥스", cat: "Food & Beverage", img: "20241119/5b0679c21129d.png", desc: "프리미엄 천연 미네랄 해양심층수 — 브랜딩 & 퍼포먼스 캠페인 운영" },
  { name: "샘표", cat: "Food & Beverage", img: "20241119/a3c54491785af.png", desc: "70년 전통 대표 식품 브랜드 — 간편 양념 소스 브랜딩 & 퍼포먼스 캠페인" },
  { name: "초코몽", cat: "Food & Beverage", img: "20241119/e3a7adc80e682.png", desc: "SNS 콘텐츠 마케팅 강화 — 브랜딩 이미지 기반 구매 전환율 상승" },
  { name: "파스텔몰", cat: "Kids", img: "20241119/e54cac0b9a429.png", desc: "닥스키즈·헤지스키즈 전문몰 — 코어 타깃 CRM/퍼포먼스 캠페인 운영" },
  { name: "에어워크주니어", cat: "Kids", img: "20241119/290f2b5145c6b.jpg", desc: "주니어 프리미엄 스포츠 — SNS 콘텐츠로 정체성 유지 및 자사몰 매출 증가" },
  { name: "쁘띠메종", cat: "Kids", img: "20241119/778bbf463f860.png", desc: "프리미엄 영유아 홈퍼니싱 — 브랜딩 & 퍼포먼스 캠페인 운영" },
  { name: "마마캣", cat: "Pet", img: "20241119/40c498fb47d1f.png", desc: "고양이용품 쇼핑몰 브랜드 — 브랜딩 & 퍼포먼스 캠페인 운영" },
  { name: "펫킷", cat: "Pet", img: "20241119/c1a2a0304ad6d.jpg", desc: "전 세계 30여 개국 수출 펫테크 — 브랜딩 & 퍼포먼스 캠페인 운영" },
  { name: "모던펫코리아", cat: "Pet", img: "20241119/572660440e973.png", desc: "스페인 사료 Summit10 런칭 — 런칭 전 인지도 확산 및 구매 유도" },
  { name: "스낵24", cat: "B2B & Financial", img: "20241119/ed5c59def8a8f.png", desc: "기업 복지 플랫폼 · 사무실 간식 관리 — 브랜딩 & 퍼포먼스 캠페인" },
  { name: "위펀딩", cat: "B2B & Financial", img: "20241119/e64210143c1bf.png", desc: "P2P 대출 플랫폼 — 제도권 진입 후 인지도 마케팅 캠페인 운영" },
  { name: "삼쩜삼", cat: "B2B & Financial", img: "20241119/2d6153e63f23c.jpg", desc: "세금 환급 플랫폼 — 퍼포먼스 캠페인 운영" },
  { name: "고팍스", cat: "B2B & Financial", img: "20241119/ba9e630c4b5a6.jpg", desc: "대한민국 5대 가상화폐 거래소 — 퍼포먼스 캠페인 운영" },
  { name: "창업이지", cat: "B2B & Financial", img: "20241119/e1ecbe4aaa878.jpg", desc: "예비 창업주 원스톱 플랫폼 — 상담 문의 DB 수집 캠페인" },
  { name: "영차영차", cat: "B2B & Financial", img: "20241119/8486b41cdaa31.jpg", desc: "화물차주 일자리 플랫폼 — 앱 설치·가입자 확보 및 리텐션 증대" },
];

// 홈 캐러셀용 대표 9개
export const HOME_WORK_NAMES = ["킨트", "샘표", "삼쩜삼", "리엘", "트로이아르케", "안나수이", "니커버커", "마마캣", "비츠조명"];
export const HOME_WORKS: Work[] = HOME_WORK_NAMES.map((n) => WORKS.find((w) => w.name === n)!).filter(Boolean);

export const INDUSTRIES = [
  "Beauty & Health",
  "Fashion & Luxury",
  "Retail & Commerce",
  "Electronics & Living",
  "Food & Beverage",
  "Kids",
  "Pet",
  "B2B & Financial",
];
