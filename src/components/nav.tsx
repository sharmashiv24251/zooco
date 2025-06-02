"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Bell, Dog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "home",
    href: "/",
    icon: Home,
  },
  {
    label: "favourites",
    href: "/favourites",
    icon: Heart,
  },
  {
    label: "reminders",
    href: "/reminders",
    icon: Bell,
  },
  {
    label: "pets",
    href: "/pets",
    icon: Dog,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40">
      <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link href={href} key={label} className="relative">
              <motion.div
                className={`flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "w-[122px] bg-black text-white"
                    : "w-[40px] text-gray-400"
                } h-[40px]`}
                layout
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="ml-2 text-sm font-medium"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
