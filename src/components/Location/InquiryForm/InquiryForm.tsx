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
    email: '',
    caseTypes: [] as string[],
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
    { id: 'etc', label: '기타' }
  ];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullPhone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    if (!formData.name || !formData.phone2 || !formData.phone3) {
      alert('의뢰인 성함과 연락처를 모두 입력해 주세요.');
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

      // Bundle all inputs cleanly into details
      const detailsText = [
        `[이메일 주소] ${formData.email || '미기재'}`,
        `[사건 유형] ${formData.caseTypes.join(', ') || '선택 없음'}`,
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
      alert('상담 신청이 완료되었습니다. 법무법인 플로우 집단소송 TF팀이 신속히 회신해 드리겠습니다.');
      setFormData({
        name: '',
        phone1: '010',
        phone2: '',
        phone3: '',
        email: '',
        caseTypes: [],
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
        
        {/* Top 3-Line Sub-Header Specification */}
        <div className={styles.topBannerSpec}>
          <div className={styles.topBadge}>집단소송, 24시간 비대면 간편 상담 접수!</div>
          <h3 className={styles.topTitle}>결과가 증명하는 연대의 힘! 지금 바로 문의하세요</h3>
          <p className={styles.topDesc}>집단소송 전담 TF팀이 검토하여 신속하게 회신하여 드립니다.</p>
        </div>

        {/* Brand Skyscraper Title Board (Minimalist Refined style) */}
        <div className={styles.header}>
          <span className={styles.kicker}>PROFESSIONAL LEGAL SHIELD</span>
          <h2 className={styles.mainTitle}>신속한 법률 지원, 변호사와 바로 연결됩니다.</h2>
          <p className={styles.subtitle}>
            하자소송의 정밀한 분석부터 전략적 대응까지, 법무법인 플로우가 귀하의 권리를 단단하게 보호합니다.
          </p>
        </div>

        {/* Highlight Callout Boxes (Mockup Red Annotations stylized elegantly) */}
        <div className={styles.calloutGrid}>
          <div className={styles.calloutCard}>
            <div className={styles.calloutIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p className={styles.calloutText}>
              혼자 감당하지 마세요. <br />
              <strong>플로우가 처음부터 끝까지, 당신 편입니다.</strong>
            </p>
          </div>
          <div className={styles.calloutCard}>
            <div className={styles.calloutIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p className={styles.calloutText}>
              복잡한 고민, 지금 바로 남겨주세요. <br />
              <strong>검토 후 영업일 기준 1시간 이내에 회신드립니다.</strong>
            </p>
          </div>
        </div>

        {/* 4-Step Circle Process Map */}
        <div className={styles.processWrapper}>
          {/* Step 1 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.blueDash1}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>온라인 상담 신청</span>
          </div>

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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>당일 영업시간 내<br/>유선상담 진행</span>
          </div>

          <div className={styles.chevron}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
          </div>

          {/* Step 3 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.blueDash2}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>방문상담 또는<br/>원격영상상담 예약</span>
          </div>

          <div className={styles.chevron}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
          </div>

          {/* Step 4 */}
          <div className={styles.stepItem}>
            <div className={`${styles.circle} ${styles.goldDash}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className={styles.stepLabel}>변호사 3인과 기타 전문가 등<br/>팀 단위로 사건 처리</span>
          </div>
        </div>

        {/* 2-Column Minimalist Content Layout */}
        <div className={styles.grid}>
          
          {/* Left Column: Spacious White Form Container */}
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
              <div className={styles.formRowInline}>
                <div className={styles.formGroupInline}>
                  <label className={styles.labelInline}>
                    의뢰인 성함<span className={styles.req}>*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="성함을 입력하세요"
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
                      placeholder="0000"
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
                      placeholder="0000"
                      value={formData.phone3} 
                      onChange={handleInputChange} 
                      className={styles.phoneInput} 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: 이메일 주소 */}
              <div className={styles.formGroupInlineFull}>
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

              {/* Row 3: 사건 유형 (Spacious Checkbox Grid) */}
              <div className={styles.formGroupCheckboxSection}>
                <h4 className={styles.checkboxSectionTitle}>사건 유형</h4>
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
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
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

              {/* Row 4: 부동산 명칭/위치 */}
              <div className={styles.formGroupInlineFull}>
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

              {/* Row 5: 상세 내용 */}
              <div className={styles.formGroupBlock}>
                <label className={styles.labelBlock}>상세 내용</label>
                <textarea 
                  name="details" 
                  placeholder="사건에 대한 상세한 내용을 기재해 주세요."
                  value={formData.details} 
                  onChange={handleInputChange} 
                  className={styles.textarea} 
                />
              </div>

              {/* Row 6: 연락 가능 시간 & 파일첨부 */}
              <div className={styles.formRowInline}>
                <div className={styles.formGroupInline}>
                  <label className={styles.labelInline}>연락 가능 시간</label>
                  <input 
                    type="text" 
                    name="availableTime" 
                    placeholder="예: 평일 오후 2시 이후"
                    value={formData.availableTime} 
                    onChange={handleInputChange} 
                    className={styles.textInput} 
                  />
                </div>
                <div className={styles.formGroupInline}>
                  <label className={styles.labelInline}>파일첨부</label>
                  <div className={styles.fileBox}>
                    <input 
                      type="file" 
                      id="file-upload" 
                      onChange={handleFileChange} 
                      className={styles.hiddenFileInput} 
                    />
                    <label htmlFor="file-upload" className={styles.fileTriggerBtn}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                      {file ? file.name : '파일 선택'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 7: 개인정보 동의 */}
              <div className={styles.consentBox}>
                <label className={styles.consentLabel}>
                  <input 
                    type="checkbox" 
                    checked={formData.agree} 
                    onChange={(e) => setFormData(prev => ({ ...prev, agree: e.target.checked }))} 
                    className={styles.checkbox} 
                  />
                  <span className={styles.consentText}>
                    개인정보 수집 및 이용동의 <span className={styles.req}>*</span>
                  </span>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('개인정보 수집자: 법무법인 플로우\n이용목적: 사건 상담 및 관련 피드백 제공\n보유기간: 상담 목적 달성 후 1년 또는 파기 요청시'); }} className={styles.viewDetailsLink}>
                    [자세히 보기]
                  </a>
                </label>
              </div>

              {/* Action Submit */}
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? '상담 신청 제출 중...' : '상담 신청하기'}
              </button>

            </form>
          </div>

          {/* Right Column: Sleek Charcoal / Grey Contact Information Panel */}
          <div className={styles.contactCol}>
            
            {/* Minimalist Contact Info Panel */}
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
                    서울특별시 강남구 영동대로 617, 6~8층 (삼성동, 찬이빌딩)
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

            {/* Kakao Yellow Interactive Button */}
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
