import React, { createContext, useState, useContext, useEffect } from 'react';

const DealContext = createContext();

export const useDeals = () => useContext(DealContext);

const initialDeals = [
    {
        id: '1',
        title: 'Enterprise License',
        value: 50000,
        stage: 'Proposal',
        company: 'TechFlow',
        contactId: '1',
        dueDate: '2023-12-15'
    },
    {
        id: '2',
        title: 'Startup Plan',
        value: 12000,
        stage: 'Lead',
        company: 'Innovate Inc',
        contactId: '2',
        dueDate: '2023-12-20'
    },
    {
        id: '3',
        title: 'Consulting Contract',
        value: 25000,
        stage: 'Negotiation',
        company: 'SoftSys',
        contactId: '3',
        dueDate: '2023-12-10'
    },
    {
        id: '4',
        title: 'Q4 Expansion',
        value: 75000,
        stage: 'Won',
        company: 'Global Corp',
        contactId: '4',
        dueDate: '2023-11-28'
    }
];

export const STAGES = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export const DealProvider = ({ children }) => {
    const [deals, setDeals] = useState(() => {
        const saved = localStorage.getItem('crm_deals');
        return saved ? JSON.parse(saved) : initialDeals;
    });

    useEffect(() => {
        localStorage.setItem('crm_deals', JSON.stringify(deals));
    }, [deals]);

    const addDeal = (deal) => {
        const newDeal = { ...deal, id: Date.now().toString() };
        setDeals((prev) => [...prev, newDeal]);
    };

    const updateDeal = (id, updatedData) => {
        setDeals((prev) =>
            prev.map((deal) => (deal.id === id ? { ...deal, ...updatedData } : deal))
        );
    };

    const moveDeal = (id, newStage) => {
        setDeals((prev) =>
            prev.map((deal) => (deal.id === id ? { ...deal, stage: newStage } : deal))
        );
    }

    const deleteDeal = (id) => {
        setDeals((prev) => prev.filter((deal) => deal.id !== id));
    };

    return (
        <DealContext.Provider value={{ deals, addDeal, updateDeal, deleteDeal, moveDeal }}>
            {children}
        </DealContext.Provider>
    );
};
