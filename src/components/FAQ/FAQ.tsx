"use client";
import React, { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: "상담 시 어떤 자료를 준비해야 하나요?",
    answer: "사건과 관련된 모든 서류(계약서, 내용증명, 메시지 내역 등)를 지참하시면 더욱 구체적이고 정확한 상담이 가능합니다."
  },
  {
    question: "소송 비용은 어떻게 되나요?",
    answer: "소송 비용은 사건의 난이도와 소송 가액에 따라 다릅니다. 첫 상담 시 명확한 비용 안내를 드리며, 투명한 수임료 체계를 원칙으로 합니다."
  },
  {
    question: "승소 가능성을 미리 알 수 있나요?",
    answer: "변호사가 직접 사건 기록을 검토한 후, 관련 판례와 법리를 바탕으로 객관적인 승소 가능성을 분석해 드립니다."
  },
  {
    question: "지방에 거주하고 있는데 상담 및 소송 진행이 가능한가요?",
    answer: "네, 가능합니다. 비대면(전화/화상) 상담을 통해 사건을 선임하실 수 있으며, 전국 법원의 사건을 수행하고 있습니다."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>FAQ</span>
          <h2 className={styles.title}>자주 묻는 질문</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button 
                className={styles.question}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.qMark}>Q.</span>
                <span className={styles.qText}>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerContent}>
                  <span className={styles.aMark}>A.</span>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
