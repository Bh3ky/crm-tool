import React, { useState } from 'react';
import { useContacts } from '../../contexts/ContactContext';
import { LuSearch, LuPlus, LuMenu, LuPhone, LuMail } from 'react-icons/lu';
import ContactModal from './ContactModal';

const ContactList = () => {
    const { contacts, addContact, updateContact } = useContacts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = (data) => {
        addContact({
            ...data,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
        });
    };

    const handleUpdate = (data) => {
        if (editingContact) {
            updateContact(editingContact.id, data);
        }
    };

    const openCreateModal = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    };

    const openEditModal = (contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
                    />
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-lg shadow-brand/25 font-medium"
                >
                    <LuPlus size={18} />
                    <span>Add Contact</span>
                </button>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContacts.map((contact) => (
                    <div key={contact.id} className="group bg-surface rounded-xl border border-border p-5 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 relative hover:-translate-y-1">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openEditModal(contact)}
                                className="p-1.5 hover:bg-surface-hover rounded text-muted hover:text-primary transition-colors"
                            >
                                <LuMenu size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <img src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full bg-surface-hover mb-3 object-cover shadow-sm ring-2 ring-surface" />
                            <h3 className="font-semibold text-primary">{contact.name}</h3>
                            <p className="text-sm text-secondary mb-1">{contact.role} @ {contact.company}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-3 border
                    ${contact.status === 'Customer' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10' :
                                    contact.status === 'Lead' ? 'bg-blue-500/10 text-blue-600 border-blue-500/10' :
                                        'bg-slate-500/10 text-slate-600 border-slate-500/10'}`}>
                                {contact.status}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                            <button className="flex items-center justify-center p-2 flex-1 hover:bg-surface-hover rounded-lg text-secondary hover:text-brand transition-colors text-sm gap-2">
                                <LuMail size={16} />
                                <span className="sr-only">Email</span>
                            </button>
                            <div className="w-px h-6 bg-border mx-1"></div>
                            <button className="flex items-center justify-center p-2 flex-1 hover:bg-surface-hover rounded-lg text-secondary hover:text-brand transition-colors text-sm gap-2">
                                <LuPhone size={16} />
                                <span className="sr-only">Call</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contact={editingContact}
                onSave={editingContact ? handleUpdate : handleCreate}
            />
        </div>
    );
};

export default ContactList;
