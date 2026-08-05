import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import RealtimeSyncProvider from "@/components/RealtimeSyncProvider";
import { getGlobalSyncTimestamp } from "@/actions/sync";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Miyobi",
  description: "Donde nacen nuevas aventuras.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTimestamp = await getGlobalSyncTimestamp();

  return (
    <html lang="es" className={`${outfit.variable} antialiased`}>
      <body className="font-sans">
        <RealtimeSyncProvider initialTimestamp={initialTimestamp}>
          {children}
        </RealtimeSyncProvider>
      </body>
    </html>
  );
}