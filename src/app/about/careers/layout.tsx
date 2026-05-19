import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인재 영입',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
