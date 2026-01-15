import React, { createContext, useState, useContext, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const initialTasks = [
    {
        id: '1',
        title: 'Follow up with Sarah',
        completed: false,
        dueDate: '2023-11-15',
        priority: 'High',
        type: 'Call'
    },
    {
        id: '2',
        title: 'Prepare proposal for Global Corp',
        completed: true,
        dueDate: '2023-11-10',
        priority: 'Medium',
        type: 'Email'
    },
    {
        id: '3',
        title: 'Review quarterly goals',
        completed: false,
        dueDate: '2023-11-20',
        priority: 'Low',
        type: 'Meeting'
    }
];

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('crm_tasks');
        return saved ? JSON.parse(saved) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem('crm_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        const newTask = { ...task, id: Date.now().toString(), completed: false };
        setTasks((prev) => [newTask, ...prev]);
    };

    const updateTask = (id, updatedData) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
        );
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    }

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
