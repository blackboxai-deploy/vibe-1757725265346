'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from './UserAvatar';
import { useChat } from '@/hooks/useChat';
import { useMessages } from '@/hooks/useChat';
import { ChatRoom } from '@/types/chat';

export const ChatSidebar: React.FC = () => {
  const { 
    chatRooms, 
    currentRoom, 
    setCurrentRoom, 
    currentUser, 
    theme,
    toggleTheme,
    isSidebarOpen,
    toggleSidebar
  } = useChat();
  
  const { getMessageCount, getLastMessage } = useMessages();

  const handleRoomSelect = (room: ChatRoom) => {
    setCurrentRoom(room);
    // Close sidebar on mobile after selection
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${
      isSidebarOpen ? 'w-full sm:w-80' : 'hidden'
    } sm:flex sm:w-80`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {currentUser && (
            <UserAvatar user={currentUser} size="md" />
          )}
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {currentUser?.name || 'Chat'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Online now
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 sm:hidden"
            aria-label="Close sidebar"
          >
            ✕
          </Button>
        </div>
      </div>

      {/* Room List */}
      <div className="flex-1 flex flex-col">
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Chat Rooms
          </h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="px-2 space-y-1">
            {chatRooms.map((room) => {
              const lastMessage = getLastMessage(room.id);
              const isSelected = currentRoom?.id === room.id;
              
              return (
                <Button
                  key={room.id}
                  variant={isSelected ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <img 
                          src={room.thumbnail} 
                          alt={`${room.name} thumbnail`}
                          className="w-6 h-6 rounded opacity-90"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="text-white text-sm font-semibold">
                          {room.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium truncate ${
                          isSelected 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {room.name}
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className="ml-2 text-xs"
                        >
                          {room.participantCount}
                        </Badge>
                      </div>
                      
                      <p className={`text-xs truncate mt-0.5 ${
                        isSelected 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {room.description}
                      </p>
                      
                      {lastMessage && (
                        <p className={`text-xs truncate mt-1 ${
                          isSelected 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {lastMessage.userName}: {lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Modern Chat App</span>
          <span>{chatRooms.length} rooms</span>
        </div>
      </div>
    </div>
  );
};