"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { COLUMN_FILTER_CATEGORIES } from '@/lib/columnCategories';

export type ColumnItem = {
  id: string | number;
  title: string;
  summary?: string;
  category?: string;
  author_name?: string;
  image_url?: string;
  created_at?: string;
};

function normalizeText(value?: string) {
  return (value || '').replace(/[\s·/,-]/g, '').toLowerCase();
}

function matchesCategory(column: ColumnItem, activeCategory: string) {
  if (activeCategory === '분류 전체') return true;

  const normalizedCategory = normalizeText(activeCategory);
  const haystack = normalizeText(`${column.category || ''} ${column.title} ${column.summary || ''}`);

  if (normalizedCategory === '건설') {
    return ['건설', '하자', '누수', '부실시공', '오시공', '미시공'].some((keyword) => haystack.includes(normalizeText(keyword)));
  }

  if (normalizedCategory === '부동산') {
    return ['부동산', '상가', '분양', '임대차'].some((keyword) => haystack.includes(normalizeText(keyword)));
  }

  if (normalizedCategory === '민사일반') {
    return ['민사', '손해배상', '계약', '대여금'].some((keyword) => haystack.includes(normalizeText(keyword)));
  }

  if (normalizedCategory === '일반형사') {
    return haystack.includes('형사') && !['성범죄', '음주', '교통', '마약', '보이스피싱', '건설형사', '경제범죄', '소년', '학폭'].some((keyword) => haystack.includes(normalizeText(keyword)));
  }

  return haystack.includes(normalizedCategory);
}

export default function ColumnsList({ columns }: { columns: ColumnItem[] }) {
  const [activeCategory, setActiveCategory] = useState('분류 전체');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColumns = columns.filter((column) => {
    const categoryMatched = matchesCategory(column, activeCategory);
    const keyword = normalizeText(searchTerm);
    const keywordMatched = !keyword || normalizeText(`${column.title} ${column.summary || ''} ${column.category || ''}`).includes(keyword);

    return categoryMatched && keywordMatched;
  });

  return (
    <section className={`${styles.listSection} container`}>
      <div className={styles.controls}>
        <div className={styles.selectWrap}>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            aria-label="법률칼럼 분류 선택"
          >
            {COLUMN_FILTER_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchWrap}>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="검색어 입력"
            aria-label="법률칼럼 검색어"
          />
          <button type="button" onClick={() => setSearchTerm(searchTerm.trim())}>
            검색
          </button>
        </div>
      </div>

      {filteredColumns.length > 0 ? (
        <div className={styles.grid}>
          {filteredColumns.map((col) => (
            <Link href={`/columns/${col.id}`} key={col.id} className={styles.card}>
              <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{col.category || '법률칼럼'}</span>
                <h3 className={styles.cardTitle}>{col.title}</h3>
                <p className={styles.cardDescription}>{col.summary || '상세 내용을 확인하세요.'}</p>
                <time className={styles.cardDate}>
                  {col.created_at
                    ? new Date(col.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''}
                </time>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.stateBox}>
          <p>조건에 맞는 법률칼럼이 없습니다.</p>
          <span>다른 분류나 검색어로 다시 확인해 주세요.</span>
        </div>
      )}
    </section>
  );
}
