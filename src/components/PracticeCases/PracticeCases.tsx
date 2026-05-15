"use client";

import React, { useState } from 'react';
import styles from './PracticeCases.module.css';

const cases = [
  { title: '거래 중요사항 미고지', desc: '분양 계약 시 필수적으로 고지해야 할 수익률, 주변 혐오시설, 전매제한 등을 숨기고 계약을 유도한 경우 취소 사유가 됩니다.' },
  { title: '미시공, 오시공, 부실시공 하자', desc: '모델하우스와 다르거나 안전에 위협이 되는 중대한 하자가 발생한 경우, 목적 달성 불능으로 계약 해제가 가능합니다.' },
  { title: '착오 · 기망에 의한 계약취소', desc: '분양대행사의 의도적인 속임수(확정수익 보장, 프리미엄 보장 등)에 속아 계약한 경우 기망을 이유로 취소할 수 있습니다.' },
  { title: '대출불발로 인한 계약해제', desc: '무조건 대출이 나온다는 분양 직원의 약속을 믿고 계약했으나 대출이 부결된 경우, 조건부 계약으로 보아 계약금 반환이 가능합니다.' },
  { title: '허위 · 과장광고', desc: '카달로그, 분양광고에 기재된 내용(지하철 개통, 대형 마트 입점 등)이 허위로 밝혀진 경우 계약 해제의 정당한 근거가 됩니다.' },
  { title: '설계변경', desc: '수분양자의 동의 없이 임의로 설계를 변경하여 조망권, 일조권을 침해하거나 전용 면적을 축소한 경우 대응할 수 있습니다.' },
  { title: '사기분양', desc: '이중 분양, 신탁사 동의 없는 불법 분양 등 애초에 정상적인 소유권 이전이 불가능한 상태에서 이루어진 사기 분양 사건입니다.' },
  { title: '입주지연 공사지연', desc: '예정된 입주 날짜보다 3개월 이상 공사가 지연될 경우, 법적으로 계약을 해제하고 위약금을 청구할 권리가 생깁니다.' },
  { title: '계약금반환', desc: '정당한 사유로 계약을 취소했음에도 분양사 측에서 위약금을 명목으로 계약금 반환을 거부할 때 진행하는 소송입니다.' },
  { title: '청약철회', desc: '방문판매법 등에 따라 계약 후 일정 기간 내에 단순 변심으로도 위약금 없이 청약을 철회할 수 있는 특수한 케이스입니다.' },
];

const PracticeCases = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCase = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>분양권해제 특화 법무법인</span>
          <h2 className={styles.title}>분양계약해지 분쟁</h2>
          <p className={styles.subtitle}>"현장을 알아야 이깁니다"</p>
          <div className={styles.descBox}>
            <p>분양계약해제 사건은 단순하지 않습니다.<br/>법무법인 일신 강남분사무소는 발생 가능한 모든 케이스를 축적하고 있습니다.</p>
          </div>
          <div className={styles.instruction}>
            <p className={styles.instructionTitle}>* 현재 어떤 어려움을 겪고 계신가요?</p>
            <p className={styles.instructionSub}>아래 텍스트 클릭해 비슷한 사례를 확인해보세요</p>
          </div>
        </div>

        <div className={styles.grid}>
          {cases.map((c, idx) => (
            <div key={idx} className={`${styles.card} ${openIndex === idx ? styles.active : ''}`}>
              <button className={styles.cardHeader} onClick={() => toggleCase(idx)}>
                {c.title}
              </button>
              <div className={styles.cardBody}>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeCases;
