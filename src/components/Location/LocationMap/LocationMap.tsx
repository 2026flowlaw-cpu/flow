import React from 'react';
import styles from './LocationMap.module.css';

const LocationMap = () => {
  return (
    <section className={styles.mapSection}>
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
            {/* By Car */}
            <div className={styles.addressBox}>
              <div className={styles.titleWithIcon}>
                <div className={styles.iconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 12h14" />
                  </svg>
                </div>
                <span className={styles.label}>차량 이용 시</span>
              </div>
              <p className={styles.address}>
                서울특별시 강남구 영동대로 617(삼성동, 찬이빌딩) 6~8층<br />
                <span className={styles.phone}>T. 02-517-8300</span>
              </p>
            </div>

            {/* By Public Transport */}
            <div className={styles.transportList}>
              {/* Subway */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>
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
                <div className={styles.details}>
                  <strong className={styles.trLabel}>지하철</strong>
                  <p>
                    <span className={styles.subwayLine9}>9호선 봉은사역</span> 2번출구 직진 약 1분<br />
                    <span className={styles.subwayLine7}>7호선 청담역</span> 2번출구 직진 약 10분<br />
                    <span className={styles.subwayLine2}>2호선 삼성역</span> 6번출구 직진 약 15분
                  </p>
                </div>
              </div>

              {/* Bus */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>
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
                <div className={styles.details}>
                  <strong className={styles.trLabel}>버스 (봉은사. 삼성1파출소 앞 하차)</strong>
                  <p>
                    <span className={styles.busBlue}>간선</span> 145, 146, 301, 362, 401<br />
                    <span className={styles.busGreen}>지선</span> 2413, 2415, 3217, 3414, 4318<br />
                    <span className={styles.busRed}>직행</span> 9407, 9507, 9607
                  </p>
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
