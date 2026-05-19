import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | 법무법인 플로우",
    default: "법무법인 플로우 - 하자소송의 명확한 해답",
  },
  description: "건설 소송 분석 및 전략 수립에 특화된 법무법인 플로우입니다.",
};

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingConsult from "@/components/FloatingConsult/FloatingConsult";
import RouteTracker from "@/components/RouteTracker/RouteTracker";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N9L8Z6MH');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ELJYV9C2C1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ELJYV9C2C1');
          `}
        </Script>
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9L8Z6MH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Suspense fallback={null}>
          <RouteTracker />
        </Suspense>
        <Header />
        {children}
        <Footer />
        <FloatingConsult />
      </body>
    </html>
  );
}
