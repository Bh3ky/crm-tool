import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function MainLayout() {
    return (
        <div className="flex h-screen bg-main text-primary overflow-hidden transition-colors duration-300">
            {/* Sidebar - Fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header />

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
