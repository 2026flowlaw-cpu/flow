import React from 'react';
import styles from './SuccessStories.module.css';

const judgments = [
  { region: '평창', text: '평창 **호텔\n계약해제 인정' },
  { region: '인천', text: '인천 **지식산업센터\n전액 반환 승소' },
  { region: '서울', text: '생활형숙박시설\n계약해제 인정' },
  { region: '강릉', text: '강릉 **상가\n위약금 방어 성공' },
  { region: '제주', text: '제주 **리조트\n계약해제 및 배상' },
  { region: '수원', text: '수원 **오피스텔\n기망행위 취소 인정' }
];

const SuccessStories = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>분양권해제 특화 법무법인</span>
          <h2 className={styles.title}>현장을 알아야 이깁니다</h2>
          <p className={styles.subtitle}>"경험의 차이가 결과의 차이를 만듭니다"</p>
          
          <div className={styles.description}>
            <p>분양계약해제 사건은 단순하지 않습니다. 계약서 해석은 누구나 할 수 있습니다.<br/>
            계약서에 숨겨진 함정을 찾고 & 계약체결 과정의 흠결을 밝혀<br/>
            사업시행자를 압박, 소송 없이도 이길 수 있는 방법을 최우선으로 검토합니다.</p>
            
            <p>교과서적 지식만으로는 이길 수 없습니다.<br/>
            현장과 실무를 아는 건설전문변호사가 여러분을 조력합니다.</p>
          </div>
        </div>
      </div>

      {/* Marquee Rolling Section */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* Double the items for infinite scrolling effect */}
          {[...judgments, ...judgments].map((item, idx) => (
            <div key={idx} className={styles.documentCard}>
              <div className={styles.docHeader}>
                <span className={styles.docTitle}>서울중앙지방법원</span>
                <span className={styles.docSub}>제 0 0 민사부</span>
                <span className={styles.docTitle}>판 결</span>
              </div>
              <div className={styles.docBody}>
                <div className={styles.docLine}>사 건 2024가합12345 분양대금반환</div>
                <div className={styles.docLine}>원 고 김** 외 43명</div>
                <div className={styles.docLine}>피 고 주식회사 00건설</div>
                <div className={styles.docDivider}></div>
                <div className={styles.docLineBold}>주 문</div>
                <div className={styles.docLine}>1. 피고는 원고들에게 각 기재된 돈을 지급하라.</div>
                <div className={styles.docLine}>2. 소송비용은 피고가 부담한다.</div>
              </div>
              <div className={styles.stamp}>
                <div className={styles.stampInner}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
