import React from 'react';
import styles from './ClassActionStrength.module.css';

const ClassActionStrength = () => {
  return (
    <div className={styles.wrapper}>
      
      {/* ====================================================
          PART 1: "혼자선 어렵습니다, 그러나 함께라면 가능합니다"
         ==================================================== */}
      <section className={styles.sectionPart1}>
        <div className="container">
          <div className={styles.ivoryPanel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>혼자선 어렵습니다. 그러나 함께라면 가능합니다.</h2>
              <p className={styles.panelSubtitle}>
                평범한 개인이 정보력과 자금력을 갖춘 거대 조직에 맞서는 것은 불가능에 가깝습니다. <br />
                그러나 힘을 합치면 가능합니다. 법무법인 플로우는 무너진 정의를 바로 세우고, <br />
                피해자들이 정당한 권리와 보상을 온전히 돌려받을 수 있도록 법률 조력자로 함께합니다.
              </p>
            </div>

            {/* Design Enhanced Sub-items */}
            <div className={styles.designGrid}>
              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>하나의 강력한 목소리</h4>
                <p className={styles.designCardDesc}>흩어진 피해자들의 주장을 하나로 결집시켜 법정에서 가장 강력한 메시지를 전달합니다.</p>
              </div>

              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>분야별 전담 TF 구성</h4>
                <p className={styles.designCardDesc}>대표변호사를 필두로 계리사, 세무사, 건축기술사 등 각 분야 최고의 전문가가 융합팀을 구축합니다.</p>
              </div>

              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>누적 1,000명+의 두터운 신뢰</h4>
                <p className={styles.designCardDesc}>대규모 집단소송을 성공적으로 이끌며 쌓아온 두터운 법률 신뢰도로 의뢰인들을 안전하게 대변합니다.</p>
              </div>

              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>대규모 소송 성공사례 보유</h4>
                <p className={styles.designCardDesc}>동업자 연합, 대규모 신축단지 입주민 연합 등 대기업과 조직을 상대로 한 다양한 소송 노하우를 보유하고 있습니다.</p>
              </div>

              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>즉각적인 대응팀 가동</h4>
                <p className={styles.designCardDesc}>사건이 접수됨과 동시에 증거 보전 및 초기 대책반을 구성하여 골든타임을 확보합니다.</p>
              </div>

              <div className={styles.designCard}>
                <div className={styles.cardAccentLine}></div>
                <h4 className={styles.designCardTitle}>현장 중심 설명회 개최</h4>
                <p className={styles.designCardDesc}>가맹본부, 하자 발생 단지 등 직접 현장에 찾아가 소송의 로드맵을 투명하게 공유하고 설명회를 개최합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          PART 2: "센터 출범 배경"
         ==================================================== */}
      <section className={styles.sectionPart2}>
        <div className="container">
          <div className={styles.accentHeader}>
            <div className={styles.blueSquare}></div>
            <h2 className={styles.sectionTitle}>센터 출범 배경</h2>
          </div>

          <div className={styles.backgroundGrid}>
            {/* Card 1 */}
            <div className={styles.bgCard}>
              <div className={styles.bgNumberBadge}>1</div>
              <h3 className={styles.bgCardTitle}>기존 집단소송의 한계</h3>
              <p className={styles.bgCardDesc}>
                기존의 집단소송은 산발적으로 파편화되어 진행되는 경우가 많아 대형 피고 단체에 신속하게 대응하는 데 한계가 존재했습니다.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.bgCard}>
              <div className={styles.bgNumberBadge}>2</div>
              <h3 className={styles.bgCardTitle}>대규모 피해의 지속적 증가</h3>
              <p className={styles.bgCardDesc}>
                담합, 불공정 약관 개정, 개인정보 대량 유출, 프랜차이즈 가맹금 전가 등 다수 소비자를 대상으로 한 대규모 피해가 연이어 발생하고 있습니다.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.bgCard}>
              <div className={styles.bgNumberBadge}>3</div>
              <h3 className={styles.bgCardTitle}>체계적 법률 지원의 필요성</h3>
              <p className={styles.bgCardDesc}>
                방대한 피해 자료 입증과 조직적 피고에 대응하기 위해 고도의 리걸테크 시스템과 대형 소송 수행력을 갖춘 로펌의 전폭적인 지원이 중요해졌습니다.
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className={styles.bottomBanner}>
            <div className={styles.bannerLogo}>FLOW LAW</div>
            <p className={styles.bannerText}>
              법무법인 플로우의 선제적 대응: 자체 고도화된 집단소송 모집/조정 시스템과 대형 로펌급 소송 역량을 결합하여 전담 센터를 전격 발족했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          PART 3: "법무법인 플로우의 강점"
         ==================================================== */}
      <section className={styles.sectionPart3}>
        <div className="container">
          <div className={styles.accentHeader}>
            <div className={styles.blueSquare}></div>
            <h2 className={styles.sectionTitleWhite}>법무법인 플로우의 강점</h2>
          </div>

          <div className={styles.strengthGrid}>
            {/* Card 1 */}
            <div className={styles.strengthCard}>
              <div className={styles.strengthIconBox}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className={styles.strengthCardTitle}>탁월한 전문성</h3>
              <p className={styles.strengthCardDesc}>
                검사장·부장검사 출신 변호사들과 각 행정·규제 파트별 15년 이상의 풍부한 법리 전문 지식을 보유한 엘리트 변호사진이 전담 변론팀을 구성합니다.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.strengthCard}>
              <div className={styles.strengthIconBox}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className={styles.strengthCardTitle}>검증된 실적</h3>
              <p className={styles.strengthCardDesc}>
                대기업 및 유수의 가맹본사, 대규모 시공사를 대상으로 전방위적인 승소 및 유리한 조정 판결을 이끌어 낸 대규모 소송 수행 실적을 자랑합니다.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.strengthCard}>
              <div className={styles.strengthIconBox}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className={styles.strengthCardTitle}>체계적 시스템</h3>
              <p className={styles.strengthCardDesc}>
                원스톱 소송단 모집 플랫폼 운영, 소송 현황 실시간 공유 및 투명한 비용 관리 시스템을 통해 대규모 소송단이 겪는 불안과 혼선을 원천 차단합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ClassActionStrength;
