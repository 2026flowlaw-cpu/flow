import React from 'react';
import Header from '@/components/Header/Header';
import PartnerCarousel from '@/components/PartnerCarousel/PartnerCarousel';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutIntroPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main>
        {/* Section 2: Sub-Hero */}
        <section className={styles.subHero}>
          <div className={styles.heroOverlay}></div>
          <Image 
            src="/images/subhero_intro.png" 
            alt="About Intro Hero" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={`${styles.heroContainer} container`}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                하자소송,<br />
                법무법인 일신가 함께합니다.
              </h1>
              <p className={styles.heroSubtitle}>
                철학이 담긴 전문적인 변론으로 의뢰인의 가치를 증명합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Greetings */}
        <section className="section">
          <div className="container">
            <div className={styles.greetingsGrid}>
              <div className={styles.sideLabel}>GREETINGS</div>
              <div className={styles.greetingsContent}>
                <h2 className={styles.sectionTitle}>"모든 사안에는 그 사안만의 해결책이 있습니다."</h2>
                <div className={styles.textBlock}>
                  <p>법무법인 일신를 찾아주신 의뢰인 여러분, 안녕하십니까.</p>
                  <p>
                    많은 분들이 건설 분쟁과 하자 소송이라는 예기치 못한 어려움 앞에서 막막해하십니다. 
                    복잡한 도면과 공사 기록, 난해한 법리 지식이 얽혀 있는 건설 소송은 일반적인 법리만으로는 해결하기 어려운 분야입니다.
                  </p>
                  <p>
                    저희 법무법인 일신는 단순한 법률 자문을 넘어, 건설 현장의 실무 경험과 정교한 계산사 수행팀의 시너지를 통해 
                    의뢰인이 잃어버린 권리를 완벽하게 되찾아 드리는 것을 사명으로 삼고 있습니다.
                  </p>
                  <p>
                    의뢰인의 고민 앞에 가장 낮은 자세로 경청하고, 결과 앞에서는 가장 당당한 법률 전문가가 되겠습니다.
                  </p>
                  <div className={styles.signature}>
                    <span>법무법인 일신 대표변호사</span>
                    <strong>김일신 드림</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Vision */}
        <section className={styles.darkSection}>
          <div className="container">
            <h2 className={styles.centerTitle}>VISION & VALUE</h2>
            <div className={styles.visionGrid}>
              <div className={styles.visionCard}>
                <div className={styles.visionNumber}>01</div>
                <h3>최고의 전문성</h3>
                <p>수천 건의 건설 소송 데이터베이스를 기반으로 한 독보적인 승소 전략</p>
              </div>
              <div className={styles.visionCard}>
                <div className={styles.visionNumber}>02</div>
                <h3>실질적 해결</h3>
                <p>단순 승소를 넘어 의뢰인의 실질적인 하자 보수와 보상금 수령까지 책임집니다.</p>
              </div>
              <div className={styles.visionCard}>
                <div className={styles.visionNumber}>03</div>
                <h3>신뢰의 동행</h3>
                <p>사건의 시작부터 끝까지 의뢰인과 밀착 소통하며 불안함 없는 법률 서비스 제공</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Philosophy */}
        <section className="section">
          <div className="container">
            <div className={styles.philosophyHeader}>
              <h2 className={styles.sectionTitle}>법무법인 일신의 3대 경영 철학</h2>
            </div>
            <div className={styles.philosophyGrid}>
              <div className={styles.philosophyItem}>
                <div className={styles.icon}>🔬</div>
                <h4>정밀 진단</h4>
                <p>작은 하자 하나 놓치지 않는 현장 중심의 철저한 조사 시스템</p>
              </div>
              <div className={styles.philosophyItem}>
                <div className={styles.icon}>🤝</div>
                <h4>공감과 경청</h4>
                <p>의뢰인의 입장에서 생각하고 함께 고민하는 진정성 있는 법률 파트너</p>
              </div>
              <div className={styles.philosophyItem}>
                <div className={styles.icon}>⚡</div>
                <h4>신속한 대응</h4>
                <p>시간이 생명인 건설 분쟁에서 가장 효율적이고 빠른 법적 절차 수행</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Reason */}
        <section className={styles.splitSection}>
          <div className={styles.splitImage}>
            <Image 
              src="/images/intro_reason.png" 
              alt="Professional Office" 
              fill 
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.splitContent}>
            <div className={styles.contentInner}>
              <h2 className={styles.sectionTitle}>법무법인 일신의 존재 이유</h2>
              <div className={styles.textBlock}>
                <p>우리는 단순히 법조문을 읽는 사람이 아닙니다.</p>
                <p>
                  누군가에게는 평생을 일구어 마련한 소중한 보금자리를 지키고, 
                  또 누군가에게는 공정한 건설 문태를 정착시키기 위한 투쟁의 최전선에 서 있습니다.
                </p>
                <p>
                  법무법인 일신의 존재 이유는 명확합니다. 
                  가장 힘든 순간에 가장 믿음직한 방패가 되어 드리는 것, 
                  그것이 우리가 존재하는 이유이자 유일한 가치입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Differentiation */}
        <section className={styles.accentSection}>
          <div className="container">
            <div className={styles.differentGrid}>
              <div className={styles.diffHeader}>
                <h2 className={styles.sectionTitle}>왜 법무법인 일신인가?</h2>
                <p className={styles.diffSubtitle}>우리가 압도적인 성과를 내는 이유입니다.</p>
              </div>
              <div className={styles.diffList}>
                <div className={styles.diffItem}>
                  <strong>01. 건설 전문 계산사 수행팀 상주</strong>
                  <p>법률적 지식뿐만 아니라 기술적인 분석까지 한 번에 해결합니다.</p>
                </div>
                <div className={styles.diffItem}>
                  <strong>02. 맞춤형 전담 변호사 시스템</strong>
                  <p>사건 접수부터 판결까지 한 명의 전문 변호사가 끝까지 책임집니다.</p>
                </div>
                <div className={styles.diffItem}>
                  <strong>03. 투명한 수수료 체계</strong>
                  <p>의뢰인이 이해할 수 있는 합리적이고 투명한 승소 수수료 구조를 지향합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Partner Logos */}
        <PartnerCarousel />
      </main>

      <Footer />
    </div>
  );
}
