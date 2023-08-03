import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaNetworkWired } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { BiTask } from 'react-icons/bi';
import DrawerComponent from './drawer.component';
import ClickableIcon from './clickableicon.component';

function Sidebar({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const icons = [FaNetworkWired, BsFillFileEarmarkPostFill, BiTask];
    const urls = ['/#', '/posts/dogs', '/#'];
    const names = ['Projects', 'Posts', 'Manager'];

    return (
        <div className={`transition-all duration-500 ${drawerOpen ? 'pl-12' : ''}`}>
            <DrawerComponent drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

            <div className='rounded-lg fixed w-15 top-0 left-0 z-20  h-full transition-all duration-500 transform -translate-x-full bg-black shadow-lg peer-checked:translate-x-0 '>
                <div className='flex flex-col space-y-4 '>
                    <Link href='/'>
                        <div className='bg-blue-100 rounded-lg inline-block text-black'>
                            {/* <Image className='rounded-lg' src='/images/me.png' width={50} height={50} /> */}
                            {/* <AiOutlineDashboard size={50} /> */}
                        </div>
                    </Link>
                    <span className="border-b-[1px] border-gray-200 w-full p-1"></span>

                    <div className='grid grid-cols-1 items-end space-y-5'>
                        {icons.map((icon, index) => (
                            <ClickableIcon key={index} icon={icon} url={urls[index]} name={names[index]} />
                        ))}
                    </div>
                </div>
            </div>

            <main className=' w-full bg-white min-h-screen '>{children}</main>
        </div>

    );
}


export default Sidebar;