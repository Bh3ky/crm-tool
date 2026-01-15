import React, { useState, useEffect } from 'react';
import { LuSearch, LuBell, LuUser, LuSun, LuMoon } from 'react-icons/lu';

const Header = () => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <header className="h-16 glass border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-brand transition-colors">
                        <LuSearch size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search contacts, deals, tasks..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-hover/50 border border-transparent focus:bg-surface focus:border-brand/30 focus:ring-4 focus:ring-brand/10 text-sm text-primary placeholder-muted transition-all outline-none"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 ml-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2.5 text-secondary hover:text-brand hover:bg-brand/5 rounded-full transition-all duration-300"
                    title="Toggle Theme"
                >
                    {darkMode ? <LuSun size={20} /> : <LuMoon size={20} />}
                </button>

                <button className="p-2.5 text-secondary hover:text-brand hover:bg-brand/5 rounded-full transition-all duration-300 relative">
                    <LuBell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-error rounded-full ring-2 ring-surface"></span>
                </button>

                <div className="h-8 w-px bg-border/50 mx-2"></div>

                <div className="flex items-center cursor-pointer hover:bg-surface-hover p-1.5 pr-3 rounded-full border border-transparent hover:border-border transition-all group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white shadow-md shadow-brand/20">
                        <LuUser size={16} />
                    </div>
                    <span className="hidden md:block ml-2.5 text-sm font-medium text-primary group-hover:text-brand transition-colors">Demo User</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
