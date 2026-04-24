import React from 'react';
import styles from './PracticeAreas.module.css';

const practiceAreas = [
  {
    title: '집단소송',
    description: '대규모 인원의 공통된 권익을 위해 체계적인 법률 대응과 정밀한 증거 분석을 수행합니다.',
  },
  {
    title: '하자소송',
    description: '아파트 및 건축물 하자의 정밀 진단과 명확한 법리 구성을 통해 입주민의 권리를 지킵니다.',
  },
  {
    title: '분양계약해제',
    description: '분양 사기나 계약 불이행 상황에서 법적 대응을 통해 신속하고 정확한 계약 해제를 돕습니다.',
  },
  {
    title: '전세사기',
    description: '전세 사기 피해자의 소중한 보증금을 회수하기 위한 민형사상의 총체적인 솔루션을 제공합니다.',
  },
  {
    title: '부동산분쟁',
    description: '매매, 임대차, 인도 등 복잡한 부동산 관련 법적 분쟁을 건설법 전문 지식으로 해결합니다.',
  },
  {
    title: '건설분쟁',
    description: '공사대금, 유치권, 지체상금 등 건설 현장의 다각적인 분쟁을 전문적으로 자문합니다.',
  },
  {
    title: '민사일반',
    description: '손해배상, 채권채무 등 일상생활의 모든 민사적 고충에 대해 최적의 법률 전략을 제시합니다.',
  },
  {
    title: '에듀법률',
    description: '학교폭력, 교권 침해 등 교육 현장의 특수성을 고려한 맞춤형 법률 서비스입니다.',
  },
  {
    title: '형사',
    description: '수사 단계부터 재판까지 의뢰인의 인권을 보호하며 명확한 변론 시스템을 구축합니다.',
  }
];

const PracticeAreas = () => {
  return (
    <section id="practice" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>전문 분야</h2>
          <p className={styles.subtitle}>Our Professional Practice Areas</p>
        </div>
        <div className={styles.grid}>
          {practiceAreas.map((area, index) => (
            <div 
              key={index} 
              className={styles.card}
            >
              <div className={styles.top}>
                <span className={styles.number}>{(index + 1).toString().padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{area.title}</h3>
              </div>
              <p className={styles.cardDescription}>{area.description}</p>
              <div className={styles.footer}>
                <span className={styles.more}>자세히 보기 →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
