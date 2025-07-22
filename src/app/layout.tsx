import type { Metadata } from "next";
import { Montserrat, Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baiJamjuree = Bai_Jamjuree({
   variable: "--font-bai-jamjuree",
   subsets: ["latin"],
   weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Formulário",
  description: "Desafio técnico para oportunidade de emprego na Santa Casa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${baiJamjuree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
