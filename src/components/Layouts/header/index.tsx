"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { NAV_DATA } from "../sidebar/data";
import { NAV_DATA_2 } from "../sidebar/traderData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function HeaderDashboard() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<any>();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Keep collapsible open, when it's subpage is active
    const role = Cookies.get('role');
    if(role === "trader"){
      // setHeaderTitle(NAV_DATA_2);
    }
    else{
      setHeaderTitle(NAV_DATA);
    }
  }, [pathname]);

  return (  
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {/* Hamburger Icon - shows when menu is closed */}
          <div className={`space-y-1.5 transition-all ${isMenuOpen ? 'hidden' : 'block'}`}>
            <span className="block w-6 h-0.5 bg-dark dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-dark dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-dark dark:bg-white"></span>
          </div>
          {/* Close Icon - shows when menu is open */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'}`}>
            <span className="block w-6 h-0.5 bg-dark dark:bg-white rotate-45 translate-y-0.5"></span>
            <span className="block w-6 h-0.5 bg-dark dark:bg-white -rotate-45 -translate-y-0.5"></span>
          </div>
        </button>


      <div className="max-xl:hidden flex flex-row items-center gap-4 justify-center">
        <h3 className="mb-1 text-xl md:text-2xl lg:text-3xl font-bold relative group">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                Intuitive Capital
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
        </h3>

        {/* <p className="font-medium">Trading Dashboard</p> */}
      </div>
      <div className="hidden md:flex flex-row items-center justify-center gap-2 lg:gap-4 ">
        {
          headerTitle?.map((items: any) => (
            items.items.map((item: any) => (
              <Link 
                href={item.url} 
                key={item.title}
                className="px-2 py-1 text-sm lg:text-base hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))
          ))
        }
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Add your mobile menu button/hamburger here */}
        

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden 
            fixed top-[64px] left-0 right-0 
            bg-white dark:bg-gray-900 
            shadow-lg 
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
        >
          <div className="flex flex-col items-center gap-4 py-6">
            {
              headerTitle?.map((items: any) => (
                items.items.map((item: any) => (
                  <Link 
                    href={item.url} 
                    key={item.title}
                    className="px-4 py-2 text-base hover:text-primary transition-colors w-full text-center"
                    onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
                  >
                    {item.title}
                  </Link>
                ))
              ))
            }
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-right gap-2 min-[300px]:gap-4">
        {/* <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div> */}

        <ThemeToggleSwitch />

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
