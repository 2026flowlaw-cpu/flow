import React from 'react';
import styles from './PhilosophyMessage.module.css';

const PhilosophyMessage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.contentBox}>
          <div className={styles.quoteIcon}>"</div>
          <span className={styles.kicker}>경험하지 않은 사건은 없습니다</span>
          <h2 className={styles.title}>그 사건 이미 이겨봤습니다</h2>
          
          <div className={styles.divider}></div>
          
          <p className={styles.highlightText}>
            "계약금 포기 없이, 분양계약해제의 길을 찾습니다"
          </p>

          <div className={styles.textWrap}>
            <p>
              계약해제 = 계약금 몰수라고 생각하기 쉽습니다.<br/>
              그러나 <strong>분양사의 귀책이나 위법성이 입증되면 계약금 손실없이 계약 취소</strong> 할 수 있습니다.
            </p>
            <p>
              분양계약해제의 진정한 목적은 소송에서 이기는 것이 아닙니다.<br/>
              자꾸만 늘어나는 이자와 신용불량 압박에서 벗어나 <strong>온전한 일상을 회복하는 것</strong><br/>
              그것이 진정한 승리이기에 본사는 수임을 목적으로 한 장밋빛 전망 제시를 극도로 경계합니다.
            </p>
            <p>
              본사는 상가, 오피스텔, 생활형숙박시설, 지식산업센터, 라이브오피스, 수익형 부동산 등<br/>
              국내 현존하는 부동산 유형 대부분에 대한 사건 수행 경험과 승소 실적을 갖추고 있습니다.
            </p>
            <p>
              오랜 실무경험을 바탕으로 의뢰인에게 실천적이고 합리적인 솔루션을 제안합니다.
            </p>
          </div>

          <div className={styles.footerText}>
            여러분이 걱정하시는 그 사건,<br/>
            <span>저희는 이미 해봤고 또 이겨봤습니다.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyMessage;
