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



export default function RealEstateDisputePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  부동산 분쟁,<br />
                  <span className={styles.goldHighlight}>법리만으로는</span> 부족합니다
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>수많은 이해관계와 복잡한 권리관계... 부동산소송은 단순하지 않습니다.</span>
                  <span className={styles.titleSub2}>법무법인 플로우는 갈등의 본질과 권리관계의 실체를 정확히 파악하여 여러분의 재산을 지킵니다.</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="NUMBERS & PROMISES"
          sectionTitle="부동산분쟁 특화 로펌 · 권리관계 분석 토탈 솔루션"
          sectionSubtitle="계약파기 · 임대차 · 권리금 · 하자담보책임 · 명도소송 등 각 사안마다 적용 법리와 대응 방식이 다르기 때문에 상황별 / 유형별 / 입장별 솔루션이 필요합니다."
          counters={[
            {
              id: 0,
              target: 3000,
              suffix: '건+',
              title: '부동산 분쟁 수행 및 자문 건수',
              desc: '소송, 조정, 합의를 아우르는 풍부한 자문 및 소송 수행 실적'
            },
            {
              id: 1,
              target: 25,
              suffix: '년+',
              title: '부동산 전문 TF팀',
              desc: '변호사, 세무사, 공인중개사가 유기적으로 결합된 완벽한 솔루션'
            },
            {
              id: 2,
              target: 100,
              suffix: '%',
              title: '현장 중심의 정밀 분석',
              desc: '실제 현장을 직접 확인하고 입체적 분석을 기반으로 실질적인 해결책을 제시합니다.'
            },
            {
              id: 3,
              target: 3,
              suffix: '대 핵심 전략',
              title: '입체적 분쟁 솔루션',
              desc: '말이 통하는 전문가단이 예기치 못한 모든 변수까지 완벽하게 대비합니다.'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '부동산 분쟁 특화 로펌',
              desc: '계약파기, 임대차 분쟁, 권리금 반환 등 정밀한 권리관계 분석을 통해 법률 분쟁을 실질적이고 명쾌하게 해결합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '상황별 최적 솔루션',
              desc: '임대인과 임차인, 매도인과 매수인 등 각 의뢰인이 처한 사안에 알맞은 정교한 법리적 협상 및 변론을 가동합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '유형별 정밀 대처',
              desc: '명도소송, 하자담보책임 등 소송 유형에 따라 오랜 기간 축적해 온 최적의 승소 가이드라인을 제공합니다.',
              iconType: 'twotrack'
            },
            {
              id: 3,
              title: '입장별 밀착 변론',
              desc: '의뢰인의 처한 환경과 입장을 최우선으로 고려하며, 다각적인 사실관계 검토로 소중한 재산과 권리를 철저하게 지켜냅니다.',
              iconType: 'custom'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          kicker="LAW FIRM FLOW"
          mainTitle="부동산분쟁 특화 로펌 · 권리관계 분석 토탈 솔루션"
          descLines={[
            '계약파기 · 임대차 · 권리금 · 하자담보책임 · 명도소송 등',
            '각 사안마다 적용 법리와 대응 방식이 다르기 때문에',
            '상황별 / 유형별 / 입장별 솔루션이 필요합니다.'
          ]}
          difficultyTitle="* 현재 어떤 부동산 법률 분쟁으로 고민하고 계신가요?"
          difficultySubtitle="법무법인 플로우 부동산 TF팀은 모든 성공 사례를 축적하고 있습니다."
          reportSubtitle="법무법인 플로우(FLOW) 부동산 권리관계 정밀 진단 보고서"
          customCases={[
            {
              id: 1,
              label: '부동산 계약파기',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 매매대금 · 계약금반환, 계약파기, 위약금, 배액배상, 이행지체, 부당이득반환',
              legalStrategy: '단순 변심부터 이행지체까지, 매도인과 매수인 간의 책임 소재를 분명히 가려내어 정당한 계약해제와 보상을 이끌어냅니다.'
            },
            {
              id: 2,
              label: '임대차 분쟁',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 주택임대차분쟁, 상가임대차분쟁, 중도해지, 갱신거절, 계약갱신청구권, 원상회복, 수선의무',
              legalStrategy: '주택임대차 · 상가임대차 계약 체결한 임대인과 임차인 각각의 입장을 살피고 이해관계를 조정하여 정당한 권리 행사를 조력합니다.'
            },
            {
              id: 3,
              label: '하자담보책임',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 매도인 담보책임, 누수 · 결로 등 목적물 하자, 위반건축물 매매, 하자보수에 갈음한 손해배상',
              legalStrategy: '매매 후 발견된 누수 · 결로 · 균열 등 하자의 실체를 진단하고 매도인과 매수인, 중개사 등 사건 이해관계인의 책임 소재와 책임 범위를 가려냅니다.'
            },
            {
              id: 4,
              label: '상가 양도양수',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 양도양수계약, 상가권리금반환, 허위매출권리금사기, 내용증명, 양도인 경업금지위반',
              legalStrategy: '허위 매출이나 권리금사기, 동종영업 등 계약 과정의 기망 행위를 철저히 파헤쳐 불공정한 계약을 바로잡고 피해 회복에 앞장섭니다.'
            },
            {
              id: 5,
              label: '권리금 회수 방해',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 신규임차인 주선, 임대차계약 불발, 임대인권리금회수방해, 정당한 거절, 손해배상',
              legalStrategy: '정당하지 않은 사유로 권리금 회수가 불발됐다면 그 실체를 밝혀 법적인 책임을 물을 수 있습니다.'
            },
            {
              id: 6,
              label: '부동산 중개사고',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 공인중개사 설명의무 위반, 중개사고 손해배상, 신탁전세사기, 중개수수료반환, 중개보조원과실',
              legalStrategy: '공인중개사의 설명의무 위반 등 고의 및 과실 책임을 진단하고 상황과 입장에 맞는 실질적인 해법을 제안합니다.'
            },
            {
              id: 7,
              label: '부동산 소유권',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 점유취득시효, 경계침범, 명의신탁, 매매, 상속, 증여',
              legalStrategy: '점유취득시효, 경계침범, 명의신탁, 상속 · 증여 등 오랜세월 얽히고설킨 소유권 갈등을 정교한 법리로 차분하게 풀어냅니다.'
            },
            {
              id: 8,
              label: '명도소송',
              coreDiagnosis: '주요 관련 분쟁 영역:\n• 상가무단점유, 퇴거불응, 월세 연체, 점유이전금지가처분, 불법전대',
              legalStrategy: '불법점유냐, 정당한 권리행사냐. 실체적 진실을 밝히고 의뢰인의 권리회복을 조력합니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection />





        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '부동산 분쟁' 필승 전략]"
          mainTitle={
            <>
              "경험의 차이가 결과의 차이를 만듭니다"<br />
              차별화된 전략과 남다른 통찰력으로 여러분을 조력합니다.
            </>
          }
          descBlock=""
          bottomText={
            <>
              법무법인 플로우는 다수의 부동산 분쟁 및 소송에서 독보적인 실적과 실무 노하우를 보유하고 있으며, 
              수많은 부동산 분쟁 케이스를 분석하여 의뢰인의 소중한 자산과 권리를 보호하는데 앞장서고 있습니다. 
              여러분의 사례가 승소 사례가 될 수 있도록 조력하겠습니다.
            </>
          }
          strategies={[
            {
              id: 1,
              title: '권리관계 정밀 분석',
              desc: '계약서, 등기부, 토지대장 등 관련 서류에 감춰진 리스크를 즉시 분석합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )
            },
            {
              id: 2,
              title: '부동산 분쟁 TF팀 협업',
              desc: '공인중개사, 세무사, 건축기사 등으로 이뤄진 부동산 분쟁 TF팀이 변호사와 협업하여 빈틈없이 조력합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '집행 불능 리스크 차단',
              desc: '가압류·가처분 등 보전처분을 실행하여 승소 후 집행 불능 위험성을 원천 차단합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            },
            {
              id: 4,
              title: '철저한 사후 관리',
              desc: '승소판결문 받는데 그치지 않고 명도 집행, 소유권이전등기, 세무 이슈까지 섬세하게 조력합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              )
            }
          ]}
        />

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
