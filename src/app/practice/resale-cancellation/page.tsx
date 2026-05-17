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

interface DefectCaseItem {
  id: number;
  title: string;
  countText: string;
  statusText: string;
  description: string;
}

const defectCases: DefectCaseItem[] = [
  {
    id: 1,
    title: '김포 XXX 아파트 외벽 균열 및 결로 부실시공 손해배상청구',
    countText: '1,240세대 공동소송',
    statusText: '모집중',
    description: '외벽 균열 누수 및 세대 내 결로 곰팡이 피해에 따른 시공사 대상 하자보수 손해배상청구'
  },
  {
    id: 2,
    title: '용인 XXX 아파트 지하주차장 철근 누락 및 보수보증금 청구',
    countText: '980세대 전체 참여',
    statusText: '모집완료',
    description: '구조안전 진단 결과 기둥 무단 철근 탈락 입증 및 25억 보증금 증액 판결 성공'
  },
  {
    id: 3,
    title: '인천 XXX 아파트 외벽 마감 대리석 탈락 및 구조안전 진단 청구',
    countText: '850세대 공동소송',
    statusText: '모집중',
    description: '외장재 탈락으로 인한 안전사고 위험 해결 및 전면 재시공 공사 청구'
  },
  {
    id: 4,
    title: '수원 XXX 아파트 조경 식재 고사 및 지반 균열 손해배상청구',
    countText: '680세대 판결금 확보',
    statusText: '모집완료',
    description: '조경 수목 무단 미식재 및 고사, 단지 지반 침하 균열 입증 손해배상금 승소'
  },
  {
    id: 5,
    title: '양주 XXX 신축빌라 단지 결로 및 부실 마감 하자 기망 손해배상',
    countText: '120세대 소제기 완료',
    statusText: '모집중',
    description: '설계도면과 상이한 저가 마감재 무단 변경 사용 입증 및 계약 위반 손해배상'
  },
  {
    id: 6,
    title: '천안 XXX 상가 동별 오배수관 역류 및 배관 부실 하자보수청구',
    countText: '320개 점포 연합소송',
    statusText: '모집완료',
    description: '상가 지하공간 오수관 구배 위반 부실 시공 및 상습 역류 하자 보수 비용 청구'
  }
];

