import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatContext from "@/contexts/ChatContext";
import SideBar from "@/components/chat/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <main>
      <ChatContext>{children}</ChatContext>
    </main>
  );
}
