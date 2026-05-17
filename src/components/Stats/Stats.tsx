"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

interface CounterProps {
  end: number;
  duration?: number;
}

const CountUpText = ({ end, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease-out cubic: 수치가 목표에 가까워질수록 천천히 감속
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={containerRef}>{count.toLocaleString()}</span>;
};

const stats = [
  { label: '누적 업무 사례', value: 1542, suffix: '+' },
  { label: '승소 및 해결 확률', value: 92, suffix: '%' },
  { label: '전문 변호사 수', value: 10, suffix: '명' },
  { label: '월 평균 상담 건수', value: 439, suffix: '건' },
];

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3 className={styles.value}>
                <CountUpText end={stat.value} />
                <span className={styles.suffix}>{stat.suffix}</span>
              </h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
