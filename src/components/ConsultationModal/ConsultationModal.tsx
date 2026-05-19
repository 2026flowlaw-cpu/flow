"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const parseDetails = (details: string) => {
  if (!details) return { cleanText: '', attachment: null };
  const fileMarker = '[첨부파일_데이터]';
  const markerIndex = details.indexOf(fileMarker);
  if (markerIndex === -1) return { cleanText: details, attachment: null };
  const cleanText = details.substring(0, markerIndex).trim();
  const fileSection = details.substring(markerIndex + fileMarker.length).trim();
  const nameLine = fileSection.split('\n').find(l => l.startsWith('파일명:'));
  const dataLine = fileSection.split('\n').find(l => l.startsWith('데이터:'));
  const fileName = nameLine ? nameLine.replace('파일명:', '').trim() : '첨부파일';
  const base64 = dataLine ? dataLine.replace('데이터:', '').trim() : '';
  return { cleanText, attachment: base64 ? { name: fileName, data: base64 } : null };
};

interface ConsultationModalProps {
  item: any;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}

export default function ConsultationModal({ item, onClose, onStatusChange }: ConsultationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  const { cleanText, attachment } = parseDetails(item.details || '');

  const overlay = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.55)', zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          width: '90%',
          maxWidth: '620px',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0A1B39', margin: 0 }}>
            상담 신청 상세 내역
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#94a3b8', lineHeight: 1, padding: '4px' }}
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        {[
          { label: '의뢰인명', value: item.name },
          { label: '연락처', value: item.phone, bold: true },
          { label: '이메일', value: item.email || '미입력' },
          { label: '사건 유형', value: item.case_type || '미입력' },
          { label: '부동산 위치', value: item.location || '미입력' },
          { label: '희망 상담시간', value: item.appointment_time || '미입력' },
        ].map(({ label, value, bold }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ width: '130px', fontSize: '14px', color: '#64748b', fontWeight: 600, flexShrink: 0 }}>{label}:</span>
            <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: bold ? 700 : 400 }}>{value}</span>
          </div>
        ))}

        {/* Status Change */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ width: '130px', fontSize: '14px', color: '#64748b', fontWeight: 600, flexShrink: 0 }}>처리 상태:</span>
          <select
            value={item.status}
            onChange={e => onStatusChange(item.id, e.target.value)}
            style={{
              padding: '6px 14px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer',
              border: `1px solid ${item.status === '대기중' ? '#ffcdd2' : '#c8e6c9'}`,
              background: item.status === '대기중' ? '#ffebee' : '#e8f5e9',
              color: item.status === '대기중' ? '#c62828' : '#2e7d32',
              fontSize: '13px',
            }}
          >
            <option value="대기중">🚨 대기중</option>
            <option value="확인중">👀 확인중</option>
            <option value="상담완료">✅ 상담완료</option>
          </select>
        </div>

        {/* Details Text */}
        {cleanText && (
          <div style={{ marginTop: '22px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <strong style={{ display: 'block', marginBottom: '12px', color: '#1e293b', fontSize: '14px' }}>📋 상세 내용</strong>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#475569', margin: 0, fontSize: '13.5px' }}>
              {cleanText}
            </p>
          </div>
        )}

        {/* Attachment */}
        {attachment && (
          <div style={{ marginTop: '20px', background: '#f0f4ff', border: '1px dashed #93c5fd', padding: '20px', borderRadius: '12px' }}>
            <strong style={{ display: 'block', marginBottom: '12px', color: '#1e293b', fontSize: '14px' }}>📎 첨부파일</strong>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, margin: '0 0 12px' }}>파일명: {attachment.name}</p>
            {attachment.data.startsWith('data:image/') && (
              <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #dbeafe', marginBottom: '14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={attachment.data} alt="첨부 이미지" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )}
            <a
              href={attachment.data}
              download={attachment.name}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', background: '#bd9d62', color: 'white',
                borderRadius: '8px', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', boxShadow: '0 2px 8px rgba(189,157,98,0.3)',
              }}
            >
              ⬇️ 파일 다운로드
            </a>
          </div>
        )}

        {/* Footer Close */}
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 36px', background: '#0A1B39', color: 'white',
              borderRadius: '8px', border: 'none', fontWeight: 700,
              fontSize: '14px', cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
