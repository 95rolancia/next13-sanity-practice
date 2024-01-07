import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import SWRConfigContext from "@/context/SWRConfigContext";
import Navbar from "@/components/Navbar";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instagram",
    template: "Instagram | %s",
  },
  description: "Instagram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto">
        <AuthProvider>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-cente max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
