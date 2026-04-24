import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "법무법인 플로우 - 하자소송의 명확한 해답",
  description: "건설 소송 분석 및 전략 수립에 특화된 법무법인 플로우입니다.",
};

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingConsult from "@/components/FloatingConsult/FloatingConsult";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const handleScroll = () => {
                  document.documentElement.setAttribute('data-scrolled', window.scrollY > 50 ? 'true' : 'false');
                };
                window.addEventListener('scroll', handleScroll);
                window.addEventListener('load', handleScroll);
                handleScroll();
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingConsult />
      </body>
    </html>
  );
}
