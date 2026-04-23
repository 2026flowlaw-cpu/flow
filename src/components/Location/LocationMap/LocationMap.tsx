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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.7891461937965!2d127.01188377757917!3d37.49520847201884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca13e73549221%3A0x7d6f5f308ce0f62d!2z7ISc7LSI7JetIDfcontentID!5e0!3m2!1sko!2skr!4v1712999999999!5m2!1sko!2skr" 
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
            <div className={styles.addressBox}>
              <span className={styles.label}>주소</span>
              <p className={styles.address}>서울특별시 서초구 서초중앙로 125, 로이어즈타워 10층 (법무법인 플로우)</p>
            </div>

            <div className={styles.transportList}>
              {/* Subway */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>🚉</div>
                <div className={styles.details}>
                  <strong className={styles.trLabel}>지하철 이용 시</strong>
                  <p>
                    <span className={styles.line2}>2호선 서초역</span> 7번 출구 (도보 3분)<br />
                    <span className={styles.line3}>3호선 교대역</span> 14번 출구 (도보 5분)
                  </p>
                </div>
              </div>

              {/* Bus */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>🚌</div>
                <div className={styles.details}>
                  <strong className={styles.trLabel}>버스 이용 시</strong>
                  <p>
                    <strong>서초역/교대역 정류장</strong> 하차<br />
                    - 간선: 405, 740, N37<br />
                    - 지선: 3012, 5413<br />
                    - 마을: 서초03, 서초10, 서초11
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className={styles.transportItem}>
                <div className={styles.iconBox}>🅿️</div>
                <div className={styles.details}>
                  <strong className={styles.trLabel}>주차 안내</strong>
                  <p>건물 내 기계식 주차 가능 (SUV/대형차는 인근 서초동 공영주차장 이용 권장)</p>
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
