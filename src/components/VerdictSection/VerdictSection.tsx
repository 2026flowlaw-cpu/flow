"use client";

import React from 'react';
import styles from './VerdictSection.module.css';

interface VerdictItem {
  id: number;
  court: string;
  caseNo: string;
  plaintiff: string;
  orderText: string;
  stampText: string;
}

interface VerdictSectionProps {
  kicker?: string;
  mainTitle?: string;
  descText?: React.ReactNode;
}

export default function VerdictSection({
  kicker = '',
  mainTitle = '모두가 불가능하다고 했던 사건, 법무법인 플로우는 결과로 증명했습니다!',
  descText
}: VerdictSectionProps) {
  const verdicts: VerdictItem[] = [
    {
      id: 1,
      court: '서울중앙지방법원',
      caseNo: '2023가합50241',
      plaintiff: 'A 대단지 입주자대표회의',
      orderText: '피고(시공사)는 원고에게 정밀 안전진단 하자를 가산하여 보수비 25억 4천만 원을 즉각 지급하라.',
      stampText: '보수비 25억 최종 승소'
    },
    {
      id: 2,
      court: '수원지방법원',
      caseNo: '2024가합10932',
      plaintiff: 'B 주상복합 관리단',
      orderText: '설계도면과 다르게 저가 자재를 무단 시공한 기망 하자를 전액 불법행위 배상 책임으로 인정한다.',
      stampText: '부실/기망 시공 전액 배상'
    },
    {
      id: 3,
      court: '서울동부지방법원',
      caseNo: '2023가합8942',
      plaintiff: 'C 아파트 입주자대표회의',
      orderText: '피고 보증공사는 외벽 및 지하주차장 방수 보수보증금 전액에 대한 청구 권리가 있음을 판결한다.',
      stampText: '주차장 균열 보증금 확보'
    },
    {
      id: 4,
      court: '인천지방법원',
      caseNo: '2022가합30482',
      plaintiff: 'D 오피스텔 비대위',
      orderText: '법원 감정 단계에서 입증 누락된 공용부분 감정액의 92% 증액 조정을 최종 선고 인용한다.',
      stampText: '외벽 균열 감정가 증액'
    }
  ];

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Header Block (Image 1 replica) */}
        <div className={styles.headerArea}>
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h2 className={styles.mainTitle}>{mainTitle}</h2>
          <div className={styles.descText}>
            {descText || (
              <>
                법무법인 플로우는 자체 기술인력의 정밀 진단 데이터와 수백 건의 승소 사례를 바탕으로, <br />
                복잡하게 얽힌 하자 분쟁의 실타래를 명쾌하게 풀어드립니다.
              </>
            )}
          </div>
        </div>

        {/* Verdict Cards Infinite Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Set 1 */}
            <div className={styles.marqueeSet}>
              {[...verdicts, ...verdicts].map((item, idx) => (
                <div className={styles.paperCard} key={`set1-${item.id}-${idx}`}>
                  {/* Paper Document Layout */}
                  <div className={styles.documentHeader}>
                    <span className={styles.courtBadge}>{item.court}</span>
                    <h4 className={styles.documentTitle}>判 決 書</h4>
                  </div>

                  <div className={styles.documentBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>사 건</span>
                      <span className={styles.infoValue}>{item.caseNo}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>원 고</span>
                      <span className={styles.infoValue}>{item.plaintiff}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>주 문</span>
                      <span className={styles.infoValue}>"{item.orderText}"</span>
                    </div>

                    {/* Simulated lines */}
                    <div className={styles.dummyTextLines}>
                      <div className={styles.dummyLine}></div>
                      <div className={styles.dummyLine}></div>
                      <div className={`${styles.dummyLine} ${styles.dummyLineShort}`}></div>
                    </div>
                  </div>

                  {/* Red Stamp Overlay (Gam-myeong replica style) */}
                  <div className={styles.stampBox}>
                    <div className={styles.stampSeal}>
                      {item.stampText}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (for infinite loop) */}
            <div className={styles.marqueeSet}>
              {[...verdicts, ...verdicts].map((item, idx) => (
                <div className={styles.paperCard} key={`set2-${item.id}-${idx}`}>
                  {/* Paper Document Layout */}
                  <div className={styles.documentHeader}>
                    <span className={styles.courtBadge}>{item.court}</span>
                    <h4 className={styles.documentTitle}>判 決 書</h4>
                  </div>

                  <div className={styles.documentBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>사 건</span>
                      <span className={styles.infoValue}>{item.caseNo}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>원 고</span>
                      <span className={styles.infoValue}>{item.plaintiff}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>주 문</span>
                      <span className={styles.infoValue}>"{item.orderText}"</span>
                    </div>

                    {/* Simulated lines */}
                    <div className={styles.dummyTextLines}>
                      <div className={styles.dummyLine}></div>
                      <div className={styles.dummyLine}></div>
                      <div className={`${styles.dummyLine} ${styles.dummyLineShort}`}></div>
                    </div>
                  </div>

                  {/* Red Stamp Overlay (Gam-myeong replica style) */}
                  <div className={styles.stampBox}>
                    <div className={styles.stampSeal}>
                      {item.stampText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
