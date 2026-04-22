import React from 'react';
import Image from 'next/image';
import styles from './SuccessStories.module.css';

const stories = [
  {
    category: '아파트 하자소송',
    title: '성남 00 아파트 외 1, 200억 대 하자소송 승소',
    description: '공용부 및 전용부의 광범위한 하자 진단을 통해 법원 감정 결과를 이끌어내어 의뢰인들의 실질적인 권리를 보호했습니다.',
    image: '/images/success_apartment.png',
    result: '승소판결',
    amount: '200억 원'
  },
  {
    category: '건설부실 분쟁',
    title: '강남 오피스텔 단지 부실 소송 처리 성공',
    description: '지표면 침하 및 지하 주차장 누수 하자에 대한 정밀 실사를 바탕으로 시공사의 책임을 명확히 입증하였습니다.',
    image: '/images/success_building.png',
    result: '조정성립',
    amount: '120억 원'
  }
];

const SuccessStories = () => {
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>성공 사례</h2>
          <p className={styles.subtitle}>법무법인 플로우의 실력으로 증명된 기록입니다.</p>
        </div>
        <div className={styles.list}>
          {stories.map((story, index) => (
            <div key={index} className={`${styles.item} ${index % 2 === 1 ? styles.reverse : ''}`}>
              <div className={styles.imageBox}>
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.contentBox}>
                <span className={styles.category}>{story.category}</span>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.description}>{story.description}</p>
                <div className={styles.meta}>
                  <div>
                    <span className={styles.metaLabel}>결과</span>
                    <span className={styles.metaValue}>{story.result}</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>금액</span>
                    <span className={styles.metaValue}>{story.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
