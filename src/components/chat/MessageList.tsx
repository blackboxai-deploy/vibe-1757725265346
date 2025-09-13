'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageItem } from './MessageItem';
import { useMessages, useUserInteractions } from '@/hooks/useChat';
import { useChat } from '@/hooks/useChat';

export const MessageList: React.FC = () => {
  const { currentRoom } = useChat();
  const { currentRoomMessages } = useMessages();
  const { typingUsers } = useUserInteractions();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentRoomMessages, typingUsers]);

  // Determine if messages should be grouped (same user, within 5 minutes)
  const shouldGroupMessages = (currentMsg: any, previousMsg: any): boolean => {
    if (!previousMsg || currentMsg.userId !== previousMsg.userId) return false;
    if (currentMsg.type !== 'message' || previousMsg.type !== 'message') return false;
    
    const timeDiff = currentMsg.timestamp.getTime() - previousMsg.timestamp.getTime();
    return timeDiff < 5 * 60 * 1000; // 5 minutes
  };

  if (!currentRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Modern Chat
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a room from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="py-4">
          {currentRoomMessages.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <img 
                    src={currentRoom.thumbnail} 
                    alt={`${currentRoom.name} thumbnail`}
                    className="w-8 h-8 rounded opacity-90"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-white font-semibold">
                    {currentRoom.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Welcome to #{currentRoom.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {currentRoom.description}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Be the first to send a message!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {currentRoomMessages.map((message, index) => {
                const previousMessage = index > 0 ? currentRoomMessages[index - 1] : null;
                const isGrouped = shouldGroupMessages(message, previousMessage);
                const showAvatar = !isGrouped;
                
                return (
                  <MessageItem
                    key={message.id}
                    message={message}
                    showAvatar={showAvatar}
                    isGrouped={isGrouped}
                  />
                );
              })}
            </div>
          )}
          
          {/* Typing indicators */}
          {typingUsers.length > 0 && (
            <div className="px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse animation-delay-100" />
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse animation-delay-200" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {typingUsers.length === 1 
                    ? `${typingUsers[0].userName} is typing...` 
                    : `${typingUsers.length} people are typing...`
                  }
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};