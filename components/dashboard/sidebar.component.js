import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaNetworkWired } from 'react-icons/fa';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { BiTask } from 'react-icons/bi';

function Sidebar({ children }) {
    return (
        <div className='flex '>
            <div className='fixed w-20 h-screen p-4 bg-gray-600 border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col space-y-4 '>
                    <Link href='/'>
                        <div className='bg-blue-100 rounded-lg inline-block text-black'>
                            <Image className='rounded-lg' src='/images/me.png' width={50} height={50} />
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

            <main className='ml-20 w-full bg-gray-100 min-h-screen'>{children}</main>
        </div>
    );
}


export default Sidebar;