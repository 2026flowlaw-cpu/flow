"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    referral: '유튜브',
    caseTypes: [] as string[],
    email: '',
    location: '',
    availableTime: '',
    details: '',
    agree: false
  });

  const availableCases = [
    { id: 'haja', label: '아파트 하자소송' },
    { id: 'jujot', label: '지역주택조합 부당이득 반환' },
    { id: 'redev', label: '재개발 / 재건축 분쟁' },
    { id: 'profit', label: '수익형 부동산 | 지식산업센터 등' },
    { id: 'construct', label: '건설 분쟁 / 자문' },
    { id: 'estate', label: '기타 부동산 | 임대차 분쟁 등' },
    { id: 'cancel', label: '분양계약 해제 집단소송' },
    { id: 'etc', label: '기타 일반 법률 분쟁' }
  ];

  const referrals = ['유튜브', '블로그', '직접검색', '기존고객', '지인소개', '기타'];

  const handleCheckboxChange = (label: string) => {
    setFormData(prev => {
      const alreadySelected = prev.caseTypes.includes(label);
      if (alreadySelected) {
        return { ...prev, caseTypes: prev.caseTypes.filter(x => x !== label) };
      } else {
        return { ...prev, caseTypes: [...prev.caseTypes, label] };
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (val: string) => {
    setFormData(prev => ({ ...prev, referral: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullPhone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    if (!formData.name || !formData.phone2 || !formData.phone3) {
      alert('성함과 연락처를 모두 입력해 주세요.');
      return;
    }

    if (!formData.agree) {
      alert('개인정보 수집 및 이용동의에 체크해 주세요.');
      return;
    }

    setLoading(true);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized.');
      }

      // Bundle all inputs cleanly to details
      const detailsText = [
        `[유입 경로] ${formData.referral}`,
        `[상담 분야] ${formData.caseTypes.join(', ') || '선택 없음'}`,
        `[이메일 주소] ${formData.email || '미기재'}`,
        `[부동산 명칭/위치] ${formData.location || '미기재'}`,
        `[희망 상담 시간] ${formData.availableTime || '미기재'}`,
        `[파일 첨부 여부] ${file ? file.name : '없음'}`,
        formData.details ? `\n[상세 내용]\n${formData.details}` : ''
      ].filter(Boolean).join('\n');

      const { error } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          phone: fullPhone,
          case_type: formData.caseTypes[0] || '기타',
          details: detailsText
        }]);

      if (error) throw error;
      alert('상담 접수가 안전하게 완료되었습니다. 법무법인 플로우 집단소송 TF팀이 신속히 회신해 드리겠습니다.');
      setFormData({
        name: '',
        phone1: '010',
        phone2: '',
        phone3: '',
        referral: '유튜브',
        caseTypes: [],
        email: '',
        location: '',
        availableTime: '',
        details: '',
        agree: false
      });
      setFile(null);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Main Minimalist Header */}
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>집단소송 상담</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            법무법인 플로우는 <strong>고도화된 전문성</strong>을 바탕으로 의뢰인을 위한 <strong>최적의 법률서비스</strong>를 제공합니다.
          </p>
        </div>

        {/* Bullet guidelines */}
        <div className={styles.bulletList}>
          <div className={styles.bulletItem}>
            <span className={styles.bulletDot}>•</span>
            <p>각종 집단 법률분쟁(10인 이상)에 대해 법무법인 플로우 변호사가 전문적인 상담을 해드립니다.</p>
          </div>
          <div className={styles.bulletItem}>
            <span className={styles.bulletDot}>•</span>
            <p>시간 상담에 따른 비용은 사안의 성격, 난이도, 복잡성, 공익성 등을 감안하여 무상 또는 유상으로 진행됩니다.</p>
          </div>
          <div className={styles.bulletItem}>
            <span className={styles.bulletDot}>•</span>
            <p>상담은 방문상담 혹은 원격영상상담으로 진행됩니다.</p>
          </div>
        </div>

        {/* 4-Step Circle Process Map */}
        <div className={styles.processWrapper}>
          
          {/* Step 1 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.blueDash1}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>온라인 상담 신청</span>
          </div>

          {/* Chevron */}
          <div className={styles.chevron}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
          </div>

          {/* Step 2 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.navyDash}`}>
              <div className={styles.innerBadge}>24h</div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>당일 영업시간 내<br/>유선상담 진행</span>
          </div>

          {/* Chevron */}
          <div className={styles.chevron}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
          </div>

          {/* Step 3 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.blueDash2}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>방문상담 또는<br/>원격영상상담 예약</span>
          </div>

          {/* Chevron */}
          <div className={styles.chevron}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
          </div>

          {/* Step 4 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.goldDash}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>변호사 3인과 기타 전문가 등<br/>팀 단위로 사건 처리</span>
          </div>

        </div>

        {/* Minimalist Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRequiredNotice}>* 표시는 필수 입력 항목입니다.</div>
          
          {/* Row 1: 성함 & 연락처 */}
          <div className={styles.formRowInline}>
            
            <div className={styles.formGroupInline}>
              <label className={styles.labelInline}>
                성함<span className={styles.req}>*</span>
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className={styles.textInput} 
                required 
              />
            </div>

            <div className={styles.formGroupInline}>
              <label className={styles.labelInline}>
                연락처<span className={styles.req}>*</span>
              </label>
              <div className={styles.phoneGroup}>
                <input 
                  type="text" 
                  name="phone1" 
                  maxLength={3} 
                  value={formData.phone1} 
                  onChange={handleInputChange} 
                  className={styles.phoneInput} 
                  required 
                />
                <span className={styles.dash}>-</span>
                <input 
                  type="text" 
                  name="phone2" 
                  maxLength={4} 
                  value={formData.phone2} 
                  onChange={handleInputChange} 
                  className={styles.phoneInput} 
                  required 
                />
                <span className={styles.dash}>-</span>
                <input 
                  type="text" 
                  name="phone3" 
                  maxLength={4} 
                  value={formData.phone3} 
                  onChange={handleInputChange} 
                  className={styles.phoneInput} 
                  required 
                />
              </div>
            </div>

          </div>

          {/* Row 2: 유입 경로 Radio Buttons */}
          <div className={styles.formGroupLine}>
            <label className={styles.sectionLabelInline}>
              유입경로<span className={styles.req}>*</span>
            </label>
            <div className={styles.radioGroup}>
              {referrals.map((ref) => (
                <label key={ref} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="referral" 
                    value={ref} 
                    checked={formData.referral === ref} 
                    onChange={() => handleRadioChange(ref)} 
                    className={styles.radioInput} 
                  />
                  <span className={styles.customRadio}></span>
                  <span className={styles.radioText}>{ref}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 3: 상담 분야 Grid of Checkboxes */}
          <div className={styles.formGroupCheckboxSection}>
            <h4 className={styles.checkboxSectionTitle}>상담 분야</h4>
            <div className={styles.checkboxGrid}>
              {availableCases.map((item) => {
                const isSelected = formData.caseTypes.includes(item.label);
                return (
                  <label key={item.id} className={`${styles.checkboxLabelCard} ${isSelected ? styles.checkedCard : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={isSelected} 
                      onChange={() => handleCheckboxChange(item.label)} 
                      className={styles.hiddenCheckbox} 
                    />
                    <div className={styles.customCheckIcon}>
                      {isSelected ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <span className={styles.checkboxText}>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Row 4: Extra fields (Email, Location, availableTime) presented in high-end minimalist styling */}
          <div className={styles.extraFieldsRow}>
            <div className={styles.formGroupInline}>
              <label className={styles.labelInline}>이메일 주소</label>
              <input 
                type="email" 
                name="email" 
                placeholder="example@flowlaw.co.kr"
                value={formData.email} 
                onChange={handleInputChange} 
                className={styles.textInput} 
              />
            </div>
            <div className={styles.formGroupInline}>
              <label className={styles.labelInline}>부동산 명칭/위치</label>
              <input 
                type="text" 
                name="location" 
                placeholder="소재지 또는 건물명"
                value={formData.location} 
                onChange={handleInputChange} 
                className={styles.textInput} 
              />
            </div>
            <div className={styles.formGroupInline}>
              <label className={styles.labelInline}>희망 상담 시간</label>
              <input 
                type="text" 
                name="availableTime" 
                placeholder="예: 평일 오후 2시 이후"
                value={formData.availableTime} 
                onChange={handleInputChange} 
                className={styles.textInput} 
              />
            </div>
          </div>

          {/* Row 5: 상세 내용 */}
          <div className={styles.formGroupLine}>
            <label className={styles.sectionLabelInline}>상세 상담 내용</label>
            <textarea 
              name="details" 
              placeholder="사건 경위나 분쟁 사실을 가능한 상세하게 작성해 주시면 더욱 신속하고 명확한 법리 진단이 가능합니다."
              value={formData.details} 
              onChange={handleInputChange} 
              className={styles.textarea} 
            />
          </div>

          {/* Row 6: File attachment */}
          <div className={styles.formGroupLine}>
            <label className={styles.sectionLabelInline}>증거 자료 / 파일 첨부</label>
            <div className={styles.fileBox}>
              <input 
                type="file" 
                id="minimalist-file" 
                onChange={handleFileChange} 
                className={styles.hiddenFileInput} 
              />
              <label htmlFor="minimalist-file" className={styles.fileTriggerBtn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
                {file ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)` : '상담용 입증 문서 및 파일 올리기'}
              </label>
            </div>
          </div>

          {/* Row 7: Consent Checkbox */}
          <div className={styles.consentBox}>
            <label className={styles.consentLabel}>
              <input 
                type="checkbox" 
                checked={formData.agree} 
                onChange={(e) => setFormData(prev => ({ ...prev, agree: e.target.checked }))} 
                className={styles.checkbox} 
              />
              <span className={styles.consentText}>
                개인정보 수집 및 이용에 동의합니다. <span className={styles.req}>*</span>
              </span>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('개인정보 제공받는자: 법무법인 플로우\n이용목적: 법률 상담 및 소송 대리 신청 관리\n보유기간: 상담 완료 후 1년 또는 파기 요청시까지'); }} className={styles.viewDetailsLink}>
                [자세히 보기]
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className={styles.submitWrapper}>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? '신청서 제출 중...' : '상담 신청하기'}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default InquiryForm;
