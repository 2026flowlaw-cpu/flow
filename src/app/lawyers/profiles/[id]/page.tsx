import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LawyerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  
  const DATA_PATH = path.join(process.cwd(), 'src/data/lawyers.json');
  const jsonData = fs.readFileSync(DATA_PATH, 'utf8');
  const lawyers = JSON.parse(jsonData);
  
  const lawyer = lawyers.find((l: any) => l.slug === decodedId);

  if (!lawyer) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Top Profile Section */}
        <section className={styles.profileSection}>
          <div className="container">
            <div className={styles.profileGrid}>
              <div className={styles.largeImageWrapper}>
                <Image 
                  src={lawyer.image} 
                  alt={lawyer.name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className={styles.profileBasicInfo}>
                <div className={styles.nameHeader}>
                  <h1 className={styles.name}>{lawyer.name}</h1>
                  <span className={styles.title}>{lawyer.title}</span>
                </div>
                <div className={styles.mainExperience}>
                  {lawyer.experience.map((exp: string, idx: number) => (
                    <p key={idx} className={styles.expLine}>{exp}</p>
                  ))}
                </div>
                
                <div className={styles.detailLists}>
                  <div className={styles.listSection}>
                    <h2 className={styles.listTitle}>약력</h2>
                    <ul className={styles.list}>
                      {lawyer.history.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.listSection}>
                    <h2 className={styles.listTitle}>학력 및 주요활동</h2>
                    <ul className={styles.list}>
                      {lawyer.activities.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Case Blogs */}
        {lawyer.blogs.length > 0 && (
          <section className={styles.blogSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>관련된 사건 블로그</h2>
              <div className={styles.blogGrid}>
                {lawyer.blogs.map((blog: any, idx: number) => (
                  <div key={idx} className={styles.blogCard}>
                    <div className={styles.blogContent}>
                      <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                      <p className={styles.blogCardText}>{blog.content}</p>
                      <div className={styles.blogAuthor}>
                        <div className={styles.authorThumb}>
                          <Image 
                            src={blog.image} 
                            alt={lawyer.name} 
                            fill 
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <InquiryForm />
      </main>

      <Footer />
    </div>
  );
}
