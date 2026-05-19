import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '일반민사',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
