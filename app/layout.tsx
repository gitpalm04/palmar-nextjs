import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

import Header from "@/components/Header"
import Footer from "@/components/Footer"


import { kanit } from "@/lib/fonts"


export const metadata: Metadata = {
  metadataBase: new URL("https://www.palmarconstrucoes.com.br"),

  title: {
    default: "Palmar Construções",
    template: "%s | Palmar Construções",
  },

  description:
    "Construtora em Aracaju com imóveis para aluguel e venda. Conheça a Palmar Construções e encontre casas, lotes e propriedades com segurança.",

  keywords: [
    "imobiliária aracaju",
    "imóveis em aracaju",
    "aluguel aracaju",
    "casas em aracaju",
    "venda de imóveis",
    "palmar construções",
  ],

  authors: [{ name: "Palmar Construções" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  verification: {
    google: "zroT4RB-xh3rMEkUR3SXzN927Had6zsdBmCy5hVUGxc",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Palmar Construções",
    description:
      "Construtora com imóveis para aluguel e venda em Aracaju. Conheça nossos serviços e oportunidades.",
    url: "https://www.palmarconstrucoes.com.br",
    siteName: "Palmar Construções",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/images/brand/palmar-logo.png",
        width: 1200,
        height: 630,
        alt: "Palmar Construções",
      },
    ],
  },

  icons: {
    icon: "/assets/images/brand/palmar-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">

      <body
        className={`
          ${kanit.variable}
          antialiased
          min-h-screen
          flex
          flex-col
          bg-background
        `}
        
      >
        {/* Google Ads / Analytics */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16867063557"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16867063557');
          `}
        </Script>

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>

    </html>
  )
}