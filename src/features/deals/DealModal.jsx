import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { STAGES } from '../../contexts/DealContext';

const DealModal = ({ isOpen, onClose, deal, onSave, initialStage = 'Lead' }) => {
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        company: '',
        stage: 'Lead',
        dueDate: ''
    });

    useEffect(() => {
        if (deal) {
            setFormData(deal);
        } else {
            setFormData({
                title: '',
                value: '',
                company: '',
                stage: initialStage,
                dueDate: ''
            });
        }
    }, [deal, isOpen, initialStage]);

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
        <Modal isOpen={isOpen} onClose={onClose} title={deal ? 'Edit Deal' : 'Add New Deal'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Deal Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        placeholder="e.g. Enterprise License"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Value ($)</label>
                        <input
                            type="number"
                            name="value"
                            required
                            value={formData.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Stage</label>
                        <select
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        >
                            {STAGES.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand text-primary outline-none transition-all"
                        />
                    </div>
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
                        {deal ? 'Save Changes' : 'Create Deal'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DealModal;
