"use client";

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import DefectPromise from '@/components/DefectPromise/DefectPromise';
import DefectCasesGrid from '@/components/DefectCasesGrid/DefectCasesGrid';
import VerdictSection from '@/components/VerdictSection/VerdictSection';
import DefectStrategyGrid from '@/components/DefectStrategyGrid/DefectStrategyGrid';
import DefectReviews from '@/components/DefectReviews/DefectReviews';
import DefectFaq from '@/components/DefectFaq/DefectFaq';
import styles from '../../defect-litigation/page.module.css';

const centerData: Record<string, {
  title: string;
  subtitle: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescLines: string[];
}> = {
  'sex-offense': {
    title: '성범죄',
    subtitle: '성범죄 전담센터',
    heroTitleLine1: '성범죄 혐의,',
    heroTitleLine2: '첫 진술과 초기 대응이 결과를 바꿉니다.',
    heroDescLines: [
      '강제추행·강간·디지털성범죄 등 성범죄 혐의',
      '수사 초기부터 재판까지 원스톱 솔루션',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'dui-traffic': {
    title: '음주·교통',
    subtitle: '음주·교통 전담센터',
    heroTitleLine1: '음주운전 및 교통사고,',
    heroTitleLine2: '초기 면허 구제와 행정/형사 대응이 핵심입니다.',
    heroDescLines: [
      '음주운전 3진 아웃·뺑소니·12대 중과실 등 교통 사건',
      '경찰 조사부터 합의 대행, 형사 재판까지 완벽하게 방어',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'drugs': {
    title: '마약',
    subtitle: '마약 전담센터',
    heroTitleLine1: '마약류 관리법 위반 혐의,',
    heroTitleLine2: '수사 초기 과학적 대응과 양형 자료 구축이 좌우합니다.',
    heroDescLines: [
      '단순 투약·소지·유통 및 밀수 등 마약 사건',
      '초기 수사 대응부터 재활 치료 연계까지 선처 솔루션',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'voice-phishing': {
    title: '보이스피싱',
    subtitle: '보이스피싱 전담센터',
    heroTitleLine1: '보이스피싱 혐의 연루,',
    heroTitleLine2: '단순 가담 및 무고함을 적극 소명해야 합니다.',
    heroDescLines: [
      '단순 전달책·인출책 등 억울하게 연루된 보이스피싱 사건',
      '무혐의 입증과 피해 최소화를 위한 명확한 법리 구성',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'construction': {
    title: '건설 형사',
    subtitle: '건설 형사 전담센터',
    heroTitleLine1: '현장 사고 및 중대재해법 위반,',
    heroTitleLine2: '기업과 대표이사의 책임 범위를 정밀 방어합니다.',
    heroDescLines: [
      '산업안전보건법 위반·중대재해처벌법·건설현장 사고',
      '기업과 대표를 지키는 강력한 형사 방어막 제공',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'economic': {
    title: '경제 범죄',
    subtitle: '경제 범죄 전담센터',
    heroTitleLine1: '사기·횡령·배임 혐의,',
    heroTitleLine2: '자금 흐름의 철저한 규명과 입증이 해법입니다.',
    heroDescLines: [
      '사기·횡령·배임 등 복잡한 자금 흐름 사건',
      '정밀한 분석과 증거 수집으로 혐의를 완전히 탈피',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'juvenile': {
    title: '소년학폭',
    subtitle: '소년학폭 전담센터',
    heroTitleLine1: '학교폭력 및 소년사건,',
    heroTitleLine2: '우리 아이의 미래를 위한 맞춤형 변론이 필요합니다.',
    heroDescLines: [
      '학교폭력위원회 대응부터 소년보호사건 전환까지',
      '우리 아이의 미래가 걸린 일, 부모의 마음으로 변호',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  },
  'general': {
    title: '일반 형사',
    subtitle: '일반 형사 전담센터',
    heroTitleLine1: '폭행·상해·명예훼손 등 형사 사건,',
    heroTitleLine2: '신속한 합의와 경찰 단계 종결이 최선입니다.',
    heroDescLines: [
      '폭행·상해·명예훼손 등 일상에서 발생하는 모든 형사 사건',
      '가장 빠르고 정확한 법률 솔루션 제공',
      '법무법인 플로우가 처음부터 끝까지 함께합니다.'
    ]
  }
};

interface CriminalCaseItem {
  id: number;
  title: string;
  countText: string;
  statusText: string;
  description: string;
}

const criminalCases: CriminalCaseItem[] = [
  {
    id: 1,
    title: '특정경제범죄가중처벌등에관한법률위반(사기) 방어',
    countText: '피해액 50억',
    statusText: '방어성공',
    description: '복잡한 자금 흐름 분석을 통해 기망행위가 없었음을 입증하여 무죄 판결'
  },
  {
    id: 2,
    title: '건설현장 중대재해처벌법 및 산업안전보건법 위반',
    countText: '대표이사 구속 방어',
    statusText: '진행중',
    description: '안전보건관리체계 구축 및 이행 사실을 입증하여 대표이사 구속영장 기각'
  },
  {
    id: 3,
    title: '보이스피싱 현금수거책 사기 및 사문서위조 연루',
    countText: '단순가담',
    statusText: '무혐의',
    description: '아르바이트로 속아 가담한 정황을 입증하여 사기 고의성 조각, 무혐의 처분'
  },
  {
    id: 4,
    title: '마약류관리에관한법률위반(향정) 밀수 및 투약',
    countText: '초범 선처',
    statusText: '집행유예',
    description: '수사 초기 자백 및 적극적인 단약 의지, 재활 치료 연계를 통한 선처'
  },
  {
    id: 5,
    title: '공중밀집장소추행 및 카메라등이용촬영 방어',
    countText: '디지털 포렌식 대응',
    statusText: '기소유예',
    description: '경찰 조사 전 디지털 포렌식 대비 및 피해자와의 원만한 합의로 기소유예'
  },
  {
    id: 6,
    title: '음주운전 3진 아웃 및 위험운전치상 교통사고',
    countText: '면허취소 구제',
    statusText: '방어성공',
    description: '혈중알코올농도 상승기 주장 및 피해자 처벌불원서 제출을 통한 징역형 방어'
  }
];

export default function CriminalCenterPage() {
  const params = useParams();
  const centerKey = typeof params?.center === 'string' ? params.center : '';
  const data = centerData[centerKey];

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              <div className={styles.heroLeft}>
                <div className={styles.heroSubtitles} style={{ marginBottom: '16px' }}>
                  <span className={styles.titleSub1} style={{ fontSize: '18px', color: '#c5a059', fontWeight: 'bold' }}>
                    {data.subtitle}
                  </span>
                </div>
                <h1 className={styles.heroMainTitle} style={{ fontSize: '42px', lineHeight: '1.4', marginBottom: '24px' }}>
                  {data.heroTitleLine1}<br />
                  <span style={{ color: '#ef4444' }}>{data.heroTitleLine2}</span>
                </h1>
                <div className={styles.heroDescription} style={{ fontSize: '18px', lineHeight: '1.8', color: '#cbd5e1' }}>
                  {data.heroDescLines.map((line, idx) => (
                    <p key={idx} style={{ margin: '4px 0' }}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          kicker="CRIMINAL DEFENSE"
          sectionTitle="법무법인 플로우 형사 전담 센터의 압도적 실력"
          sectionSubtitle="초기 수사 단계부터 재판까지, 빈틈없는 방어와 치밀한 전략으로 의뢰인의 일상을 되찾아 드립니다."
          counters={[
            {
              id: 0,
              target: 3000,
              suffix: '건+',
              title: '형사 사건 수행 건수',
              desc: '경찰 조사부터 항소심까지 수많은 사건을 성공적으로 방어'
            },
            {
              id: 1,
              target: 0,
              suffix: '형사 특화',
              title: '분야별 전문 센터 가동',
              desc: '성범죄, 마약, 보이스피싱, 경제범죄 등 각 분야별 특화 대응'
            },
            {
              id: 2,
              target: 0,
              suffix: '긴급 대응',
              title: '24시간 TF팀 가동',
              desc: '압수수색, 체포 등 긴급 상황 발생 시 즉각적인 법률 조력'
            },
            {
              id: 3,
              target: 0,
              suffix: '무죄·선처',
              title: '압도적인 성공 사례',
              desc: '치밀한 법리 분석과 철저한 증거 수집으로 만들어낸 결과'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '형사전문변호사 책임 변론',
              desc: '대한변협 등록 형사전문변호사가 상담부터 경찰 조사 동석, 재판 변론까지 전 과정을 직접 책임집니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '분야별 전담 TF팀',
              desc: '각 범죄 유형에 특화된 수사 대응팀이 투입되어 최적의 방어 논리와 양형 자료를 신속하게 구축합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '수사기관 출신 자문',
              desc: '경찰, 검찰 등 수사기관 출신 자문위원과의 협업을 통해 수사기관의 시각과 의도를 정확히 간파합니다.',
              iconType: 'custom'
            },
            {
              id: 3,
              title: '24시간 밀착 케어',
              desc: '언제 발생할지 모르는 형사 사건의 특성을 고려하여, 의뢰인과 24시간 소통하며 불안감을 해소해 드립니다.',
              iconType: 'custom'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          kicker="형사 분쟁 특화 로펌 · 유형별 맞춤형 토탈 솔루션"
          mainTitle="형사사건은 골든타임이 결과를 좌우합니다"
          descLines={[
            '형사사건은 초기 경찰 조사 단계에서의 대응이 전체 사건의 방향을 결정짓습니다.',
            '억울한 혐의를 벗기 위해서, 혹은 최대한의 선처를 구하기 위해서',
            '법무법인 플로우를 찾아주시는 이유, 압도적인 성공 사례 때문입니다.'
          ]}
          difficultyTitle="* 현재 어떤 혐의로 조사를 앞두고 계신가요?"
          difficultySubtitle="법무법인 플로우 형사 전담 센터는 모든 범죄 유형별 방어 데이터베이스를 보유하고 있습니다."
          reportSubtitle="법무법인 플로우(FLOW) 형사 대응 서비스 상세 안내서"
          diagnosisLabel="주요 대응 쟁점"
          diagnosisEnglishLabel="Key Issues"
          diagnosisBadge="ISSUES"
          legalStrategyLabel="전략적 변론 내용"
          legalStrategyEnglishLabel="Defense Strategy"
          legalStrategyBadge="STRATEGY"
          customCases={[
            {
              id: 1,
              label: '경찰/검찰 조사 동석',
              coreDiagnosis: '세부 쟁점: 수사기관 출석 요구, 진술 번복, 강압 수사 대비, 진술서 작성, 증거 인멸 오해 방어 등',
              legalStrategy: '조사 전 철저한 사전 시뮬레이션 및 변호사 직접 동석을 통해 불리한 진술을 방어하고 방어권을 보장합니다.'
            },
            {
              id: 2,
              label: '구속영장 기각',
              coreDiagnosis: '세부 쟁점: 도주 우려, 증거 인멸 우려, 범죄의 중대성, 영장실질심사, 구속적부심 등',
              legalStrategy: '구속 사유가 없음을 논리적으로 소명하고, 불구속 상태에서 방어권을 충분히 행사할 수 있도록 조력합니다.'
            },
            {
              id: 3,
              label: '무죄 및 혐의없음',
              coreDiagnosis: '세부 쟁점: 고의성 조각, 증거 불충분, 정당방위, 알리바이 입증, 피해자 진술의 모순점 탄핵 등',
              legalStrategy: '철저한 증거 분석과 법리 검토를 통해 억울한 혐의를 벗고 기소 전 단계에서 사건을 종결시킵니다.'
            },
            {
              id: 4,
              label: '기소유예 및 선처',
              coreDiagnosis: '세부 쟁점: 초범, 반성문, 탄원서, 피해복구, 합의 대행, 재범 방지 대책, 정상참작 사유 등',
              legalStrategy: '혐의를 인정하는 경우, 의뢰인에게 유리한 모든 양형 자료를 수집·제출하여 최대한의 선처를 이끌어냅니다.'
            },
            {
              id: 5,
              label: '피해자 합의 전문',
              coreDiagnosis: '세부 쟁점: 합의금 조율, 2차 가해 방지, 처벌불원서 수령, 공탁금, 형사조정 등',
              legalStrategy: '제3자인 변호사가 객관적이고 안전하게 합의를 대행하여 피해자와의 원만한 합의와 처벌불원 의사를 확보합니다.'
            },
            {
              id: 6,
              label: '항소심 대응',
              coreDiagnosis: '세부 쟁점: 양형 부당, 사실오인, 법리오해, 새로운 증거 발견, 1심 판결 번복 등',
              legalStrategy: '1심 판결의 문제점을 정확히 짚어내고, 항소심에서 결과를 뒤집기 위한 새로운 전략과 증거를 제시합니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          kicker="PROVEN RESULTS"
          mainTitle={
            <>
              무죄와 선처, 결코 우연이 아닙니다<br />
              판결문이 증명하는 압도적 승소 실력
            </>
          }
          descText={
            <>
              수사기관의 압박과 불리한 증거 속에서도 빈틈없는 법리 구성으로 이뤄낸 쾌거.<br />
              법무법인 플로우는 오직 결과로 말합니다.
            </>
          }
          verdicts={[
            {
              id: 1,
              court: '서울중앙지방법원',
              caseNo: '2023고단5829',
              plaintiff: '피고인 A (사기, 사문서위조)',
              orderText: '피고인은 무죄. 이 판결의 요지를 공시한다.',
              stampText: '보이스피싱 무죄 방어'
            },
            {
              id: 2,
              court: '수원지방법원',
              caseNo: '2024고합192',
              plaintiff: '피고인 B (강제추행)',
              orderText: '피고인에 대한 형의 선고를 유예한다.',
              stampText: '성범죄 선고유예 선처'
            },
            {
              id: 3,
              court: '인천지방검찰청',
              caseNo: '2023형제49281',
              plaintiff: '피의자 C (마약류관리에관한법률위반)',
              orderText: '피의자는 기소유예(교육이수조건부) 처분한다.',
              stampText: '마약 투약 기소유예'
            },
            {
              id: 4,
              court: '서울동부지방법원',
              caseNo: '2024고단3091',
              plaintiff: '피고인 D (특정범죄가중처벌등에관한법률위반 - 위험운전치상)',
              orderText: '피고인을 징역 1년에 처한다. 다만, 이 판결 확정일로부터 2년간 위 형의 집행을 유예한다.',
              stampText: '음주 3진 집행유예'
            }
          ]}
        />

        {/* 4. Criminal Cases Rolling */}
        <section className={styles.sectionCases}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.panelTitle}>형사사건 실시간 대응 현황</h2>
              <p className={styles.panelSubtitle}>
                전국 각지의 의뢰인들이 플로우 형사 전담 TF와 함께 위기를 극복하고 있습니다.
              </p>
            </div>
            <div className={styles.casesGrid}>
              {/* Left Column: Vertical Marquee */}
              <div>
                <div className={styles.verticalMarqueeWrapper}>
                  <div className={styles.verticalMarqueeTrack}>
                    {/* 1st copy */}
                    {criminalCases.map((item) => {
                      const key = `${item.id}-crim-orig`;
                      const isCompleted = item.statusText === '방어성공' || item.statusText === '무혐의' || item.statusText === '집행유예' || item.statusText === '기소유예';
                      return (
                        <div key={key} className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}>
                          <div className={styles.cardTitleRow}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <span className={styles.countBadge}>
                              {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                            </span>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      );
                    })}
                    {/* 2nd copy */}
                    {criminalCases.map((item) => {
                      const key = `${item.id}-crim-dup`;
                      const isCompleted = item.statusText === '방어성공' || item.statusText === '무혐의' || item.statusText === '집행유예' || item.statusText === '기소유예';
                      return (
                        <div key={key} className={`${styles.caseCard} ${isCompleted ? styles.completedCard : ''}`}>
                          <div className={styles.cardTitleRow}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <span className={styles.countBadge}>
                              {item.countText}, <span className={isCompleted ? styles.statusClosed : styles.statusHighlight}>{item.statusText}</span>
                            </span>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.marqueeNotice}>
                  * 사건 카드에 마우스를 올리시면(Hover) 위로 올라가는 롤링이 일시정지됩니다.
                </div>
              </div>

              {/* Right Column: Dark Navy Info Card */}
              <div className={styles.rightCol}>
                <div className={styles.navyPanel}>
                  <div className={styles.panelWatermark}>
                    <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M12 6V18" />
                      <path d="M6 12H18" />
                    </svg>
                  </div>
                  <div className={styles.panelWatermarkTitle}>형사 방어율 압도적 1위</div>
                  <p className={styles.panelWatermarkSubtitle}>수사 초기 골든타임을 놓치지 않고 치밀하게 대응하여 최선의 결과를 도출합니다.</p>
                  
                  <div className={styles.closedCaseList}>
                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                         <strong className={styles.closedTitle}>특정경제범죄가중처벌등에관한법률위반(사기) 50억</strong>
                         <span className={styles.closedMeta}>무죄 판결 선고</span>
                      </div>
                    </div>
                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                         <strong className={styles.closedTitle}>보이스피싱 현금수거책 연루 및 사문서위조</strong>
                         <span className={styles.closedMeta}>경찰 조사 단계 무혐의 처분</span>
                      </div>
                    </div>
                    <div className={styles.closedCaseRow}>
                      <div className={styles.closedDot}></div>
                      <div className={styles.closedCaseInfo}>
                         <strong className={styles.closedTitle}>음주운전 3진 아웃 및 위험운전치상</strong>
                         <span className={styles.closedMeta}>실형 위기에서 집행유예 방어</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.shinmoongoBox}>
                    <div className={styles.shinmoongoHeader}>
                      <div className={styles.shinmoongoIconBox}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                          <path d="M12 16v-4"/>
                          <path d="M12 8h.01"/>
                        </svg>
                      </div>
                      <div className={styles.shinmoongoHeaderText}>
                        <h5 className={styles.shinmoongoTitle}>형사 긴급 출동 24시간 센터</h5>
                        <span className={styles.shinmoongoSubtitle}>경찰 조사 동석 및 구속영장 즉각 대응</span>
                      </div>
                    </div>
                    <p className={styles.shinmoongoDesc}>
                      갑작스러운 경찰의 출석 요구나 체포, 압수수색을 당하셨다면 지체 없이 긴급 대응 센터로 연락 주십시오. 형사전문변호사가 즉각 투입됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '형사 방어' 필승 전략]"
          mainTitle={
            <>
              "경험의 차이가 무죄와 유죄를 가릅니다"<br />
              절체절명의 위기, 형사전문 플로우에 맡기세요
            </>
          }
          descBlock={
            <>
              수사기관의 강도 높은 조사와 불리한 증거 앞에서도 흔들리지 않는 논리로<br />
              의뢰인의 억울함을 풀고 일상을 되찾아 드립니다.
            </>
          }
          strategies={[
            {
              id: 1,
              title: '수사기관 출신 자문 연계',
              desc: '경찰, 검찰 등 수사기관의 생리를 가장 잘 아는 실무진과 협력하여 수사의 방향을 예측하고 선제적으로 방어합니다.',
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
              id: 2,
              title: '형사전문변호사 1:1 전담',
              desc: '사건 수임부터 종결까지 대한변협 등록 형사전문변호사가 직접 의뢰인과 밀착 소통하며 변론을 책임집니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '디지털 증거 포렌식 대응',
              desc: '휴대폰, PC 압수수색 시 불리한 증거가 유출되지 않도록 전문가가 동참하여 포렌식 절차의 적법성을 감시합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              )
            },
            {
              id: 4,
              title: '안전한 합의 대행 시스템',
              desc: '피해자와의 직접 접촉으로 인한 2차 가해 논란을 차단하고, 변호사가 전문적으로 개입하여 유리한 조건의 합의를 도출합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              )
            }
          ]}
          bottomText={
            <>
              법무법인 플로우 형사 전담 센터는 수많은 구속영장 기각, 무혐의, 무죄 판결을 이끌어낸 검증된 노하우를 바탕으로, 의뢰인의 인생이 걸린 절체절명의 위기에서 가장 든든한 방패가 되어드립니다.
            </>
          }
        />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews 
          kicker="REAL CLIENT REVIEWS"
          mainTitle='"의뢰인이 직접 작성한 법무법인 플로우 생생한 후기"'
          descText={
            <>
              수사기관의 압박 속에서 두려움에 떨던 의뢰인들이 <br />
              법무법인 플로우와 함께 위기를 극복하고 일상을 되찾은 진솔한 이야기입니다.
            </>
          }
          items={[
            {
              id: 1,
              content: '갑작스러운 경찰 연락에 너무 무섭고 앞이 캄캄했는데, 변호사님이 첫 조사부터 동석해주셔서 정말 든든했습니다. 예상 질문 뽑아주신 게 그대로 나와서 당황하지 않고 대답할 수 있었고 무혐의로 끝났네요. 감사합니다.',
              clientType: '보이스피싱 연루 무혐의 처분',
              location: '서울',
              initial: '최'
            },
            {
              id: 2,
              content: '한순간의 호기심으로 성범죄에 연루되어 직장까지 잃을 뻔했습니다. 피해자와 절대 합의가 안 될 줄 알았는데, 변호사님께서 끈질기게 설득해주셔서 원만히 합의하고 기소유예 받았습니다. 제 인생의 은인이십니다.',
              clientType: '성범죄 기소유예 선처',
              location: '경기',
              initial: '박'
            },
            {
              id: 3,
              content: '억울하게 사기 혐의를 뒤집어쓰고 구속될 위기였는데, 늦은 밤에도 연락 받아주시고 밤새워 의견서 써주신 덕분에 영장이 기각되었습니다. 밖에서 싸울 수 있게 해주셔서 정말 감사합니다.',
              clientType: '경제범죄 구속영장 기각',
              location: '인천',
              initial: '김'
            },
            {
              id: 4,
              content: '음주 3진이라 무조건 실형 살 줄 알고 자포자기 상태였습니다. 변호사님이 포기하지 말고 양형 자료 준비하자고 다독여주신 덕분에 기적적으로 집행유예가 나왔네요. 다시는 술 근처에도 안 가겠습니다.',
              clientType: '음주운전 3회 집행유예',
              location: '부산',
              initial: '이'
            },
            {
              id: 5,
              content: '회사 자금 문제로 횡령 배임 고소를 당해서 눈앞이 캄캄했습니다. 수만 장이 넘는 회계 자료를 일일이 분석해서 제가 돈을 빼돌리지 않았다는 걸 완벽하게 입증해주셨어요. 실력 하나는 정말 최고입니다.',
              clientType: '업무상횡령 무죄 판결',
              location: '서울',
              initial: '정'
            }
          ]}
        />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq 
          title="형사사건 자주 묻는 질문"
          subtitle="* 수사를 앞둔 의뢰인들의 절박한 고민을 속 시원히 해결해 드립니다."
          items={[
            {
              id: 1,
              question: '내일 당장 경찰서에 출석하라고 연락이 왔습니다. 어떻게 해야 하나요?',
              answer: '절대 혼자서 출석하지 마시고 출석 기일을 연기한 뒤 형사전문변호사와 먼저 상담하셔야 합니다. 수사관이 무심코 던지는 질문에 한 대답이 나중에 치명적인 불이익으로 돌아올 수 있습니다. 변호사와 함께 예상 질문을 검토하고 동석하여 조사받는 것이 안전합니다.'
            },
            {
              id: 2,
              question: '억울하게 고소를 당했습니다. 무조건 부인하면 무혐의가 나오나요?',
              answer: '단순히 억울하다고 감정적으로 호소하거나 무작정 부인하는 것은 오히려 "반성하지 않는다"거나 "증거 인멸 우려가 있다"며 구속 사유가 될 수 있습니다. 객관적인 증거를 바탕으로 법리적으로 고의성이 없었음을 명확히 입증해야만 무혐의 처분을 받을 수 있습니다.'
            },
            {
              id: 3,
              question: '피해자와 합의만 하면 처벌을 안 받나요?',
              answer: '명예훼손이나 단순 폭행 등 \'반의사불벌죄\'의 경우 합의 시 처벌을 받지 않습니다. 하지만 성범죄, 사기, 음주운전 등 대부분의 범죄는 합의를 하더라도 처벌을 받습니다. 다만 합의는 형량을 대폭 줄일 수 있는 가장 강력한 감경 사유이므로 선처를 위해 필수적입니다.'
            },
            {
              id: 4,
              question: '변호사 선임 비용이 부담스러운데, 꼭 선임해야 하나요?',
              answer: '형사사건에서 유죄가 인정되어 실형을 살거나 전과가 남게 되면, 직장 해고, 취업 제한, 해외 출국 결격 등 비용으로 환산할 수 없는 막대한 피해가 발생합니다. 수사 초기 골든타임에 변호사를 선임하여 전과가 남지 않도록 방어하는 것이 장기적으로 훨씬 이익입니다.'
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
