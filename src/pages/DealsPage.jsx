import React, { useState } from 'react';
import PipelineBoard from '../features/deals/PipelineBoard';
import { LuPlus } from 'react-icons/lu';
import DealModal from '../features/deals/DealModal';
import { useDeals } from '../contexts/DealContext';

const DealsPage = () => {
    const { addDeal, updateDeal } = useDeals();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);
    const [initialStage, setInitialStage] = useState('Lead');

    const handleCreate = (data) => {
        addDeal(data);
    };

    const handleUpdate = (data) => {
        if (editingDeal) {
            updateDeal(editingDeal.id, data);
        }
    };

    const openCreateModal = (stage = 'Lead') => {
        setEditingDeal(null);
        setInitialStage(stage);
        setIsModalOpen(true);
    };

    const openEditModal = (deal) => {
        setEditingDeal(deal);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between mb-6 px-1">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Deals Pipeline</h1>
                    <p className="text-secondary">Track your opportunities.</p>
                </div>
                <button
                    onClick={() => openCreateModal('Lead')}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-lg shadow-brand/25 font-medium"
                >
                    <LuPlus size={18} />
                    <span>New Deal</span>
                </button>
            </div>

            <div className="flex-1 min-h-0">
                <PipelineBoard onEditDeal={openEditModal} onAddDeal={openCreateModal} />
            </div>

            <DealModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deal={editingDeal}
                initialStage={initialStage}
                onSave={editingDeal ? handleUpdate : handleCreate}
            />
        </div>
    );
};

export default DealsPage;
