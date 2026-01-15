import React, { createContext, useState, useContext, useEffect } from 'react';

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

const initialContacts = [
    {
        id: '1',
        name: 'Sarah Wilson',
        role: 'CEO',
        company: 'TechFlow',
        email: 'sarah@techflow.io',
        phone: '+1 (555) 123-4567',
        status: 'Lead',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=0D8ABC&color=fff',
        lastContact: '2023-10-25'
    },
    {
        id: '2',
        name: 'Michael Chen',
        role: 'CTO',
        company: 'Innovate Inc',
        email: 'michael@innovate.co',
        phone: '+1 (555) 987-6543',
        status: 'Customer',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=ffb300&color=fff',
        lastContact: '2023-11-02'
    },
    {
        id: '3',
        name: 'Emma Davies',
        role: 'Product Manager',
        company: 'SoftSys',
        email: 'emma@softsys.com',
        phone: '+1 (555) 456-7890',
        status: 'Prospect',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Davies&background=f44336&color=fff',
        lastContact: '2023-10-30'
    },
    {
        id: '4',
        name: 'James Rodriguez',
        role: 'VP Sales',
        company: 'Global Corp',
        email: 'james@global.com',
        phone: '+1 (555) 222-3333',
        status: 'Lead',
        avatar: 'https://ui-avatars.com/api/?name=James+Rodriguez&background=4caf50&color=fff',
        lastContact: '2023-11-05'
    }
];

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState(() => {
        const saved = localStorage.getItem('crm_contacts');
        return saved ? JSON.parse(saved) : initialContacts;
    });

    useEffect(() => {
        localStorage.setItem('crm_contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (contact) => {
        const newContact = { ...contact, id: Date.now().toString() };
        setContacts((prev) => [newContact, ...prev]);
    };

    const updateContact = (id, updatedData) => {
        setContacts((prev) =>
            prev.map((contact) => (contact.id === id ? { ...contact, ...updatedData } : contact))
        );
    };

    const deleteContact = (id) => {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
    };

    return (
        <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
            {children}
        </ContactContext.Provider>
    );
};
