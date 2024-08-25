import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Navbar from "@/components/Navbar";
import NavItems from "@/components/NavItems";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Finance Tracker",
  description: "Track your monthly income, expenses and savings here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-black`}>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
