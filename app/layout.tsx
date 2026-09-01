import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/AuthProvider/AuthProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AIProvider } from "@/components/ai/AIProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgroCare — Smart Farming, Expert Care",
  description:
    "Empowering Bangladeshi farmers with the right products, knowledge, and expert support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSansTC.variable}`}>
      <body className="min-h-screen bg-soft-white font-noto-sans-tc antialiased">
        <AuthProvider>
          <AIProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}