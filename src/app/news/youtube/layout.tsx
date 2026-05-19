import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '미디어',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
