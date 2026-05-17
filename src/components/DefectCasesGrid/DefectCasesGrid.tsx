"use client";

import React, { useState, useEffect } from 'react';
import styles from './DefectCasesGrid.module.css';

interface CasePill {
  id: number;
  label: string;
  coreDiagnosis: string;
  engineeringSolution?: string;
  legalStrategy: string;
}

interface DefectCasesGridProps {
  kicker?: string;
  mainTitle?: string;
  descLines?: string[];
  difficultyTitle?: string;
  difficultySubtitle?: string;
  hideKicker?: boolean;
  customCases?: CasePill[];
  reportSubtitle?: string;
}

export default function DefectCasesGrid({
  kicker = '하자소송 전문로펌 · 공동주택 및 집합건물 하자 분쟁',
  mainTitle = '"현장을 알아야 이깁니다"',
  descLines = [
    '법리에 기술을 더한 법무법인 플로우만의 토탈 솔루션!',
    '로펌 내 자체 기술인력이 숨은 하자까지 정밀 진단합니다.',
    '800여 단지에서 축적한 실무 데이터를 기반으로 거대 건설사의 주장을 완벽 방어합니다.'
  ],
  difficultyTitle = '* 현재 어떤 어려움을 겪고 계신가요?',
  difficultySubtitle = '법무법인 플로우는 모든 케이스를 축적하고 있습니다.',
  hideKicker = false,
  customCases,
  reportSubtitle
}: DefectCasesGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  const cases: CasePill[] = customCases || [
    {
      id: 1,
      label: '사용검사 전후 하자',
      coreDiagnosis: '준공 승인 전 발생한 하자와 승인 후 나타난 하자는 법적 책임 주체 및 담보책임 기간 산정 기준일이 완전히 다릅니다. 이를 엄격히 구분하여 분석하지 않으면 소송 과정에서 건설사의 면책 주장에 휘말려 정당한 보상을 받지 못할 위험이 있습니다.',
      engineeringSolution: '준공 도면과 사용검사필증 교부일을 기준으로 균열 측정기 및 비파괴 시험 장비를 활용하여 각 하자의 물리적인 발생 시점을 과학적으로 역추적합니다.',
      legalStrategy: '사용검사 전 하자는 분양계약서 및 설계도면 불일치를 근거로 공사계약상의 채무불이행 책임을 추궁하고, 사용검사 후 하자는 집합건물법 제9조에 따른 하자담보책임(1년~10년)을 개별 조항별로 완벽히 적용해 권리 소멸을 차단합니다.'
    },
    {
      id: 2,
      label: '미시공 · 오시공 하자',
      coreDiagnosis: '설계도면과 다르게 축소 시공되었거나 고의·과실로 자재가 누락된 결함으로, 장기적인 아파트 성능 저하 및 자산 가치의 하락과 직결되는 핵심 중대 분쟁 항목입니다.',
      engineeringSolution: '실시계획 설계도서와 준공도면을 디지털 3D 레이저 스캐닝 및 초음파 장비로 현장과 1:1 대조하여, 콘크리트 벽체 속 단열재 누락이나 철근 간격 부족 등 눈에 보이지 않는 고액의 숨은 하자를 전수 적발합니다.',
      legalStrategy: '대법원 판례 기준에 입각하여 사용검사 시점의 최종 설계도면을 기준으로 기능적·미관적 품질 차액을 공사비 감정으로 산출, 시공사의 부당 이득을 환수하고 정당한 하자보수비 청구를 완벽하게 관철시킵니다.'
    },
    {
      id: 3,
      label: '균열 및 누수 하자',
      coreDiagnosis: '구조물의 안전성을 직접적으로 위협하는 균열과 입주민 삶의 질을 무너뜨리는 누수는 법원에서 가장 엄격하게 다루며 감정 금액의 비중이 가장 높은 중요 하자입니다.',
      engineeringSolution: '고해상도 열화상 카메라, 콘크리트 수분 정밀 측정기 및 초소형 내시경을 동원하여 단순 표면 크랙과 철근 부식을 유발하는 구조적 균열을 명확히 구분하고 물줄기의 원천 유입 경로를 차트화합니다.',
      legalStrategy: '철근콘크리트 구조 기준 및 시설물 안전관리 특별법상 허용 균열폭(0.3mm) 기준을 활용해 미세 크랙까지 단순 도포가 아닌 고압 에폭시 균열 주입 공법을 적용하여 감정 평가액을 극대화합니다.'
    },
    {
      id: 4,
      label: '전용 및 공용부분 결함',
      coreDiagnosis: '전용부 결함은 각 세대의 개별 권익을, 공용부 결함(외벽, 옥상, 엘리베이터 등)은 단지 전체의 안전과 재산권을 대변하므로 체계적인 통합 증명 프로세스가 필수적입니다.',
      engineeringSolution: '자체 개발한 모바일 하자 검수 애플리케이션을 통해 세대별 전수 조사를 공백 없이 신속하게 완료하고, 지하공동구 및 기계/전기실 등 핵심 공용부 시스템을 입체적으로 안전 정밀 진단합니다.',
      legalStrategy: '전용부는 소송 참여 동의율을 극대화하는 신속 지원 시스템을 가동하고, 공용부는 관리단 또는 입주자대표회의의 합법적 결의를 바탕으로 집합건물법상 손해배상청구권을 원스톱으로 병합 제기합니다.'
    },
    {
      id: 5,
      label: '시공사 보수이행 거부',
      coreDiagnosis: '건설사들이 자체 면책 기준을 일방적으로 들이밀거나 예산 부족 등을 핑계로 보수 요청을 해태하며 고의적으로 시간 끌기 조치를 취하는 상황입니다.',
      engineeringSolution: '입주자대표회의의 공문 발송 이력과 하자 현장의 상태 악화 과정(부식 및 2차 피해 범위 확대)을 고화질 촬영 및 기계식 실측으로 수집하여 법원에 제출할 독점적 기술 소견 증거를 축적합니다.',
      legalStrategy: '건설사의 이행 지체를 명확히 입증하여 민법 제389조에 의한 보수에 갈음하는 손해배상 청구 소송으로 즉각 선회하고, 판결 전 신속한 보수비 집행을 확보하기 위해 건설사 예금 및 자산에 대한 사전 가압류를 전격 단행합니다.'
    },
    {
      id: 6,
      label: '하자보수보증금 청구',
      coreDiagnosis: '시공사의 부도, 워크아웃(회생절차) 개시 또는 고의적인 미이행 시, 보증기관(주택도시보증공사 HUG, 건설공제조합 등)을 상대로 보증 재원을 신속히 확보해야 하는 시급한 사안입니다.',
      engineeringSolution: '보증서 발급 기준상의 담보책임기간별 하자를 명확히 분류하고, 국가 공인 감정 기준에 맞춘 전문 예가 보수 견적서를 정밀 설계하여 보증기관의 심사 삭감 시도를 원천 차단합니다.',
      legalStrategy: '보증 약관 및 법정 소멸시효(5년) 이내에 공식적인 독촉 및 청구 통지를 한 치의 오차 없이 완료하고, 필요시 지급 보류에 맞서 보증금 청구 소송을 최단기로 단행하여 실질적인 수리 예산을 최단기에 조달합니다.'
    },
    {
      id: 7,
      label: '마감불량 및 부실공사',
      coreDiagnosis: '도배 들뜸, 타일 균열 및 박리, 목창호 뒤틀림 등 육안으로 쉽게 확인되는 마감 미흡부터 골조 부실 등 내면의 저가 변경 시공이 혼재되어 대규모 주거 불만을 야기합니다.',
      engineeringSolution: '국토교통부 표준시방서 및 건설 기술 기준을 바탕으로 수평오차 레이저 레벨기, 도막 두께 측정기 등 전문 계측 장비를 활용해 오차 범위 초과치와 미비 시공을 정밀 수치화합니다.',
      legalStrategy: '단순 보수액이 아닌 재시공 철거 및 설치 실공사비를 감정가로 책정 청구하고, 시공사의 경미한 하자 우기기 및 자연 손상 주장을 표준 시공 기준서 법리를 근거로 완벽하게 탄핵합니다.'
    },
    {
      id: 8,
      label: '설계도면과 다른 시공',
      coreDiagnosis: '분양 시 카탈로그나 모델하우스에서 약속한 최고급 마감재, 구조적 사양 대신 시공 단계에서 입주민 동의 없이 저가의 대체 자재로 무단 변경 시공된 경우입니다.',
      engineeringSolution: '인허가 과정의 사업승인 설계도서, 착공도면, 준공도면을 다차원 교차 시각화 대조하여 단열성능 저하재 사용, 마감 등급 격하 등 일체의 무단 변경 부위를 명백히 규명합니다.',
      legalStrategy: '대법원 전원합의체 판례 법리에 기초하여 설계도면의 규격과 상이한 자재를 원상 복구하거나 가치 감소에 상당하는 배상금을 정당한 손해액으로 입증하여 분양 계약 위반에 따른 높은 판결금을 확보합니다.'
    },
    {
      id: 9,
      label: '소방 · 전기 시설 불량',
      coreDiagnosis: '비상경보 오작동, 소방 스프링클러 배관 누수, 수배전반 접지 불량 등은 입주민의 인명 및 안전사고와 직결되어 소방법 등 엄격한 법적 제재가 따르는 중대 영역입니다.',
      engineeringSolution: '전기 및 소방 전문 엔지니어가 직접 투입되어 절연 저항 측정기, 무선 통신 데시벨 검측기, 가압 수밀 시험기를 사용하여 국가 소방 안전 기술 기준 준수 여부를 밀도 높게 정밀 검증합니다.',
      legalStrategy: '화재안전기준 위반에 대한 관할 소방서 행정 조치 요구와 소송 절차를 결합해 건설사를 한층 강하게 압박하며, 임시방편 수리가 아닌 규격 소방/전기 설비 전면 전면 재구축 비용을 청구합니다.'
    },
    {
      id: 10,
      label: '단지 내 조경 하자',
      coreDiagnosis: '고사목 방치, 조경석 균열, 배수 불량에 따른 조경 잔디 괴사 등은 아파트 및 오피스텔 단지의 친환경 가치와 브랜드 이미지 자산을 가장 직접적으로 실추시킵니다.',
      engineeringSolution: '국가 조경 설계 기준 및 식재 표준 시방 기준(나무 높이, 뿌리직경 등)을 바탕으로 수목의 활착 상태와 식재 당시 토양 품질을 면밀히 분석하여 설계 부실과 불량 수목 식재를 명확히 구분합니다.',
      legalStrategy: '식재 후 2년 내 발생한 고사에 대해 건설사가 흔히 주장하는 관리 소홀(입주민 물주기 탓 등) 핑계를 기상청 통계 및 토양 분석 증거로 반박하고, 시방서 기준에 맞춘 정당한 신규 수목 재식재 비용을 관철합니다.'
    },
    {
      id: 11,
      label: '지하주차장 결로 및 균열',
      coreDiagnosis: '차량 부식, 겨울철 미끄럼 슬립 사고, 벽면 결로 백화 등 지하주차장의 고질병은 대부분 단열재 미시공이나 누락, 외벽 배수판 부실 설계 등에서 비롯됩니다.',
      engineeringSolution: '주차장 슬래브 비파괴 구조물 강도 진단, 외벽 방수막 상태 정밀 내시경 분석, 실내외 온습도 분석을 수행하여 결로가 단순 자연 현상이 아닌 건설사의 시공 하자임을 물리적으로 증명합니다.',
      legalStrategy: '균열에 따른 단순 에폭시 표면 처리 비용을 넘어, 근본적인 방습벽 보강 시공, 유도 배수판 전면 설치 및 환기 송풍 시스템 구축 비용에 상응하는 고액의 전면 보수 공사 예산을 전액 감정 청구합니다.'
    },
    {
      id: 12,
      label: '입주 전 사전점검 분쟁',
      coreDiagnosis: '입주예정자 사전점검에서 심각한 하자가 대거 적발되었으나 건설사가 준공 승인 절차를 무단 강행하여 보수 없이 입주를 밀어붙임으로써 강도 높은 대립을 유발하는 긴박한 단계입니다.',
      engineeringSolution: '사전점검 시 축적된 하이라이트 중대 결함(세대 내 누수, 가스 누출 의심, 공용부 미완성) 데이터를 공인 등급으로 자동 등급화하여 관할 지자체 제출용 기술 긴급 보고서를 가동합니다.',
      legalStrategy: '지자체 공동주택 품질검수단 및 주택법 조례를 대리 활용해 건설사가 정당한 보수를 끝내기 전까지 임시 사용 승인을 유보하도록 강력 대응하고, 입주 지연에 따른 지체상금 확약 및 분양 대금 잔금 지급 거부권의 적법한 요건을 정립합니다.'
    }
  ];

  const currentCase = selectedId !== null ? cases.find(c => c.id === selectedId) : null;

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.headerArea}>
          {!hideKicker && kicker && <span className={styles.kicker}>{kicker}</span>}
          {mainTitle && <h2 className={styles.mainTitle}>{mainTitle}</h2>}
          <div className={styles.goldDivider}></div>
          {descLines && descLines.length > 0 && (
            <div className={styles.descBlock}>
              {descLines.map((line, idx) => (
                <span key={idx} className={styles.descLine}>{line}</span>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Area */}
        <div className={styles.difficultyArea}>
          <div className={styles.dashDivider}>—</div>
          {difficultyTitle && <h3 className={styles.difficultyTitle}>{difficultyTitle}</h3>}
          {difficultySubtitle && (
            <p className={styles.difficultySubtitle}>
              {difficultySubtitle.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < difficultySubtitle.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>

        {/* 12-Pill Grid */}
        <div className={styles.pillsGrid}>
          {cases.map((item) => (
            <div 
              key={item.id}
              className={`${styles.pillCard} ${selectedId === item.id ? styles.pillActive : ''}`}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Dynamic Modal Popup */}
        {currentCase && (
          <div className={styles.modalOverlay} onClick={() => setSelectedId(null)}>
            <div className={styles.detailBox} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={() => setSelectedId(null)} aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className={styles.detailHeader}>
                <div className={styles.headerLeftInfo}>
                  <span className={styles.detailBadge}>CASE {currentCase.id.toString().padStart(2, '0')}</span>
                  <h4 className={styles.detailTitle}>{currentCase.label}</h4>
                </div>
                <div className={styles.headerSubtitle}>
                  {reportSubtitle || (currentCase.engineeringSolution 
                    ? '법무법인 플로우(FLOW) 기술·법률 통합 진단 보고서'
                    : '법무법인 플로우(FLOW) 전세사기·임대차 분쟁 진단 보고서')}
                </div>
              </div>
              
              <div className={styles.modalContent}>
                {(!currentCase.engineeringSolution && !currentCase.legalStrategy) ? (
                  /* Single Premium Card for Single Detailed text */
                  <div className={styles.singleCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.titleArea}>
                        <svg className={styles.diagnosisIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="16" x2="12" y2="12"/>
                          <line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        <span className={styles.cardTitle}>
                          상세 법률 분석 솔루션 <span className={styles.englishSub}>(Case Details)</span>
                        </span>
                      </div>
                      <span className={styles.cardBadgeDiagnosis}>SOLUTION</span>
                    </div>
                    <p className={styles.cardSingleText}>{currentCase.coreDiagnosis}</p>
                  </div>
                ) : (
                  <>
                    {/* 1. 핵심 진단 (Diagnosis) */}
                    {currentCase.coreDiagnosis && (
                      <div className={styles.diagnosisCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.titleArea}>
                            <svg className={styles.diagnosisIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                              <line x1="12" y1="9" x2="12" y2="13"/>
                              <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            <span className={styles.cardTitle}>
                              핵심 진단 <span className={styles.englishSub}>(Diagnosis)</span>
                            </span>
                          </div>
                          <span className={styles.cardBadgeDiagnosis}>DIAGNOSIS</span>
                        </div>
                        <p className={styles.cardText}>{currentCase.coreDiagnosis}</p>
                      </div>
                    )}

                    {/* 2. 엔지니어링 솔루션 (Engineering) */}
                    {currentCase.engineeringSolution && (
                      <div className={styles.engineeringCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.titleArea}>
                            <svg className={styles.engineeringIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="12" y1="16" x2="12" y2="12"/>
                              <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            <span className={styles.cardTitle}>
                              엔지니어링 솔루션 <span className={styles.englishSub}>(Engineering)</span>
                            </span>
                          </div>
                          <span className={styles.cardBadgeEngineering}>ENGINEERING</span>
                        </div>
                        <p className={styles.cardText}>{currentCase.engineeringSolution}</p>
                      </div>
                    )}

                    {/* 3. 법적 대응 전략 (Legal Strategy) */}
                    {currentCase.legalStrategy && (
                      <div className={styles.legalCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.titleArea}>
                            <svg className={styles.legalIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span className={styles.cardTitle}>
                              법적 대응 전략 <span className={styles.englishSub}>(Legal Strategy)</span>
                            </span>
                          </div>
                          <span className={styles.cardBadgeLegal}>LEGAL</span>
                        </div>
                        <p className={styles.cardText}>{currentCase.legalStrategy}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
