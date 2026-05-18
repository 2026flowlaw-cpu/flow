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

interface PromiseCardItem {
  id: number;
  title: string;
  desc: string;
  iconType?: string;
}

interface DefectPromiseProps {
  kicker?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  counters?: CounterItem[];
  promises?: PromiseCardItem[];
}

export default function DefectPromise({
  kicker = 'NUMBERS & PROMISES',
  sectionTitle = '법무법인 플로우의 압도적 경험과 실력',
  sectionSubtitle = '입주민의 한 치의 손해도 허용하지 않는 법무법인 플로우의 정밀 소송 전략입니다. 대형 시공사를 압도하는 완벽한 지표와 최고의 맨파워를 직접 증명합니다.',
  counters,
  promises
}: DefectPromiseProps) {
  const [counts, setCounts] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  const defaultCounters: CounterItem[] = [
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

  const actualCounters = counters || defaultCounters;
  
  const countersRef = useRef(actualCounters);
  countersRef.current = actualCounters;
  const countersKey = actualCounters.map(c => `${c.id}-${c.target}-${c.suffix}`).join(',');

  const defaultPromises: PromiseCardItem[] = [
    {
      id: 0,
      title: '건설전문변호사 직접 상담',
      desc: '대한변협 등록 건설전문변호사가 모든 초기 상담부터 변론 과정까지 외주 없이 100% 밀착 책임 상담을 진행합니다.',
      iconType: 'lawyer'
    },
    {
      id: 1,
      title: '기술인력 자체보유',
      desc: '부동산 및 건설 분야의 감정/안전진단 전문 인력을 자체 보유하여 과학적이고 신속한 증거 분석 자료를 완성합니다.',
      iconType: 'tech'
    },
    {
      id: 2,
      title: '입주민단 맞춤형 컨설팅',
      desc: '입주자대표회의, 관리단, 비상대책위원회(비대위)의 각 권리 쟁송 상황에 최적화된 동대표단 맞춤식 행정 가이드를 제공합니다.',
      iconType: 'custom'
    },
    {
      id: 3,
      title: '축적된 승소 노하우',
      desc: '국내 메이저 주요 1군 건설사들을 상대로 승소 판결을 축적하여 부실공사 기망 법리를 체계적으로 다지는 유일무이한 모델을 가동합니다.',
      iconType: 'custom'
    }
  ];

  const actualPromises = promises || defaultPromises;

  useEffect(() => {
    setCounts(countersRef.current.map(() => 0));
    animatedRef.current = false;

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
          countersRef.current.map(c => Math.floor(easeProgress * c.target))
        );

        if (frame >= totalFrames) {
          clearInterval(timer);
          setCounts(countersRef.current.map(c => c.target));
        }
      }, frameRate);
    };

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
  }, [countersKey]);

  const getIcon = (type?: string) => {
    switch (type) {
      case 'lawyer':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'tech':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <path d="M12 11v6" />
            <path d="M9 14h6" />
          </svg>
        );
      case 'consult':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'twotrack':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'auction':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M21 16H3M21 12H3M21 8H3" />
          </svg>
        );
      case 'shield':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'scale':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1" />
            <path d="M18 8H6" />
            <path d="M12 3v15" />
            <path d="M3 12h18" />
          </svg>
        );
      case 'certificate':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        );
      case 'gavel':
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 13-5 5M16 11l-5 5" />
            <path d="m15.5 15.5-2-2 3.5-3.5 2 2z" />
            <path d="M2.3 21h4" />
            <path d="M2 17h16" />
            <path d="m12 12-9 9" />
          </svg>
        );
      default:
        return (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
    }
  };

  return (
    <section className={styles.promiseSection} ref={containerRef}>
      
      {/* 1. White Background Upper Container (Up to the count-up numbers) */}
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
          <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>
        </div>

        {/* Dynamic Count-Up Metrics Cards */}
        <div className={styles.metricsGrid}>
          {actualCounters.map((item, index) => (
            <div className={styles.metricCard} key={item.id || index}>
              <div className={styles.metricNum}>
                {item.target > 0 && counts[index] !== undefined ? counts[index].toLocaleString() : ''}{item.suffix}
              </div>
              <h4 className={styles.metricTitle}>{item.title}</h4>
              <p className={styles.metricDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* 2. Navy Background Lower Container (Only the Hexagon Promise Cards) */}
      <div className={styles.promiseDarkSection}>
        <div className="container">
          
          <div className={styles.promiseGrid}>
            {actualPromises.map((item, index) => (
              <div className={styles.promiseCard} key={item.id || index}>
                <div className={styles.hexagonWrapper}>
                  <svg className={styles.hexagonSvg} viewBox="0 0 100 100">
                    <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="rgba(255, 255, 255, 0.02)" stroke="#C5A059" strokeWidth="1.5" />
                  </svg>
                  <div className={styles.hexagonIcon}>
                    {getIcon(item.iconType)}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
