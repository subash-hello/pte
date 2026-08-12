'use client';

import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '../ui/GlassCard';

interface DragDropReorderProps {
  items: { id: string; text: string }[];
  onReorder: (orderedIds: string[]) => void;
}

export default function DragDropReorder({ items, onReorder }: DragDropReorderProps) {
  const [sourceItems, setSourceItems] = useState([...items]);
  const [targetItems, setTargetItems] = useState<{ id: string; text: string }[]>([]);
  
  const [draggedItem, setDraggedItem] = useState<{ id: string; text: string } | null>(null);
  const [dragSourcePanel, setDragSourcePanel] = useState<'left' | 'right' | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverPanel, setDragOverPanel] = useState<'left' | 'right' | null>(null);

  const handleDragStart = (e: React.DragEvent, item: { id: string; text: string }, panel: 'left' | 'right') => {
    setDraggedItem(item);
    setDragSourcePanel(panel);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow the drag image to be generated before styling the source
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItem(null);
    setDragSourcePanel(null);
    setDragOverIndex(null);
    setDragOverPanel(null);
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent, panel: 'left' | 'right', index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverPanel(panel);
    if (index !== undefined) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetPanel: 'left' | 'right', dropIndex?: number) => {
    e.preventDefault();
    if (!draggedItem || !dragSourcePanel) return;

    let newSourceList = [...sourceItems];
    let newTargetList = [...targetItems];

    // Remove from source panel
    if (dragSourcePanel === 'left') {
      newSourceList = newSourceList.filter(item => item.id !== draggedItem.id);
    } else {
      newTargetList = newTargetList.filter(item => item.id !== draggedItem.id);
    }

    // Add to target panel
    if (targetPanel === 'left') {
      // Typically we just append to the left (source) panel
      newSourceList.push(draggedItem);
    } else {
      if (dropIndex !== undefined) {
        newTargetList.splice(dropIndex, 0, draggedItem);
      } else {
        newTargetList.push(draggedItem);
      }
    }

    setSourceItems(newSourceList);
    setTargetItems(newTargetList);
    
    // Call callback with only the target items order
    onReorder(newTargetList.map(item => item.id));
    
    setDraggedItem(null);
    setDragSourcePanel(null);
    setDragOverIndex(null);
    setDragOverPanel(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">
      {/* Source Panel */}
      <div 
        className={cn(
          "bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[300px] flex flex-col transition-colors",
          dragOverPanel === 'left' && dragSourcePanel === 'right' && "bg-white/10 border-indigo-400/50"
        )}
        onDragOver={(e) => handleDragOver(e, 'left')}
        onDrop={(e) => handleDrop(e, 'left')}
      >
        <h3 className="text-gray-400 text-sm font-medium mb-4 px-2">Source Paragraphs</h3>
        
        <div className="flex flex-col gap-3 flex-1">
          {sourceItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, 'left')}
              onDragEnd={handleDragEnd}
              className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing flex gap-3 transition-colors"
            >
              <GripVertical className="text-gray-500 shrink-0 mt-0.5" size={18} />
              <p className="text-gray-200 text-sm leading-relaxed select-none">{item.text}</p>
            </div>
          ))}
          
          {sourceItems.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm border-2 border-dashed border-white/10 rounded-xl">
              All paragraphs moved
            </div>
          )}
        </div>
      </div>

      {/* Target Panel */}
      <div 
        className={cn(
          "bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 min-h-[300px] flex flex-col transition-colors",
          dragOverPanel === 'right' && "bg-indigo-500/10 border-indigo-400/50"
        )}
        onDragOver={(e) => handleDragOver(e, 'right')}
        onDrop={(e) => handleDrop(e, 'right')}
      >
        <h3 className="text-indigo-300 text-sm font-medium mb-4 px-2">Target Order</h3>
        
        <div className="flex flex-col gap-3 flex-1 relative">
          {targetItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-indigo-400/50 text-sm border-2 border-dashed border-indigo-500/20 rounded-xl pointer-events-none">
              Drag paragraphs here in the correct order
            </div>
          )}
          
          {targetItems.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Drop zone indicator above item */}
              {dragOverPanel === 'right' && dragOverIndex === index && (
                <div className="h-1 bg-indigo-400 rounded-full my-1 animate-pulse" />
              )}
              
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, item, 'right')}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, 'right', index)}
                onDrop={(e) => {
                  e.stopPropagation();
                  handleDrop(e, 'right', index);
                }}
                className={cn(
                  "bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl p-4 cursor-grab active:cursor-grabbing flex gap-3 transition-colors",
                  draggedItem?.id === item.id && "opacity-50"
                )}
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <GripVertical className="text-indigo-400/50" size={16} />
                </div>
                <p className="text-gray-200 text-sm leading-relaxed select-none">{item.text}</p>
              </div>

              {/* Drop zone indicator after last item */}
              {dragOverPanel === 'right' && dragOverIndex === index + 1 && index === targetItems.length - 1 && (
                <div className="h-1 bg-indigo-400 rounded-full my-1 animate-pulse" />
              )}
            </div>
          ))}
          
          {/* Invisible drop zone at the bottom */}
          <div 
            className="flex-1 min-h-[40px]" 
            onDragOver={(e) => handleDragOver(e, 'right', targetItems.length)}
            onDrop={(e) => {
              e.stopPropagation();
              handleDrop(e, 'right', targetItems.length);
            }}
          />
        </div>
      </div>
    </div>
  );
}
