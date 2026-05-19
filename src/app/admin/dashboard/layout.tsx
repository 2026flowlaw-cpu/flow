import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 대시보드',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
