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



export default function GeneralCivilPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  여러분이 고민하고 계신 그 사건,<br />
                  <span className={styles.goldHighlight}>이미 이겨봤습니다</span>
                </h1>
                <p className={styles.heroDescription}>
                  대여금, 손해배상, 부당이득반환 등 민사 분쟁은 우리 삶과 가장 밀접한 사건이지만, <br />
                  원하는 결과를 얻기 위해서는 고단한 싸움을 각오해야 합니다. <br />
                  법무법인 플로우는 치밀한 분석과 날카로운 법리로 의뢰인의 일상 회복을 조력합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="NUMBERS & PROMISES"
          sectionTitle="법무법인 플로우의 압도적 경험과 실력"
          sectionSubtitle="의뢰인의 소중한 권익과 소송 승리를 위해 법무법인 플로우는 단 한 순간도 타협하지 않습니다. 치밀한 분석과 완벽한 지표로 최고의 법률 서비스를 증명합니다."
          counters={[
            {
              id: 0,
              target: 10000,
              suffix: '건+',
              title: '민사소송 및 자문 수행건수',
              desc: '다양한 소송 사례를 통해 축적된 플로우만의 독보적인 소송 통계 자료 보유'
            },
            {
              id: 1,
              target: 14,
              suffix: '일 이내',
              title: '소장 접수까지 신속 대응',
              desc: '사건 수임 시점부터 평균 14일 이내 신속한 소장 작성 및 법원 제출 완료'
            },
            {
              id: 2,
              target: 24,
              suffix: '시간',
              title: '언제 어디서든 간편 상담 접수',
              desc: '전화, 카카오톡, 웹 문의 등 의뢰인이 편리한 경로로 항시 상담 연계'
            },
            {
              id: 3,
              target: 365,
              suffix: '일',
              title: '민사소송 긴급 대응 TF팀 운영',
              desc: '풍부한 실무 능력을 갖춘 전담 TF가 365일 실시간 상주하며 신속 지원'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '민사 전문 변호사 직접 상담',
              desc: '풍부한 소송 실무를 거친 전담 변호사가 초기 면담부터 서면 작성, 변론까지 외주 없이 100% 밀착 진행합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '치밀한 사실관계 입증',
              desc: '모호한 법률 해석에만 의존하지 않고, 정밀한 계좌 분석, 계약 분석을 통하여 확실한 승소 증거를 구축합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '상황 맞춤형 분쟁 솔루션',
              desc: '무조건적인 소송 남발 대신 가압류, 가처분, 협의 대리 등 의뢰인의 실리 극대화를 최우선으로 결정합니다.',
              iconType: 'consult'
            },
            {
              id: 3,
              title: '압도적인 승소 데이터',
              desc: '수천 건의 민사 집행 및 채권 회수 성공 레코드를 바탕으로, 판결문 획득을 넘어 실질적 재산 보전을 이뤄냅니다.',
              iconType: 'twotrack'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="민사분쟁 원스톱 종합 솔루션"
          descLines={[
            "사안마다 얽혀있는 이해관계와 법률 쟁점이 다르기 때문에",
            "상황별 / 원인별 / 단계별 솔루션이 필요합니다."
          ]}
          difficultyTitle="* 현재 어떤 어려움을 겪고 계신가요?"
          difficultySubtitle="법무법인 플로우는 민사 소송 전 영역의 솔루션을 제공합니다."
          reportSubtitle="법무법인 플로우(FLOW) 일반 민사 분쟁 정밀 분석 보고서"
          customCases={[
            {
              id: 1,
              label: '금전채권',
              coreDiagnosis: '관련 실무: 대여금반환, 투자금반환, 구상금청구, 보증채무, 채권압류 및 추심, 지연손해금, 공탁금 출급',
              legalStrategy: '대여금 및 투자금 반환 등 정당한 채권을 확보하기 위해 치밀한 증거 분석과 신속한 보전처분으로 자산 회수 솔루션을 제공합니다.'
            },
            {
              id: 2,
              label: '상거래 계약',
              coreDiagnosis: '관련 실무: 가맹계약분쟁, 프랜차이즈 분쟁, 물품대금청구, 용역비정산, 계약해제·해지, 위약금 청구',
              legalStrategy: '가맹 및 물품대금 등 복잡한 상거래 분쟁에서 계약 해석의 우위를 점하고 전략적 대응을 통해 의뢰인의 비즈니스 실익을 극대화합니다.'
            },
            {
              id: 3,
              label: '동업계약',
              coreDiagnosis: '관련 실무: 수익배분 분쟁, 동업해지 및 청산, 정산금 청구, 동업자 탈퇴·제명, 투자금 반환, 동업계약서 정비',
              legalStrategy: '수익 배분 및 정산을 둘러싼 갈등 상황에서 객관적인 진단과 법률 분석을 바탕으로 투명하고 공정한 청산 및 분쟁 해결 전략을 제시합니다.'
            },
            {
              id: 4,
              label: '일반불법행위',
              coreDiagnosis: '관련 실무: 손해배상청구, 위자료청구, 명예훼손·모욕, 사생활 침해, 사용자 책임, 과실책임 입증',
              legalStrategy: '명예훼손 및 사생활 침해 등 불법행위로 인한 피해에 대해 인과관계를 명확히 입증하여 정당한 손해배상과 위자료를 이끌어냅니다.'
            },
            {
              id: 5,
              label: '소송절차',
              coreDiagnosis: '관련 실무: 가압류·가처분, 지급명령신청, 강제집행, 증거보전, 소장 작성 및 대응, 항소·상고, 소송비용 확정',
              legalStrategy: '가압류부터 소장 작성, 강제집행까지 민사소송 전 과정의 절차적 리스크를 완벽히 관리하여 판결 이후의 실효성까지 책임지고 케어합니다.'
            },
            {
              id: 6,
              label: '소멸시효',
              coreDiagnosis: '관련 실무: 채권 소멸시효 완성, 시효중단 조치, 상사시효, 단기소멸시효, 확정판결 시효연장',
              legalStrategy: '채권의 소멸시효 완성 여부를 정밀 진단하고 시효 중단 조치 및 연장 전략을 통해 사라질 뻔한 의뢰인의 소중한 권리를 안전하게 지켜드립니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          kicker="승소, 결코 우연이 아닙니다"
          mainTitle="모두가 불가능하다고 했던 사건, 법무법인 플로우는 결과로 증명했습니다!"
          descText="데이터가 증명하는 압도적 실력"
          verdicts={[
            {
              id: 1,
              court: '서울중앙지방법원',
              caseNo: '2023가단51082',
              plaintiff: '원고 이XX (의뢰인)',
              orderText: '피고는 원고에게 차용 원금 1억 8천만 원 및 이에 대한 지연손해금을 즉각 지급하라.',
              stampText: '대여금 원금 전액 인용'
            },
            {
              id: 2,
              court: '서울동부지방법원',
              caseNo: '2023가합80491',
              plaintiff: '원고 정XX (동업자)',
              orderText: '피고는 동업 계약 해지에 따른 정산금으로 원고에게 3억 2천만 원을 지급하라.',
              stampText: '정산금 청구 완승'
            },
            {
              id: 3,
              court: '수원지방법원',
              caseNo: '2024가합10283',
              plaintiff: '원고 주식회사 XX (상인)',
              orderText: '피고의 불법행위 책임을 인정하며, 영업 손실액 2억 1천만 원을 원고에게 즉각 배상하라.',
              stampText: '불법행위 손배 인용'
            },
            {
              id: 4,
              court: '인천지방법원',
              caseNo: '2022가합30894',
              plaintiff: '원고 최XX (매수인)',
              orderText: '계약 해제에 따른 위약금이 부당하게 과다하므로 피고는 원고에게 계약금 8천만 원을 반환하라.',
              stampText: '계약 위약금 반환 성공'
            }
          ]}
        />





        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '민사 분쟁' 필승 전략]"
          mainTitle="경험의 차이가 결과의 차이를 만듭니다."
          descBlock="철저한 법리 검토와 신속한 실천력으로 민사 분쟁의 종지부를 찍습니다."
          bottomText={
            <>
              법무법인 플로우 민사 전문 TF는 수많은 대여금, 손해배상, 부동산 분쟁, 사해행위 및 동업 계약 갈등 사건을 성공으로 이끌며 쌓아 올린 압도적인 소송 데이터와 신속한 채권 집행 실무력을 갖추고 있습니다. <br />
              의뢰인이 잃어버린 소중한 일상과 정당한 재산적 가치를 완벽히 회복할 때까지 플로우가 가장 든든한 동반자로서 끝까지 함께하겠습니다.
            </>
          }
          strategies={[
            {
              id: 1,
              title: '입체적 · 선제적 대응',
              desc: '획일화된 대응이 아닌, 사건의 이면을 파고드는 정밀한 분석을 통해 상대방의 논리를 무력화합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  <path d="M2 12h20"/>
                </svg>
              )
            },
            {
              id: 2,
              title: '분쟁 조기 종결 최우선',
              desc: '의뢰인의 고단함을 고려, 무리한 소송보다는 실익을 우선합니다. 조정 · 합의 등 분쟁을 조기에 종결시킬 수 있는 솔루션을 최우선합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '철저한 사후 관리',
              desc: '승소 판결은 시작에 불과합니다. 강제집행을 통한 실질적 채권 회수는 물론, 향후 발생할 수 있는 추가적인 법률 고충까지 섬세하게 관리합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              )
            }
          ]}
        />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews 
          descText={
            <>
              예기치 못한 민사 분쟁의 고비마다 플로우 민사 전문 TF가 한 몸으로 뛰며 <br />
              의뢰인의 소중한 권리와 정당한 재산적 결과를 지켜낸 진짜 이야기입니다.
            </>
          }
          items={[
            {
              id: 1,
              content: '물건은 받아 가고 대금 지급은 계속 미루는 악성 거래처 때문에 저희 회사 자금줄이 막혀서 정말 힘들었습니다. 그런데 변호사님 선임하자마자 바로 입금했어요 ㅎㅎㅎ 정말 최고입니다!!',
              clientType: '제조기업 대표이사',
              location: '물품대금 청구 분쟁',
              initial: '김'
            },
            {
              id: 2,
              content: '동업자랑 수익 배분 문제로 갈라섰는데 변호사님 자문 덕분에 문제없게 정리하고 정산도 제대로 받았습니다. 새로운 사업 구상중인데 그때도 잘 부탁드립니다~~',
              clientType: 'IT 스타트업 창업자',
              location: '동업 해지 및 정산금',
              initial: '최'
            },
            {
              id: 3,
              content: '친한 친구라 차용증 없이 빌려줬다가 뒤통수 맞았습니다. 솔직히 포기하고 있었는데 변호사님이 예전 카톡이랑 계좌 내역 싹 정리해서 대여 사실 입증해주셔서 돈 돌려받을 수 있었습니다.',
              clientType: '개인 채권자 의뢰인',
              location: '차용증 없는 대여금 반환',
              initial: '이'
            },
            {
              id: 4,
              content: '악성 소문 퍼트린 사람이 지인이라 진짜 힘들었거든요? 소송해봐야 위자료 얼마 안된다고 해서 참으려 했는데 변호사님 응원에 끝까지 올 수 있었습니다. 정말 감사합니다.',
              clientType: '자영업 소상공인',
              location: '명예훼손 및 위자료 청구',
              initial: '박'
            },
            {
              id: 5,
              content: '소송 이기고도 돈 없다는 상대방 때문에 진짜 막막했어요. 그런데 저보다 더 분노하면서 숨은 재산 집요하게 찾아 가압류 진행해주시더라고요. 정말 든든합니다.',
              clientType: '개인 채권자 의뢰인',
              location: '숨은 재산 추적 및 가압류',
              initial: '정'
            }
          ]}
        />

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
