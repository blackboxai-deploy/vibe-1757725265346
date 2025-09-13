'use client';

import React from 'react';
import { UserAvatar } from './UserAvatar';
import { Message } from '@/types/chat';
import { formatTimestamp, formatDetailedTimestamp } from '@/lib/chatUtils';
import { useChat } from '@/hooks/useChat';

interface MessageItemProps {
  message: Message;
  showAvatar?: boolean;
  isGrouped?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  showAvatar = true,
  isGrouped = false 
}) => {
  const { currentUser } = useChat();
  const isOwnMessage = currentUser?.id === message.userId;
  const isSystemMessage = message.type === 'system' || message.type === 'join' || message.type === 'leave';

  if (isSystemMessage) {
    return (
      <div className="flex justify-center py-2">
        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`group flex gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
      isGrouped ? 'py-1' : 'py-3'
    } ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {showAvatar && !isGrouped ? (
        <div className="flex-shrink-0">
          <UserAvatar 
            user={{
              name: message.userName,
              avatar: message.userAvatar,
              status: 'online'
            }}
            size="sm"
            showStatus={false}
          />
        </div>
      ) : (
        <div className="w-8 flex-shrink-0 flex justify-center">
          <span className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      )}
      
      <div className={`flex-1 min-w-0 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
        {!isGrouped && (
          <div className={`flex items-baseline gap-2 mb-1 ${
            isOwnMessage ? 'justify-end flex-row-reverse' : 'justify-start'
          }`}>
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {isOwnMessage ? 'You' : message.userName}
            </span>
            <span 
              className="text-xs text-gray-500 dark:text-gray-400 cursor-help"
              title={formatDetailedTimestamp(message.timestamp)}
            >
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        )}
        
        <div className={`inline-block max-w-[80%] ${
          isOwnMessage 
            ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-r-lg rounded-tl-lg'
        } px-3 py-2 shadow-sm`}>
          <p className="text-sm break-words whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};