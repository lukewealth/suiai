import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/static/Header";
import SessionProvider from "@/lib/utils/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUI",
  description: "The Sui chat bot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={`${inter.className} w-full flex bg-red-300 h-screen`}>
          <main className='w-full flex  flex-col'>
            <Header />
            {children}
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}
