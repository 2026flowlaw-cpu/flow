"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './OrganicConnectivity.module.css';

const connections = [
  {
    number: '01',
    title: '전략적 중개법인 네트워크',
    desc: '부동산 매수/매도 시 법률적 리스크를 사전에 차단하고, 전세 계약의 안전성을 법률 전문가가 직접 검증합니다.',
    image: '/connectivity_brokerage.webp',
    overlay: '공인중개사와 변호사의 협업으로\n거래의 안전을 끝까지 책임집니다.'
  },
  {
    number: '02',
    title: '건설 기술 진단법인 연계',
    desc: '건축 및 설계 전문가들의 정밀한 기술 진단을 통해, 하자 증명에 법적 공신력을 더하는 압도적인 증거 자료를 구축합니다.',
    image: '/connectivity_tech.webp',
    overlay: '기술적 결함의 명확한 증거로\n소송의 승률을 획기적으로 높입니다.'
  },
  {
    number: '03',
    title: '종합 법률 대응 시스템',
    desc: '중개와 기술, 법률이 하나로 결합된 플로우만의 원스톱 시스템으로 의뢰인에게 가장 효율적인 해결책을 제시합니다.',
    image: '/premium_connectivity.webp',
    overlay: '플로우는 각 분야의 경계를 허물고,\n의뢰인을 위해 최상의 결과를 설계합니다.'
  }
];

const OrganicConnectivity = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.titleWrapper}>
          <span className={styles.kicker}>The Flow Ecosystem</span>
          <h2 className={styles.title}>법률, 중개, 기술이 결합된<br />유기적인 원스톱 네트워크</h2>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.imageSide}>
            {connections.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.imageContainer} ${activeIndex === index ? styles.imageActive : ''}`}
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className={styles.imageOverlay}>
                  <p className={styles.overlayText}>
                    {item.overlay}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.contentSide}>
            {connections.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.connectorItem} ${activeIndex === index ? styles.active : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className={styles.nodeNumber}>{item.number}</div>
                <div className={styles.nodeInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicConnectivity;
