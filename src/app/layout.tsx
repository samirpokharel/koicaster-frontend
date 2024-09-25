import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/core/presentation/theme_provider";

export const metadata: Metadata = {
  title: "Koicaster",
  description: "Streaming made easy & convienent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
