import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CTA.module.css';

const ctaItems = [
  {
    title: '카카오톡 비대면 상담',
    desc: '직접 오기 힘든 상황인데 법률 도움이 필요하신가요? 카카오톡으로 간편하게 비대면 상담을 받으실 수 있습니다.',
    icon: '💬',
    label: 'Kakaotalk',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    href: 'https://pf.kakao.com'
  },
  {
    title: '실시간 온라인 상담',
    desc: '20년간 다수의 경험을 축적한 사건별 전문 변호사가 뛰어난 사건 분석 능력을 바탕으로 최선의 해결책을 제시합니다.',
    icon: '✒️',
    label: 'COUNSELING',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    href: '/consult'
  },
  {
    title: '전화, 방문 상담',
    desc: '방문을 하실 때 사건과 관련된 서류나 증거 등을 가지고 오시면 보다 정확한 법률상담이 가능합니다.',
    icon: '📍',
    label: 'VISIT',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80',
    href: '/about/location'
  }
];

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.grid}>
          {ctaItems.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImg}
                />
                <div className={styles.overlay}>
                  <div className={styles.iconBox}>
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.iconLabel}>{item.label}</span>
                  </div>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.desc}</p>
                <div className={styles.footer}>
                  <Link href={item.href} className={styles.moreBtn}>
                    자세히보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
