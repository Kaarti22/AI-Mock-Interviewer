"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Span } from "next/dist/trace";

const Header = () => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  const {user} = useUser();

  return (
    <div className="flex p-2 items-center justify-between bg-secondary shadow-sm">
      <Link href={"/dashboard"}>
        <Image src={"/logo.png"} width={150} height={50} alt="logo" />
      </Link>
      <ul className="hidden md:flex gap-6 text-blue-600">
        <Link href={"/dashboard"}>
          <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-blue-700 font-bold'}`}>
            Dashboard
          </li>
        </Link>
        <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-blue-700 font-bold'}`}>
          Questions
        </li>
        <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-blue-700 font-bold'}`}>
          Upgrade
        </li>
        <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-blue-700 font-bold'}`}>
          How it Works ?
        </li>
      </ul>
      <div className="flex items-center gap-5 text-blue-800">
        {user && <span>Hello, <span className="font-semibold">{user?.fullName}</span></span>}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
