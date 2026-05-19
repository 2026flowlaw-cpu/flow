import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대표 인사말',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
