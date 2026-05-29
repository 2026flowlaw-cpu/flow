"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { COLUMN_FILTER_CATEGORIES } from '@/lib/columnCategories';

type ColumnItem = {
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

export default function ColumnsPage() {
  const [columns, setColumns] = useState<ColumnItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('분류 전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/columns');
        const data = await res.json();
        setColumns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load columns:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredColumns = columns.filter((column) => {
    const categoryMatched = matchesCategory(column, activeCategory);
    const keyword = normalizeText(searchTerm);
    const keywordMatched = !keyword || normalizeText(`${column.title} ${column.summary || ''} ${column.category || ''}`).includes(keyword);

    return categoryMatched && keywordMatched;
  });

  return (
    <div className={styles.page}>
      <main>
        <section className={styles.hero}>
          <Image
            src="/office_hallway_premium_1776064223861.png"
            alt="법률칼럼 배너"
            fill
            className={styles.heroImg}
            priority
          />
          <div className={styles.heroOverlay}></div>
          <div className={`${styles.heroContent} container`}>
            <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link>
              <span>&gt;</span>
              <span>플로우 소식</span>
              <span>&gt;</span>
              <strong>법률칼럼</strong>
            </div>
            <h1>법률칼럼</h1>
            <p>
              반드시 알아야 할 기초 법률 지식부터 빠르게 변하는 최신 법적 이슈까지<br />
              플로우가 엄선한 핵심 가이드를 전해드립니다.
            </p>
          </div>
        </section>

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

          {isLoading ? (
            <div className={styles.stateBox}>플로우의 가치 있는 지식들을 불러오는 중입니다...</div>
          ) : filteredColumns.length > 0 ? (
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
      </main>
    </div>
  );
}
