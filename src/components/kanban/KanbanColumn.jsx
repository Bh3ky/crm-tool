import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';
import { clsx } from 'clsx';

const KanbanColumn = ({ column, deals }) => {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

    return (
        <div className="flex flex-col h-full min-w-[320px] w-[320px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 p-1">
                <div className="flex items-center gap-2">
                    <div className={clsx("w-3 h-3 rounded-full border-2", column.color.split(' ')[2])} />
                    <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
                        {column.title}
                    </h2>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        {deals.length}
                    </span>
                </div>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={clsx(
                            "flex-1 p-2 rounded-xl transition-colors duration-200 overflow-y-auto min-h-[150px]",
                            snapshot.isDraggingOver
                                ? "bg-neutral-100/50 dark:bg-neutral-800/50 ring-2 ring-inset ring-blue-500/20"
                                : "bg-neutral-50/50 dark:bg-neutral-900/20"
                        )}
                    >
                        {deals.map((deal, index) => (
                            <KanbanCard key={deal.id} deal={deal} index={index} />
                        ))}
                        {provided.placeholder}

                        {/* Column Footer Summary */}
                        {deals.length > 0 && (
                            <div className="mt-4 px-2 py-3 border-t border-dashed border-neutral-200 dark:border-neutral-700 text-center">
                                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Total Value</p>
                                <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                    {totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;
