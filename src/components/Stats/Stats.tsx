import React from 'react';
import styles from './Stats.module.css';

const painPoints = [
  { emoji: '😥', text: '좋은 조건에 혹했는데 다 거짓말이었어요..', align: 'left' },
  { emoji: '😓', text: '공사지연, 입주지연.. 더는 못참겠어요', align: 'right' },
  { emoji: '🤨', text: '건물 곳곳이 하자 투성이에요. 부실시공이 의심됩니다..', align: 'left' },
  { emoji: '😩', text: '건축법 등 법령 위반 정황이 다수 발견됐는데 어떻게 해야하죠..?', align: 'right' },
  { emoji: '😡', text: '계약 당시에 고지받지 못한 시설물과, 계약 조건이 저도 모르게 변경됐어요', align: 'left' },
];

const Stats = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>전문 로펌</span>
          <h2 className={styles.title}>법무법인 플로우 강남분사무소</h2>
          <p className={styles.subtitle}>
            "혼자 고민은 그만, 정당한 사유가 있다면 여러분도 해결할 수 있습니다"
          </p>
        </div>

        <div className={styles.bubbleContainer}>
          <div className={styles.verticalLine}></div>
          {painPoints.map((point, idx) => (
            <div key={idx} className={`${styles.bubbleWrapper} ${point.align === 'left' ? styles.leftWrapper : styles.rightWrapper}`}>
              <div className={styles.bubble}>
                {point.align === 'left' ? (
                  <>
                    <span className={styles.emoji}>{point.emoji}</span>
                    <span className={styles.text}>{point.text}</span>
                  </>
                ) : (
                  <>
                    <span className={styles.text}>{point.text}</span>
                    <span className={styles.emoji}>{point.emoji}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
