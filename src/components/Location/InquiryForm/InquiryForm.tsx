"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone1: '',
    phone2: '',
    phone3: '',
    availableTime: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    
    if (!formData.name || !formData.phone1 || !formData.phone2 || !formData.phone3 || !formData.details) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment variables.');
      }
      const { error } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          phone: phone,
          case_type: formData.availableTime, // Repurposing case_type for availableTime for now
          details: formData.details
        }]);

      if (error) throw error;
      alert('상담 신청이 완료되었습니다. 확인 후 곧 연락드리겠습니다.');
      setFormData({ name: '', phone1: '', phone2: '', phone3: '', availableTime: '', details: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('신청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <h2 className={styles.title}>상담문의</h2>
          <p className={styles.subtitle}>"계약서 한장으로 무너진 일상, 되찾아드리겠습니다"</p>
          <div className={styles.notice}>
            <p>남겨주신 내용은 철저히 비밀보장됩니다.<br/>
            담당 직원 및 변호사가 검토 후 회신드리겠습니다.<br/>
            회신은 <strong>02-517-8300</strong>으로 드리오니 참고부탁드립니다.</p>
          </div>
        </div>
        
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
              <label>성함 <span className={styles.req}>*</span></label>
              <input 
                type="text" 
                name="name"
                className={styles.inputFull} 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>연락처 <span className={styles.req}>*</span></label>
              <div className={styles.phoneInputs}>
                <input 
                  type="text" 
                  name="phone1"
                  maxLength={3}
                  className={styles.inputPhone} 
                  required 
                  value={formData.phone1}
                  onChange={handleChange}
                />
                <span className={styles.dash}>-</span>
                <input 
                  type="text" 
                  name="phone2"
                  maxLength={4}
                  className={styles.inputPhone} 
                  required 
                  value={formData.phone2}
                  onChange={handleChange}
                />
                <span className={styles.dash}>-</span>
                <input 
                  type="text" 
                  name="phone3"
                  maxLength={4}
                  className={styles.inputPhone} 
                  required 
                  value={formData.phone3}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>연락 가능한 시간</label>
              <input 
                type="text" 
                name="availableTime"
                className={styles.inputFull} 
                value={formData.availableTime}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>상담내용 <span className={styles.req}>*</span></label>
              <textarea 
                name="details"
                className={styles.textarea}
                required
                value={formData.details}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>파일 첨부</label>
              <div className={styles.fileUpload}>
                <button type="button" className={styles.fileBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  파일 올리기
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>개인정보 제3자 제공 동의 <span className={styles.req}>*</span></label>
              <div className={styles.termsBox}>
                <p>다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
                <p>1. 개인정보를 제공받는 자: 법무법인 일신 강남분사무소<br/>
                2. 제공받는 자의 개인정보 이용 목적: 법률 상담 및 관련 안내<br/>
                3. 제공하는 개인정보 항목: 이름, 연락처, 상담내용<br/>
                4. 제공받는 자의 보유 및 이용 기간: 상담 종료 후 1년</p>
              </div>
            </div>

            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? '제출 중...' : '상담 신청하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
