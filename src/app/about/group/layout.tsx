import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '핵심 그룹',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
