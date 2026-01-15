import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard, LuUsers, LuBriefcase, LuListTodo, LuSettings } from 'react-icons/lu';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: <LuLayoutDashboard size={20} /> },
        { path: '/contacts', label: 'Contacts', icon: <LuUsers size={20} /> },
        { path: '/deals', label: 'Deals', icon: <LuBriefcase size={20} /> },
        { path: '/tasks', label: 'Tasks', icon: <LuListTodo size={20} /> },
    ];

    return (
        <aside className="w-64 bg-surface border-r border-border h-full flex flex-col transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none z-20">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border/50">
                <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-brand/30 ring-1 ring-white/10">
                    <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent tracking-tight">CRM Tool</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                <div className="px-2 mb-4 text-xs font-bold text-muted uppercase tracking-wider opacity-70">
                    Main Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-3 rounded-xl transition-all duration-200 group font-medium relative overflow-hidden ` +
                            (isActive
                                ? 'bg-brand/10 text-brand shadow-sm shadow-brand/5'
                                : 'text-secondary hover:bg-surface-hover hover:text-primary hover:translate-x-1')
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand rounded-r-full" />
                                )}
                                <span className={`mr-3 transition-colors ${isActive ? 'text-brand' : 'text-muted group-hover:text-primary'}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-border/50 bg-surface-hover/30">
                <button className="flex items-center w-full px-3 py-2 text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors font-medium border border-transparent hover:border-border/50">
                    <LuSettings size={20} className="mr-3 text-muted" />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
