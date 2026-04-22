import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    title: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처는 필수 입력 항목입니다.');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          case_type: formData.title,
          details: formData.details
        }]);

      if (error) throw error;
      alert('상담 신청이 완료되었습니다. 확인 후 곧 연락드리겠습니다.');
      setFormData({ name: '', phone: '', title: '', details: '' });
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
    <section className={styles.inquiry}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            법무법인 일신이<br />
            함께 하겠습니다
          </h2>
          <div className={styles.socials}>
            <div className={styles.socialItem}>
              <div className={styles.icon}>📞</div>
            </div>
            <div className={styles.socialItem}>
              <div className={styles.icon}>💬</div>
            </div>
            <div className={styles.socialItem}>
              <div className={styles.icon}>📍</div>
            </div>
          </div>
        </div>
        
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input 
                type="text" 
                name="name"
                placeholder="성함" 
                className={styles.input} 
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <input 
                type="text" 
                name="phone"
                placeholder="연락처" 
                className={styles.input} 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <input 
              type="text" 
              name="title"
              placeholder="제목 (사건 유형)" 
              className={styles.input} 
              value={formData.title}
              onChange={handleChange}
            />
            <textarea 
              name="details"
              placeholder="내용" 
              className={styles.textarea}
              value={formData.details}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? '신청 중...' : '상담신청'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
