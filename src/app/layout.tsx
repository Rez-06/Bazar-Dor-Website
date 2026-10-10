import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, দামের পরিবর্তন এবং বাজারভিত্তিক তুলনা এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
    lang="bn"
    data-theme="light"
    className={`${hindSiliguri.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <Header/>

          {children}

        
        <Footer/>
        <Toaster position="top-center"/>
        </body>
    </html>
  );
}
