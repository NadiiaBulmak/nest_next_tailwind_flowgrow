import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLOW.GROW.",
  description: "modern platform for deep intentional productivity. Build your rhythm. Master your attention. Grow every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
