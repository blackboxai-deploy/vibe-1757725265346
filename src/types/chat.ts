// TypeScript definitions for chat application

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'join' | 'leave';
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  participantCount: number;
  lastMessage?: Message;
  isActive: boolean;
  thumbnail?: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  roomId: string;
  timestamp: Date;
}

export interface ChatContextType {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  
  // Chat rooms
  chatRooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  setCurrentRoom: (room: ChatRoom) => void;
  
  // Messages
  messages: Message[];
  sendMessage: (content: string) => void;
  
  // Typing indicators
  typingUsers: TypingIndicator[];
  setUserTyping: (isTyping: boolean) => void;
  
  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Common emoji categories
export interface EmojiCategory {
  name: string;
  emojis: string[];
}

// Message formatting types
export interface MessageFormat {
  bold: boolean;
  italic: boolean;
  code: boolean;
}

// Search functionality
export interface SearchResult {
  message: Message;
  roomName: string;
  matchedText: string;
}