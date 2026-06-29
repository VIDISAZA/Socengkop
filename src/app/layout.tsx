import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "SocengKOP — Neo-Koperasi Member Ecosystem",
  description: "Gamifikasi keanggotaan koperasi untuk akselerasi partisipasi & modernisasi ekosistem koperasi desa. Platform Hackathon Koperasi Merah Putih 2026.",
  keywords: "koperasi, gamifikasi, SHU, desa, digital, koperasi merah putih",
  authors: [{ name: "SocengKOP Team" }],
  openGraph: {
    title: "SocengKOP — Neo-Koperasi",
    description: "Gamifikasi keanggotaan koperasi desa modern",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a5c2a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
