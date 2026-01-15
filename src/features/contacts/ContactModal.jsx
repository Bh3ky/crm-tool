import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const ContactModal = ({ isOpen, onClose, contact, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        company: '',
        status: 'Lead',
        phone: ''
    });

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        } else {
            setFormData({
                name: '',
                email: '',
                role: '',
                company: '',
                status: 'Lead',
                phone: ''
            });
        }
    }, [contact, isOpen]);

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
        <Modal isOpen={isOpen} onClose={onClose} title={contact ? 'Edit Contact' : 'Add New Contact'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                    >
                        <option value="Lead">Lead</option>
                        <option value="Prospect">Prospect</option>
                        <option value="Customer">Customer</option>
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
                        {contact ? 'Save Changes' : 'Create Contact'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ContactModal;
