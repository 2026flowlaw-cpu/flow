"use client";

import React from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  DraftingCompass,
  Landmark,
  Network,
  ShieldCheck,
} from 'lucide-react';
import styles from './page.module.css';

export default function GroupPage() {
  const entities = [
    {
      name: '법무법인 플로우',
      tag: 'LEGAL EXPERTISE',
      desc: '건설, 부동산, 민사 소송의 압도적 전문성을 바탕으로 의뢰인의 승소를 설계합니다.',
      features: ['건설/하자소송 전담팀', '부동산 분쟁 해결', '기업 법률 자문'],
      Icon: Landmark
    },
    {
      name: '플로우 중개법인',
      tag: 'REAL ESTATE STRATEGY',
      desc: '단순 중개를 넘어 정밀한 권리 분석과 시장 데이터를 기반으로 최적의 자산을 매칭합니다.',
      features: ['부동산 매칭 시스템', '권리 분석 보고서', '자산 가치 극대화'],
      Icon: Building2
    },
    {
      name: '플로우 기술법인',
      tag: 'TECHNICAL DIAGNOSIS',
      desc: '건축구조기술사 및 정밀진단 전문가들이 법률적 판단의 객관적 근거를 구축합니다.',
      features: ['건축 구조 정밀진단', '하자 판정 기술지원', '현장 감정 분석'],
      Icon: DraftingCompass
    }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.label}>FLOW GROUP STRUCTURE</span>
            <h1 className={styles.title}>유기적인 결합으로 완성되는<br /><span>토탈 솔루션 네트워크</span></h1>
            <p className={styles.desc}>
              법무법인 플로우는 각 분야의 경계를 허물고 전문 지식을 융합하여,<br />
              의뢰인에게 가장 효율적이고 강력한 해결책을 제시합니다.
            </p>
          </div>
        </section>

        <section className={styles.synergySection}>
          <div className={styles.synergyInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>FLOW GROUP NETWORK</span>
              <h2>세 영역이 하나의 사건 전략으로 연결됩니다</h2>
              <p>
                법률 판단, 기술 검증, 자산 전략을 한 번에 연결해 사건의 방향을 더 빠르고 정확하게 설계합니다.
              </p>
            </div>

            <div className={styles.networkPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelIcon}>
                  <Network size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <span>Integrated Case System</span>
                  <strong>Flow One Network</strong>
                </div>
              </div>

              <div className={styles.networkBody}>
                <div className={styles.coreNode}>
                  <ShieldCheck size={28} strokeWidth={2.1} />
                  <strong>Client Success</strong>
                  <span>원스톱 의사결정</span>
                </div>

                <div className={styles.networkNodes}>
                  {entities.map(({ Icon, name, tag }) => (
                    <div key={name} className={styles.networkNode}>
                      <div className={styles.nodeIcon}>
                        <Icon size={22} strokeWidth={2.1} />
                      </div>
                      <span>{tag}</span>
                      <strong>{name.replace('플로우 ', '')}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.processStrip}>
                {['법률 검토', '기술 진단', '자산 전략'].map((step, index) => (
                  <React.Fragment key={step}>
                    <span>{step}</span>
                    {index < 2 && <ArrowRight size={16} strokeWidth={2.1} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.entitySection}>
          <div className={styles.entityIntro}>
            <span>THREE SPECIALIZED UNITS</span>
            <h2>각 법인이 맡은 역할은 분명하고, 결과는 하나로 모입니다</h2>
          </div>
          <div className={styles.entityGrid}>
            {entities.map((entity) => {
              const Icon = entity.Icon;

              return (
                <div key={entity.name} className={styles.entityCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.entityIcon}>
                      <Icon size={26} strokeWidth={2.1} />
                    </div>
                    <span className={styles.entityTag}>{entity.tag}</span>
                  </div>
                  <h3>{entity.name}</h3>
                  <p className={styles.entityDesc}>{entity.desc}</p>
                  <ul className={styles.featureList}>
                    {entity.features.map((f) => (
                      <li key={f}>
                        <Check size={14} strokeWidth={2.5} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* One-Stop Section */}
        <section className={styles.oneStopSection}>
          <div className={styles.oneStopCard}>
            <div className={styles.oneStopInfo}>
              <h2>Flow One-Stop System</h2>
              <p>각 법인의 전문가들이 실시간으로 협력하여 한 번의 상담으로 모든 문제를 해결합니다.</p>
            </div>
            <div className={styles.stepGrid}>
              <div className={styles.step}>
                <span className={styles.stepNum}>01</span>
                <h4>상담 및 진단</h4>
                <p>법률/기술 전문가 법률 검토</p>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.step}>
                <span className={styles.stepNum}>02</span>
                <h4>전략 수립</h4>
                <p>중개/데이터 가치 분석</p>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.step}>
                <span className={styles.stepNum}>03</span>
                <h4>최상의 결과</h4>
                <p>승소 및 자산 보호</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
