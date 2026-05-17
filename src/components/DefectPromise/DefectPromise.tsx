"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './DefectPromise.module.css';

interface CounterItem {
  id: number;
  target: number;
  suffix: string;
  title: string;
  desc: string;
}

export default function DefectPromise() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  const counters: CounterItem[] = [
    {
      id: 0,
      target: 800,
      suffix: '단지+',
      title: '전국 하자소송 수행 및 승소',
      desc: '아파트, 주상복합, 오피스텔 등 대규모 주거단지 수행 실적'
    },
    {
      id: 1,
      target: 2500,
      suffix: '억 원+',
      title: '누적 회수 보수비',
      desc: '철저한 과학적 기망 입증을 통해 확보한 보수 비용 및 판결금 누적'
    },
    {
      id: 2,
      target: 500,
      suffix: '회 이상',
      title: '집합건물분쟁 법률자문',
      desc: '신속하고 명확한 솔루션으로 소송 전 합의 및 권리 보전 성공'
    },
    {
      id: 3,
      target: 100,
      suffix: '% 자체보유',
      title: '부동산·건설 기술인력',
      desc: '건축구조기술사 직계 융합을 통한 원스톱 정밀 하자 진단 감정망'
    }
  ];

  useEffect(() => {
    const startAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const duration = 1500; // 1.5 seconds animation
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quad formula
        const easeProgress = progress * (2 - progress);

        setCounts(
          counters.map(c => Math.floor(easeProgress * c.target))
        );

        if (frame >= totalFrames) {
          clearInterval(timer);
          setCounts(counters.map(c => c.target)); // Ensure it hits the exact target
        }
      }, frameRate);
    };

    // Intersection observer to trigger only when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.promiseSection} ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>NUMBERS & PROMISES</span>
          <h2 className={styles.sectionTitle}>하자소송 특화! 압도적 경험과 실력</h2>
          <p className={styles.sectionSubtitle}>
            입주민의 한 치의 손해도 허용하지 않는 법무법인 플로우의 정밀 소송 전략입니다. <br />
            대형 시공사를 압도하는 완벽한 지표와 최고의 맨파워를 직접 증명합니다.
          </p>
        </div>

        {/* 1. Dynamic Count-Up Metrics */}
        <div className={styles.metricsGrid}>
          {counters.map((item) => (
            <div className={styles.metricCard} key={item.id}>
              <div className={styles.metricNum}>
                {counts[item.id].toLocaleString()}{item.suffix}
              </div>
              <h4 className={styles.metricTitle}>{item.title}</h4>
              <p className={styles.metricDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 2. Premium Hexagon Promise Cards (Gam-myeong Style) */}
        <div className={styles.promiseGrid}>
          
          {/* Card 1: 건설전문변호사 직접 상담 */}
          <div className={styles.promiseCard}>
            <div className={styles.hexagonWrapper}>
              <svg className={styles.hexagonSvg} viewBox="0 0 100 100">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="rgba(255, 255, 255, 0.02)" stroke="#C5A059" strokeWidth="1.5" />
              </svg>
              <div className={styles.hexagonIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <h3 className={styles.cardTitle}>건설전문변호사 직접 상담</h3>
            <p className={styles.cardDesc}>
              대한변협 등록 건설전문변호사가 모든 초기 상담부터 변론 과정까지 외주 없이 100% 밀착 책임 상담을 진행합니다.
            </p>
          </div>

          {/* Card 2: 부동산·건설 기술인력 자체보유 */}
          <div className={styles.promiseCard}>
            <div className={styles.hexagonWrapper}>
              <svg className={styles.hexagonSvg} viewBox="0 0 100 100">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="rgba(255, 255, 255, 0.02)" stroke="#C5A059" strokeWidth="1.5" />
              </svg>
              <div className={styles.hexagonIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  <path d="M12 11v6" />
                  <path d="M9 14h6" />
                </svg>
              </div>
            </div>
            <h3 className={styles.cardTitle}>기술인력 자체보유</h3>
            <p className={styles.cardDesc}>
              부동산 및 건설 분야의 감정/안전진단 전문 인력을 자체 보유하여 과학적이고 신속한 증거 분석 자료를 완성합니다.
            </p>
          </div>

          {/* Card 3: 입주자단 맞춤형 컨설팅 */}
          <div className={styles.promiseCard}>
            <div className={styles.hexagonWrapper}>
              <svg className={styles.hexagonSvg} viewBox="0 0 100 100">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="rgba(255, 255, 255, 0.02)" stroke="#C5A059" strokeWidth="1.5" />
              </svg>
              <div className={styles.hexagonIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <h3 className={styles.cardTitle}>입주민단 맞춤형 컨설팅</h3>
            <p className={styles.cardDesc}>
              입주자대표회의, 관리단, 비상대책위원회(비대위)의 각 권리 쟁송 상황에 최적화된 동대표단 맞춤식 행정 가이드를 제공합니다.
            </p>
          </div>

          {/* Card 4: 대형 건설사 상대 노하우 */}
          <div className={styles.promiseCard}>
            <div className={styles.hexagonWrapper}>
              <svg className={styles.hexagonSvg} viewBox="0 0 100 100">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="rgba(255, 255, 255, 0.02)" stroke="#C5A059" strokeWidth="1.5" />
              </svg>
              <div className={styles.hexagonIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>
            <h3 className={styles.cardTitle}>축적된 승소 노하우</h3>
            <p className={styles.cardDesc}>
              국내 메이저 주요 1군 건설사들을 상대로 승소 판결을 축적하여 부실공사 기망 법리를 체계적으로 다지는 유일무이한 모델을 가동합니다.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
