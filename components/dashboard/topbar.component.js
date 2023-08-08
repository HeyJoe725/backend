import React from 'react';

function TopCard(props) {
    return (
        <div className='grid lg:grid-cols-5 gap-4 p-4'>
            <div className='lg:col-span-3 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg' >
                <div className='flex flex-col w-full pb-4'>
                    <p className='font-bold sm:text-2xl '>Total Applications</p>
                    <p className='text-gray-600'>Lucho mmv</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>+11%</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg' >
                2
            </div>
            {/* <div className=' bg-white flex justify-between w-full border p-4 rounded-lg' >
                3
            </div>
            <div className='bg-gray-300 flex w-full border p-4 rounded-lg justify-between'>
                4
            </div>
            <div className='bg-white w-full p-4 border flex rounded-lg justify-between'>
                5
            </div>
            <div className='bg-gray-300 w-full p-4 border flex rounded-lg justify-between'>
                6
            </div> */}
        </div>
    );
}

export default TopCard;