import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import AuthProvider from "@/AuthProvider/AuthProvider";

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
          <Navbar />
          <main className="pt-16 md:pt-20">
            <div className="mx-4 md:mx-6 lg:mx-8">{children}</div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
