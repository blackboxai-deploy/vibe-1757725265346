'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/hooks/useChat';

export const ChatHeader: React.FC = () => {
  const { currentRoom, toggleSidebar, isSidebarOpen } = useChat();

  if (!currentRoom) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 sm:hidden"
            aria-label="Toggle sidebar"
          >
            ☰
          </Button>
          <h1 className="font-semibold text-gray-900 dark:text-gray-100">
            Select a room to start chatting
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0 sm:hidden"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <img 
              src={currentRoom.thumbnail} 
              alt={`${currentRoom.name} thumbnail`}
              className="w-6 h-6 rounded opacity-90"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-white text-sm font-semibold">
              {currentRoom.name.charAt(0)}
            </span>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              {currentRoom.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Badge variant="secondary" className="text-xs">
                {currentRoom.participantCount} members
              </Badge>
              <span>•</span>
              <span>{currentRoom.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-sm"
          aria-label="Room settings"
        >
          Settings
        </Button>
      </div>
    </div>
  );
};