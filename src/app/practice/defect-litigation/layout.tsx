import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '하자소송',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
