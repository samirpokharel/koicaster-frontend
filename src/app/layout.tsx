"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "@/context/sidebar";
import Navbar from "@/components/navbar/index";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Koicaster",
//   description: "Streaming made easy & convienent",
// };

const HIDE_NAV_PATHS = ["/studio"]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  console.log(pathName)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          {HIDE_NAV_PATHS.includes(pathName) ? <></> : < Navbar />}

          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
