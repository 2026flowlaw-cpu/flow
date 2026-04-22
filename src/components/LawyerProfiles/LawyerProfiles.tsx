import React from 'react';
import fs from 'fs';
import path from 'path';
import styles from './LawyerProfiles.module.css';
import LawyerCarousel from './LawyerCarousel';

const LawyerProfiles = async () => {
  // Read all lawyers for the carousel
  const DATA_PATH = path.join(process.cwd(), 'src/data/lawyers.json');
  let lawyers = [];
  try {
    const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
    const allLawyers = JSON.parse(jsonData);
    // Optimize data sent to Client Component by removing massive history/activities/blog fields
    lawyers = allLawyers.map((l: any) => ({
      id: l.id,
      slug: l.slug,
      name: l.name,
      title: l.title,
      image: l.image,
      experience: l.experience ? [l.experience[0]] : []
    }));
  } catch (error) {
    console.error('Failed to load lawyers for homepage carousel:', error);
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>변호사 <span className="accent-text">소개</span></h2>
          <p className={styles.sectionSubtitle}>각 분야의 전문 지식과 풍부한 경험을 갖춘 변호사들이 당신의 곁에 있습니다.</p>
        </div>
        
        <LawyerCarousel lawyers={lawyers} />
      </div>
    </section>
  );
};

export default LawyerProfiles;