export default function ResaleCancellationPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  분양권해제 특화,<br />
                  <span className={styles.goldHighlight}>ONE STOP</span> 종합 법률서비스
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>분양계약해제 케이스를 분석한 빅데이터와 독보적인 승소 노하우를 보유하고 있습니다.</span>
                  <span className={styles.titleSub2}>불가능해 보이는 그 사건도 법무법인 플로우와 함께라면 가능합니다.</span>
                </div>
                <div className={styles.slashDivider}>\</div>
                <p className={styles.heroDescription}>
                  분양계약해제 전담 TF · 현장 밀착 법률 서비스<br />
                  상가 · 오피스텔 · 지산 · 생숙 · 라이브오피스 등 분양계약해제 사례 다수<br />
                  부동산 · 건설 기술인력 자체 보유
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          hideKicker={true}
          mainTitle="분양계약해제 토탈 솔루션"
          descLines={[
            '계약해제 = 계약금 몰수라고 생각하기 쉽습니다.',
            '그러나 분양사의 귀책이나 위법성이 입증되면 계약금 손실없이 계약취소 할 수 있습니다.',
            '오랜 실무경험을 바탕으로 의뢰인의 상황과 입장에 맞는 최적의 솔루션을 제안합니다.'
          ]}
          difficultyTitle="* 현재 어떤 어려움을 겪고 계신가요?"
          difficultySubtitle="법무법인 플로우는 모든 케이스를 축적하고 있습니다."
          customCases={[
            {
              id: 1,
              label: '거래 중요사항 미고지',
              coreDiagnosis: '분양 시 반드시 알려야 할 중요한 사실을 숨긴 경우 고지의무 위반을 근거로 계약 취소 및 환불이 가능합니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 2,
              label: '미시공, 오시공, 부실시공 하자',
              coreDiagnosis: '설계도면과 다르게 시공됐거나 심각한 부실 공사로 인해 계획대로 활용이 불가능한 경우 목적 달성 불능을 사유로 계약을 해제할 수 있습니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 3,
              label: '착오 · 기망에 의한 계약취소',
              coreDiagnosis: '분양사업자가 허위 설명을 했거나, 중대한 사실에 대한 착오를 유발한 경우 계약을 무효화하고 납입금을 돌려받을 수 있습니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 4,
              label: '대출불발로 인한 계약해제',
              coreDiagnosis: '시공사나 시행사가 약속한 담보대출이 정부 규제나 사업자 귀책으로 무산되어 잔금 마련이 불가능해진 경우 법리적 해제 가능성을 검토합니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 5,
              label: '허위 · 과장광고',
              coreDiagnosis: '실현 불가능한 수익률 보장이나 지하철역 연장 등 객관적 사실과 다른 광고로 계약을 유도했다면 표시광고법 위반으로 대응할 수 있습니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 6,
              label: '설계변경',
              coreDiagnosis: '면적이나 층수 증감 등 수분양자의 이해관계에 중대한 영향을 주는 설계변경 사실을 알리지 않았다면 이를 사유로 계약해제를 주장할 수 있습니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 7,
              label: '사기분양',
              coreDiagnosis: '자금난 은폐, 이중분양, 인허가 미비 등 애당초 정상적인 이행 의사 없이 분양을 진행한 경우 형사고소와 더불어 민사 소송을 진행할 필요가 있습니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 8,
              label: '입주지연 공사지연',
              coreDiagnosis: '약정한 입주 예정일로부터 통상 3개월 이상 공사가 지연될 경우, 수분양자는 최고 절차를 거쳐 계약해제 및 위약금 청구가 가능합니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 9,
              label: '계약금반환',
              coreDiagnosis: '상대방의 귀책 사유를 명확히 규명하여 납부한 계약금 전액을 돌려받을 수 있는 최적의 전략을 강구합니다.',
              engineeringSolution: '',
              legalStrategy: ''
            },
            {
              id: 10,
              label: '청약철회',
              coreDiagnosis: '방문판매법위반 등 청약철회권 행사가 가능한 사안인지 검토하여 신속한 권리구제 전략을 수립합니다.',
              engineeringSolution: '',
              legalStrategy: ''
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          kicker="데이터가 증명하는 압도적 실력"
          mainTitle='"승소, 결코 우연이 아닙니다"'
          descText={
            <>
              법무법인 플로우는 독보적인 승소 노하우를 바탕으로, 불가능해 보이는 계약해제도 현실로 만듭니다. <br />
              여러분이 고민하고 계시는 그 사건, 저희는 해봤고 이미 이겨봤습니다.
            </>
          }
        />



        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '분양계약해제' 필승 전략]"
          bottomText={
            <>
              분양계약해제의 진정한 목적은 소송에서 이기는 것이 아닙니다. <br />
              자꾸만 늘어나는 이자와 신용불량 압박에서 벗어나 온전한 일상을 회복하는 것 <br />
              그것이 진정한 승리이기에 본사는 수임을 목적으로 한 장밋빛 전망 제시를 극도로 경계합니다. <br />
              법무법인 플로우는 오랜 실무경험을 바탕으로 의뢰인에게 최적화 된 합리적인 솔루션을 제안합니다.
            </>
          }
        />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq 
          title="분양계약해제 자주 묻는 질문"
          subtitle="여러분들의 고민을 속 시원하게 해결해 드립니다."
          items={[
            {
              id: 1,
              question: '중도금까지 납입한 상태인데, 지금이라도 계약 해제가 가능할까요?',
              answer: '이행의 착수(중도금 납입) 이후에는 일방적 해제가 어렵지만, 시행사의 귀책 사유나 합의 해제 등 법률적 특별 사유가 있다면 소송을 통해 해제가 가능합니다.'
            },
            {
              id: 2,
              question: '단순 변심으로 해지하고 싶은데, 위약금을 무조건 다 물어야 하나요?',
              answer: '계약서상 위약금 조항이 과다할 경우 법원에 감액을 청구할 수 있으며, 분양사업의 하자 / 분양광고의 흠결 / 분양사업자의 귀책 등을 찾아 위약금 없이 해제할 전략을 모색해야 합니다.'
            },
            {
              id: 3,
              question: '입주 지연이 되면 무조건 계약해제 가능한가요?',
              answer: '통상적인 계약서에는 입주예정일로부터 3개월 이상 지연될 경우 계약해제가 가능하다고 규정하고 있습니다만, 계약서상의 면책사유, 지연 기간, 최고 절차 이행 여부 등을 먼저 확인해야 합니다.'
            },
            {
              id: 4,
              question: '전매보장 확약서까지 받았는데 마피에 거래 절벽입니다. 계약해제 되는거죠?',
              answer: '전매보장 확약은 계약의 중요한 동기가 되므로, 확약 내용이 이행되지 않을 경우 \'기망\' 또는 \'중대한 착오\'를 근거로 계약 취소 및 해제를 검토할 수 있습니다.'
            },
            {
              id: 5,
              question: '공장부지 용도로 분양받은건데 공장설립 불가랍니다. 계약금 돌려받을 수 있을까요?',
              answer: '계약 목적 달성 불능에 해당하는 경우 계약해제 사유가 되며, 귀책 사유가 시행사에 있다면 계약금 전액과 이자까지 반환받을 수 있습니다.'
            },
            {
              id: 6,
              question: '완공된 건물이 하자투성이라 분양목적을 달성할 수 없습니다. 계약취소 될까요?',
              answer: '단순 하자가 아닌 \'목적대로 사용이 불가능할 정도의 중대한 결함\'임을 입증해야 합니다. 법무법인 플로우는 자체 하자진단팀을 보유하고 있어 하자의 내역과 규모를 구체화하고 계약해제를 조력합니다.'
            }
          ]}
        />

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
