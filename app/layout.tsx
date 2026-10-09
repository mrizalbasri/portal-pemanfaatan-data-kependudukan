import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beranda | Portal Pemanfaatan Data Kependudukan",
  description: "Demo portal pemanfaatan data kependudukan dan sistem manajemen kelembagaan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
