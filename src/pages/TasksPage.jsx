import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { LuPlus, LuCheck, LuCalendar, LuTrash2, LuPencil } from 'react-icons/lu';
import TaskModal from '../features/tasks/TaskModal';

const TasksPage = () => {
    const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks();
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const handleCreate = (data) => {
        addTask(data);
    };

    const handleUpdate = (data) => {
        if (editingTask) {
            updateTask(editingTask.id, data);
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'text-status-error bg-status-error/10 border-status-error/10';
            case 'Medium': return 'text-status-warning bg-status-warning/10 border-status-warning/10';
            case 'Low': return 'text-status-success bg-status-success/10 border-status-success/10';
            default: return 'text-muted bg-surface-hover border-border';
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Tasks</h1>
                    <p className="text-secondary">Manage your daily todos.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-lg shadow-brand/25 font-medium"
                >
                    <LuPlus size={18} />
                    <span>New Task</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-1">
                {['all', 'pending', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-1.5 ${filter === f ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-primary'}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="space-y-3 pb-8">
                {filteredTasks.length === 0 && (
                    <div className="text-center py-10 text-muted">No tasks found.</div>
                )}
                {filteredTasks.map((task) => (
                    <div key={task.id} className={`flex items-center justify-between p-4 bg-surface rounded-xl border transition-all duration-200 ${task.completed ? 'opacity-75 border-border' : 'border-border hover:shadow-md hover:border-brand/20'}`}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${task.completed ? 'bg-status-success border-status-success text-white' : 'border-muted hover:border-brand text-transparent hover:text-brand/20'}`}
                            >
                                <LuCheck size={14} />
                            </button>
                            <div>
                                <h3 className={`font-medium ${task.completed ? 'line-through text-muted' : 'text-primary'}`}>{task.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-secondary mt-1">
                                    <span className="flex items-center gap-1">
                                        <LuCalendar size={12} /> {task.dueDate}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full font-medium border ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                    <span className="bg-surface-hover px-2 py-0.5 rounded-full border border-border">{task.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal(task)} className="p-2 text-muted hover:text-primary hover:bg-surface-hover rounded-lg transition-colors">
                                <LuPencil size={18} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="p-2 text-muted hover:text-status-error hover:bg-status-error/10 rounded-lg transition-colors">
                                <LuTrash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={editingTask}
                onSave={editingTask ? handleUpdate : handleCreate}
            />
        </div>
    );
};

export default TasksPage;
