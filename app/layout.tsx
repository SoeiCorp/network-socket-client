import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--ibm-plex-sans-thai-font",
});

export const metadata: Metadata = {
  title: "SoeiChat",
  description: "SoeiChat by Soei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="x-icon" href="/icons/logo.svg" />
      </head>
      <body
        className={cn(
          inter.className,
          ibmPlexSansThaiLooped.className,
          "h-screen"
        )}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "font-semibold text-slate-800",
            success: {
              style: {
                background: "#f0fdf4",
              },
              iconTheme: {
                primary: "#65a30d",
                secondary: "#f8fafc",
              },
            },
            error: {
              style: {
                background: "#fef2f2",
              },
              iconTheme: {
                primary: "#dc2626",
                secondary: "#f8fafc",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
