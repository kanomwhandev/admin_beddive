"use client";

import Link from "next/link";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Music, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { userId } = useAuth();
  const { user } = useUser();

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" },
  };

  // ปรับฟังก์ชันนี้เพื่อให้ตรวจสอบบทบาทของผู้ใช้และนำไปยังหน้า Dashboard ที่ถูกต้อง
  const getDashboardLink = () => {
    if (user?.publicMetadata?.role === "admin") {
      return "/admin_dashboard"; // สำหรับ admin ไปหน้า admin_dashboard
    }
    return "/dashboard"; // สำหรับผู้ใช้ธรรมดาไปหน้า dashboard
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-neutral-100 font-mono">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <h1 className="text-4xl font-bold text-white">
              bed
              <span className="text-accent font-extrabold">Dive</span>
            </h1>
          </motion.div>
        </Link>
        <div>
          {userId ? (
            <div className="flex gap-6 items-center">
              {/* ปุ่ม Dashboard สำหรับทุกคน (จะพาไปตามบทบาทของ user) */}
              <Link href={getDashboardLink()}>
                <motion.button
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-blue-700"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </motion.button>
              </Link>
              {/* ปุ่ม Soundboard */}
              <Link href="/demo">
                <motion.button
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-purple-700"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Music className="w-5 h-5" />
                  <span>Soundboard</span>
                </motion.button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/sign-up"
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold transition-colors hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/sign-in"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors hover:bg-blue-700"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
