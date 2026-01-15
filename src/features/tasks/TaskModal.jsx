import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        dueDate: '',
        priority: 'Medium',
        type: 'Call'
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                title: '',
                dueDate: '',
                priority: 'Medium',
                type: 'Call'
            });
        }
    }, [task, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'New Task'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Task Description</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        placeholder="e.g. Schedule meeting"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            required
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                    >
                        <option value="Call">Call</option>
                        <option value="Email">Email</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex justify-end pt-4 space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-secondary hover:bg-surface-hover rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-sm"
                    >
                        {task ? 'Save Changes' : 'Create Task'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;
