import React from 'react';
import styles from './PartnersDetail.module.css';

const partners = [
  { name: '부산대학교', desc: '경상권 고객 인적 네트워크망을 활용 기업 법무 자문 제공' },
  { name: '대교', desc: '국내 대표 교육기업 교원의 계약 관련 장기 법률 자문' },
  { name: '중소벤처기업진흥공단', desc: '산업통상부 무역위원회 행정사건 대응 관련 법률자문' },
  { name: 'KSA 한국표준협회', desc: '글로벌 표준·품질 전문기관 KSA의 사업 수행 법률자문' },
  { name: 'HRDK 한국산업인력공단', desc: '한국산업인력공단과 중대재해처벌법 관련 자문 협력' },
  { name: '한국남부발전(주)', desc: '한국남부발전과 중대재해 공동 대응 법률자문 및 MOU' },
  { name: 'megastudy', desc: '교육 브랜드평판 1위 메가스터디와 법률 지원 MOU' },
  { name: '금호고속', desc: '여객 운송 기업 금호고속과 서비스 운영 법률자문 MOU' },
  { name: 'KNN', desc: '부산경남대표방송 KNN과 기업 경영 법률자문 및 MOU' },
  { name: 'YINGKE', desc: '글로벌 200대 로펌인 중국 잉커로펌과 국제 협력 협약 MOU' }
];

const PartnersDetail = () => {
  return (
    <section className="section" style={{ background: '#fcfcfc' }}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.headerColumn}>
            <h2 className={styles.title}>업무협력·법률자문 기업</h2>
            <button className={styles.moreBtn}>업무협약·법률자문 기업 더보기 →</button>
          </div>
          <div className={styles.listColumn}>
            <div className={styles.partnerGrid}>
              {partners.map((partner, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.logoPlaceholder}>{partner.name}</div>
                  <div className={styles.info}>
                    <h4 className={styles.partnerName}>{partner.name}</h4>
                    <p className={styles.partnerDesc}>{partner.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersDetail;
