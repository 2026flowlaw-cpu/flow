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



export default function JeonseFraudPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  보증금반환소송,<br />
                  승소해도 <span className={styles.goldHighlight}>끝이 아닙니다</span>
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>전세보증금, 누군가에게는 전재산입니다.</span>
                  <span className={styles.titleSub2}>그러나 승소 판결문만으로는 보증금을 돌려받을 수 없습니다.</span>
                </div>
                <p className={styles.heroDescription}>
                  법무법인 플로우는 보증금 반환이 이뤄지는 최후의 순간까지 함께 하겠습니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="NUMBERS & PROMISES"
          sectionTitle="법무법인 플로우의 압도적 경험과 실력"
          sectionSubtitle="전세사기 피해자들의 정당한 권리 보호를 최우선으로 생각하는 법무법인 플로우의 전문 솔루션입니다. 완벽한 지표와 최고의 맨파워로 실력과 결과를 직접 증명합니다."
          counters={[
            {
              id: 0,
              target: 2000,
              suffix: '+',
              title: '전세피해 수행 건수',
              desc: '풍부한 실전 전세 사기 및 피해 구제 해결 실적'
            },
            {
              id: 1,
              target: 95,
              suffix: '%',
              title: '보증금 회수 성공률',
              desc: '의뢰인의 소중한 재산인 보증금 회수 성공 비율'
            },
            {
              id: 2,
              target: 6,
              suffix: '개월 (평균)',
              title: '신속한 해결 기일',
              desc: '체계화된 노하우를 바탕으로 한 신속한 분쟁 종결 기일'
            },
            {
              id: 3,
              target: 25,
              suffix: '년+',
              title: '전세사기 전담 경력',
              desc: '전세사기 전담 법률 대리인단의 축적된 전문성'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '대항력·우선변제권 즉시 점검',
              desc: '상담 당일 대항력 및 우선변제권을 정밀하게 즉시 분석하여 가장 신속하고 확실한 법적 방어막을 구축합니다.',
              iconType: 'consult'
            },
            {
              id: 1,
              title: '형사·민사 투트랙 동시 대응',
              desc: '형사 고소와 민사 보증금 반환 청구 소송을 유기적으로 동시에 전개하여 피의자를 압박하고 회수율을 극대화합니다.',
              iconType: 'twotrack'
            },
            {
              id: 2,
              title: '경매 절차 밀착 대응',
              desc: '경매 진행 시 임차인의 우선매수권 및 낙찰을 통한 최종 채권 보전까지 경매 절차 전 과정을 완벽히 조력합니다.',
              iconType: 'auction'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="보증금반환 판결부터 경매까지, 전세사기 토탈 솔루션"
          descLines={[
            '보증금반환소송에서 승소해 판결문을 받아도 이는 종이 한장에 불과합니다.',
            '법무법인 플로우는 승소를 넘어 보증금 회수를 목표로 합니다.',
            '소송부터 집행까지 논스톱 & 원스톱 조력이 가능한 전세사기 전문가를 찾고 계시다면 플로우가 정답입니다.'
          ]}
          customCases={[
            {
              id: 1,
              label: '보증금 미반환',
              coreDiagnosis: '집주인에게 보증금 반환 능력이 없거나 연락이 안 된다면 즉시 법적 조치를 시작해야 합니다. 시간이 지날수록 재산 처분·은닉 위험이 높아집니다.',
              engineeringSolution: '',
              legalStrategy: '임차권등기명령 신청으로 대항력 유지 (이사 가능), 내용증명 발송 → 지급명령 → 소송 순으로 진행, 부동산·예금 가압류로 재산 은닉 차단, 강제집행으로 실제 보증금 회수'
            },
            {
              id: 2,
              label: '경매 진행',
              coreDiagnosis: '경매가 시작됐더라도 포기하지 마세요. 배당요구 종기일 전에 배당요구 신청하면 최우선변제권 또는 대항력으로 보증금을 지킬 수 있습니다.',
              engineeringSolution: '',
              legalStrategy: '배당요구 종기일 이전 즉시 배당요구 신청, 최우선변제권 요건(소액임차인 기준) 충족 여부 확인, 전세사기특별법상 우선매수권 행사 검토, 배당이의 신청으로 부당 배당 다루기'
            },
            {
              id: 3,
              label: '전세사기 의심',
              coreDiagnosis: '아직 피해가 확정되지 않았더라도 선제적인 조치가 중요합니다. 지금 즉시 권리관계를 점검하고 대응책을 마련해야 합니다.',
              engineeringSolution: '',
              legalStrategy: '등기부등본 선순위 채권·경매 현황 즉시 확인, 전입신고·확정일자 날짜 vs 선순위 설정일 날짜 비교, 점유 유지, 전세사기피해자 신고 및 특별법 적용 검토'
            },
            {
              id: 4,
              label: '깡통전세',
              coreDiagnosis: '전세가율이 80% 초과하면 경매 시 전액 회수가 어려울 가능성이 높습니다. 빠른 판단과 대응이 필요합니다.',
              engineeringSolution: '',
              legalStrategy: '현재 시세·선순위 채권 기준 배당 가능 금액 시뮬레이션, 임대인 재산 현황 파악 및 가압류 선제적 검토, 소액임차인 최우선변제금 보호 여부 확인, 전세계약 해지 가능성 및 손해배상청구 방안 수립'
            },
            {
              id: 5,
              label: '이중계약',
              coreDiagnosis: '같은 주택에 다수 임차인과 계약하거나 보증금을 이중 수령한 경우 사기죄에 해당합니다. 형사·민사를 동시에 진행해야 합니다.',
              engineeringSolution: '',
              legalStrategy: '사기죄 형사고소 → 수사기관 압박을 통한 협상, 다른 임차인과 우선순위 다툼 전략 수립, 집주인 재산 가압류로 보증금 확보'
            },
            {
              id: 6,
              label: '보증보험 분쟁',
              coreDiagnosis: 'HUG·SGI 보증보험 지급 거부 등 보험사의 부당한 면책 주장은 법적으로 다를 수 있습니다. 거부 통지를 받은 즉시 이의 절차를 시작해야 합니다.',
              engineeringSolution: '',
              legalStrategy: '보험사 면책 사유 정당성 검토, 이의신청서 작성 및 제출, HUG 상대 행정소송 또는 보험금 청구 소송, 이의 제기 기한 관리 - 기한 도과 전 즉시 대응'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          descText="포기하려 했던 보증금, 법무법인 플로우 함께라면 가능합니다."
        />


        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '전세사기' 필승 전략]"
          descBlock={
            <>
              <span className={styles.descLine}>대한법률구조공단 전세사기피해자 법률지원 지정 로펌 플로우가</span>
              <span className={styles.descLine}>전세금 즉시 진단부터 형사·민사 소송 및 임대인 재산 추적까지 올인원 밀착 지원합니다.</span>
            </>
          }
          bottomText={
            <>
              법무법인 플로우는 대한법률구조공단 전세사기피해자 법률구조 제휴를 맺은 로펌이며, 
              전세모(전세세입자모임)카페와 업무제휴를 맺은 로펌으로 수천건에 이르는 전세사기 케이스를 보유하고 있습니다. 
              아울러 다수의 보증금 반환소송에서 전부승소한 바, 여러분의 사례가 승소 사례가 될 수 있도록 조력하겠습니다.
            </>
          }
          strategies={[
            {
              id: 1,
              title: '전세보증금 회수 가능성 즉시 분석',
              desc: '상담 당일 대항력·최우선변제권 요건, 선순위 채권 현황, 배당 가능 금액을 즉시 분석합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )
            },
            {
              id: 2,
              title: '형사·민사 투트랙 대응',
              desc: '사기죄 형사고소와 보증금반환 민사소송을 동시에 진행합니다. 형사고소를 통한 압박이 협상 테이블을 열기도 합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '중개사 과실 진단',
              desc: '공인중개사의 설명의무 위반이 확인되면 중개사 및 공제보험을 통한 배상청구까지 연계하여 회수 가능성을 높입니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              )
            },
            {
              id: 4,
              title: '확실한 사후케어',
              desc: '판결문 확보 즉시 전문 신용조사를 통해 임대인의 신용 상태와 체납 내역, 주거래 은행, 은닉 재산을 정밀 추적하여 보증금을 끝까지 회수합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              )
            },
            {
              id: 5,
              title: '비용부담 최소화',
              desc: '전세사기가 민생 사건인 점을 감안, 최초 상담부터 수임에 이르는 전과정에 비용 부담을 최소화하였습니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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
