'use client'
import Hero from "@/components/Dashboard";
import { useEffect , useState } from "react";
import { usePathname } from "next/navigation";
import AdminHome from "@/components/AdminHome";
export default function Home() {
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
    <>
      {!token ? <Hero /> : ""}
    </>
  );
}
