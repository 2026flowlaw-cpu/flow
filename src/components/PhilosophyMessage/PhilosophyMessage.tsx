import React from 'react';
import styles from './PhilosophyMessage.module.css';

const PhilosophyMessage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.background}></div>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            고객의 입장에서 먼저 듣고,<br />
            함께 해결합니다.
          </h2>
          <p className={styles.description}>
            법무법인 일신는 고객 밀착형 전문가 그룹이 모여 신뢰할 수 있는 법률 서비스를 제공합니다.<br /><br />
            우리는 단순히 법적 분쟁을 해결하는 데 그치지 않고, 의뢰인의 권리와 가치를 최우선으로 생각하여 해결책을 제시합니다.<br />
            사건을 넘어, 사람을 위한 법률 대응 - 일신가 든든한 법률 동반자가 되어 드리겠습니다.
          </p>
          <button className={styles.button}>구성원 확인하기 →</button>
        </div>
        <div className={styles.statsBox}>
          <span className={styles.statsLabel}>YK PROFESSIONALS</span>
          <div className={styles.number}>439</div>
          <span className={styles.numberSuffix}>건</span>
          <p className={styles.statsText}>월 평균 상담 건수</p>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyMessage;
