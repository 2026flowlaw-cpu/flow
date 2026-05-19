import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '집단소송',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
