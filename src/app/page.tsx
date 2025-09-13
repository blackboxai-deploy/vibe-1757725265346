'use client';

import React from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { useChat } from '@/hooks/useChat';

export default function ChatPage() {
  const { isSidebarOpen } = useChat();

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - responsive */}
      <div className={`${
        isSidebarOpen 
          ? 'fixed inset-0 z-50 sm:relative sm:inset-auto sm:z-auto' 
          : 'hidden'
      } sm:block`}>
        <ChatSidebar />
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
            onClick={() => {
              const { toggleSidebar } = useChat();
              toggleSidebar();
            }}
          />
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <ChatHeader />
        
        {/* Messages Area */}
        <MessageList />
        
        {/* Message Input */}
        <MessageInput />
      </div>
    </div>
  );
}