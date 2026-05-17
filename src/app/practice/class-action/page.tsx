"use client";

import React from 'react';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClassActionSuccess from '@/components/ClassActionSuccess/ClassActionSuccess';
import ClassActionStrength from '@/components/ClassActionStrength/ClassActionStrength';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import ClassActionCases from '@/components/ClassActionCases/ClassActionCases';

export default function ClassActionPage() {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        
        {/* NEW HIGH-FIDELITY DUAL HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroContentGrid}>
            
            {/* Left Block: Beige/Cream Premium Theme */}
            <div className={styles.beigeHeroCard}>
              <span className={styles.beigeTag}>ALL-IN-ONE TOTAL CARE</span>
              <h1 className={styles.beigeMainTitle}>하자소송 특화, ONE STOP 종합 법률서비스</h1>
              <p className={styles.beigeSubtitle}>
                하자조사-진단-보수지치 솔루션(All-In-One) 토탈케어<br />
                하자소송의 처음과 끝, 법무법인 플로우가 함께합니다.
              </p>
              
              <div className={styles.beigeDivider}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>

              <h2 className={styles.beigeSubTitle2}>하자소송 특화! 압도적 경험과 실력</h2>
              
              <ul className={styles.beigeList}>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  <strong>전국 800+ 단지</strong> 하자소송 수행 및 승소
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  누적 회수 보수비 <strong>2,500억 원+</strong>
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  국내 주요 건설사 상대 승소사례 다수 보유
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  집합건물분쟁 법률자문 <strong>500회 이상</strong>
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  대한변협 등록 건설전문변호사 직접 상담
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  부동산·건설 기술인력 자체보유
                </li>
                <li>
                  <span className={styles.goldDot}>✓</span>
                  입주자대표회의/관리단/시행회 맞춤형 컨설팅
                </li>
              </ul>
            </div>

            {/* Right Block: Dark Grey Premium Promise Theme */}
            <div className={styles.darkHeroCard}>
              <h2 className={styles.darkMainTitle}>동행의 약속</h2>
              <p className={styles.darkSubtitle}>법무법인 플로우는 의뢰인의 든든한 동반자로서 최고의 결과를 약속합니다.</p>
              
              <div className={styles.promiseGrid}>
                {/* Promise 1 */}
                <div className={styles.promiseItem}>
                  <div className={styles.hexagonIconBox}>
                    <div className={styles.hexagonBorder}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>
                  </div>
                  <h3 className={styles.promiseItemTitle}>사례별로 구축된 대응 모델</h3>
                  <p className={styles.promiseItemDesc}>
                    수많은 성공사례를 데이터화하고 사건별 대응모델을 구축함으로써 승소·합의의 솔루션을 제공
                  </p>
                </div>

                {/* Promise 2 */}
                <div className={styles.promiseItem}>
                  <div className={styles.hexagonIconBox}>
                    <div className={styles.hexagonBorder}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  </div>
                  <h3 className={styles.promiseItemTitle}>변호사들의 입체적 협력</h3>
                  <p className={styles.promiseItemDesc}>
                    다양한 전문성을 갖춘 변호사들의 노하우와 정보를 밀접하게 공유하여 최적의 전략을 수립
                  </p>
                </div>

                {/* Promise 3 */}
                <div className={styles.promiseItem}>
                  <div className={styles.hexagonIconBox}>
                    <div className={styles.hexagonBorder}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </div>
                  </div>
                  <h3 className={styles.promiseItemTitle}>고객과의 깊은 신뢰관계</h3>
                  <p className={styles.promiseItemDesc}>
                    분쟁의 예방과 해결 및 사후관리까지 모든 과정에서 지속적으로 이어지는 긴밀한 소통
                  </p>
                </div>

                {/* Promise 4 */}
                <div className={styles.promiseItem}>
                  <div className={styles.hexagonIconBox}>
                    <div className={styles.hexagonBorder}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className={styles.promiseItemTitle}>전담센터 구성</h3>
                  <p className={styles.promiseItemDesc}>
                    전문적 대응이 필요한 경우 전담센터를 배정하여 변호사와 스탭의 축적된 전문성을 적극 활용
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 강점/철학 소개 세션 (히어로 직후 배치) */}
        <ClassActionStrength />

        {/* 3. 성공사례(판결문 롤링 카루셀 - 강점 세션 아래 배치) */}
        <ClassActionSuccess />

        {/* 2. 주요 진행 사건 현황 (수행사례 아래 배치) */}
        <ClassActionCases />

        <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <InquiryForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
