"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CustomerReviews.module.css';

interface Review {
  id: number;
  type: string; // '의뢰인 자필 후기' | '의뢰인 메일 후기'
  category: string;
  content: string;
  date: string;
  image: string; // Placeholder for handwritten letter image
}

interface CustomerReviewsProps {
  isMain?: boolean;
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

const mainReviews = [
  {
    id: 1,
    name: '황**',
    category: '폭행 / 피의자',
    avatarIcon: 'female',
    content: '갑자기 수사기관 경찰 조사를 받게 되었습니다. 상대방이 과장하여 합의를 요구해 막막했는데, 변호사님의 CCTV 분석과 객관적인 변론 덕분에 무혐의 처분을 받았습니다. 덕분에 긴 고통의 시간에서 조기에 벗어날 수 있었습니다.'
  },
  {
    id: 2,
    name: '임**',
    category: '횡령·배임 / 피해자',
    avatarIcon: 'male1',
    content: '믿었던 직원들의 횡령으로 배신감이 컸습니다. 증거가 부족해 막막했는데, 변호사님이 철저한 자금 추적과 회계 사실 분석을 통해 법정에 기소해주셨습니다. 덕분에 형사 처벌과 민사 소송을 함께 진행해 피해를 회복할 수 있었습니다.'
  },
  {
    id: 3,
    name: '박**',
    category: '명예훼손 / 피고인',
    avatarIcon: 'male2',
    content: '인터넷에 쓴 댓글로 고소를 당해 당황스러웠습니다. 변호사님이 제 글이 비방 목적이 아닌 공익을 위한 사실이라는 점을 조목조목 짚어주셨습니다. 최종 법원에서 무죄 판결을 받아 억울한 누명을 벗을 수 있었습니다.'
  }
];

const categories = ['전체', '경제범죄', '군형사', '마약', '성범죄', '소년범죄', '음주/교통', '일반형사', '기타'];

const CustomerReviews = ({ isMain = false }: CustomerReviewsProps) => {
  const [activeTab, setActiveTab] = useState('전체');

  if (isMain) {
    return (
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.mainHeader}>
            <p className={styles.mainSubtitle}>무너질 뻔한 일상,</p>
            <h2 className={styles.mainTitle}>
              <span className={styles.highlight}>법무법인 플로우</span>가 함께 지켜냈습니다.
            </h2>
          </div>

          <div className={styles.mainGrid}>
            {mainReviews.map((review) => (
              <Link href={`/success-stories/${review.id}`} key={review.id} className={styles.mainCard}>
                <div className={styles.mainAvatarContainer}>
                  {review.avatarIcon === 'female' && (
                    <svg viewBox="0 0 100 100" className={styles.avatarSvg}>
                      <circle cx="50" cy="50" r="50" fill="#FEF08A" />
                      <path d="M25,50 C25,25 75,25 75,50 V70 H25 Z" fill="#FCD34D" />
                      <rect x="44" y="55" width="12" height="15" fill="#FDBA74" />
                      <circle cx="50" cy="45" r="20" fill="#FDBA74" />
                      <path d="M30,35 C40,25 60,25 70,35 C65,30 35,30 30,35 Z" fill="#F59E0B" />
                      <path d="M25,80 C25,65 75,65 75,80 V100 H25 Z" fill="#3B82F6" />
                      <path d="M42,65 L50,75 L58,65 Z" fill="#FDBA74" />
                    </svg>
                  )}
                  {review.avatarIcon === 'male1' && (
                    <svg viewBox="0 0 100 100" className={styles.avatarSvg}>
                      <circle cx="50" cy="50" r="50" fill="#A7F3D0" />
                      <rect x="44" y="55" width="12" height="15" fill="#FDBA74" />
                      <circle cx="50" cy="42" r="18" fill="#FDBA74" />
                      <path d="M30,35 C30,20 70,20 70,35 C65,28 35,28 30,35 Z" fill="#78350F" />
                      <path d="M32,32 C35,22 65,22 68,32" fill="#78350F" />
                      <path d="M25,80 C25,65 75,65 75,80 V100 H25 Z" fill="#4B5563" />
                      <path d="M40,65 L50,80 L60,65 Z" fill="#FFFFFF" />
                      <path d="M48,80 L50,100 L52,80 Z" fill="#3B82F6" />
                    </svg>
                  )}
                  {review.avatarIcon === 'male2' && (
                    <svg viewBox="0 0 100 100" className={styles.avatarSvg}>
                      <circle cx="50" cy="50" r="50" fill="#FECACA" />
                      <rect x="44" y="55" width="12" height="15" fill="#FDBA74" />
                      <circle cx="50" cy="42" r="18" fill="#FDBA74" />
                      <path d="M30,32 C35,22 65,22 70,32" fill="#451A03" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
                      <path d="M25,80 C25,65 75,65 75,80 V100 H25 Z" fill="#10B981" />
                      <path d="M42,65 L50,75 L58,65 Z" fill="#FDBA74" />
                    </svg>
                  )}
                </div>
                <div className={styles.mainCardContent}>
                  <h3 className={styles.mainName}>{review.name}</h3>
                  <p className={styles.mainCategory}>{review.category}</p>
                  <p className={styles.mainText}>{review.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            <Link href={`/success-stories/${review.id}`} key={review.id} className={styles.card}>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
