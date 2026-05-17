"use client";

import React, { useState } from 'react';
import styles from './DefectReviews.module.css';

interface ReviewItem {
  id: number;
  category: 'apartment' | 'complex';
  title: string;
  content: string;
  name: string;
  position: string;
  sub: string;
  initial: string;
}

export default function DefectReviews() {
  const [activeTab, setActiveTab] = useState<'all' | 'apartment' | 'complex'>('all');

  const reviews: ReviewItem[] = [
    {
      id: 1,
      category: 'apartment',
      title: '소송비 전액 사후정산 덕분에 입주민 분담금 없이 대기업 건설사를 이겼습니다.',
      content: '건설사가 3년이 넘도록 자잘한 땜질식 임시 보수만 반복하며 시간을 질질 끌어 입주민들의 스트레스가 극에 달했었습니다. 플로우의 전담 엔지니어분들이 직접 단지에 상주하며 외벽 균열 깊이와 공용부 구조 결함까지 전부 리포트화해 주었고, 법원 감정에서 100% 반영받아 18.5억 원의 보수비를 확보했습니다.',
      name: '하계동 A아파트 입주자대표회의 회장',
      position: '1,250세대 대단지 아파트',
      sub: '서울 노원구 / 시공사: 1군 건설사',
      initial: 'A'
    },
    {
      id: 2,
      category: 'complex',
      title: '설계 도면과 다른 오시공을 정밀 대조하여 추가 보수비를 최종 받아냈습니다.',
      content: '시공사에서 착공 승인 도면과 실제 시공에 사용된 마감 부자재 사양이 다른 부분을 교묘하게 은폐하고 있었는데, 플로우 기술진이 사업승인도면을 역추적해 차액을 기망 하자로 입증했습니다. 법리뿐만 아니라 건축 공학 기술 지식으로도 대형 건설사를 압도하는 신선한 실력이었습니다.',
      name: '광교 B 오피스텔 관리단 총무',
      position: '380세대 프리미엄 오피스텔',
      sub: '경기 수원 / 시공사: 중견 건설사',
      initial: 'B'
    },
    {
      id: 3,
      category: 'complex',
      title: '입주 전 사전점검에서 터진 수천 건의 하자 갈등을 완벽 조율해주셨습니다.',
      content: '신축 입주 직전 사전점검에서 미공사 및 장판 들뜸, 욕실 누수 등 5천 건이 넘는 부실 하자가 쏟아져 계약 취소 민원이 빗발쳤습니다. 플로우의 건설전문 변호사팀이 신속히 비상대책 TF를 가동하여 시공사 대표진과의 공식 보수 합의 및 보강 공사 약정을 도출해 안전한 입주를 사수했습니다.',
      name: '송도 C 주상복합 입주예정자협의회 대표',
      position: '650세대 신축 주상복합',
      sub: '인천 연수구 / 시공사: 메이저 건설사',
      initial: 'C'
    }
  ];

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(r => r.category === activeTab);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={styles.headerArea}>
          <span className={styles.kicker}>REAL CLIENT TESTIMONIALS</span>
          <h2 className={styles.mainTitle}>"승소라는 가치로 입증하는 입주민의 감사 후기"</h2>
          <p className={styles.descText}>
            법무법인 플로우 하자전담 TF와 함께 소송비 걱정 없이 정당한 권리와 재산권을 사수한 <br />
            실제 입주민 단체 대표님들의 투명하고 진솔한 후기 데이터입니다.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            전체 후기
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'apartment' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('apartment')}
          >
            아파트 단지
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'complex' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('complex')}
          >
            오피스텔 / 주상복합
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.reviewsGrid}>
          {filteredReviews.map((item) => (
            <div className={styles.reviewCard} key={item.id}>
              
              {/* Card Top */}
              <div className={styles.cardTop}>
                <div className={styles.starRating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <h4 className={styles.reviewTitle}>"{item.title}"</h4>
                <p className={styles.reviewText}>{item.content}</p>
              </div>

              {/* Card Bottom */}
              <div className={styles.cardBottom}>
                <div className={styles.avatar}>
                  {item.initial}
                </div>
                <div className={styles.clientDetails}>
                  <span className={styles.clientName}>{item.name}</span>
                  <span className={styles.clientSub}>{item.position} · {item.sub}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
