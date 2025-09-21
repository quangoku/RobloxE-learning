import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
import Providers from "./providers";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
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
          <NextTopLoader showSpinner={false} color="#8f8f8f"></NextTopLoader>
          <NavBar></NavBar>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
