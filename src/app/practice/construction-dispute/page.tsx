"use client";

import React from 'react';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import DefectPromise from '@/components/DefectPromise/DefectPromise';
import DefectCasesGrid from '@/components/DefectCasesGrid/DefectCasesGrid';
import VerdictSection from '@/components/VerdictSection/VerdictSection';
import DefectStrategyGrid from '@/components/DefectStrategyGrid/DefectStrategyGrid';
import DefectReviews from '@/components/DefectReviews/DefectReviews';
import DefectFaq from '@/components/DefectFaq/DefectFaq';
import styles from './page.module.css';

export default function ConstructionDisputePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  현장을 압니다.<br />
                  그래서 <span className={styles.goldHighlight}>강합니다.</span>
                </h1>
                <p className={styles.heroDescription} style={{ fontSize: '20px', lineHeight: '1.8' }}>
                  수많은 이해관계인과 복잡한 공정, 외부 변수까지... <br />
                  건설현장은 교과서적 지식으로 해결할 수 없는 일 투성이입니다. <br />
                  건설소송은 현장의 생리와 특성을 아는 진짜 건설전문변호사와 함께 해야 합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          sectionSubtitle="건설 현장의 복잡한 이해관계 속에서 의뢰인의 권익을 끝까지 보호하는 법무법인 플로우의 정밀 소송 전략입니다. 압도적인 지표와 최고의 맨파워를 직접 증명합니다."
          counters={[
            {
              id: 0,
              target: 2000,
              suffix: '건+',
              title: '건설 분쟁 수행 및 자문',
              desc: '다양한 건설 소송 및 자문 등을 성공적으로 해결하며 축적한 실적'
            },
            {
              id: 1,
              target: 25,
              suffix: '년+ 경력',
              title: '전문가 결합 TF팀',
              desc: '변호사, 시공기술사, 건축기사로 구성된 건설분쟁 TF팀의 밀착 협업'
            },
            {
              id: 2,
              target: 20,
              suffix: '억 원+',
              title: '단일 사건 최대 승소액',
              desc: '플로우가 철저한 기술 감정 입증을 통해 받아낸 단일 사건 최대 승소액'
            },
            {
              id: 3,
              target: 100,
              suffix: '% 직접상담',
              title: '건설전문변호사 밀착 케어',
              desc: '대한변협등록 건설전문변호사가 모든 초기 상담부터 책임지고 직접 조력'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="건설전문변호사 건설소송 토탈 솔루션"
          descLines={[
            "천문학적 금액이 오가는 건설 분쟁, 현장을 모르면 결코 이길 수 없습니다.",
            "건설소송은 법무법인 플로우가 정답입니다."
          ]}
          customCases={[
            {
              id: 1,
              label: '공사대금',
              coreDiagnosis: '📌 주요 관련 키워드\n공사대금청구, 추가공사비, 설계비, 감리비, 간접공사비, 기성고 정산, 공사비 과지급\n\n💡 법무법인 플로우의 해결 솔루션\n공사 합의 여부, 기성고 등을 정밀 분석하여 실제 투입된 공사 비용에 대한 정당한 정산 및 미지급 대금 회수를 조력합니다.'
            },
            {
              id: 2,
              label: '공사금지가처분',
              coreDiagnosis: '📌 주요 관련 키워드\n공사중지가처분, 공사방해금지가처분, 일조권·조망권 피해, 건물균열 등 인접지 피해\n\n💡 법무법인 플로우의 해결 솔루션\n인접지 공사로 인한 물리적 피해나 일조권·조망권 침해의 실체를 규명하여, 공사중단 필요성을 검토하거나 부당한 중단 요구를 방어합니다.'
            },
            {
              id: 3,
              label: '공사계약파기',
              coreDiagnosis: '📌 주요 관련 키워드\n공사도급계약해지, 공사계약위반, 부실시공, 공사지연, 공사타절, 타절합의서\n\n💡 법무법인 플로우의 해결 솔루션\n공사지연이나 부실시공 등 계약해지의 책임 소재를 명확히 가려내고, 공사타절 과정에서 발생하는 여러 리스크에 대한 솔루션을 제안합니다.'
            },
            {
              id: 4,
              label: '지체상금·손해배상',
              coreDiagnosis: '📌 주요 관련 키워드\n공기지연, 지체상금청구, 건축주 과실, 지체상금 면책·감액, 공사비 상계\n\n💡 법무법인 플로우의 해결 솔루션\n공기지연의 실질적인 원인이 누구에게 있는지 분석하여, 부당한 지체상금 청구를 방어하거나 적정 지연보상금을 산정합니다.'
            },
            {
              id: 5,
              label: '공사하자',
              coreDiagnosis: '📌 주요 관련 키워드\n누수·결로·곰팡이·크랙, 하자로 인한 계약해지, 하자 진단 및 감정, 하자보수비청구\n\n💡 법무법인 플로우의 해결 솔루션\n건물에 발생한 하자의 원인과 실태를 정밀 진단하고, 이에 상응하는 보수 비용이나 손해배상을 청구합니다.'
            },
            {
              id: 6,
              label: '인테리어 분쟁',
              coreDiagnosis: '📌 주요 관련 키워드\n인테리어사기, 인테리어하자, 공사중단, 계약금반환, 계약불이행, 추가공사비 청구\n\n💡 법무법인 플로우의 해결 솔루션\n인테리어 공사계약 불이행, 하자 등 사태의 본질을 파악하여 의뢰인의 권리회복에 앞장섭니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          kicker="승소, 결코 우연이 아닙니다"
          mainTitle="데이터가 증명하는 압도적 실력"
          descText={(
            <>
              건설소송의 승패는 '누가 더 현장을 잘 아는가'에서 갈립니다. <br />
              법무법인 플로우는 결과로 증명했습니다!
            </>
          )}
        />





        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq />

        {/* 5. Inquire Form Section */}
        <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <InquiryForm />
          </div>
        </div>

      </main>
    </div>
  );
}
