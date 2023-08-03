import React, { useState } from 'react';

function DrawerComponent({ children }) {
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
                className={`absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg ${drawerOpen ? 'rotate-180 left-64' : ''}`}
            >
                <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
                <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
            </label>
        </div>
    );
}

export default DrawerComponent;