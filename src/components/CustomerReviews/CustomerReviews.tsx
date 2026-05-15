"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CustomerReviews.module.css';

interface Review {
  id: number;
  type: string; // '의뢰인 자필 후기' | '의뢰인 메일 후기'
  category: string;
  content: string;
  date: string;
  image: string; // Placeholder for handwritten letter image
}

const reviews: Review[] = [
  {
    id: 1,
    type: '의뢰인 자필 후기',
    category: '카메라등이용촬영',
    content: '형사사건은 결과가 인생을 좌우하기 때문에 초기에 전문 로펌의 자문을 받는게 방어에 효과적이라는 점을 결과로 법무법인 플로우에서 저는 느꼈습니다.',
    date: '2024년 4월 27일',
    image: '/images/review_1.jpg' // Using placeholders, will render nicely even without actual image if we use a fallback or styled div
  },
  {
    id: 2,
    type: '의뢰인 자필 후기',
    category: '강간',
    content: '모의조사 연습은 실제 조사 당시 침착하게 잘 마무리할 수 있게 큰 도움이 되었습니다.',
    date: '2024년 4월 27일',
    image: '/images/review_2.jpg'
  },
  {
    id: 3,
    type: '의뢰인 메일 후기',
    category: '촬영물등이용협박',
    content: '전체적으로 플로우를 선택한 것이 좋은 결정이었다고 생각합니다. 비슷한 상황에 있는 분들께도 신중하게 상담을 받아보시길 추천드리고 싶습니다.',
    date: '2024년 4월 27일',
    image: '/images/review_3.jpg'
  }
];

const categories = ['전체', '경제범죄', '군형사', '마약', '성범죄', '소년범죄', '음주/교통', '일반형사', '기타'];

const CustomerReviews = () => {
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>의뢰인 후기</h2>
          <div className={styles.searchWrap}>
            <input type="text" placeholder="제목, 내용을 검색해주세요" className={styles.searchInput} />
            <button className={styles.searchBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.navWrap}>
          <ul className={styles.categoryNav}>
            {categories.map((cat, idx) => (
              <li key={idx}>
                <button 
                  className={`${styles.categoryBtn} ${activeTab === cat ? styles.active : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.imageBox}>
                {/* Fallback pattern for missing images to mimic handwriting paper */}
                <div className={styles.imagePlaceholder}>
                   <div className={styles.watermark}>F L O W</div>
                </div>
                <div className={styles.cardOverlay}>
                  <p className={styles.type}>{review.type}</p>
                  <h3 className={styles.category}>{review.category}</h3>
                </div>
              </div>
              <div className={styles.contentBox}>
                <p className={styles.content}>{review.content}</p>
                <div className={styles.dateWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className={styles.date}>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
