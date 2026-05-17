import React from 'react';
import styles from './LocationMap.module.css';

const LocationMap = () => {
  return (
    <section className={styles.mapSection}>
      {/* Sleek, luxury top boundary divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerBadge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>COURT & DIRECTIONS</span>
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Left: Interactive Map */}
          <div className={styles.mapWrapper}>
            <iframe 
              src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%98%81%EB%8F%99%EB%8C%80%EB%A1%9C%20617&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right: Transportation Info */}
          <div className={styles.info}>
            
            {/* 1. By Car Card (차량 이용 시) - Distinct Golden Accent Card */}
            <div className={styles.addressBox}>
              <div className={styles.titleWithIcon}>
                <div className={styles.carIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 12h14" />
                  </svg>
                </div>
                <span className={styles.label}>차량 이용 시</span>
              </div>
              <div className={styles.carDetails}>
                <p className={styles.address}>
                  서울특별시 강남구 영동대로 617<br />
                  <span className={styles.buildingName}>(삼성동, 찬이빌딩) 6~8층</span>
                </p>
                <div className={styles.phoneBox}>
                  <span className={styles.phoneLabel}>대표전화</span>
                  <a href="tel:02-517-8300" className={styles.phoneLink}>02-517-8300</a>
                </div>
              </div>
              <div className={styles.mapButtons}>
                <a href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%98%81%EB%8F%99%EB%8C%80%EB%A1%9C%20617" target="_blank" rel="noopener noreferrer" className={styles.mapBtn}>
                  네이버 지도 열기 ➔
                </a>
              </div>
            </div>

            {/* 2. Subway Card (지하철) - Beautiful Timeline Styled Card */}
            <div className={styles.subwayCard}>
              <div className={styles.titleWithIcon}>
                <div className={styles.subwayIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="16" rx="2" />
                    <path d="M4 11h16" />
                    <path d="M12 3v8" />
                    <path d="m8 19-2 3" />
                    <path d="m16 19 2 3" />
                    <circle cx="8" cy="15" r="1" />
                    <circle cx="16" cy="15" r="1" />
                  </svg>
                </div>
                <strong className={styles.trLabel}>지하철 이용 시</strong>
              </div>

              {/* Vertical Visual Timeline */}
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles.bgLine9}`}></div>
                  <div className={styles.timelineContent}>
                    <span className={styles.subwayBadgeLine9}>9호선 봉은사역</span>
                    <span className={styles.timelineDesc}>2번출구 직진 약 1분</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles.bgLine7}`}></div>
                  <div className={styles.timelineContent}>
                    <span className={styles.subwayBadgeLine7}>7호선 청담역</span>
                    <span className={styles.timelineDesc}>2번출구 직진 약 10분</span>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles.bgLine2}`}></div>
                  <div className={styles.timelineContent}>
                    <span className={styles.subwayBadgeLine2}>2호선 삼성역</span>
                    <span className={styles.timelineDesc}>6번출구 직진 약 15분</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Bus Card (버스) - Grid Badges Layout Card */}
            <div className={styles.busCard}>
              <div className={styles.titleWithIcon}>
                <div className={styles.busIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="16" rx="2" />
                    <path d="M4 11h16" />
                    <path d="M8 3v8" />
                    <path d="M16 3v8" />
                    <path d="m6 19-1 2" />
                    <path d="m18 19 1 2" />
                    <circle cx="7" cy="15" r="1" />
                    <circle cx="17" cy="15" r="1" />
                  </svg>
                </div>
                <strong className={styles.trLabel}>버스 이용 시</strong>
              </div>
              <p className={styles.busStation}>봉은사. 삼성1파출소 앞 하차</p>

              <div className={styles.busRoutes}>
                <div className={styles.routeGroup}>
                  <span className={styles.busBlue}>간선</span>
                  <div className={styles.busPills}>
                    <span>145</span><span>146</span><span>301</span><span>362</span><span>401</span>
                  </div>
                </div>
                <div className={styles.routeGroup}>
                  <span className={styles.busGreen}>지선</span>
                  <div className={styles.busPills}>
                    <span>2413</span><span>2415</span><span>3217</span><span>3414</span><span>4318</span>
                  </div>
                </div>
                <div className={styles.routeGroup}>
                  <span className={styles.busRed}>직행</span>
                  <div className={styles.busPills}>
                    <span>9407</span><span>9507</span><span>9607</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
