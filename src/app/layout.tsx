import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3C: Crypto Currency Converter",
  description:
    "Discover our Crypto Currency Converter—an intuitive platform enabling swift conversion of over 100+ cryptocurrencies to 100+ fiat currencies, including USD, INR, and more. Stay informed with real-time exchange rates, making your financial decisions seamless and precise. ",
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
