import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaNetworkWired } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { BiTask } from 'react-icons/bi';

function Sidebar({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="flex">
            <input
                type="checkbox"
                id="drawer-toggle"
                className="relative sr-only peer"
                checked={drawerOpen}
                onChange={() => setDrawerOpen(!drawerOpen)}
            />
            <label
                htmlFor="drawer-toggle"
                className={`initial h-[15%] w-15 top-0 left-0 inline-block p-4 transition-all duration-500 bg-black z-40 rounded-lg ${drawerOpen ? 'rotate-180  left-64' : ''}`}
            >
                <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
                <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
            </label>

            <div className='fixed top-0 left-0 z-20  h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0 '>
                <div className='flex flex-col space-y-4 '>
                    <Link href='/'>
                        <div className='bg-blue-100 rounded-lg inline-block text-black'>
                            {/* <Image className='rounded-lg' src='/images/me.png' width={50} height={50} /> */}
                            {/* <AiOutlineDashboard size={50} /> */}
                        </div>
                    </Link>
                    <span className="border-b-[1px] border-gray-200 w-full "></span>

                    <div className='grid grid-cols-1 items-end space-y-5'>
                        <Link className='pt-5' href='#'>
                            <div className='cursor-pointer flex flex-col items-center text-black'>
                                <FaNetworkWired className='hover:bg-gray-50 rounded-lg ' color='#d1d5db' size={50} />
                                <span className="text-white text-sm font-medium" >Projects</span>
                            </div>
                        </Link>

                        <Link href='posts/dogs'>
                            <div className=' cursor-pointer flex flex-col justify-center items-center text-black'>
                                <BsFillFileEarmarkPostFill className='hover:bg-gray-50 rounded-lg ' color='#d1d5db' size={50} />
                                <span className="text-white text-sm font-medium">Posts</span>
                            </div>
                        </Link>

                        <Link href='#'>
                            <div className=' cursor-pointer  flex flex-col justify-center items-center text-black'>
                                <BiTask className='hover:bg-gray-50 rounded-lg ' color='#d1d5db' size={50} />
                                <span className="text-sm font-medium text-white">Manager</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <main className=' w-full bg-gray-100 min-h-screen '>{children}</main>
        </div>

    );
}


export default Sidebar;