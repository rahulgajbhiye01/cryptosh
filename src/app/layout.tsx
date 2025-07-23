import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptosh",
  description:
    "Intuitive platform enabling swift conversion of over 100+ cryptocurrencies to 100+ fiat currencies, including USD, INR, and more.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen justify-center">{children}</main>
      </body>
    </html>
  );
}
