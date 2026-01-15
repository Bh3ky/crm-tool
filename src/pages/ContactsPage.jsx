import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import ContactList from '../components/contacts/ContactList';
import ContactForm from '../components/contacts/ContactForm';

function ContactsPage() {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            phone: '+1 (555) 012-3456',
            company: 'Microsoft',
            role: 'Product Designer'
        },
        {
            id: 2,
            name: 'Robert Fox',
            email: 'robert.fox@example.com',
            phone: '+1 (555) 012-3457',
            company: 'Google',
            role: 'Frontend Developer'
        },
        {
            id: 3,
            name: 'Cody Fisher',
            email: 'cody.fisher@example.com',
            phone: '+1 (555) 012-3458',
            company: 'Apple',
            role: 'Project Manager'
        }
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        setEditingContact(null);
        setIsFormOpen(true);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const handleSubmit = (formData) => {
        if (editingContact) {
            setContacts(contacts.map(c =>
                c.id === editingContact.id ? { ...formData, id: c.id } : c
            ));
        } else {
            setContacts([...contacts, { ...formData, id: Date.now() }]);
        }
        setIsFormOpen(false);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                    <p className="text-gray-500 mt-1">Manage your relationships with customers and prospects.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <FiPlus className="mr-2 -ml-1 h-5 w-5" />
                    Add Contact
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                    />
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <FiFilter className="mr-2 h-4 w-4" />
                    Filter
                </button>
            </div>

            <ContactList
                contacts={filteredContacts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {isFormOpen && (
                <ContactForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsFormOpen(false)}
                    initialData={editingContact}
                />
            )}
        </div>
    );
}

export default ContactsPage;
