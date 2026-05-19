"use client";

import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function ConsultPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처는 필수 입력 사항입니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // 구글 태그관리자(GTM) 맞춤 이벤트 전송
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'consultation_submit',
            caseType: formData.case_type || 'unspecified'
          });
        }
        alert('상담 신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          case_type: '',
          location: '',
          details: '',
          appointment_time: ''
        });
      } else {
        const errorData = await res.json();
        alert(`신청 실패: ${errorData.error || '잠시 후 다시 시도해 주세요.'}`);
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Banner Section */}
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <p className={styles.heroTag}>PROFESSIONAL LEGAL SHIELD</p>
            <h1>신속한 법률 지원,<br />변호사와 바로 연결됩니다.</h1>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h2>상담 신청서</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>의뢰인 성함</label>
                  <input 
                    type="text" 
                    placeholder="성함을 입력하세요" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>연락처</label>
                  <input 
                    type="tel" 
                    placeholder="010-0000-0000" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>이메일 주소</label>
                <input 
                  type="email" 
                  placeholder="example@ilshin.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>사건 유형</label>
                  <select 
                    value={formData.case_type}
                    onChange={(e) => setFormData({...formData, case_type: e.target.value})}
                  >
                    <option value="">사건 유형을 선택하세요</option>
                    <option value="아파트 하자">아파트 하자</option>
                    <option value="부동산 분쟁">부동산 분쟁</option>
                    <option value="손해배상">손해배상</option>
                    <option value="전세사기">전세사기</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>부동산 명칭/위치</label>
                  <input 
                    type="text" 
                    placeholder="소재지 또는 건물명" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>상세 내용</label>
                <textarea 
                  rows={5} 
                  placeholder="사건에 대한 상세한 내용을 기재해 주세요."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                ></textarea>
              </div>

              <div className={styles.inputGroup}>
                <label>희망 상담 시간</label>
                <input 
                  type="text" 
                  placeholder="예: 평일 오후 2시 이후" 
                  value={formData.appointment_time}
                  onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
              >
                {isSubmitting ? '전송 중...' : '상담 신청하기'}
              </button>
            </form>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3>Contact Info</h3>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <label>DIRECT LINE</label>
                  <p>02-123-4567</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <label>OFFICE ADDRESS</label>
                  <p>서울특별시 서초구 서초대로 314 법조타워 12층</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>✉️</div>
                <div>
                  <label>EMAIL</label>
                  <p>contact@lawilshin.com</p>
                </div>
              </div>
            </div>

            <a 
              href="https://pf.kakao.com/..." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.kakaoBtn}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({ event: 'kakao_consult_click' });
                }
              }}
            >
              <span className={styles.kakaoIcon}>💬</span> 카카오톡 실시간 상담
            </a>
          </aside>
        </div>
      </main>
    </div>
  );
}
