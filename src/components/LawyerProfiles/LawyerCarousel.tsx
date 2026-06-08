"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LawyerProfiles.module.css';

interface LawyerCarouselProps {
  lawyers: any[];
}

const LawyerCarousel = ({ lawyers }: LawyerCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (scrollArea) scrollArea.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [lawyers]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.carouselContainer}>
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={() => scroll('left')}
        style={{ display: showLeftArrow ? 'flex' : 'none' }}
        aria-label="Previous"
      >
        <span>&larr;</span>
      </button>

      <div className={styles.scrollArea} ref={scrollRef}>
        {lawyers.map((lawyer, index) => (
          <div key={lawyer.id || index} className={styles.cardWrapper}>
            <Link
              href={`/lawyers/profiles/${lawyer.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={lawyer.image || '/images/lawyer1.webp'}
                  alt={lawyer.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.title}>{lawyer.title}</p>
                <h4 className={styles.name}>{lawyer.name} 변호사</h4>
                <p className={styles.specialty}>
                  {lawyer.experience && lawyer.experience[0]}
                </p>
                <div className={styles.detailBtn}>프로필 자세히 보기</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={() => scroll('right')}
        style={{ display: showRightArrow ? 'flex' : 'none' }}
        aria-label="Next"
      >
        <span>&rarr;</span>
      </button>
    </div>
  );
};

export default LawyerCarousel;
