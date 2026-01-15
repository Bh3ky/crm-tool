import React from 'react';
import { useDeals, STAGES } from '../../contexts/DealContext';
import { LuDollarSign, LuCalendar, LuMenu, LuPlus, LuArrowRight, LuArrowLeft } from 'react-icons/lu';

const PipelineBoard = ({ onEditDeal, onAddDeal }) => {
    const { deals, moveDeal } = useDeals();

    const getDealsByStage = (stage) => deals.filter(deal => deal.stage === stage);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="flex h-full overflow-x-auto pb-4 gap-6 p-1 scroll-smooth">
            {STAGES.map((stage) => {
                const stageDeals = getDealsByStage(stage);
                const totalValue = stageDeals.reduce((sum, deal) => sum + Number(deal.value), 0);

                return (
                    <div key={stage} className="flex-shrink-0 w-80 flex flex-col h-full max-h-full">
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-primary">{stage}</h3>
                                <span className="bg-surface-hover text-secondary px-2 py-0.5 rounded-full text-xs font-medium border border-border">
                                    {stageDeals.length}
                                </span>
                            </div>
                            <div className="text-xs font-medium text-muted">
                                {formatCurrency(totalValue)}
                            </div>
                        </div>

                        {/* Drop Zone / List */}
                        <div className="flex-1 bg-surface-hover/50 rounded-xl p-3 space-y-3 overflow-y-auto border border-border active-scrollbar">
                            {stageDeals.map((deal) => (
                                <div key={deal.id}
                                    className="bg-surface p-4 rounded-lg shadow-sm border border-border hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all cursor-pointer group relative"
                                    onClick={() => onEditDeal(deal)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-md border border-brand/5">
                                            {deal.company}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditDeal(deal); }}
                                            className="text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-surface-hover"
                                        >
                                            <LuMenu size={16} />
                                        </button>
                                    </div>
                                    <h4 className="font-medium text-primary mb-1">{deal.title}</h4>
                                    <div className="flex items-center gap-1 text-secondary font-medium text-sm mb-3">
                                        <LuDollarSign size={14} />
                                        {formatCurrency(deal.value)}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border">
                                        <div className="flex items-center gap-1">
                                            <LuCalendar size={12} />
                                            {deal.dueDate}
                                        </div>

                                        {/* Simple Stage Mover for MVP */}
                                        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            {STAGES.indexOf(stage) > 0 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, STAGES[STAGES.indexOf(stage) - 1]); }}
                                                    className="hover:bg-surface-hover p-1 rounded text-secondary hover:text-primary"
                                                    title="Move Back"
                                                ><LuArrowLeft size={14} /></button>
                                            )}
                                            {STAGES.indexOf(stage) < STAGES.length - 1 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, STAGES[STAGES.indexOf(stage) + 1]); }}
                                                    className="hover:bg-surface-hover p-1 rounded text-secondary hover:text-primary"
                                                    title="Move Forward"
                                                ><LuArrowRight size={14} /></button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => onAddDeal(stage)}
                                className="w-full py-2.5 flex items-center justify-center text-muted hover:text-primary hover:bg-surface rounded-lg border border-dashed border-border transition-all text-sm group"
                            >
                                <LuPlus size={16} className="mr-1 group-hover:scale-110 transition-transform" /> Add Deal
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PipelineBoard;
