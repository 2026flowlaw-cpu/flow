"use client";

import React, { useState } from 'react';
import styles from './DefectFaq.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface DefectFaqProps {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

export default function DefectFaq({
  kicker = "FAQ",
  title = "하자소송 자주 묻는 질문",
  subtitle = "* 여러분의 고민을 속 시원하게 해결해 드립니다.",
  items
}: DefectFaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default open the first one

  const defaultFaqs: FaqItem[] = [
    {
      id: 1,
      question: '보수해주겠다고 하는데.. 굳이 하자소송을 진행해야 할까요?',
      answer: "보증기관은 '사용검사 후 하자'만 보증하므로 사용검사 전 하자와 관련한 배상을 받으려면 별도의 소를 제기해야만 합니다. 더욱이 일반인이 체감하는 하자는 실제 하자의 30% 가량에 불과하기 때문에 단순히 하자보수만 요구할 경우 극히 제한된 하자 항목에 대한 보수가 이뤄질 수밖에 없습니다. 소송을 진행하면 사용검사 전 하자에 해당하는 미시공, 오시공, 변경시공 부분은 물론 실생활에 직접적으로 불편을 초래하지는 않으나 감춰진 하자 등도 발굴하여 청구하므로 보다 실익이 있다고 하겠습니다."
    },
    {
      id: 2,
      question: '하자소송은 언제 진행해야 되나요? 기간이 따로 정해져 있나요?',
      answer: '하자의 종류에 따라 2년, 3년, 5년, 10년의 담보책임기간이 정해져 있으므로, 해당 기간 내에 권리를 행사해야 법적 보호를 받을 수 있습니다.'
    },
    {
      id: 3,
      question: '시공사가 하자를 보수해주겠다고 약속만 하고 미루는데 어떻게 하나요?',
      answer: '보수 이행이 계속 지연될 경우, 하자진단을 통해 하자 규모와 내역을 확정하고 소송을 통해 실질적인 보수비용을 청구하는 것이 가장 확실한 해결책입니다.'
    },
    {
      id: 4,
      question: '단지 전체가 소송에 참여하는 것이 유리할까요?',
      answer: '공용부분 하자는 단지 전체의 자산 가치와 직결되므로, 다수의 세대가 연대하여 대응할 때 시공사를 상대로 더 강력한 협상력과 증거력을 갖출 수 있습니다.'
    },
    {
      id: 5,
      question: '소송을 진행하면 판결까지 기간이 얼마나 걸릴까요?',
      answer: '통상적으로 1심 판결까지 약 1년에서 1년 6개월 정도 소요되며, 이는 단지의 규모나 감정 절차의 복잡성에 따라 달라질 수 있습니다.'
    },
    {
      id: 6,
      question: '소송 비용이 부담스러운데, 승소 후 보상을 얼마나 받을 수 있나요?',
      answer: '승소 시 판결 금액에는 보수비뿐만 아니라 지연손해금 등이 포함되며, 변호사 비용의 상당 부분도 소송비용 확정 절차를 통해 상대방에게 청구할 수 있습니다.'
    }
  ];

  const faqs = items || defaultFaqs;

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Section Header (Image 1 replica) */}
        <div className={styles.headerArea}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.mainTitle}>{title}</h2>
          <p className={styles.subTitle}>{subtitle}</p>
        </div>

        {/* Accordion List (Image 1 replica styled with custom active indicator) */}
        <div className={styles.faqList}>
          {faqs.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={item.id} 
                className={`${styles.faqItem} ${isActive ? styles.faqItemActive : ''}`}
              >
                {/* Accordion Trigger */}
                <button 
                  className={styles.faqHeader}
                  onClick={() => handleToggle(index)}
                  aria-expanded={isActive}
                >
                  <div className={styles.questionLeft}>
                    <span className={styles.qLabel}>Q.</span>
                    <span className={styles.questionText}>{item.question}</span>
                  </div>
                  <span className={styles.toggleSign}>
                    {isActive ? '−' : '+'}
                  </span>
                </button>

                {/* Accordion Body */}
                <div className={styles.answerWrapper}>
                  <div className={styles.answerContent}>
                    {item.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
