import React from 'react';

function RecentData({ data }) {
    return (
        <div>
            <div className='bg-white rounded-md shadow-md p-2 m-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>Recent Data</h1>
                    <button className='bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        View All
                    </button>
                    <div className='flex items-center'>
                        <button className='bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Add
                        </button>
                        <button className='bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentData;