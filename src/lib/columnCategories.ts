export const COLUMN_FILTER_CATEGORIES = [
  '분류 전체',
  '분양계약해제',
  '건설',
  '부동산',
  '임대차',
  'HR',
  '민사 일반',
  '성범죄',
  '음주교통',
  '마약',
  '보이스피싱',
  '건설형사',
  '경제범죄',
  '소년학폭',
  '일반형사',
] as const;

export const COLUMN_PUBLISH_CATEGORIES = COLUMN_FILTER_CATEGORIES.filter((category) => category !== '분류 전체');

export const DEFAULT_COLUMN_CATEGORY = '분양계약해제';

export function normalizeColumnCategory(category?: string) {
  if (!category) return DEFAULT_COLUMN_CATEGORY;

  if (category === '부동산 소식') return '부동산';
  if (category === '하자기술정보') return '건설';
  if (category === '법률칼럼') return DEFAULT_COLUMN_CATEGORY;

  return COLUMN_PUBLISH_CATEGORIES.includes(category as (typeof COLUMN_PUBLISH_CATEGORIES)[number])
    ? category
    : DEFAULT_COLUMN_CATEGORY;
}
