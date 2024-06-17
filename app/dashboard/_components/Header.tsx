import React from 'react';
import Image from "next/image";
import {UserButton} from "@clerk/nextjs";

const Header = () => {
  return (
    <div className='flex p-4 items-center justify-between'>
        <Image src={"/logo.png"} width={250} height={150} alt='logo'/>
        <ul className='flex gap-6'>
            <li>
                Dashboard
            </li>
            <li>
                Questions
            </li>
            <li>
                Upgrade
            </li>
            <li>
                How it Works ?
            </li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header