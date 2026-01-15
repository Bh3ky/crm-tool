import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { DollarSign, User, Calendar, Briefcase } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const KanbanCard = ({ deal, index }) => {
    return (
        <Draggable draggableId={deal.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={twMerge(
                        "group relative p-4 mb-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-200",
                        snapshot.isDragging ? "shadow-xl ring-2 ring-blue-500/50 rotate-2 z-50 scale-105" : ""
                    )}
                    style={provided.draggableProps.style}
                >
                    {/* Card Accent Gradient on Hover */}
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-500" />

                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                            {deal.company}
                        </span>
                        {deal.value > 100000 && (
                            <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        )}
                    </div>

                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                        {deal.title}
                    </h3>

                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                            <span className="font-medium text-neutral-700 dark:text-neutral-200">
                                {deal.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center text-xs text-neutral-400">
                                <User className="w-3.5 h-3.5 mr-1.5" />
                                {deal.contact}
                            </div>
                            <div className="flex items-center text-xs text-neutral-400">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                {new Date(deal.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default KanbanCard;
