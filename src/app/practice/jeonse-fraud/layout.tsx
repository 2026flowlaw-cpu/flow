import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전세사기',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
