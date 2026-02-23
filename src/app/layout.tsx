import type { Metadata } from "next";
import { Montserrat, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ClientChatWidget } from "@/components/ui/ClientChatWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SDE Outside India | Masterclass by Tanmay Kacker",
  description: "Learn how to land SDE jobs in UK, Europe, and US. A comprehensive guide on visas, salaries, and relocation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-[#FF9800] selection:text-white bg-[#050505]`}
      >
        <Navbar />
        {children}
        <ClientChatWidget />
      </body>
    </html>
  );
}
