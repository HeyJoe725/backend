import React, { useState } from 'react';

function DrawerComponent({ drawerOpen, setDrawerOpen }) {

    return (
        <>
            <input
                type="checkbox"
                id="drawer-toggle"
                className=" sr-only peer"
                checked={drawerOpen}
                onChange={() => setDrawerOpen(!drawerOpen)}
            />
            <label
                htmlFor="drawer-toggle"
                className={`fixed  initial inline-block p-3 transition-all duration-500 bg-black z-40 rounded-full ${drawerOpen ? 'rotate-180  pt-5 pb-5 ml-[1.19px] top-0 left-0' : 'top-2 left-1 opacity-60'}`}
            >
                <div className={`h-1 -rotate-45 bg-white rounded-lg ${drawerOpen ? 'w-[35px] -mb-[4px] ' : 'w-4 mb-1.5 '}`}></div>
                <div className={`h-1 rotate-45 bg-white rounded-lg ${drawerOpen ? 'w-[35px]' : 'w-4 '}`}></div>
            </label>
        </>
    );
}

export default DrawerComponent;