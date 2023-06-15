import "./globals.css";
import { Inter } from "next/font/google";
import { Route, Routes } from "react-router-dom";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UberEats",
  description: "Having Fun with UberEats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
