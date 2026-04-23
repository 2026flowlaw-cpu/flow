"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// 에디터를 클라이언트 환경에서만 부르도록 안전하게 설정 (next.js ssr 충돌 방지)
const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill-new');
  return RQ;
}, { 
  ssr: false, 
  loading: () => <p style={{ padding: '20px', color: '#888' }}>에디터를 불러오는 중입니다...</p> 
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  // 에디터 상단의 꾸미기 버튼들(Toolbar) 구성
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }], // 글씨 크기(제목)
      ['bold', 'italic', 'underline', 'strike'], // 굵기, 기울임꼴, 밑줄, 취소선
      [{ 'color': [] }, { 'background': [] }], // 글자색, 형광펜
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], // 번호 매기기, 점 매기기, 정렬
      ['link', 'clean'] // 링크 삽입, 서식 지우기
    ],
  }), []);

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <style>{`
        /* 에디터 내부의 하얀 도화지(입력창) 크기를 고정. */
        .ql-editor {
          min-height: 400px;
          font-size: 16px;
          line-height: 1.8;
        }
      `}</style>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
      />
    </div>
  );
}
