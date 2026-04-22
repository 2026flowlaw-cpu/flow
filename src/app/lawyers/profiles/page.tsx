import React from 'react';
import fs from 'fs';
import path from 'path';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default async function LawyersPage() {
  // Read data directly on the server
  const DATA_PATH = path.join(process.cwd(), 'src/data/lawyers.json');
  let lawyers = [];
  try {
    const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
    const allLawyers = JSON.parse(jsonData);
    // Use summary data for the listing
    lawyers = allLawyers.map((l: any) => ({
      id: l.id,
      slug: l.slug,
      name: l.name,
      title: l.title,
      image: l.image,
      experience: l.experience ? l.experience.slice(0, 3) : []
    }));
  } catch (error) {
    console.error('Failed to load lawyers on server:', error);
  }

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Title Section */}
        <section className={styles.titleSection}>
          <div className="container">
            <h1 className={styles.pageTitle}>하자 소송 변호사</h1>
          </div>
        </section>

        {/* Lawyer Grid Section */}
        <section className="section">
          <div className="container">
            <div className={styles.lawyerGrid}>
              {lawyers.map((lawyer) => (
                <Link 
                  key={lawyer.id} 
                  href={`/lawyers/profiles/${lawyer.slug}`} 
                  className={styles.lawyerCard}
                >
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={lawyer.image || '/images/lawyer1.png'} 
                      alt={lawyer.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.lawyerInfo}>
                    <div className={styles.nameRow}>
                      <span className={styles.lawyerName}>{lawyer.name}</span>
                      <span className={styles.lawyerTitle}>{lawyer.title}</span>
                    </div>
                    <ul className={styles.experienceList}>
                      {lawyer.experience && lawyer.experience.map((exp: string, idx: number) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Section */}
        <section className={styles.inquirySection}>
          <div className="container">
            <div className={styles.inquiryGrid}>
              <div className={styles.inquiryText}>
                <h2 className={styles.inquiryTitle}>법무법인 일신이<br />함께 하겠습니다</h2>
                <div className={styles.snsIcons}>
                  <div className={styles.iconCircle}>📱</div>
                  <div className={styles.iconCircle}>💬</div>
                  <div className={styles.iconCircle}>📞</div>
                </div>
              </div>
              <div className={styles.inquiryForm}>
                <div className={styles.formRow}>
                  <input type="text" placeholder="성함" className={styles.input} />
                  <input type="text" placeholder="연락처" className={styles.input} />
                </div>
                <div className={styles.formRow}>
                  <input type="text" placeholder="지역" className={styles.input} />
                </div>
                <div className={styles.formRow}>
                  <input type="text" placeholder="내용" className={styles.input} />
                </div>
                <button className={styles.submitBtn}>상담신청</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
