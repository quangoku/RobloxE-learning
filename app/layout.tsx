import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "E-learning",
  description: "E-learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/RobloxIcon.svg" />
      </head>
      <body>
        <Providers>
          <NavBar></NavBar>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
