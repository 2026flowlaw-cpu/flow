import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from './ResaleCancellation.module.css';

const ResaleCancellationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const painPoints = [
    { emoji: '😥', text: '좋은 조건에 혹했는데 다 거짓말이었어요..' },
    { emoji: '😓', text: '공사지연, 입주지연.. 더는 못참겠어요' },
    { emoji: '🤨', text: '건물 곳곳이 하자 투성이에요. 부실시공이 의심됩니다..' },
    { emoji: '😩', text: '건축법 등 법령 위반 정황이 다수 발견됐는데 어떻게 해야하죠..?' },
    { emoji: '😡', text: '계약 당시에 고지받지 못한 시설물과, 계약 조건이 저도 모르게 변경됐어요' },
  ];

  const categories = [
    '거래 중요사항 미고지',
    '미시공, 오시공, 부실시공 하자',
    '착오 · 기망에 의한 계약취소',
    '대출불발로 인한 계약해제',
    '허위 · 과장광고',
    '설계변경',
    '사기분양',
    '입주지연 공사지연',
    '계약금반환',
    '청약철회'
  ];

  const faqs = [
    { q: '중도금까지 납입한 상태인데, 지금이라도 계약 해제가 가능할까요?', a: '네, 가능합니다. 중도금 납부 후에는 원칙적으로 계약 해제가 제한되지만, 분양사의 귀책사유(공사지연, 중대하자, 허위광고 등)가 입증되면 정당하게 해제할 수 있습니다.' },
    { q: '단순 변심으로 해지하고 싶은데, 위약금을 무조건 다 물어야 하나요?', a: '단순 변심의 경우 계약금 몰수 등의 위약금 발생이 원칙입니다. 하지만 계약 과정에서 고지 의무 위반이나 약관의 불공정성이 있다면 감액 또는 취소의 길을 찾을 수 있습니다.' },
    { q: '입주 지연이 되면 무조건 계약해제 가능한가요?', a: '보통 3개월 이상의 입주 지연이 발생할 경우 법률상 해제 권한이 생깁니다. 다만 계약서상의 면책 조항을 해독하는 것이 핵심입니다.' },
    { q: '전매보장 확약서까지 받았는데 마피에 거래 절벽입니다. 계약해제 되는거죠?', a: '확약서의 법적 효력과 당시 분양사의 기망 행위 여부를 검토해야 합니다. 실현 불가능한 보장 약속은 계약 취소의 중대한 근거가 됩니다.' },
    { q: '공장부지 용도로 분양받은건데 공장설립 불가랍니다. 계약금 돌받을 수 있을까요?', a: '목적 달성 불능에 따른 계약 해제 사유입니다. 수분양자의 중대한 착오를 유발한 경우 전액 반환 청구가 가능합니다.' },
    { q: '완공된 건물이 하자 투성이라 분양목적을 달성할 수 없습니다. 계약취소 될까요?', a: '중대한 하자로 인해 계약의 목적을 달성할 수 없는 경우, 취소 및 손해배상 청구가 가능하며 이는 기술적 입증이 병행되어야 합니다.' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.label}>Real Estate Law Firm ILSHIN</span>
          <h1 className={styles.mainTitle}>
            분양계약해제 전문 로펌<br />
            <span>법무법인 일신 강남분사무소</span>
          </h1>
          <p className={styles.heroCatch}>
            "혼자 고민은 그만, 정당한 사유가 있다면 여러분도 해제할 수 있습니다"
          </p>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className={styles.painSection}>
        <div className="container">
          <div className={styles.painGridExpanded}>
            {painPoints.map((point, idx) => (
              <div key={idx} className={styles.painBubble}>
                <span className={styles.emoji}>{point.emoji}</span>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Section 1 */}
      <section className={styles.specSection}>
        <div className="container">
          <div className={styles.accentBox}>
            <span className={styles.subText}>분양권해제 특화 법무법인 · 분양계약해지 분쟁</span>
            <h2 className={styles.specTitle}>"현장을 알아야 이깁니다"</h2>
            <div className={styles.divider}></div>
            <p className={styles.specLead}>
              분양계약해제 사건은 단순하지 않습니다.<br />
              법무법인 일신 강남분사무소는 발생 가능한 모든 케이스를 축적하고 있습니다.
            </p>
          </div>

          <div className={styles.caseNavigation}>
            <h3 className={styles.navTitle}>* 현재 어떤 어려움을 겪고 계신가요?</h3>
            <p className={styles.navSub}>아래 텍스트 클릭해 비슷한 사례를 확인해보세요</p>
            <div className={styles.tagGrid}>
              {categories.map((cat, idx) => (
                <div key={idx} className={styles.caseTag}>{cat}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strength Section 1 */}
      <section className={styles.strengthSectionLight}>
        <div className="container">
          <div className={styles.centerText}>
            <span className={styles.tagLine}>분양권해제 특화 법무법인</span>
            <h2 className={styles.mainHeading}>"경험의 차이가 결과의 차이를 만듭니다"</h2>
            <div className={styles.contentWrap}>
              <p>
                분양계약해제 사건은 단순하지 않습니다. 계약서 해석은 누구나 할 수 있습니다.<br />
                <strong>계약서에 숨겨진 함정을 찾고 & 계약체결 과정의 흠결을 밝혀</strong><br />
                사업시행자를 압박, 소송 없이도 이길 수 있는 방법을 최우선으로 검토합니다.
              </p>
              <p className={styles.accentText}>
                교과서적 지식만으로는 이길 수 없습니다. <br />
                현장과 실무를 아는 건설전문변호사가 여러분을 조력합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.goldLabel}>FAQ</span>
            <h2 className={styles.sectionTitle}>분양계약해제 자주 묻는 질문</h2>
            <p className={styles.sectionDesc}>* 여러분의 고민을 속 시원하게 해결해 드립니다.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`${styles.faqItem} ${openFaq === idx ? styles.active : ''}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className={styles.faqQuestion}>
                   <span className={styles.qMark}>Q.</span> {faq.q}
                   <span className={styles.toggleIcon}>{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <div className={styles.faqAnswer}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.experienceSection}>
        <div className={styles.expOverlay}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.centerTextWhite}>
            <span className={styles.whiteTag}>경험하지 않은 사건은 없습니다</span>
            <h2 className={styles.hugeTitle}>그 사건 이미 이겨봤습니다</h2>
            <div className={styles.dividerGold}></div>
            <p className={styles.quote}>"계약금 포기 없이, 분양계약해제의 길을 찾습니다"</p>
            <div className={styles.expDetail}>
              <p>
                계약해제 = 계약금 몰수라고 생각하기 쉽습니다. <br />
                그러나 <strong>분양사의 귀책이나 위법성이 입증되면 계약금 손실없이 계약 취소</strong> 할 수 있습니다.
              </p>
              <p>
                본사는 상가, 오피스텔, 생활형숙박시설, 지식산업센터, 라이브오피스, 수익형 부동산 등 <br />
                국내 현존하는 부동산 유형 대부분에 대한 사건 수행 경험과 승소 실적을 갖추고 있습니다.
              </p>
              <p className={styles.finalCall}>여러분이 걱정하시는 그 사건, 저희는 이미 해봤고 또 이겨봤습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.gridTwo}>
            <div className={styles.techText}>
              <span className={styles.techLabel}>이론만으론 부족합니다</span>
              <h2 className={styles.techTitle}>기술인력 자체 보유 로펌</h2>
              <div className={styles.divider}></div>
              <p className={styles.techQuote}>"법리로 무장하고 기술로 증명합니다"</p>
              <p className={styles.techDesc}>
                본 법무법인은 분양계약해제 · 취소 분쟁을 전문적으로 수행하는 로펌이며 <br />
                변호사 외에도 <strong>건설전문 세무사, 시공기술사, 건축기사, 공인중개사</strong> 등 <br />
                건설 · 부동산분쟁 기술인력을 로펌 내에 자체 보유하고 있습니다.
              </p>
              <p className={styles.techHighlight}>
                법리로 무장하고 기술로 증명하면 어려운 사건도 길을 찾을 수 있습니다.
              </p>
            </div>
            <div className={styles.techVisual}>
               <div className={styles.techCard}>
                 <h3>전문 기술인력 원스톱 팀</h3>
                 <ul>
                   <li>건설전문 세무사</li>
                   <li>시공기술사 (건설 현장 전문가)</li>
                   <li>건축기사 (도면 정밀 분석)</li>
                   <li>공인중개사 (매매 계약 실무)</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philSection}>
        <div className="container">
           <div className={styles.philBox}>
              <span className={styles.philLabel}>수임을 위한 장밋빛 전망을 경계합니다</span>
              <h2 className={styles.philTitle}>"의뢰인의 입장에서"</h2>
              <div className={styles.divider}></div>
              <p className={styles.philQuote}>"계약서 한장으로 무너진 일상, 되찾아드리겠습니다"</p>
              <div className={styles.philContent}>
                <p>
                  분양계약해제의 진정한 목적은 소송에서 이기는 것이 아닙니다. <br />
                  자꾸만 늘어나는 이자와 신용불량 압박에서 벗어나 <strong>온전한 일상을 회복하는 것</strong>
                </p>
                <p>
                  그것이 진정한 승리이기에 본사는 수임을 목적으로 한 장밋빛 전망 제시를 극도로 경계합니다. <br />
                  오랜 실무경험을 바탕으로 의뢰인에게 실천적이고 합리적인 솔루션을 제안합니다.
                </p>
              </div>
           </div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
    </div>
  );
};

export default ResaleCancellationPage;
