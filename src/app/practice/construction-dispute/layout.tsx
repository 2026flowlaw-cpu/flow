import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '건설분쟁',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
