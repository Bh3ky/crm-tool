import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';

function ContactList({ contacts, onEdit, onDelete }) {
    if (!contacts.length) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm p-8">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <FiBriefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No contacts yet</h3>
                <p className="max-w-sm text-sm">Get started by adding your first contact to the CRM.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
                <div
                    key={contact.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden group"
                >
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                    {contact.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 leading-tight">{contact.name}</h3>
                                    <p className="text-xs text-gray-500 font-medium">{contact.role} at {contact.company}</p>
                                </div>
                            </div>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(contact)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    title="Edit"
                                >
                                    <FiEdit2 size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(contact.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    title="Delete"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex items-center text-sm text-gray-600">
                                <FiMail className="w-4 h-4 mr-2.5 text-gray-400" />
                                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate">
                                    {contact.email}
                                </a>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FiPhone className="w-4 h-4 mr-2.5 text-gray-400" />
                                <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                                    {contact.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span>Added {new Date().toLocaleDateString()}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium text-[10px] uppercase tracking-wide">
                            Lead
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactList;
