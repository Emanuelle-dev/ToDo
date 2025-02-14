
import { ThemeProvider } from "@/components/ui/teme-provider";
import "./globals.css"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/providers";


export const metadata: Metadata = {
    title: "Next Level",
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
          <Providers>
        {children}
        </Providers>

      </body>
    </html>
  );
}
