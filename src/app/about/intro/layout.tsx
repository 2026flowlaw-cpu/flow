import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '법무법인 소개',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
