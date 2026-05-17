"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    caseType: '',
    location: '',
    availableTime: '',
    details: '',
    agree: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.details) {
      alert('성함, 연락처, 상세내용은 필수 입력 항목입니다.');
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

      // Safeguarded insertion that bundles extra fields in details
      const fullDetails = [
        `[이메일 주소] ${formData.email || '미기재'}`,
        `[부동산 명칭/위치] ${formData.location || '미기재'}`,
        `[연락 가능 시간] ${formData.availableTime || '미기재'}`,
        formData.details ? `\n[상세 내용]\n${formData.details}` : ''
      ].filter(Boolean).join('\n');

      const { error } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          case_type: formData.caseType || '기타',
          details: fullDetails
        }]);

      if (error) throw error;
      alert('상담 신청이 완료되었습니다. 플로우 전담 TF팀에서 신속하게 검토 후 회신해 드리겠습니다.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        caseType: '',
        location: '',
        availableTime: '',
        details: '',
        agree: false
      });
      setFile(null);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agree: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className={styles.section} id="inquiry">
      <div className={styles.container}>
        
        {/* Top Header Text & Slogans (Large and Prominent as requested!) */}
        <div className={styles.topBannerText}>
          <span className={styles.topInfoTag}>법무법인 플로우 상담신청</span>
          <h2 className={styles.sloganTitle}>
            <span className={styles.sloganRed}>혼자 감당하지 마세요.</span> <br />
            플로우가 처음부터 끝까지, 당신 편입니다.
          </h2>
          <p className={styles.sloganDesc}>
            복잡한 고민, 지금 바로 남겨주세요. 검토 후 영업일 기준 1시간 이내에 회신드립니다.
          </p>
          <div className={styles.topInfoBadge}>
            문의내용 남겨주시면 검토 후 <strong className={styles.sloganPhone}>02-517-8300</strong>으로 회신드립니다. 
            <span className={styles.topInfoDesc}>(※ 24시간 상담 가능 / 영업일 기준 1시간 내 회신 / 주말 방문상담 가능)</span>
          </div>
        </div>

        {/* Brand Background Heading Board */}
        <div className={styles.formHeaderBg}>
          <div className={styles.headerTextColFull}>
            <span className={styles.kicker}>PROFESSIONAL LEGAL SHIELD</span>
            <h2 className={styles.title}>신속한 법률 지원, 변호사와 바로 연결됩니다.</h2>
            <p className={styles.subtitle}>
              하자소송의 정밀한 분석부터 전략적 대응까지, 법무법인 플로우가 귀하의 권리를 단단하게 보호합니다.
            </p>
          </div>
        </div>

        {/* 2-Column Form & Card Grid */}
        <div className={styles.grid}>
          
          {/* Left Column: White Inquiry Form Card */}
          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <div className={styles.headerIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <h3 className={styles.formCardTitle}>상담 신청서</h3>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Row 1: 의뢰인 성함 & 연락처 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    의뢰인 성함 <span className={styles.req}>*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="성함을 입력하세요"
                    value={formData.name} 
                    onChange={handleChange} 
                    className={styles.input} 
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    연락처 <span className={styles.req}>*</span>
                  </label>
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="010-0000-0000"
                    value={formData.phone} 
                    onChange={handleChange} 
                    className={styles.input} 
                    required 
                  />
                </div>
              </div>

              {/* Row 2: 이메일 주소 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>이메일 주소</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="example@flowlaw.co.kr"
                  value={formData.email} 
                  onChange={handleChange} 
                  className={styles.input} 
                />
              </div>

              {/* Row 3: 건 유형 & 부동산 명칭/위치 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>건 유형</label>
                  <select 
                    name="caseType" 
                    value={formData.caseType} 
                    onChange={handleChange} 
                    className={styles.select}
                  >
                    <option value="">사건 유형을 선택하세요</option>
                    <option value="하자소송">하자소송</option>
                    <option value="건설분쟁">건설분쟁</option>
                    <option value="부동산 분쟁">부동산 분쟁</option>
                    <option value="재분양/계약해제">재분양/계약해제</option>
                    <option value="집단소송">집단소송</option>
                    <option value="전세사기">전세사기</option>
                    <option value="교육법률">교육법률</option>
                    <option value="형사전문">형사전문</option>
                    <option value="일반민사">일반민사</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>부동산 명칭/위치</label>
                  <input 
                    type="text" 
                    name="location" 
                    placeholder="소재지 또는 건물명"
                    value={formData.location} 
                    onChange={handleChange} 
                    className={styles.input} 
                  />
                </div>
              </div>

              {/* Row 4: 상세 내용 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  상세 내용 <span className={styles.req}>*</span>
                </label>
                <textarea 
                  name="details" 
                  placeholder="사건에 대한 상세한 내용을 기재해 주세요."
                  value={formData.details} 
                  onChange={handleChange} 
                  className={styles.textarea} 
                  required 
                />
              </div>

              {/* Row 5: 희망 상담 시간 & 파일첨부 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>연락 가능 시간</label>
                  <input 
                    type="text" 
                    name="availableTime" 
                    placeholder="예: 평일 오후 2시 이후"
                    value={formData.availableTime} 
                    onChange={handleChange} 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>파일첨부</label>
                  <div className={styles.fileInputWrapper}>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className={styles.fileHiddenInput} 
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="file-upload" className={styles.fileLabelBtn}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                      {file ? file.name : '파일 선택'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 6: 개인정보 동의 체크박스 & 자세히 보기 */}
              <div className={styles.consentContainer}>
                <div className={styles.consentRow}>
                  <input 
                    type="checkbox" 
                    id="agree" 
                    checked={formData.agree} 
                    onChange={handleCheckboxChange} 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="agree" className={styles.checkboxLabel}>
                    개인정보 수집 및 이용동의 <span className={styles.req}>*</span> 
                  </label>
                  <button 
                    type="button" 
                    className={styles.viewDetailsBtn}
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    [자세히 보기]
                  </button>
                </div>
                
                {/* Dynamically Toggled Inline Privacy Details Box */}
                {showDetails && (
                  <div className={styles.privacyDetailsBox}>
                    <h5>개인정보 수집 및 이용동의서</h5>
                    <p>
                      <strong>1. 개인정보 수집 목적:</strong> 법률 상담 신청 건에 대한 검토, 고객 응대, 사실관계 파악 및 법적 해법 제안 관련 안내 연락.<br />
                      <strong>2. 수집하는 개인정보 항목:</strong> 성함, 연락처, 이메일 주소, 사건 유형, 부동산 정보, 문의 상세 내용 및 첨부파일.<br />
                      <strong>3. 개인정보의 보유 및 이용기간:</strong> 원칙적으로 개인정보 수집 및 이용목적이 달성된 후(상담 종결 시) 즉시 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 관련 법령에 따라 보관합니다.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setShowDetails(false)}
                      className={styles.closeDetailsBtn}
                    >
                      닫기
                    </button>
                  </div>
                )}
              </div>

              {/* Submit button inside form card */}
              <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? '상담 신청 제출 중...' : '상담 신청하기'}
              </button>
            </form>
          </div>

          {/* Right Column: Dark Navy Contact Info Cards */}
          <div className={styles.contactCol}>
            
            {/* Info Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoAccentLine}></span>
                <h4 className={styles.infoTitle}>Contact Info</h4>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>DIRECT LINE</span>
                  <strong className={styles.infoVal}>02-517-8300</strong>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>OFFICE ADDRESS</span>
                  <strong className={styles.infoVal}>
                    서울특별시 서초구 서초대로 314 법조타워 12층
                  </strong>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>EMAIL</span>
                  <strong className={styles.infoVal}>contact@flowlaw.co.kr</strong>
                </div>
              </div>
            </div>

            {/* Kakao Button */}
            <a 
              href="https://pf.kakao.com/_xgxjxoxb" 
              target="_blank" 
              rel="noreferrer" 
              className={styles.kakaoButton}
            >
              <div className={styles.kakaoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.706 4.8 4.315 6.09-.18.665-.65 2.403-.743 2.77-.116.457.16.452.336.333.14-.094 2.22-1.507 3.11-2.11.64.09 1.3.136 1.98.136 4.97 0 9-3.185 9-7.114C21 6.185 16.97 3 12 3z"/>
                </svg>
              </div>
              카카오톡 실시간 상담
            </a>

          </div>

        </div>
        
      </div>
    </section>
  );
};

export default InquiryForm;
