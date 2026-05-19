import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학교폭력/교육법무',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
