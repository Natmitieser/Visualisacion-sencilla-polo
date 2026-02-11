import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const snPro = localFont({
  src: [
    {
      path: "../../public/fonts/SNPro-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/SNPro-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-snpro",
});

export const metadata: Metadata = {
  title: "Polo - Stellar Embedded Wallets",
  description: "Google login, automatic wallet creation, initial funding, and USDC trustline enabled. All via SDK + API.",
  keywords: "Stellar, embedded wallets, USDC, blockchain, Web3, crypto payments",
  openGraph: {
    title: "Polo - Stellar Embedded Wallets",
    description: "Google login, automatic wallet creation, initial funding, and USDC trustline enabled.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${snPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
