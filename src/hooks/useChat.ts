'use client';

import { useContext } from 'react';
import { ChatContext } from '@/contexts/ChatContext';
import { ChatContextType } from '@/types/chat';

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  
  return context;
};

// Hook for handling message operations
export const useMessages = () => {
  const { messages, sendMessage, currentRoom } = useChat();
  
  const getCurrentRoomMessages = () => {
    if (!currentRoom) return [];
    return messages.filter(message => message.roomId === currentRoom.id);
  };
  
  const getMessageCount = (roomId: string) => {
    return messages.filter(message => message.roomId === roomId).length;
  };
  
  const getLastMessage = (roomId: string) => {
    const roomMessages = messages.filter(message => message.roomId === roomId);
    return roomMessages[roomMessages.length - 1];
  };
  
  return {
    currentRoomMessages: getCurrentRoomMessages(),
    sendMessage,
    getMessageCount,
    getLastMessage
  };
};

// Hook for handling user interactions
export const useUserInteractions = () => {
  const { 
    typingUsers, 
    setUserTyping, 
    currentRoom, 
    currentUser 
  } = useChat();
  
  const getCurrentRoomTypingUsers = () => {
    if (!currentRoom) return [];
    return typingUsers.filter(
      typing => 
        typing.roomId === currentRoom.id && 
        typing.userId !== currentUser?.id
    );
  };
  
  const isCurrentUserTyping = () => {
    if (!currentRoom || !currentUser) return false;
    return typingUsers.some(
      typing => 
        typing.roomId === currentRoom.id && 
        typing.userId === currentUser.id
    );
  };
  
  return {
    typingUsers: getCurrentRoomTypingUsers(),
    setUserTyping,
    isCurrentUserTyping: isCurrentUserTyping()
  };
};