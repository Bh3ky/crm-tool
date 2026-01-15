import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { KANBAN_DATA, COLUMNS } from '../../data/mockData';

const KanbanBoard = () => {
    const [deals, setDeals] = useState(KANBAN_DATA);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Dropped outside or no change
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const draggedDeal = deals.find(d => d.id === draggableId);

        // Create new array to avoid mutation
        const newDeals = Array.from(deals);

        // Remove from old position
        // Note: Since we are filtering by column in render, we just need to update the stage and potentially reorder if we were tracking strict order.
        // For simplicity in this demo, we update the stage. 
        // To handle reordering within same column properly, we'd need an 'order' field or separate arrays per column.

        // Let's implement a more robust reorder approach:
        // 1. Get all deals in source column
        // 2. Get all deals in dest column
        // 3. Update.

        // Simplified logic for "Moving between stages" primarily:
        if (source.droppableId !== destination.droppableId) {
            // Moving to a new column
            const updatedDeal = { ...draggedDeal, stage: destination.droppableId };
            setDeals(deals.map(d => d.id === draggableId ? updatedDeal : d));
        } else {
            // Reordering in same column (Visual only for now unless we add sortOrder)
            // Since we map based on filter, reordering purely via array position in the master list is tricky without a sort index.
            // For MVP, we will allow drag and drop but the persistence of order within column might be loose without an order index.
            // However, standard dnd expects modifying the array.

            // Let's try to simulate reorder by moving the item in the big array.
            // This is imperfect without per-column arrays, but often "good enough" for simple lists.
            const sourceIndex = deals.findIndex(d => d.id === draggableId);
            newDeals.splice(sourceIndex, 1); // remove

            // This placement is tricky because 'destination.index' is relative to the column, not the global array.
            // To do this right, we'd need to split deals into columns state.
        }
    };

    // Better State Management for true DnD Reordering:
    // We will derive state for columns to allow proper reordering.
    // Actually, for a robust Kanban, it is best to separate the data by columns in state.

    // Refactoring to Column-based state for smoother interaction
    const [columns, setColumns] = useState(() => {
        const state = {};
        COLUMNS.forEach(col => {
            state[col.id] = KANBAN_DATA.filter(d => d.stage === col.id);
        });
        return state;
    });

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceColId = source.droppableId;
        const destColId = destination.droppableId;

        const sourceCol = columns[sourceColId];
        const destCol = columns[destColId];

        const sourceItems = Array.from(sourceCol);
        const destItems = sourceColId === destColId ? sourceItems : Array.from(destCol);

        const [movedItem] = sourceItems.splice(source.index, 1);

        // If moving to new column, update the deal's internal stage property (for consistency if we saved it)
        const updatedItem = { ...movedItem, stage: destColId };

        if (sourceColId === destColId) {
            sourceItems.splice(destination.index, 0, updatedItem);
            setColumns({
                ...columns,
                [sourceColId]: sourceItems
            });
        } else {
            destItems.splice(destination.index, 0, updatedItem);
            setColumns({
                ...columns,
                [sourceColId]: sourceItems,
                [destColId]: destItems
            });
        }
    };

    return (
        <div className="h-full flex flex-col bg-neutral-50 dark:bg-neutral-900/50">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <h1 className="text-xl font-bold text-neutral-800 dark:text-white">Deals Pipeline</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all hover:shadow-blue-500/20">
                        + New Deal
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="h-full flex gap-6 p-6 min-w-max">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {COLUMNS.map(col => (
                            <KanbanColumn
                                key={col.id}
                                column={col}
                                deals={columns[col.id]}
                            />
                        ))}
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
