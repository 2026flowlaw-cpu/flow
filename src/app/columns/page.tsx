import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import ColumnsList, { type ColumnItem } from './ColumnsList';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getColumns(): Promise<ColumnItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from('legal_columns')
    .select('id,title,summary,category,author_name,image_url,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load columns:', error.message);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

export default async function ColumnsPage() {
  const columns = await getColumns();

  return (
    <div className={styles.page}>
      <main>
        <section className={styles.hero}>
          <Image
            src="/office_hallway_premium_1776064223861.webp"
            alt="법률칼럼 배너"
            fill
            className={styles.heroImg}
            priority
          />
          <div className={styles.heroOverlay}></div>
          <div className={`${styles.heroContent} container`}>
            <div className={styles.breadcrumb}>
              <Link href="/">HOME</Link>
              <span>&gt;</span>
              <span>플로우 소식</span>
              <span>&gt;</span>
              <strong>법률칼럼</strong>
            </div>
            <h1>법률칼럼</h1>
            <p>
              반드시 알아야 할 기초 법률 지식부터 빠르게 변하는 최신 법적 이슈까지<br />
              플로우가 엄선한 핵심 가이드를 전해드립니다.
            </p>
          </div>
        </section>

        <ColumnsList columns={columns} />
      </main>
    </div>
  );
}
