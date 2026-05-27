"use client";

import React from 'react';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import DefectPromise from '@/components/DefectPromise/DefectPromise';
import DefectCasesGrid from '@/components/DefectCasesGrid/DefectCasesGrid';
import VerdictSection from '@/components/VerdictSection/VerdictSection';
import DefectStrategyGrid from '@/components/DefectStrategyGrid/DefectStrategyGrid';
import DefectReviews from '@/components/DefectReviews/DefectReviews';
import DefectFaq from '@/components/DefectFaq/DefectFaq';
import { verdictImages } from '@/data/verdictImages';
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
        <VerdictSection
          imageSources={verdictImages.realEstate}
          imageAltPrefix="부동산분쟁 판결문"
        />





        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '부동산 분쟁' 필승 전략]"
          mainTitle={
            <>
              &quot;경험의 차이가 결과의 차이를 만듭니다&quot;<br />
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
        <DefectReviews 
          descText={
            <>
              어려운 부동산 분쟁의 고비마다 변호사와 전문 TF팀이 함께 뛰며 <br />
              의뢰인의 소중한 재산과 권리를 지켜낸 진짜 이야기입니다.
            </>
          }
          items={[
            {
              id: 1,
              content: '이사 날짜 다 잡아놨는데 집주인이 갑자기 계약 안 하겠다고 해서 진짜 막막했거든요. 위약금 문제로 계속 실랑이하다가 변호사님 찾아갔는데, 법적으로 압박해서 약속했던 배액배상금 한 푼도 안 깎고 다 받아주셨어요. 덕분에 이사 잘했습니다~!',
              clientType: '아파트 계약해제 매수인',
              location: '서울 마포구 아파트',
              initial: '이'
            },
            {
              id: 2,
              content: '힘들게 일궈온 가게 넘기려니 임대인이 말도 안 되는 이유로 신규 임차인 계약을 거절하더라고요. 권리금 다 날릴 뻔한 상황에서 변호사님 소개받았는데 최고의 선택이지 싶습니다. 다시 힘내서 장사 시작해볼게요. 정말 감사합니다. 변호사님 덕분입니다.',
              clientType: '상가 권리금 분쟁 임차인',
              location: '경기 성남시 음식점',
              initial: '박'
            },
            {
              id: 3,
              content: '집 사고 첫 장마에 누수가 터져서 매도인한테 연락하니 자기가 살았을 땐 멀쩡했다면서 모르쇠했어요. 그런데 변호사님이 누수 원인이랑 매매 전부터 있었던 결함인 걸 명확히 입증해서 수리비 받아주셨습니다.',
              clientType: '하자담보책임 매수인',
              location: '인천 연수구 단독주택',
              initial: '최'
            },
            {
              id: 4,
              content: '매수인이 잔금 날에 입금도 안 하고 연락도 안 받더라고요. 이행지체로 계약 파기하고 싶어도 절차가 복잡해서 고민이었는데, 플로우에서 적절한 시기에 내용증명 보내고 법적 절차 밟아주신 덕분에 계약금 반환 없이 계약 파기 성공했습니다.',
              clientType: '계약금 몰취 매도인',
              location: '서울 강남구 빌라',
              initial: '정'
            },
            {
              id: 5,
              content: "옆집 주인이 돌연 경계침범했다면서 땅 내놓으라고 하더라고요. 너무 황당했는데 변호사님이 20년 넘게 평온하게 점유해온 증거들을 싹 모아서 '점유취득시효'로 대응해 주셨습니다. 결국 법원에서 소유권 인정받고 등기까지 깔끔하게 마쳤습니다. 저희 가족 땅 지켜주셔서 정말 감사해요!",
              clientType: '점유취득시효 소송 피고',
              location: '강원 춘천시 토지',
              initial: '한'
            }
          ]}
        />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq 
          title="부동산분쟁 자주 묻는 질문"
          subtitle="* 여러분의 고민을 속 시원하게 해결해 드립니다."
          items={[
            {
              id: 1,
              question: "상대방의 귀책으로 매매계약 이행이 불가능한 상황입니다. 계약파기하고 계약금 돌려받을 수 있을까요?",
              answer: "상대방의 채무불이행(이행지체, 이행불능 등)이 명확히 입증된다면 계약을 해제하고 납입한 계약금 반환 및 별도 손해배상을 청구할 수 있습니다. 다만, 계약서상 해제 사유의 충족 여부와 상대방에 대한 이행 최고 절차를 적법하게 거쳤는지에 따라 결과가 달라질 수 있으므로 정확한 사실관계 확인이 선행되어야 합니다."
            },
            {
              id: 2,
              question: "매수한 건물에 하자가 심각합니다. 매도인에게 보상받을 수 있나요?",
              answer: "매매계약 당시 몰랐던 중대한 하자가 나중에 발견되었다면 매수인은 민법상 하자담보책임을 물어 매도인에게 수리비 등의 손해배상을 청구할 수 있습니다. 이는 하자를 안 날로부터 6개월 내에 행사해야 하며, 하자의 정도가 계약 목적을 달성할 수 없을 정도로 중대하다면 계약 해제까지 고려할 수 있으나 하자의 발생 시점과 책임 소재부터 규명해야 합니다."
            },
            {
              id: 3,
              question: "임대인의 방해로 권리금을 못 받게 되었습니다. 손해배상 청구가 가능한가요?",
              answer: "상가건물임대차보호법에 따라 임대인은 임차인이 신규 임차인으로부터 권리금을 회수하는 것을 방해해서는 안 되며, 이를 위반한 경우 임차인은 임대인에게 손해배상을 청구할 수 있습니다. 다만 임대인이 신규임차인과의 계약을 거절할 수 있는 정당한 사유가 있는지, 임차인이 신규 임차인을 주선하기 위해 적절한 노력을 다했는지 등 구체적인 상황에 따라 판단이 달라질 수 있습니다."
            },
            {
              id: 4,
              question: "중개사가 권리관계를 잘못 설명해 큰 손해를 봤습니다. 공인중개사에게 책임 물을 수 있나요?",
              answer: "공인중개사는 중개대상물의 권리관계 등을 정확히 확인하고 설명할 의무가 있으며, 이를 소홀히 하여 의뢰인에게 재산상 손해를 입혔다면 그에 대한 배상 책임이 있습니다. 다만 중개사의 과실 정도와 중개의뢰인이 본인의 의무를 다했는지 여부 등에 따라 과실 상계 비율이 달라질 수 있는바, 관련 증거 확보가 무엇보다 중요합니다."
            },
            {
              id: 5,
              question: "상가 넘긴 양도인이 근처에 똑같은 가게를 차렸습니다. 권리금 돌려받을 수 있나요?",
              answer: "영업 양도인이 상법상 경업금지의무를 위반하여 인근에서 동종 영업을 하는 경우, 양수인은 영업금지가처분 신청이나 손해배상 청구를 진행할 수 있습니다. 계약서에 별도의 약정이 없더라도 상법에 따라 10년간 동일 지역에서의 영업이 제한될 수 있으나, 해당 거래가 '영업 양도'의 요건을 갖추었는지에 대한 면밀한 법적 검토가 필요합니다."
            },
            {
              id: 6,
              question: "오랫동안 점유해온 땅인데 경계침범으로 소유권 분쟁이 생겼습니다. 해결 가능할까요?",
              answer: "20년 이상 소유의 의사로 평온, 공연하게 부동산을 점유해왔다면 점유취득시효 완성을 근거로 소유권 이전 등기를 청구할 수 있습니다. 반면 실제 소유자는 경계침범을 근거로 토지 반환 및 건물 철거를 주장할 수 있으므로, 측량을 통한 정확한 경계 확인과 점유의 성격(자주점유 여부) 및 시효 중단 사유의 존재 여부를 종합적으로 살펴야 합니다."
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
