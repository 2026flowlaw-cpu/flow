import React from 'react';
import styles from '../../page.module.css'; // Reusing existing practice overview styles
import Link from 'next/link';

const criminalPracticeAreas = [
  {
    title: '성범죄 센터',
    desc: '강제추행, 디지털 성범죄 등 민감한 사건. 철저한 비밀 유지와 무죄 및 선처를 위한 전략적 변론을 약속합니다.',
    href: '/practice/criminal-law/sex-offense'
  },
  {
    title: '음주·교통 센터',
    desc: '음주운전 3진 아웃, 뺑소니, 12대 중과실 등 면허 취소 구제부터 합의 대행, 형사 재판까지 완벽하게 방어합니다.',
    href: '/practice/criminal-law/dui-traffic'
  },
  {
    title: '마약 센터',
    desc: '투약, 소지, 밀수 등 처벌이 강화된 마약 사건. 초기 수사 대응부터 재활 치료 연계까지 선처를 위한 최적의 양형 자료를 구축합니다.',
    href: '/practice/criminal-law/drugs'
  },
  {
    title: '보이스피싱 센터',
    desc: '단순 가담, 인출책 등 억울하게 연루된 보이스피싱 사건. 무혐의 입증과 피해 최소화를 위한 명확한 법리를 구성합니다.',
    href: '/practice/criminal-law/voice-phishing'
  },
  {
    title: '건설 형사 센터',
    desc: '산업안전보건법 위반, 중대재해처벌법, 건설현장 사고 등 기업과 대표를 지키는 강력한 형사 방어막을 제공합니다.',
    href: '/practice/criminal-law/construction'
  },
  {
    title: '경제 범죄 센터',
    desc: '사기, 횡령, 배임 등 복잡한 자금 흐름에 대한 정밀한 분석과 증거 수집으로 혐의를 벗겨냅니다.',
    href: '/practice/criminal-law/economic'
  },
  {
    title: '소년학폭 센터',
    desc: '학교폭력위원회 대응부터 소년보호사건 전환까지. 우리 아이의 미래가 걸린 일, 부모의 마음으로 변호합니다.',
    href: '/practice/criminal-law/juvenile'
  },
  {
    title: '일반 형사 센터',
    desc: '폭행, 상해, 명예훼손 등 일상에서 발생하는 모든 형사 사건에 대해 가장 빠르고 정확한 법률 솔루션을 제공합니다.',
    href: '/practice/criminal-law/general'
  }
];

export default function CriminalPracticeOverviewPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ background: 'linear-gradient(rgba(10, 27, 57, 0.85), rgba(10, 27, 57, 0.85)), url("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80") center/cover no-repeat' }}>
        <div className="container">
          <h1 className={styles.heroTitle}>형사 업무분야</h1>
          <p className={styles.heroText}>
            법무법인 일신 형사 전담 센터는 각 분야의 전문성 있는 센터를 통해 <br />
            의뢰인의 권익을 가장 확실하게 보호하는 법률 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Practice Grid Section */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {criminalPracticeAreas.map((area, index) => (
              <Link key={index} href={area.href} className={styles.practiceCard}>
                <div>
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
