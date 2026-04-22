"use client";

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function GreetingsPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Banner Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <Image 
            src="/images/philosophy_bg.png" 
            alt="Greetings Hero" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={`${styles.heroContent} container`}>
            <h1 className={styles.heroTitle}>대표 인사말</h1>
            <p className={styles.heroSubtitle}>의뢰인의 권익을 지키는 가장 견고한 흐름</p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className={styles.greetings}>
          <div className={`${styles.greetingsGrid} container`}>
            <div className={styles.imageArea}>
              <Image 
                src="/images/lawyer1.png" 
                alt="Representative Lawyer" 
                fill 
                className={styles.ceoImage}
              />
              <div className={styles.imageDecoration}></div>
            </div>
            
            <div className={styles.contentArea}>
              <h2 className={styles.mainQuote}>
                "진정성 있는 소통과 전문적인 변론으로<br />
                의뢰인의 잃어버린 권리를 되찾아 드립니다."
              </h2>
              
              <div className={styles.messageBody}>
                <p>
                  안녕하십니까. 법무법인 플로우 대표변호사 정미우입니다.
                </p>
                <p>
                  집은 우리 삶의 가장 소중한 쉼터이자 자산입니다. 
                  하지만 불실 시공과 하자로 인해 그 소중한 공간이 고통의 장소가 되었을 때, 
                  개인이 거대 시공사나 건설사를 상대로 권리를 주장하는 것은 결코 쉬운 일이 아닙니다.
                </p>
                <p>
                  법무법인 플로우는 바로 그 지점에서 출발했습니다. 
                  우리는 건설 소송이라는 특수한 분야에서 법률적 지식뿐만 아니라, 
                  현장을 꿰뚫어 보는 정밀한 기술적 분석과 수천 건의 판례 데이터베이스를 통해 
                  압도적인 승소 전략을 제시합니다.
                </p>
                <p>
                  단순히 서류를 검토하는 변호사가 아닌, 직접 현장을 발로 뛰며 균열의 깊이를 측정하고 
                  미시공의 근거를 찾아내는 집요함을 약속드립니다. 
                  의뢰인의 입장에서 가장 먼저 고민하고, 결과 앞에서는 가장 당당한 법률 전문가가 되겠습니다.
                </p>
                <p>
                  법무법인 플로우의 '플로우(Flow)'는 끊임없이 의뢰인의 편에서 흐르는 진정성을 의미합니다. 
                  여러분의 든든한 법률 동반자로서 최선을 다하겠습니다. 
                  감사합니다.
                </p>
              </div>
              
              <div className={styles.signatureArea}>
                <span className={styles.signatureRank}>법무법인 플로우 대표변호사</span>
                <div className={styles.signatureName}>
                  정 미 우 <span style={{ fontWeight: 400, color: '#999' }}>(인)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.philosophyBanner}>
          <div className="container">
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🏆</div>
                <h3 className={styles.valueTitle}>전문성 (Expertise)</h3>
                <p className={styles.valueDesc}>
                  하자 판결 데이터 분석 시스템과 기술 전문가 그룹의 협업으로 독보적인 전문성을 유지합니다.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3 className={styles.valueTitle}>신뢰 (Trust)</h3>
                <p className={styles.valueDesc}>
                  모든 과정을 투명하게 공개하며 의뢰인이 진행 상황을 정확히 인지할 수 있도록 밀착 소통합니다.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>💪</div>
                <h3 className={styles.valueTitle}>결과 (Result)</h3>
                <p className={styles.valueDesc}>
                  단순 승소를 넘어 의뢰인이 만족할 수 있는 실질적인 보상과 보수 이행을 목표로 합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
