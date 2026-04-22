import React from 'react';
import styles from './CustomerReviews.module.css';

interface Review {
  id: number;
  author: string;
  tag: string;
  rating: number;
  content: string;
  date: string;
  isFeatured?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    author: '김*현 님',
    tag: '하자소송 전문 대응',
    rating: 5,
    content: '신축 아파트 입주 후 발견된 무수한 하자들 때문에 막막했습니다. 일신의 기술법인 연계 시스템 덕분에 *정밀한 진단 보고서*를 확보할 수 있었고, 결국 예상보다 훨씬 높은 판결금을 받을 수 있었습니다. 진심으로 감사드립니다.',
    date: '2024.03.15',
    isFeatured: true
  },
  {
    id: 2,
    author: '이*정 님',
    tag: '전세보증금 회수',
    rating: 5,
    content: '전세 사기 뉴스를 볼 때마다 남 일 같지 않았는데 제게도 일이 벌어지더군요. 변호사님들의 신속한 가압류 신청과 형사 고소 덕분에 *보증금 전액을 안전하게 회수*할 수 있었습니다.',
    date: '2024.03.10'
  },
  {
    id: 3,
    author: '박*우 님',
    tag: '분양계약 해제',
    rating: 5,
    content: '복잡한 분양 계약 해제 문제를 명쾌하게 풀어주셨습니다. 다른 곳에서는 부정적이었는데, 일신에서는 *차별화된 법리 해석*으로 성공적인 결과를 만들어주셨네요.',
    date: '2024.02.28'
  },
  {
    id: 4,
    author: '최*희 님',
    tag: '부동산 일반 분쟁',
    rating: 5,
    content: '상가 임대차 문제로 수개월을 고민하다 상담받았습니다. 실무 경험이 풍부하셔서 그런지 *상대방과의 협상 전략*이 매우 탁월하셨습니다.',
    date: '2024.02.15'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ opacity: i < rating ? 1 : 0.2 }}>★</span>
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>Voices of Trust</span>
          <h2 className={styles.title}>의뢰인이 직접 경험한 일신</h2>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className={`${styles.card} ${review.isFeatured ? styles.featured : ''}`}
            >
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {review.author[0]}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{review.author}</span>
                  <span className={styles.tag}>{review.tag}</span>
                </div>
              </div>
              
              <StarRating rating={review.rating} />
              
              <p className={styles.content}>
                {review.content.split('*').map((part, i) => 
                  i % 2 === 1 ? <em key={i}>{part}</em> : part
                )}
              </p>
              
              <span className={styles.date}>{review.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
