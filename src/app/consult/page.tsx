"use client";

import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import styles from './ConsultPage.module.css';

const ConsultPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    case_type: '',
    location: '',
    details: '',
    appointment_time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment variables.');
      }
      const { error } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          case_type: formData.case_type,
          location: formData.location,
          details: formData.details,
          appointment_time: formData.appointment_time
        }]);

      if (error) throw error;
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting consultation:', error);
      alert('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.consultPage}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Professional Legal Shield</span>
          <h1 className={styles.heroTitle}>신속한 법률 지원,<br />변호사와 바로 연결됩니다.</h1>
          <p className={styles.heroDescription}>
            하자소송의 정밀한 분석부터 전략적 대응까지, 법무법인 일신이 
            귀하의 권리를 단단하게 보호합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className={`${styles.contentSection} container`}>
        <div className={styles.grid}>
          
          {/* Form Column */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                상담 신청서
              </h2>
            </div>

            {isSubmitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>희망 상담 시간</label>
                    <input name="appointment_time" type="text" className={styles.input} placeholder="예: 평일 오후 2시 이후" onChange={handleInputChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>증거 자료 업로드</label>
                    <div className={styles.fileInputWrapper}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span style={{ fontSize: '14px', color: '#666' }}>상담 시 자료 지참 바랍니다.</span>
                    </div>
                  </div>
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} required />
                    <span>
                      개인정보 수집 및 이용 동의 (필수)
                      <br />
                      <small style={{ opacity: 0.8, display: 'block', marginTop: '4px' }}>
                        법무법인 일신은 전문적인 법률 상담 서비스를 제공하기 위해 성함, 연락처 등 필수 개인정보를 수집합니다.
                      </small>
                    </span>
                  </label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? '신청 중...' : 'Request Expert Consultation'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className={styles.sidebar}>
            
            {/* Contact Info Card */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Info</h3>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Direct Line</p>
                  <p className={styles.infoText}>02-123-4567</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Office Address</p>
                  <p className={styles.infoText}>서울특별시 서초구 서초대로 314<br />법조타워 12층</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoText}>contact@lawilshin.com</p>
                </div>
              </div>
            </div>

            {/* Kakao Button */}
            <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className={styles.kakaoBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.02944 3 3 6.13401 3 10C3 12.4815 4.65431 14.6521 7.15175 15.9189L6.15175 19.4189C6.05175 19.7689 6.45175 20.0689 6.75175 19.8689L10.9518 16.7189C11.2918 16.8989 11.6418 17 12 17C16.9706 17 21 13.866 21 10C21 6.13401 16.9706 3 12 3Z" />
              </svg>
              카카오톡 실시간 상담
            </a>

            {/* Branding Card */}
            <div className={styles.brandDescCard}>
              <div className={styles.brandIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4 className={styles.brandTitle}>Architectural Anchor</h4>
              <p className={styles.brandText}>
                단순한 변호를 넘어, 건축 구조와 하자의 본질을 꿰뚫어 봅니다. 
                일신는 건물의 생애주기를 이해하는 법률가들이 모여, 흔들리지 않는 권리의 기준을 제시합니다.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className={styles.mapCard}>
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=map&backgroundColor=eeeeee" alt="Map Placeholder" className={styles.mapPlaceholder} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 600, color: '#999' }}>
                MAP VIEW PREVIEW
              </div>
            </div>

          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsultPage;
