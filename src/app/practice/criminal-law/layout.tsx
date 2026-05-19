import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '형사/성범죄',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
