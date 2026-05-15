import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTA from '@/components/CTA/CTA';
import LawyerProfiles from '@/components/LawyerProfiles/LawyerProfiles';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import Stats from '@/components/Stats/Stats';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import FAQ from '@/components/FAQ/FAQ';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import styles from '../page.module.css';
import PracticeCases from '@/components/PracticeCases/PracticeCases';
const centerData: Record<string, { title: string; subtitle: string; desc: string }> = {
  'sex-offense': {
    title: '성범죄센터',
    subtitle: 'SEX OFFENSE DEFENSE',
    desc: '강제추행, 강간, 디지털 성범죄 등 민감한 사건. 철저한 비밀 유지와 무죄 및 선처를 위한 전략적 변론을 약속합니다.',
  },
  'dui-traffic': {
    title: '음주·교통센터',
    subtitle: 'DUI & TRAFFIC ACCIDENTS',
    desc: '음주운전 3진 아웃, 뺑소니, 12대 중과실 등 면허 취소 구제부터 합의 대행, 형사 재판까지 완벽하게 방어합니다.',
  },
  'drugs': {
    title: '마약센터',
    subtitle: 'DRUG CRIMES',
    desc: '투약, 소지, 밀수 등 처벌이 강화된 마약 사건. 초기 수사 대응부터 재활 치료 연계까지 선처를 위한 최적의 양형 자료를 구축합니다.',
  },
  'voice-phishing': {
    title: '보이스피싱센터',
    subtitle: 'VOICE PHISHING DEFENSE',
    desc: '단순 가담, 인출책 등 억울하게 연루된 보이스피싱 사건. 무혐의 입증과 피해 최소화를 위한 명확한 법리를 구성합니다.',
  },
  'construction': {
    title: '건설형사센터',
    subtitle: 'CONSTRUCTION CRIMINAL LAW',
    desc: '산업안전보건법 위반, 중대재해처벌법, 건설현장 사고 등 기업과 대표를 지키는 강력한 형사 방어막을 제공합니다.',
  },
  'economic': {
    title: '경제범죄센터',
    subtitle: 'ECONOMIC CRIMES',
    desc: '사기, 횡령, 배임 등 복잡한 자금 흐름에 대한 정밀한 분석과 증거 수집으로 혐의를 벗겨냅니다.',
  },
  'juvenile': {
    title: '소년학폭센터',
    subtitle: 'JUVENILE & SCHOOL VIOLENCE',
    desc: '학교폭력위원회 대응부터 소년보호사건 전환까지. 우리 아이의 미래가 걸린 일, 부모의 마음으로 변호합니다.',
  },
  'general': {
    title: '일반형사센터',
    subtitle: 'GENERAL CRIMINAL LAW',
    desc: '폭행, 상해, 명예훼손 등 일상에서 발생하는 모든 형사 사건에 대해 가장 빠르고 정확한 법률 솔루션을 제공합니다.',
  }
};

export default async function CriminalCenterPage({ params }: { params: Promise<{ center: string }> }) {
  const resolvedParams = await params;
  const data = centerData[resolvedParams.center];

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ minHeight: '400px', height: '40vh' }}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#C5A059', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            {data.subtitle}
          </span>
          <h1>{data.title}</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', marginTop: '20px' }}>
            {data.desc}
          </p>
        </div>
      </section>

      {/* 1. 실적 카드 */}
      <Stats />

        {/* 2. 케이스 */}
        <PracticeCases />

        {/* 3. 성공사례(판결문) */}
      <SuccessStories />

      {/* 4. FAQ */}
      <FAQ />

      {/* 5. 회사 강점소개 */}
      <PhilosophyMessage />

      {/* 6. 의뢰인후기 */}
      <CustomerReviews />

      {/* 7. 상담 */}
      <div style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
        <div className={styles.container}>
          <InquiryForm />
        </div>
      </div>
      <CTA />
    </div>
  );
}
