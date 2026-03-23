import type { Metadata } from "next";
import { Caveat, Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aditi Gode | Software Engineer",
  description:
    "Portfolio of Aditi Gode — Cloud & Infrastructure Engineer (Director) at Morgan Stanley. MS Computer Science, Indiana University.",
  keywords: [
    "Aditi Gode",
    "Software Engineer",
    "Morgan Stanley",
    "Cloud Infrastructure",
    "Machine Learning",
    "Python",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${caveat.variable} ${nunito.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
