import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '변호사 소개',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
