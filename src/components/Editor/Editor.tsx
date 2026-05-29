"use client";

import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import type ReactQuillDefault from 'react-quill-new';
import styles from './Editor.module.css';
import 'react-quill-new/dist/quill.snow.css';

type ReactQuillForwardedProps = React.ComponentProps<typeof ReactQuillDefault> & {
  forwardedRef?: React.Ref<ReactQuillDefault>;
};

const ReactQuill = dynamic<ReactQuillForwardedProps>(async () => {
  const { default: RQ } = await import('react-quill-new');
  const QuillEditor = ({ forwardedRef, ...props }: ReactQuillForwardedProps) => (
    <RQ ref={forwardedRef} {...props} />
  );
  return QuillEditor;
}, {
  ssr: false,
  loading: () => <p className={styles.loading}>에디터를 불러오는 중입니다...</p>
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

type QuillRange = {
  index: number;
  length: number;
};

type QuillEditor = {
  getSelection: () => QuillRange | null;
  getLine: (index: number) => [unknown, number];
  getText: (index: number, length: number) => string;
  deleteText: (index: number, length: number, source?: string) => void;
  formatLine: (index: number, length: number, name: string, value: unknown, source?: string) => void;
  history?: {
    cutoff: () => void;
  };
  setSelection: (index: number, source?: string) => void;
};

function applyMarkdownBlock(quill: QuillEditor, range: QuillRange, marker: string) {
  const trimmedMarker = marker.trim();
  const start = range.index - marker.length;

  quill.history?.cutoff();
  quill.deleteText(start, marker.length, 'user');

  if (trimmedMarker === '#') {
    quill.formatLine(start, 1, 'header', 1, 'user');
  } else if (trimmedMarker === '##') {
    quill.formatLine(start, 1, 'header', 2, 'user');
  } else if (trimmedMarker === '###') {
    quill.formatLine(start, 1, 'header', 3, 'user');
  } else if (trimmedMarker === '>') {
    quill.formatLine(start, 1, 'blockquote', true, 'user');
  } else if (trimmedMarker === '```') {
    quill.formatLine(start, 1, 'code-block', true, 'user');
  } else if (trimmedMarker === '-' || trimmedMarker === '*') {
    quill.formatLine(start, 1, 'list', 'bullet', 'user');
  } else if (trimmedMarker === '1.') {
    quill.formatLine(start, 1, 'list', 'ordered', 'user');
  }

  quill.history?.cutoff();
  quill.setSelection(start, 'silent');
}

export default function Editor({ value, onChange }: EditorProps) {
  const quillRef = useRef<ReactQuillDefault | null>(null);

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 800,
      maxStack: 120,
      userOnly: true,
    },
  }), []);

  const formats = useMemo(() => [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'align',
    'link',
    'image',
    'color',
    'background',
  ], []);

  const handleMarkdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== ' ') return;

    const quill = quillRef.current?.getEditor() as QuillEditor | undefined;
    const range = quill?.getSelection();

    if (!quill || !range || range.length > 0) return;

    const [, offset] = quill.getLine(range.index);
    const lineStart = range.index - offset;
    const marker = quill.getText(lineStart, offset);

    if (!/^\s*(#{1,3}|>|```|-|\*|1\.)$/.test(marker)) return;

    event.preventDefault();
    applyMarkdownBlock(quill, range, marker);
  };

  return (
    <div className={styles.editor}>
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        placeholder="마크업으로 작성하세요. 예: # 제목, ## 소제목, - 목록, > 인용, ``` 코드"
        onKeyDown={handleMarkdownKeyDown}
        onChange={(content: string, _delta: unknown, source: string) => {
          if (source === 'user') {
            onChange(content);
          }
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
