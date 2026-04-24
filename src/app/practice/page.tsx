import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const practiceAreas = [
  {
    title: '분양계약 해제 센터',
    desc: '허위/과장 광고, 입주 지연 등 분양 계약 과정의 부당함을 투명하게 해결하고 소중한 자산을 지켜드립니다.',
    href: '/practice/resale-cancellation',
    icon: '🏠'
  },
  {
    title: '전세사기 전담대응 센터',
    desc: '최근 급증하는 전세 사기 피해자들을 위한 신속하고 체계적인 법률 대응 시스템을 구축하여 보증금 회수를 돕습니다.',
    href: '/practice/jeonse-fraud',
    icon: '🛡️'
  },
  {
    title: '부동산 분쟁 센터',
    desc: '매매, 임대차, 토지 보상 등 부동산과 관련된 모든 법적 갈등에 대해 최적화된 전략과 승소 경험을 제공합니다.',
    href: '/practice/real-estate-dispute',
    icon: '🏗️'
  },
  {
    title: '건설 분쟁 센터 (하자소송)',
    desc: '아파트 및 건축물 하자보수, 추가 공사비 분쟁 등 복잡한 건설 법무를 기술적 이해를 바탕으로 명쾌하게 해결합니다.',
    href: '/practice/construction-dispute',
    icon: '👷'
  },
  {
    title: '집단소송 센터',
    desc: '다수의 피해자가 발생한 사건에 대해 체계적인 조직력과 법률 지식을 총동원하여 대형 승소를 이끌어냅니다.',
    href: '/practice/class-action',
    icon: '👥'
  },
  {
    title: '민사 일반 센터',
    desc: '손해배상, 대여금, 가사 등 일상 속의 다양한 민사 분쟁에 대하여 당신의 편에서 끝까지 함께 싸웁니다.',
    href: '/practice/general-civil',
    icon: '⚖️'
  },
  {
    title: '에듀 법률 센터',
    desc: '교육 환경에서 발생하는 교권 보호, 학교 폭력, 교육 제도 관련 분쟁에 특화된 법률 서비스를 제공합니다.',
    href: '/practice/edu-law',
    icon: '🎓'
  },
  {
    title: '형사 소송 센터',
    desc: '수사 단계부터 재판까지, 피의자의 권리를 보호하고 억울함 없는 최선의 결과를 위해 철저하게 방어합니다.',
    href: '/practice/criminal-law',
    icon: '⚖️'
  }
];

export default function PracticeOverviewPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>업무분야</h1>
          <p className={styles.heroText}>
            법무법인 플로우는 각 분야의 전문성 있는 센터를 통해 <br />
            고객의 권익을 가장 확실하게 보호하는 법률 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Practice Grid Section */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {practiceAreas.map((area, index) => (
              <Link key={index} href={area.href} className={styles.practiceCard}>
                <div>
                  <span className={styles.iconWrapper}>{area.icon}</span>
                  <h3 className={styles.cardTitle}>{area.title}</h3>
                  <p className={styles.cardDesc}>{area.desc}</p>
                </div>
                <div className={styles.linkText}>
                  전문 센터 자세히 보기 <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
