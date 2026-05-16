import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "UCES Talento | Reclutamiento universitario",
  description: "Plataforma de reclutamiento, evaluación y seguimiento de candidatos para UCES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
