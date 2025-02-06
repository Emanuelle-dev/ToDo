
import { ThemeProvider } from "@/components/ui/teme-provider";
import "./globals.css"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export const metadata: Metadata = {
    title: " NY ",
    description: "The better, the best"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
