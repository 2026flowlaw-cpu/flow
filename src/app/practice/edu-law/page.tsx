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

export default function EduLawPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        {/* 1. Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContentGrid}>
              
              <div className={styles.heroLeft}>
                <h1 className={styles.heroMainTitle}>
                  학원 문제는<br />
                  <span className={styles.goldHighlight}>학원전문변호사</span>에게
                </h1>
                <div className={styles.heroSubtitles}>
                  <span className={styles.titleSub1}>학원업계 특성에 기반한 맞춤 솔루션!</span>
                  <span className={styles.titleSub2}>학원전문변호사라 가능합니다. 법무법인 플로우이기에 가능합니다.</span>
                </div>
                <p className={styles.heroDescription}>
                  학원 설립 및 인허가, 강사 고용·계약서 분쟁, 학원 권리금 및 동업 갈등부터 지식재산권 보호까지 학원 운영의 전 과정에서 발생하는 법률 리스크를 선제적으로 진단하고 해결합니다. 학원 산업의 독특한 생태계와 메커니즘을 완벽하게 이해하는 전담 TF가 의뢰인의 소중한 교육 사업을 안전하게 조력합니다.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Strengths & Promises (Hexagon & Count-up Section) */}
        <DefectPromise 
          sectionTitle="법무법인 플로우 에듀법률센터의 압도적 실력"
          sectionSubtitle="학원업계의 독특한 사업 구조와 법적 리스크를 완벽하게 꿰뚫어 보며, 신속하고 영민한 대처로 원장님의 소중한 교육 사업을 안전하게 보호합니다."
          counters={[
            {
              id: 0,
              target: 1000,
              suffix: '건+',
              title: '학원 사건 수행 건수',
              desc: '설립, 노무, 양도양수, 형사 고발까지 축적된 압도적 소송 데이터'
            },
            {
              id: 1,
              target: 100,
              suffix: '% 에듀 특화',
              title: '플로우 에듀법률센터',
              desc: '학원 행정 및 분쟁 해결만을 위해 조직된 로펌 최초 전문 브랜드'
            },
            {
              id: 2,
              target: 24,
              suffix: '시간 긴급 대응',
              title: '학원분쟁 전담 TF팀',
              desc: '강사 무단퇴사, 경업위반, 교육청 점검 등 긴급 상황 즉각 대응'
            },
            {
              id: 3,
              target: 100,
              suffix: '% 직행 상담',
              title: '강남학원연합회 자문변호사',
              desc: '강남구 학원연합회 공식 자문을 직접 수행 중인 변호사가 직접 담당'
            }
          ]}
          promises={[
            {
              id: 0,
              title: '학원전문변호사 책임 상담',
              desc: '강남구 학원연합회 공식 자문변호사 등 학원/에듀 법률 분야의 독보적 실무 경력을 지닌 전담 변호사가 외주 없이 100% 밀착하여 소통합니다.',
              iconType: 'lawyer'
            },
            {
              id: 1,
              title: '에듀 특화 전담 TF팀 가동',
              desc: '설립 인허가, 교육청 행정조치, 강사 노무 계약, 동업 해지 정산금 및 형사 대응까지 원스톱으로 명쾌한 솔루션을 제공합니다.',
              iconType: 'tech'
            },
            {
              id: 2,
              title: '운영 맞춤형 컨설팅',
              desc: '학원 양도양수 권리금 보전, 허위 광고 및 명예훼손, 학파라치(무신고 포상금) 대응 등 학원 운영 현장 맞춤형 솔루션 패키지를 가동합니다.',
              iconType: 'custom'
            },
            {
              id: 3,
              title: '철저한 영업권 및 지식재산 보호',
              desc: '강사의 무단 수강생 스카웃, 학원 상표권 및 교육 교재 무단 도용, 가맹 프랜차이즈 계약 해지 갈등 등에서 원장님의 영업권을 완벽히 수호합니다.',
              iconType: 'custom'
            }
          ]}
        />

        {/* 2.5. Specialized Defect Cases Pill Grid (Image 1 layout) */}
        <DefectCasesGrid 
          kicker="학원분쟁 특화 로펌 · 교육업계 맞춤형 토탈 솔루션"
          mainTitle="학원의 특수성과 생리를 알아야 이깁니다"
          descLines={[
            '학원가는 여타 업종과는 달리 특수한 관행과 생리가 지배하는 공간입니다.',
            '학원 운영과 생존을 고민하는 원장님부터, 자신의 가치와 권리를 지키고자 하는 강사님까지',
            '법무법인 플로우를 찾아주시는 이유, 남다른 실전 노하우 때문입니다.'
          ]}
          difficultyTitle="* 현재 학원 운영에 어떤 어려움이 있으신가요?"
          difficultySubtitle="법무법인 플로우 에듀TF는 모든 학원 분쟁 분과별 데이터베이스를 보유하고 있습니다."
          reportSubtitle="법무법인 플로우(FLOW) 학원·에듀 서비스 상세 안내서"
          diagnosisLabel="주요 세부 쟁점"
          diagnosisEnglishLabel="Key Issues"
          diagnosisBadge="ISSUES"
          legalStrategyLabel="제공 서비스 내용"
          legalStrategyEnglishLabel="Provided Services"
          legalStrategyBadge="SERVICES"
          customCases={[
            {
              id: 1,
              label: '학원 운영',
              coreDiagnosis: '세부 쟁점: 학원법률자문·컨설팅, 학원법위반, 과태료, 행정처분, 학원인수합병, 교육청 점검 대응 등',
              legalStrategy: '학원법위반 리스크를 사전 점검하고 행정처분에 대비할 수 있도록 학원 맞춤 법률 컨설팅 서비스를 제공합니다.'
            },
            {
              id: 2,
              label: '인사/노무 갈등',
              coreDiagnosis: '세부 쟁점: 부당해고, 부당징계, 임금체불, 노동청진정, 노동청조사, 무단퇴사, 직장내괴롭힘 등',
              legalStrategy: '원내 인사/노무 체계의 취약점을 진단하고 현행 노동법에 기반한 실무 자문을 제공합니다.'
            },
            {
              id: 3,
              label: '경업금지',
              coreDiagnosis: '세부 쟁점: 경쟁학원 이직, 경업금지약정, 경업금지위반, 전속계약위반, 강의금지가처분, 위약금·위약벌 등',
              legalStrategy: '강사 이직 및 전원 과정에서 문제가 되는 경업금지 약정의 효력과 범위를 정밀 진단하여, 학원의 영업권 보호 및 강사의 권익 보호를 위한 전략적 대응을 제안합니다.'
            },
            {
              id: 4,
              label: '퇴직금',
              coreDiagnosis: '세부 쟁점: 학원강사 근로자성, 3.3% 프리랜서 강사 퇴직금, 비율제강사 퇴직금, 사업소득세, 대표이사 퇴직금 등',
              legalStrategy: '비율제/프리랜서 강사의 근로자성 여부를 객관적으로 검토하고, 퇴직금 지급 의무와 수령 권리에 대한 명쾌한 솔루션을 제안합니다.'
            },
            {
              id: 5,
              label: '동업 및 권리금',
              coreDiagnosis: '세부 쟁점: 학원양도양수, 학원권리금, 학원가맹계약해지, 동업해지 및 청산, 동업자 퇴직금 등',
              legalStrategy: '학원 인수·양도양수·동업해지 및 학원가맹계약 관련 종합법률 서비스를 제공합니다.'
            },
            {
              id: 6,
              label: '형사 분쟁',
              coreDiagnosis: '세부 쟁점: 학원 명예훼손, 업무방해, 부정경쟁방지법위반, 저작권 침해, 아동학대, 학원 내 성범죄, 횡령·배임 등',
              legalStrategy: '업무방해, 저작권 침해, 부정경쟁행위, 아동학대, 성범죄 사건 등 학원 내 특수한 형사사건에 대한 최적의 솔루션을 제안합니다.'
            }
          ]}
        />

        {/* 2.8. Verdict Proof Documents Grid (Gam-myeong reference style) */}
        <VerdictSection 
          mainTitle={
            <>
              승소, 결코 우연이 아닙니다<br />
              데이터가 증명하는 압도적 실력
            </>
          }
          descText={
            <>
              학원업종 특유의 고용 형태와 운영 방식에 대한 이해가 없으면 탁상공론식 법리에만 매몰되기 쉽습니다.<br />
              법무법인 플로우는 압도적 실전 노하우로 학원분쟁에 마침표를 찍습니다.
            </>
          }
          verdicts={[
            {
              id: 1,
              court: '서울중앙지방법원',
              caseNo: '2023나48590',
              plaintiff: '강사 A씨 (피고: B 어학원)',
              orderText: '원고의 퇴직금 및 주휴수당 청구를 모두 기각한다. 소송비용은 원고가 부담한다.',
              stampText: '강사 퇴직금 청구 기각 방어'
            },
            {
              id: 2,
              court: '서울동부지방법원',
              caseNo: '2024카합10283',
              plaintiff: 'C 수학학원 (피고: 강사 D씨)',
              orderText: '피고는 본안 판결 선고 시까지 인근 3km 이내에서 동종 학원을 설립하거나 근무하여서는 아니 된다.',
              stampText: '경업금지 가처분 인용 승소'
            },
            {
              id: 3,
              court: '수원지방법원',
              caseNo: '2023가합70291',
              plaintiff: '원장 E씨 (피고: 양도인 F씨)',
              orderText: '피고는 원고에게 학원 매출 기망에 따른 권리금 반환 및 손해배상금 1억 2천만 원을 지급하라.',
              stampText: '학원 권리금 반환 승소'
            },
            {
              id: 4,
              court: '서울서부지방법원',
              caseNo: '2024가합40582',
              plaintiff: '원장 G씨 (피고: 동업 탈퇴자 H씨)',
              orderText: '피고는 학원 자산 정산 약정에 따라 원고에게 지분 환수금 8천만 원을 지급하고 명예훼손 행위를 중단하라.',
              stampText: '동업 정산 및 비방 금지'
            }
          ]}
        />


        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '학원 분쟁' 필승 전략]"
          mainTitle={
            <>
              "경험의 차이가 결과의 차이를 만듭니다"<br />
              학생들 교육에만 전념하실 수 있도록! 복잡한 법률 문제는 플로우에 맡기세요
            </>
          }
          descBlock={
            <>
              학원 설립 및 운영, 강사 고용 갈등부터 영업비밀 보호까지 교육업계 맞춤형 토탈 솔루션으로<br />
              원장님의 소중한 학원 사업을 법률적 리스크로부터 안전하게 철통 보호합니다.
            </>
          }
          strategies={[
            {
              id: 1,
              title: '학원전문변호사 1:1 상담',
              desc: '강남구 학원연합회 자문변호사로 활약하고 있는 학원전문변호사가 직접 디테일한 상담을 진행합니다.',
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
              title: '로펌 최초 학원분쟁 특화',
              desc: '국내 로펌 최초로 학원분쟁에 고도의 역량을 특화한 에듀법률센터를 별도 창설하여 밀도 높게 운영 중입니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '법률 대리인 그 이상의 가치',
              desc: '단순한 소송 대리를 넘어 학원 사업 전 분야의 법률 리스크를 진단하고 비즈니스 파트너로서의 역할을 다합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            },
            {
              id: 4,
              title: '철저한 사후 관리',
              desc: '당면한 분쟁 해결에 그치지 않고 학원 운영 과정에서 파생될 수 있는 노무·세무·지재권 이슈에 대해 종합 솔루션을 제공합니다.',
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
              법무법인 플로우는 강남구 학원연합회 공식 자문 및 수백 건에 달하는 학원 권리금, 강사 근로자성 퇴직금 분쟁에서 독보적인 방어 및 승소 기록을 보유하고 있습니다. 교육의 가치와 학원의 운영 자산을 법적으로 가장 두텁고 확실하게 수호할 것을 약속드립니다.
            </>
          }
        />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews 
          kicker="REAL CLIENT REVIEWS"
          mainTitle='"의뢰인이 직접 작성한 법무법인 플로우 생생한 후기"'
          descText={
            <>
              학원 노무 분쟁부터 지식재산권 보호, 행정처분 대응까지 변호사단이 <br />
              원장님과 강사님의 곁에서 권익을 철저히 지켜낸 생생한 목소리입니다.
            </>
          }
          items={[
            {
              id: 1,
              content: '개원은 이번이 처음이라 위반사항 있을까봐 걱정했는데 학원전문변호사님 컨설팅으로 걱정 덜었습니다. 계약서 자문건도 조만간 받아보려고요!',
              clientType: '학원 신규 개원 원장',
              location: '서울 강남구 수학전문학원',
              initial: '최'
            },
            {
              id: 2,
              content: '부당해고 주장하는 강사 진정때문에 정말 힘들고 막막했는데 변호사님이 소명 자료를 꼼꼼히 준비해 주신 덕분에 무사히 넘겼습니다. 전문가가 괜히 있는게 아니더라고요.',
              clientType: '학원 운영 대표 원장',
              location: '서울 서초구 영어어학원',
              initial: '김'
            },
            {
              id: 3,
              content: '주말도 일했고, 원장님이 시키는 건 다했는데 퇴직금 못받았어요. 항의도 해보고 읍소해도 안됐는데 변호사님 선임해 내용증명 발송하자마자 퇴직금 입금했네요. 변호사님 만난게 행운이에요.',
              clientType: '비율제 전임 강사',
              location: '경기 분당구 국어단과학원',
              initial: '이'
            },
            {
              id: 4,
              content: '강사 이직 문제로 감정이 격해져서 무조건 소송하겠다고 고집 피웠는데, 변호사님이 냉정하게 실익을 따져주셨어요. 소송 기간이랑 비용 생각해서 가장 유리한 조건으로 합의를 이끌어내 주셨고, 덕분에 학원 운영에 지장 없이 깔끔하게 마무리했습니다.',
              clientType: '학원 경영 대표이사',
              location: '대구 수성구 대형 종합학원',
              initial: '박'
            },
            {
              id: 5,
              content: '저희 학원 교재를 그대로 베껴 쓰고 허위 사실을 퍼뜨려 운영을 방해하던 경쟁 학원 때문에 잠도 못 잤어요. 그런데 변호사님이 저작권법 위반이랑 업무방해로 형사 고소 강력하게 진행해 주신 덕분에 사과도 받고 손해배상금도 받았습니다.',
              clientType: '학원 콘텐츠 개발 원장',
              location: '부산 해운대구 입시전문학원',
              initial: '정'
            }
          ]}
        />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq 
          title="학원·에듀 분쟁 자주 묻는 질문"
          subtitle="* 원장님과 강사님의 깊은 고민을 속 시원히 해결해 드립니다."
          items={[
            {
              id: 1,
              question: '강사 이직과 노무 분쟁으로 학원 운영에 차질이 생길까 걱정입니다. 우리 학원 맞춤 컨설팅 가능할까요?',
              answer: '학원 컨설팅은 학원법과 노동법 전반을 아우를 수 있는 학원전문변호사의 자문을 받는 것이 좋습니다. 한편 학원마다 운영방식과 고용 형태가 다르므로 개별 학원의 특성에 맞는 처방이 필수적인데요, 법무법인 플로우는 학원분쟁 특화 에듀법률센터를 운영하고 있어 의뢰인 맞춤형 특화 컨설팅이 가능합니다.'
            },
            {
              id: 2,
              question: '부당해고와 무단퇴사 등 원내 인사/노무 이슈가 끊이지 않습니다. 리스크를 줄일 수 있는 방법 없을까요?',
              answer: '인사 분쟁을 최소화하려면 채용 시점부터 근로계약서 또는 업무위탁계약서를 명확히 작성하여 각자의 권리와 의무를 확정해야 합니다. 해고 시에는 적법한 절차와 정당한 사유를 갖추어야 하며, 강사의 무단퇴사로 인한 운영 차질에 대해서도 계약서상 손해배상 규정 등을 통해 상호 간의 책임 범위를 사전에 정립해 두는 것이 바람직합니다. 계약서 관련 자문이 필요하시다면 법무법인 플로우로 문의하여 주세요.'
            },
            {
              id: 3,
              question: '예전에 만들어둔 계약서, 표준계약서 보고 만든건데 그대로 써도 괜찮을까요? 새로 정비해야 할까요?',
              answer: '고용형태가 다양화됨에 따라 \'근로자성\' 인정 범위가 확대되고 관련 판례 역시 계속 변화하고 있어, 과거의 양식으로는 현재의 문제를 방어하기 어렵습니다. 특히 비율제나 프리랜서 계약의 경우 실질적인 업무 지시 형태에 따라 법적 해석이 달라지므로, 최신 판례와 개정 법령을 반영하여 계약서 조항을 주기적으로 정비하는 것이 안전합니다.'
            },
            {
              id: 4,
              question: '비율제 프리랜서 강사 퇴직금 받을 수 있나요? / 동업자의 퇴직금 청구 너무 당황스럽습니다, 어떤식으로 반박하면 좋을까요?',
              answer: '비율제 강사라도 실질적으로 원장의 지휘·감독 아래 근로를 제공했다면 근로자성이 인정되어 퇴직금 지급 대상이 될 수 있습니다. 반면, 실질적 동업 관계였거나 독립된 사업자로서 자율적으로 강의를 수행했음이 입증된다면 퇴직금 청구를 방어할 수 있으므로, 관련 증거자료를 수집해 상담을 받아보시기 바랍니다.'
            },
            {
              id: 5,
              question: '계약서 경업금지조항에 따르면 퇴사 후 개원시 1억을 배상해야 합니다. 이래도 되는 건가요?',
              answer: '경업금지 약정은 그 자체로 유효할 수 있으나, 위약금 액수가 과다하거나 금지 기간·지역 등이 강사의 직업선택 자유를 과도하게 침해한다면 법원에서 효력이 제한되거나 금액이 감액될 수 있습니다. 배상액의 적정성은 학원의 영업비밀 보호 필요성과 강사가 얻은 대가 등을 종합적으로 고려하여 판단하므로, 미리부터 포기하거나 좌절하기보다는 학원전문변호사를 통해 약정의 유효성을 검토받으셔야 합니다.'
            },
            {
              id: 6,
              question: '학원 인수했는데 학생수와 매출액이 당초 설명과 다릅니다. 권리금 반환받을 수 있을까요?',
              answer: '양도인이 매출이나 학생 수를 고의로 속여 계약을 체결했다면 사기에 따른 계약 취소나 채무불이행에 따른 손해배상 청구가 가능할 수 있습니다. 다만, 계약 당시 제공받은 자료의 객관성 및 실사 과정에서의 확인 여부가 중요하므로, 계약서상 명시된 보증 내용과 실제 수치의 차이를 증명할 수 있는 회계 자료 등을 확보하여 법적 대응 여부를 결정해야 합니다.'
            },
            {
              id: 7,
              question: '가맹학원을 운영중입니다. 본사의 지원 미비로 가맹계약해지를 요구했더니 위약금 폭탄맞았습니다. 대응 방법 없을까요?',
              answer: '가맹본부의 지원 미비가 계약상 명시된 의무 위반에 해당한다면 이를 근거로 위약금 없는 계약 해지나 손해배상을 주장할 수 있습니다. 가맹사업법 위반 등 가맹본부의 위법 행위가 있었는지, 중도 해지 시 위약금 규정이 가맹점주에게 부당하게 과중한지 등을 검토하여 위약금 감액 또는 면제 전략을 세워보시기 바랍니다.'
            },
            {
              id: 8,
              question: '아동학대와 성추행 소문이 퍼져 폐업 위기입니다. 억울한 누명을 벗고 학원도 지킬 수 있을까요?',
              answer: '교육 시설 내 성범죄나 아동학대 의혹은 사실 여부와 관계없이 학원 운영에 치명적이므로, 초기 단계부터 적극 대응하여 무혐의를 입증하는 것이 최우선입니다. 동시에 허위사실 유포자를 상대로 명예훼손·업무방해·무고 등 형사 고소 및 민사상 손해배상을 청구하여 학원의 신뢰를 회복하고 추가적인 피해 확산을 막아야 합니다.'
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
