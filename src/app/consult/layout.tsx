import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '온라인 상담신청',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
