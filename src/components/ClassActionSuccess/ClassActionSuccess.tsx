import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { verdictImages } from '@/data/verdictImages';
import styles from './ClassActionSuccess.module.css';

const judgments = [
  {
    category: '동기지연',
    title: '인천 ㅇㅇ 아파트 동기지연 손해배상청구',
    court: '인천지방법원',
    caseNo: '2024가단297***',
    stampText: '손해배상\n인정 승소',
    docText: '1. 피고는 원고들에게 지연손해금 및 배상금을 즉각 지급하라.\n2. 소송비용은 피고가 부담한다.'
  },
  {
    category: '매매대금반환',
    title: '세종시 ㅇㅇ상가 분양계약 관련 매매대금반환',
    court: '서울고등법원',
    caseNo: '2022나2037***',
    stampText: '매매대금\n반환 승소',
    docText: '1. 피고의 항소를 모두 기각하며 계약금을 전액 반환하라.\n2. 소송 총비용은 피고가 부담한다.'
  },
  {
    category: '하자소송',
    title: '당동 ㅇㅇ 아파트 하자소송',
    court: '서울중앙지방법원',
    caseNo: '2024가합115***',
    stampText: '하자소송\n15억 인용',
    docText: '1. 피고는 하자보수에 갈음하는 손해배상금 15억 원을 지급하라.\n2. 가집행할 수 있다.'
  },
  {
    category: '하자소송',
    title: '논산 ㅇㅇ 아파트 하자소송',
    court: '서울중앙지방법원',
    caseNo: '2023가합96***',
    stampText: '하자보수\n9.8억 승소',
    docText: '1. 피고는 하자보수 보증금 9억 8천만 원 및 지연이자를 원고에게 지급하라.'
  },
  {
    category: '분양계약해제',
    title: '인천 ㅇㅇ 생활형숙박시설 부당이득반환청구',
    court: '서울중앙지방법원',
    caseNo: '2020가합570***',
    stampText: '계약해제\n전액 반환',
    docText: '1. 원고들과 피고 사이의 분양계약을 모두 취소한다.\n2. 피고는 기납부 대금을 전액 반환하라.'
  },
  {
    category: '일조권침해',
    title: '광주 ㅇㅇ 일조권침해 손해배상',
    court: '광주지방법원',
    caseNo: '2023가합50***',
    stampText: '일조권침해\n위자료 인정',
    docText: '1. 피고는 원고들에게 일조권 침해에 따른 정신적 위자료 총 6억 원을 지급하라.'
  },
  {
    category: '하자소송',
    title: '강릉 ㅇㅇ 아파트 하자소송',
    court: '서울중앙지방법원',
    caseNo: '2023가단5320***',
    stampText: '하자소송\n조정 성립',
    docText: '1. 피고는 원고에게 4억 2천만 원을 지급하며 하자 일체를 조속히 보수한다.'
  },
  {
    category: '분양계약해제',
    title: '세종 ㅇㅇ 근린생활시설 분양계약해제',
    court: '수원지방법원',
    caseNo: '2022가합21***',
    stampText: '계약취소\n계약금 반환',
    docText: '1. 계약 체결 과정에서의 기망행위를 인정하여 계약을 취소한다.\n2. 계약금을 즉시 반환하라.'
  }
];

const ClassActionSuccess = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % judgments.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + judgments.length) % judgments.length);
  };

  // Autoplay functionality for continuous rolling look, pauses when hovered
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % judgments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className={styles.section}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className={styles.gridContainer}>
          
          {/* Left Column: Headline, Arrows, and Call-to-action */}
          <div className={styles.leftCol}>
            <div className={styles.headerInfo}>
              <span className={styles.kicker}>BUSINESS CASE</span>
              <h2 className={styles.title}>
                집단소송<br />
                <span className={styles.titleHighlight}>주요 수행사례</span>
              </h2>
              <p className={styles.desc}>
                사건별 맞춤 전략으로 이끌어낸 성과,<br />
                기록으로 보여드립니다.
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className={styles.navRow}>
              <button className={styles.navBtn} onClick={prevSlide} aria-label="Previous slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className={styles.navBtn} onClick={nextSlide} aria-label="Next slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* More Button */}
            <Link href="/success-stories" className={styles.moreBtn}>
              더보기
            </Link>
          </div>

          {/* Right Column: Sliding Scanned Court Documents */}
          <div className={styles.rightCol}>
            <div className={styles.sliderViewport}>
              <div 
                className={styles.sliderTrack}
                style={{ transform: `translateX(-${currentIndex * (350 + 24)}px)` }}
              >
                {judgments.map((item, idx) => {
                  const imageSrc = verdictImages.classAction[idx % verdictImages.classAction.length];

                  return (
                    <div
                      key={idx}
                      className={`${styles.card} ${idx === currentIndex ? styles.activeCard : ''}`}
                    >
                      {/* Category tag */}
                      <span className={styles.cardCategory}>{item.category}</span>
                      
                      {/* Short title description */}
                      <h3 className={styles.cardTitle}>{item.title}</h3>

                      {/* High-fidelity scanned court decision inside the card */}
                      <div className={styles.paperFrame}>
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={`집단소송 판결문 ${idx + 1}`}
                            fill
                            sizes="320px"
                            className={styles.verdictImage}
                          />
                        ) : (
                          <>
                            {/* Document watermarked seal */}
                            <div className={styles.paperSeal}>判</div>

                            {/* Official Court Document Layout */}
                            <div className={styles.docInnerHeader}>
                              <span className={styles.docCourtName}>{item.court}</span>
                              <span className={styles.docSubject}>판 결</span>
                            </div>

                            <div className={styles.docBody}>
                              <div className={styles.docLine}>
                                <span className={styles.docLabel}>사 건</span>
                                <span className={styles.docVal}>{item.caseNo}</span>
                              </div>
                              <div className={styles.docLine}>
                                <span className={styles.docLabel}>원 고</span>
                                <span className={styles.docVal}>공동소송단 외 다수</span>
                              </div>
                              <div className={styles.docLine}>
                                <span className={styles.docLabel}>피 고</span>
                                <span className={styles.docVal}>주식회사 00건설 외</span>
                              </div>

                              <div className={styles.docDivider}></div>

                              <span className={styles.docOrderLabel}>주 문</span>
                              <p className={styles.docOrderText}>{item.docText}</p>
                            </div>

                            {/* Prominent Red Ink Seal Stamp Overlay in the center/bottom */}
                            <div className={styles.redStamp}>
                              <div className={styles.stampInner}>{item.stampText}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className={styles.carouselNotice}>
              * 판결문 슬라이더에 마우스를 올리시면 자동 전환이 일시정지됩니다.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClassActionSuccess;
