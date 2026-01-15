import React from 'react';
import { useContacts } from '../contexts/ContactContext';
import { useDeals } from '../contexts/DealContext';
import { useTasks } from '../contexts/TaskContext';
import { LuUsers, LuBriefcase, LuListTodo, LuTrendingUp } from 'react-icons/lu';

const DashboardPage = () => {
    const { contacts } = useContacts();
    const { deals } = useDeals();
    const { tasks } = useTasks();

    const totalDealsValue = deals.reduce((sum, deal) => sum + Number(deal.value), 0);
    const pendingTasks = tasks.filter(t => !t.completed).length;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-status-success bg-status-success/10 px-2 py-1 rounded-full">{trend}</span>
            </div>
            <h3 className="text-secondary text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{value}</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
                <p className="text-secondary">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Contacts"
                    value={contacts.length}
                    icon={LuUsers}
                    colorClass="bg-blue-500"
                    trend="+12%"
                />
                <StatCard
                    title="Deals Pipeline"
                    value={formatCurrency(totalDealsValue)}
                    icon={LuTrendingUp}
                    colorClass="bg-indigo-500"
                    trend="+5%"
                />
                <StatCard
                    title="Active Deals"
                    value={deals.length}
                    icon={LuBriefcase}
                    colorClass="bg-purple-500"
                    trend="+2" // Just mock trend
                />
                <StatCard
                    title="Pending Tasks"
                    value={pendingTasks}
                    icon={LuListTodo}
                    colorClass="bg-orange-500"
                    trend="Needs Attention"
                />
            </div>

            {/* Recent Activity Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Deals */}
                <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-primary mb-4">Recent Opportunities</h2>
                    <div className="space-y-4">
                        {deals.slice(-5).reverse().map(deal => (
                            <div key={deal.id} className="flex items-center justify-between p-3 hover:bg-surface-hover rounded-lg transition-colors border border-transparent hover:border-border cursor-pointer">
                                <div>
                                    <h4 className="font-medium text-primary">{deal.title}</h4>
                                    <p className="text-sm text-secondary">{deal.company} • {deal.stage}</p>
                                </div>
                                <span className="font-semibold text-primary">{formatCurrency(deal.value)}</span>
                            </div>
                        ))}
                        {deals.length === 0 && <p className="text-muted text-sm">No deals yet.</p>}
                    </div>
                </div>

                {/* Due Tasks */}
                <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-primary mb-4">Tasks Due Soon</h2>
                    <div className="space-y-4">
                        {tasks.filter(t => !t.completed).slice(0, 5).map(task => (
                            <div key={task.id} className="flex items-start gap-3 p-3 hover:bg-surface-hover rounded-lg transition-colors border border-transparent hover:border-border cursor-pointer">
                                <div className={`w-2 h-2 mt-2 rounded-full ${task.priority === 'High' ? 'bg-status-error' : 'bg-status-warning'}`}></div>
                                <div>
                                    <h4 className="font-medium text-primary">{task.title}</h4>
                                    <p className="text-sm text-secondary">Due {task.dueDate}</p>
                                </div>
                            </div>
                        ))}
                        {tasks.filter(t => !t.completed).length === 0 && <p className="text-muted text-sm">All caught up!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
