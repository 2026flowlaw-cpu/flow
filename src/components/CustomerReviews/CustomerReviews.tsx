import React from 'react';
import styles from './CustomerReviews.module.css';

interface Review {
  id: number;
  author: string;
  tag: string;
  content: string;
  avatarColor: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: '정**',
    tag: '폭행 / 피의자',
    content: '술자리 시비로 경찰 조사를 받게 되었습니다. 상대방이 과한 합의금을 요구해 난처했는데, 변호사님의 CCTV 분석으로 사실관계가 명확히 파악된 덕분에 소액으로 원만한 합의가 가능했습니다. 법적 지식이 없는 제게 큰 힘이 되었습니다.',
    avatarColor: '#ffd700'
  },
  {
    id: 2,
    author: '임**',
    tag: '횡령·배임 / 피해자',
    content: '믿었던 직원의 횡령으로 큰 금전적 손실을 입었습니다. 법무법인 플로우의 정밀한 회계 분석과 증거 수집 덕분에 혐의를 입증하고 민사 소송까지 승소하여 피해액을 최대한 회수할 수 있었습니다.',
    avatarColor: '#00ced1'
  },
  {
    id: 3,
    author: '박**',
    tag: '성범죄 / 피고인',
    content: '억울하게 연루된 사건으로 평생 쌓아온 명예가 무너질 뻔했습니다. 변호사님들의 논리적인 변론과 철저한 증거 조사를 통해 무죄 판결을 받아 일상으로 돌아올 수 있었습니다. 진심으로 감사드립니다.',
    avatarColor: '#ff6347'
  }
];

const CustomerReviews = () => {
  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            무너질 뻔한 일상,<br />
            법무법인 <span className={styles.accent}>플로우</span>가 함께 지켜냈습니다.
          </h2>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar} style={{ backgroundColor: review.avatarColor }}>
                  <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.name}>{review.author}</span>
                <span className={styles.tag}>{review.tag}</span>
              </div>
              <p className={styles.content}>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
