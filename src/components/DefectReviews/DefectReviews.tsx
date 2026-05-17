"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './DefectReviews.module.css';

interface ReviewItem {
  id: number;
  content: string;
  clientType: string;
  location: string;
  initial: string;
}

export default function DefectReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const reviews: ReviewItem[] = [
    {
      id: 1,
      content: '신축 빌라 입주 후 벽면에 미세한 균열과 곰팡이가 생겨 시공사에 항의했지만, 단순 습기 관리 소홀이라며 제 탓만 하더군요. 너무 억울해서 변호사사무실 왔는데 직접 현장에 오셔서 분석도 해주시고 기술 감정도 지원해주신 덕분에 시공사로부터 전면 재시공과 피해보상금까지 받아낼 수 있었습니다.',
      clientType: '신축 빌라 분양 입주자',
      location: '서울 강북구 빌라 단지',
      initial: '김'
    },
    {
      id: 2,
      content: '시공사에서는 원래 그런 거라며 차일피일 미루기만 해서 포기할까 했거든요. 그런데 변호사님이랑 상담하고 코칭받은대로 했더니 업체 태도가 180도 바뀌더군요. 전문가와 함께해야 하는 이유를 이번에 확실히 알았습니다.',
      clientType: '상가 건물 수분양자',
      location: '경기 김포 상업지구',
      initial: '이'
    },
    {
      id: 3,
      content: '현장까지 오셔서 구석구석 체크하시는 모습에 신뢰가 갔습니다. 서류로만 싸우는 게 아니라 현장의 실태를 정확히 짚어주시니 판사님도 저희 손을 들어주신 것 같아요. 정말 고생 많으셨습니다.',
      clientType: '아파트 입주자대표회의 대표',
      location: '인천 송도 대단지 아파트',
      initial: '박'
    },
    {
      id: 4,
      content: '무조건 소송만 권하는 곳들과 달리, 변호사님은 저희 상황에서 가장 효율적인 방법부터 제안해주셨어요. 덕분에 시간과 비용 모두 아끼면서도 필요한 보수는 다 받게 되었습니다. 의뢰인 입장을 먼저 생각해주셔서 감사합니다.',
      clientType: '신축 단독주택 건축주',
      location: '경기 용인 전원주택단지',
      initial: '최'
    },
    {
      id: 5,
      content: '하자소송이 워낙 길고 복잡해서 지칠 때도 많았는데, 그때마다 섬세하게 케어해주셔서 끝까지 올 수 있었습니다. 이번 건 끝나고 다른 법률 고민도 상담드렸는데 역시나... 명쾌하시네요. 앞으로 저희 집 법률 주치의로 모시려고요 ㅎㅎ',
      clientType: '오피스텔 관리단 임원',
      location: '서울 서초구 오피스텔',
      initial: '정'
    }
  ];

  // Extended list at both ends for infinite loop with 3 visible cards
  const extendedReviews = [
    reviews[reviews.length - 2],
    reviews[reviews.length - 1],
    ...reviews,
    reviews[0],
    reviews[1],
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 5000); // Auto slide every 5 seconds
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [isPaused]);

  // Dynamic calculation of horizontal translate offset
  const translation = isMobile
    ? `-${(currentIndex + 2) * 100}%`
    : `calc(-${(currentIndex + 2) * 33.333}% + 33.333%)`;

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={styles.headerArea}>
          <span className={styles.kicker}>REAL CLIENT REVIEWS</span>
          <h2 className={styles.mainTitle}>"의뢰인이 직접 작성한 법무법인 플로우 생생한 후기"</h2>
          <p className={styles.descText}>
            어려운 하자 분쟁의 고비마다 변호사와 기술진이 한 몸으로 뛰며 <br />
            의뢰인의 소중한 권리와 안전한 보수 결과를 지켜낸 진짜 이야기입니다.
          </p>
        </div>

        {/* Carousel Slider Outer Wrapper */}
        <div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Prev Button */}
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Previous review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Viewport Box */}
          <div className={styles.carouselViewport}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(${translation})` }}
            >
              {extendedReviews.map((item, i) => {
                const isCenter = i === currentIndex + 2;
                const slideClassName = `${styles.carouselSlide} ${isCenter ? styles.activeSlide : ''}`;
                return (
                  <div className={slideClassName} key={`${item.id}-${i}`}>
                    <div className={styles.reviewCard}>
                      
                      {/* Floating Quote Icon */}
                      <div className={styles.quoteIcon}>
                        <svg width="48" height="36" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 18C0 8.05888 8.05888 0 18 0V7.2C12.0355 7.2 7.2 12.0355 7.2 18H18V32H0V18ZM22 18C22 8.05888 30.0589 0 40 0V7.2C34.0355 7.2 29.2 12.0355 29.2 18H40V32H22V18Z" fill="#C5A059" fillOpacity="0.18"/>
                        </svg>
                      </div>

                      {/* Star Rating & Card Body */}
                      <div className={styles.cardTop}>
                        <div className={styles.starRating}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={styles.star}>★</span>
                          ))}
                        </div>
                        <p className={styles.reviewText}>"{item.content}"</p>
                      </div>

                      {/* Client Info Footer */}
                      <div className={styles.cardBottom}>
                        <div className={styles.avatar}>
                          {item.initial}
                        </div>
                        <div className={styles.clientDetails}>
                          <span className={styles.clientName}>{item.clientType}</span>
                          <span className={styles.clientSub}>{item.location}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Next Button */}
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Next review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Bottom Pagination Dots */}
        <div className={styles.paginationDots}>
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
