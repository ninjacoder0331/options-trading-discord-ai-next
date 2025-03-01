"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/providers";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/providers/AuthProvider';

import { Sidebar } from "@/components/Layouts/sidebar";
import { useState , useEffect } from "react";
import { usePathname , useRouter } from "next/navigation";
// import "flatpickr/dist/flatpickr.min.css";
// import "jsvectormap/dist/jsvectormap.css";

import { HeaderDashboard  } from "@/components/Layouts/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];
      
    if (token) {
      setToken(token);
    }
  }, [pathname]);

  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <AuthProvider>
            {!token ? (
              <div>
                <Header />
                {children}
                <Footer />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <ScrollToTop />
              </div>
            ):(
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                  <HeaderDashboard />
                  <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            
                  </main>
                </div>
              </div>
            )}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}


