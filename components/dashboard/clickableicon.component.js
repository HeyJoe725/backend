import React from 'react';
import Link from 'next/link';
function ClickableIcon({ icon: Icon, url, name }) {
    return (
        <Link className='pt-5' href={`${url}`}>
            <div className='cursor-pointer flex flex-col items-center text-black'>
                <Icon className='hover:bg-gray-50 rounded-lg ' color='#d1d5db' size={40} />
                <span className="text-white text-xs font-medium p-1">{name}</span>
            </div>
        </Link>
    );
}

export default ClickableIcon;