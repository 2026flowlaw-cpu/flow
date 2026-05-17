"use client";

import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import styles from './ResaleCancellation.module.css';

import Stats from '@/components/Stats/Stats';
import PainPoints from '@/components/PainPoints/PainPoints';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import FAQ from '@/components/FAQ/FAQ';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import CTA from '@/components/CTA/CTA';
import PracticeCases from '@/components/PracticeCases/PracticeCases';


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
            <span>법무법인 플로우 강남분사무소</span>
          </h1>
          <p className={styles.heroCatch}>
            "혼자 고민은 그만, 정당한 사유가 있다면 여러분도 해제할 수 있습니다"
          </p>
        </div>
      </section>

        {/* 1. 실적 카드 */}
        <Stats />
      <PainPoints />

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
          <div className="container">
            <InquiryForm />
          </div>
        </div>
        <CTA />
  
      <Footer />
    </div>
  );
};

export default ResaleCancellationPage;
