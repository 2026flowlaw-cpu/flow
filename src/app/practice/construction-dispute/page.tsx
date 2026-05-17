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
        {/* 4.5. Specialized Win Strategy Grid (Image 1 layout) */}
        <DefectStrategyGrid 
          kicker="[법무법인 플로우만의 '건설 분쟁' 필승 전략]"
          mainTitle="경험의 차이가 결과의 차이를 만듭니다"
          descBlock="차별화된 전략과 남다른 통찰력으로 여러분을 조력합니다."
          bottomText={(
            <>
              법무법인 플로우는 건설 소송과 중재, 자문 분야에서 압도적인 전문성과 실무 노하우를 바탕으로, <br />
              수많은 이해관계와 공정 분석, 기술 감정을 명확히 규명하여 의뢰인의 막대한 경제적 권익을 확실하게 보호하고 있습니다. <br />
              수백 건의 성공 사례가 입증하듯, 플로우와 함께라면 건설 분쟁의 복잡한 실타래는 가장 확실하고 명쾌한 해법을 찾게 될 것입니다.
            </>
          )}
          strategies={[
            {
              id: 1,
              title: '건설전문변호사 1:1 상담',
              desc: '건축공학과 법학을 모두 전공한 건설전문변호사가 모든 상담 직접 진행합니다.',
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
              title: '건설분쟁 TF팀 협업',
              desc: '건축기사·시공기술사·중개사 등 기술인력을 로펌 내 자체 보유하고 있어 실무적인 조력이 가능합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              )
            },
            {
              id: 3,
              title: '협의대리 진행',
              desc: '소 진행시 피로감이 상당한 바, 소송 전 단계에서 의뢰인의 실익을 극대화하는 최선의 합의안을 이끌어냅니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              )
            },
            {
              id: 4,
              title: '맞춤형 자문',
              desc: '철저한 팩트 체크로 리스크를 투명하게 공개하고, 의뢰인 상황과 입장에 맞는 최적의 솔루션을 제안합니다.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            }
          ]}
        />

        {/* 4.6. Real Client Testimonial Reviews (Interactive filter grid) */}
        <DefectReviews 
          kicker="CONSTRUCTION CLIENT REVIEWS"
          mainTitle='"의뢰인이 직접 작성한 법무법인 플로우 생생한 후기"'
          descText={(
            <>
              어려운 건설 분쟁의 고비마다 변호사와 기술진이 한 몸으로 뛰며 <br />
              의뢰인의 소중한 권리와 공사대금을 지켜낸 진짜 이야기입니다.
            </>
          )}
          items={[
            {
              id: 1,
              content: '공사 중간에 설계 계속 바꿔놓고 나중엔 계약서 타령하며 추가공사비 못 준다던 건축주 때문에 정말 피눈물 났거든요. 그런데 변호사님이 작업 일지랑 공정 같은거 다 분석해서 조목조목 반박해주셔서 밀린 공사비 전부 받았어요. 변호사님 짱입니다!!! ㅎㅎㅎ',
              clientType: '종합건설사 대표',
              location: '서울 강남구 신축현장',
              initial: '박'
            },
            {
              id: 2,
              content: '근거 없는 민원을 넣으며 방해하는 사람들 때문에 공사가 계속 지연됐었거든요.... 변호사님이 즉각적으로 \'공사방해금지 가처분\' 신청을 진행해 주셨고, 법원 결정이 빠르게 나온 덕분에 공사를 다시 안전하게 진행할 수 있게 되었습니다. 현장의 고단함을 아는 변호사님이라 그런가 역시 다르네요.',
              clientType: '시행사 대표',
              location: '인천 서구 개발지구',
              initial: '최'
            },
            {
              id: 3,
              content: '건축주 사정으로 공사가 지연된 건데, 나중에 저한테 지체상금을 물리겠다고 협박하더라고요. 억울해서 잠도 못 잤는데, 변호사님이 공정표랑 회의록 다 분석해서 지체상금 면책 사유를 완벽하게 입증해 주셨습니다. 엄지척드립니다!!!',
              clientType: '골조공사 전문업체 대표',
              location: '경기 화성 공용부지',
              initial: '정'
            },
            {
              id: 4,
              content: '카페 오픈 일정 맞춰서 계약했는데, 인테리어 업체가 철거만 해놓고 추가공사비 요구하며 버티더라구요... 진짜 눈앞이 캄캄했는데 변호사님 나서자마자 계약해지에 계약금 반환까지 일사천리였습니다. 한번도 말씀 못드렸는데 정말 감사합니다... ㅠㅠ',
              clientType: '상가 수분양자 (인테리어 분쟁)',
              location: '부산 수영구 카페거리',
              initial: '이'
            },
            {
              id: 5,
              content: '부실시공 하자 때문에 업체랑 6개월째 실랑이 했는데 하자 증명해서 공사계약 해지하고 선급 공사비 일부도 돌려받았습니다. 변호사님 덕분에 더 큰 피해를 막았습니다.',
              clientType: '단독주택 건축주',
              location: '경기 용인 타운하우스',
              initial: '김'
            }
          ]}
        />

        {/* 4.8. Frequently Asked Questions (Image 1 Accordion FAQ) */}
        <DefectFaq 
          title="건설소송 자주 묻는 질문"
          subtitle="* 여러분의 고민을 속 시원하게 해결해 드립니다."
          items={[
            {
              id: 1,
              question: '추가공사대금 지급과 산정을 두고서 다툼을 벌이고 있습니다. 어떻게 해결하나요?',
              answer: '추가공사대금 청구가 인정되려면 원칙적으로 추가 공사에 대한 양 당사자 간의 사전 합의가 있어야 하며, 해당 공사가 본계약의 범위를 벗어난 것임이 입증되어야 합니다. 실무적으로는 공사내역서, 설계변경 내역, 현장 사진 등을 토대로 실제 투입된 비용의 적정성을 살피며, 합의가 명확하지 않을 경우 감정 절차를 통해 실질적인 기성고와 공사비를 산정합니다.'
            },
            {
              id: 2,
              question: '인접지 공사로 인한 공사피해 및 일조권·조망권 침해, 피해 확대를 막고 보상받을 방법 없나요?',
              answer: '인접지 공사로 인해 건물 균열 등 물리적 피해가 발생했다면 인과관계를 입증하여 수리비 등 손해배상을 청구할 수 있습니다. 일조권이나 조망권 침해의 경우 수인한도(참을 수 있는 한도)를 넘었는지가 관건입니다. 피해가 계속 확대될 우려가 있다면 법원에 \'공사중지가처분\'을 신청하여 급박한 피해를 막을 수 있고, 이후 정밀 안전진단이나 감정을 통해 구체적인 피해액을 산정하여 보상 절차를 진행하게 됩니다.'
            },
            {
              id: 3,
              question: '상대방이 공사계약해지를 희망합니다. 공사타절 시 유의할 점은 없나요?',
              answer: '공사 중도 타절 시에는 \'기성고(약정된 총공사비 중에서 공사한 부분만큼의 공사비)\'를 명확히 하여 문서화해야 향후 분쟁을 예방할 수 있습니다. 나아가 공사 포기 각서나 합의서를 작성할 때도 공사비 정산 시점, 하자보수책임 등을 확실하게 명시하는 것이 바람직합니다.'
            },
            {
              id: 4,
              question: '공기지연에 따른 지체상금 지급과 산정 문제를 놓고 첨예하게 대립 중입니다. 합리적 해법 없을까요?',
              answer: '지체상금은 원칙적으로 약정한 준공일까지 공사를 마치지 못했을 때 발생하지만, 지연의 원인이 천재지변 등 불가항력적 사정이나 발주처 귀책인 경우에는 그 기간만큼 제할 수 있습니다. 지연기간을 원인별로 분류해 면책기간과 책임기간을 확정해야 하는데 쌍방 이견이 많은 것이 현실입니다. 한편 법원은 지체상금이 부당히 과다하다고 판단할 경우 직권으로 감액할 수 있으므로 전문가의 조력을 받으실 것을 권장합니다.'
            },
            {
              id: 5,
              question: '건물 준공 후 누수·균열 등 하자가 발생했는데 보수를 거부합니다. 어떻게 대응해야 하나요?',
              answer: '하자담보책임 기간 내에 하자가 발생했다면 도급인은 수급인에 대해 하자보수를 청구하거나, 보수에 갈음하는 손해배상을 청구할 수 있습니다. 보수를 거부할 경우 제3의 업체를 통해 보수를 진행한 뒤 그 비용을 청구할 수 있으며, 만약 하자보수보증보험에 가입된 상태라면 보험금 청구를 통해 신속히 수리 비용을 확보할 수 있습니다. 단 하자의 원인이 시공상의 과실인지 관리상 부주의인지를 명확히 규명하는 작업이 필요합니다.'
            },
            {
              id: 6,
              question: '인테리어 업체가 멋대로 공사 중단하고 추가금을 요구합니다. 계약파기하고 싶은데 가능할까요?',
              answer: '업체가 정당한 사유 없이 공사를 중단하고 과도한 추가금을 요구하며 이행을 거부한다면, 이는 이행지체 또는 이행거절에 해당하여 계약해제 사유가 될 수 있습니다. 이때 건축주는 상당 기간을 정하여 공사 재개를 촉구하는 \'최고(통지)\' 절차를 거친 후 계약을 해제해야 하며, 이후 타업체를 통해 잔여 공사를 진행하면서 발생한 추가 비용이나 선급금 중 과다 지급분에 대해 손해배상 및 부당이득반환청구 소송을 제기하여 회수할 수 있습니다.'
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
