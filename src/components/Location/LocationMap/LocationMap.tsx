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
              <span className={styles.label}>🚗 차량 이용 시</span>
              <p className={styles.address}>
                서울특별시 강남구 영동대로 617(삼성동, 찬이빌딩) 6~8층<br />
                <span className={styles.phone}>T. 02-517-8300</span>
              </p>
            </div>

            {/* By Public Transport */}
            <div className={styles.transportHeader}>
              <span className={styles.label}>🏓 대중교통 이용 시</span>
            </div>

            <div className={styles.transportList}>
              {/* Subway */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>🚇</div>
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
                <div className={styles.iconBox}>🚌</div>
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
