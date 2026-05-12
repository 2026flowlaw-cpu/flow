import React from 'react';
import Link from 'next/link';
import Stats from '@/components/Stats/Stats';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import LawyerProfiles from '@/components/LawyerProfiles/LawyerProfiles';
import CTA from '@/components/CTA/CTA';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import PartnersDetail from '@/components/PartnersDetail/PartnersDetail';
import PartnerCarousel from '@/components/PartnerCarousel/PartnerCarousel';
import LocationMap from '@/components/Location/LocationMap/LocationMap';
import styles from './page.module.css';

export const metadata = {
  title: '형사 전문 - 법무법인 플로우',
  description: '법무법인 플로우 형사 전문 센터. 수사부터 재판까지 의뢰인의 인권과 권리를 확실히 보호합니다.',
};

const criminalPracticeAreas = [
  {
    title: '성범죄 전담',
    desc: '강제추행, 디지털 성범죄 등 민감한 사건에 대한 철저한 비밀 유지 및 초기 대응을 제공합니다.',
    href: '/practice/criminal-law/sex-offense'
  },
  {
    title: '경제범죄',
    desc: '사기, 횡령, 배임 등 복잡한 자금 흐름과 법리를 요구하는 경제범죄에 대한 체계적인 방어 전략을 구축합니다.',
    href: '/practice/criminal-law/economic'
  },
  {
    title: '교통사고/음주운전',
    desc: '음주운전, 뺑소니, 12대 중과실 교통사고 등 면허 취소 구제부터 합의, 형사 재판까지 원스톱으로 지원합니다.',
    href: '/practice/criminal-law/dui-traffic'
  },
  {
    title: '폭행/상해',
    desc: '쌍방폭행, 특수상해 등 일상에서 발생하는 폭력 사건에 대해 정당방위 입증 및 원만한 합의를 이끌어냅니다.',
    href: '/practice/criminal-law/general'
  },
  {
    title: '기업 형사',
    desc: '산업안전보건법 위반, 중대재해처벌법 등 비즈니스 과정의 형사 리스크를 방어합니다.',
    href: '/practice/criminal-law/construction'
  },
  {
    title: '수사 초기 대응 / 영장',
    desc: '경찰 조사 전 시뮬레이션 및 동행, 구속 위기 상황에서 영장실질심사를 통한 불구속 상태를 확보합니다.',
    href: '/practice/criminal-law/general'
  }
];

const criminalColumns = [
  { title: '[형사 칼럼] 억울하게 성범죄로 고소당했다면? 초기 경찰 조사 대응법', date: '2024.05.10' },
  { title: '[승소 사례] 음주운전 3진 아웃 위기, 집행유예로 방어 성공', date: '2024.04.25' },
  { title: '[형사 칼럼] 보이스피싱 인출책으로 몰렸을 때 무죄 주장하는 방법', date: '2024.04.12' },
  { title: '[승소 사례] 특수상해 사건, 피해자와의 극적 합의를 통한 선처', date: '2024.03.28' },
  { title: '[형사 칼럼] 업무상 횡령죄의 성립 요건과 무혐의 입증 전략', date: '2024.03.15' }
];

export default function CriminalLawPage() {
  return (
    <div className={styles.page}>
      {/* 1. Custom Hero Section for Criminal Law */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#C5A059', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>CRIMINAL DEFENSE CENTER</span>
          <h1>형사 전담 센터</h1>
          <p>가장 두려운 순간, 형사 전문 변호사가 함께합니다.<br/>수사 초기부터 재판까지 당신의 편에서 든든한 방패가 되어 드립니다.</p>
        </div>
      </section>

      {/* 2. Stats (Reused from Main) */}
      <Stats />

      {/* 3. Custom Criminal Practice Areas */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ textAlign: 'left', marginBottom: '60px', borderLeft: '5px solid #C5A059', paddingLeft: '30px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#0A1B39', marginBottom: '12px', letterSpacing: '-0.5px' }}>형사 전문 분야</h2>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, letterSpacing: '2px' }}>CRIMINAL PRACTICE AREAS</p>
          </div>
          <div className={styles.grid}>
            {criminalPracticeAreas.map((area, idx) => (
              <Link href={area.href} key={idx} className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: 700, color: '#C5A059', fontStyle: 'italic' }}>
                        {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>{area.title}</h3>
                </div>
                <p className={styles.cardDesc}>{area.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                    <span className={styles.cardLink}>상담 신청하기 →</span>
                </div>
              </Link>
            ))}

            {/* 민사 소송센터 전용 버튼 */}
            <Link href="/" className={`${styles.card} ${styles.cardFull}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: 700, color: '#C5A059', fontStyle: 'italic' }}>
                  07
                </span>
                <h3 className={styles.cardTitle} style={{ margin: 0 }}>민사 소송센터</h3>
              </div>
              <p className={styles.cardDesc}>
                부동산, 손해배상, 대여금 등 일상에서 발생하는 민사적 고충. 복잡한 소송 절차를 전문 변호사가 직접 해결해 드립니다.
              </p>
              <div>
                <span className={styles.cardLink}>자세히 보기 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Custom Flow News: Criminal Columns & YouTube */}
      <section className={styles.section} style={{ backgroundColor: '#f8fafc' }}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#0A1B39', marginBottom: '12px', letterSpacing: '-0.5px' }}>플로우 형사 전문 소식</h2>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, letterSpacing: '2px' }}>COLUMNS & MEDIA</p>
          </div>
          
          <div className={styles.twoCol}>
            {/* Columns List */}
            <div className={styles.contentBox}>
              <h3 className={styles.boxTitle}>전문 칼럼 & 승소 사례</h3>
              <div>
                {criminalColumns.map((col, idx) => (
                  <Link href="/consult" key={idx} className={styles.listItem}>
                    <span className={styles.itemTitle}>{col.title}</span>
                    <span className={styles.itemDate}>{col.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* YouTube Section */}
            <div className={styles.contentBox}>
              <h3 className={styles.boxTitle}>플로우 형사 전문 유튜브</h3>
              <div className={styles.youtubeWrapper}>
                <iframe 
                  src="https://www.youtube.com/embed/M7lc1UVf-VE" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
                복잡하고 어려운 형사 절차, 플로우의 형사 전문 변호사가 알기 쉽게 설명해 드립니다. 경찰 조사부터 영장실질심사까지 필수 대응법을 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reused Components from Main Page */}
      <CustomerReviews />
      <LawyerProfiles />
      <CTA />
      <PhilosophyMessage />
      <PartnersDetail />
      <PartnerCarousel />
      
      {/* Location Section */}
      <div style={{ background: '#f9fafb', padding: '120px 0 0' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 800, 
            textAlign: 'center', 
            marginBottom: '80px',
            color: '#0A1B39',
            letterSpacing: '-1.5px'
          }}>오시는 길</h2>
        </div>
        <LocationMap />
      </div>
    </div>
  );
}
