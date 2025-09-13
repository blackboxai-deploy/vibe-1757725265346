'use client';

import React, { createContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { 
  ChatContextType, 
  User, 
  ChatRoom, 
  Message, 
  TypingIndicator 
} from '@/types/chat';
import { 
  generateId, 
  defaultChatRooms, 
  generateSampleMessages, 
  getRandomUser 
} from '@/lib/chatUtils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Create the context
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Persistent storage
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('chat-current-user', null);
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', []);
  const [chatRooms] = useLocalStorage<ChatRoom[]>('chat-rooms', defaultChatRooms);
  
  // Session state
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize user if not exists
  useEffect(() => {
    if (!currentUser) {
      const newUser: User = {
        id: generateId(),
        name: 'You',
        avatar: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/78cb6da7-e744-4483-9531-8ef8ba2f1281.png`,
        status: 'online'
      };
      setCurrentUser(newUser);
    }
  }, [currentUser, setCurrentUser]);

  // Initialize messages if empty
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages: Message[] = [];
      chatRooms.forEach(room => {
        if (room.isActive) {
          initialMessages.push(...generateSampleMessages(room.id));
        }
      });
      setMessages(initialMessages);
    }
  }, [messages.length, chatRooms, setMessages]);

  // Set initial room
  useEffect(() => {
    if (!currentRoom && chatRooms.length > 0) {
      setCurrentRoom(chatRooms[0]);
    }
  }, [currentRoom, chatRooms]);

  // Send message function
  const sendMessage = useCallback((content: string) => {
    if (!currentUser || !currentRoom || !content.trim()) return;

    const newMessage: Message = {
      id: generateId(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: content.trim(),
      timestamp: new Date(),
      type: 'message',
      roomId: currentRoom.id
    };

    setMessages(prev => [...prev, newMessage]);

    // Clear typing indicator for current user
    setTypingUsers(prev => 
      prev.filter(t => t.userId !== currentUser.id || t.roomId !== currentRoom.id)
    );

    // Simulate other users responding occasionally
    if (Math.random() < 0.3) {
      setTimeout(() => {
        simulateOtherUserMessage();
      }, 2000 + Math.random() * 3000);
    }
  }, [currentUser, currentRoom, setMessages]);

  // Simulate other user messages
  const simulateOtherUserMessage = useCallback(() => {
    if (!currentRoom) return;

    const responses = [
      "That's interesting!",
      "I agree with that",
      "Thanks for sharing!",
      "Good point!",
      "I'll have to think about that",
      "That makes sense",
      "Totally!",
      "Nice!",
      "👍",
      "Exactly what I was thinking"
    ];

    const randomUser = getRandomUser();
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const simulatedMessage: Message = {
      id: generateId(),
      userId: randomUser.id,
      userName: randomUser.name,
      userAvatar: randomUser.avatar,
      content: randomResponse,
      timestamp: new Date(),
      type: 'message',
      roomId: currentRoom.id
    };

    setMessages(prev => [...prev, simulatedMessage]);
  }, [currentRoom, setMessages]);

  // Handle typing indicators
  const setUserTyping = useCallback((isTyping: boolean) => {
    if (!currentUser || !currentRoom) return;

    const typingIndicator: TypingIndicator = {
      userId: currentUser.id,
      userName: currentUser.name,
      roomId: currentRoom.id,
      timestamp: new Date()
    };

    if (isTyping) {
      setTypingUsers(prev => {
        // Remove existing typing indicator for this user in this room
        const filtered = prev.filter(
          t => !(t.userId === currentUser.id && t.roomId === currentRoom.id)
        );
        return [...filtered, typingIndicator];
      });
    } else {
      setTypingUsers(prev => 
        prev.filter(
          t => !(t.userId === currentUser.id && t.roomId === currentRoom.id)
        )
      );
    }
  }, [currentUser, currentRoom]);

  // Clean up old typing indicators
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTypingUsers(prev => 
        prev.filter(t => now.getTime() - t.timestamp.getTime() < 5000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const contextValue: ChatContextType = {
    currentUser,
    setCurrentUser,
    chatRooms,
    currentRoom,
    setCurrentRoom,
    messages,
    sendMessage,
    typingUsers,
    setUserTyping,
    isSidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};