import { ChatRoom, Message, User } from '@/types/chat';

// Generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

// Format timestamp for detailed view
export const formatDetailedTimestamp = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generate random user names for simulation
const randomNames = [
  'Alex Chen', 'Sarah Miller', 'David Kim', 'Emma Wilson', 'James Brown',
  'Lisa Garcia', 'Michael Davis', 'Ashley Johnson', 'Ryan Taylor', 'Jessica Lee',
  'Kevin Wang', 'Amanda Clark', 'Tyler Martinez', 'Samantha White', 'Brandon Hall'
];

export const getRandomUser = (): User => {
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  return {
    id: generateId(),
    name,
    avatar: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e2fe01a-a184-45cb-8ac7-0a57b56124d7.png' ').map(n => n[0]).join('')}`,
    status: Math.random() > 0.3 ? 'online' : 'offline',
    lastSeen: new Date(Date.now() - Math.random() * 3600000 * 24)
  };
};

// Default chat rooms
export const defaultChatRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General discussion for everyone',
    participantCount: 24,
    isActive: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5a5ecca4-b206-48b4-aef0-38040fabc56c.png'
  },
  {
    id: 'tech-talk',
    name: 'Tech Talk',
    description: 'Discussions about technology, programming, and innovation',
    participantCount: 18,
    isActive: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9b9cacda-004c-4507-9c30-ce7459e58133.png'
  },
  {
    id: 'random',
    name: 'Random',
    description: 'Random conversations and fun topics',
    participantCount: 31,
    isActive: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/325773ab-9a79-49a8-8161-a49ab9af139b.png'
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Important updates and announcements',
    participantCount: 45,
    isActive: false,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/980a9cd9-b4d7-4a7e-a0b2-33c353d5065e.png'
  }
];

// Generate sample messages for rooms
export const generateSampleMessages = (roomId: string): Message[] => {
  const sampleMessages: { [key: string]: Array<{ content: string; type: 'message' | 'system' }> } = {
    general: [
      { content: 'Welcome everyone to the general chat!', type: 'system' },
      { content: 'Hey there! How is everyone doing today?', type: 'message' },
      { content: 'Pretty good! Just working on some new projects', type: 'message' },
      { content: 'That sounds exciting! What kind of projects?', type: 'message' }
    ],
    'tech-talk': [
      { content: 'Tech Talk room is now active!', type: 'system' },
      { content: 'Has anyone tried the new React 19 features yet?', type: 'message' },
      { content: 'Yes! The new compiler is amazing', type: 'message' },
      { content: 'I\'m still getting used to the changes, but they seem promising', type: 'message' }
    ],
    random: [
      { content: 'Random chat is the place for everything!', type: 'system' },
      { content: 'Anyone else loving this weather lately?', type: 'message' },
      { content: 'It\'s been perfect for outdoor activities!', type: 'message' }
    ]
  };

  const messages = sampleMessages[roomId] || [];
  return messages.map((msg, index) => {
    const user = getRandomUser();
    return {
      id: generateId(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: msg.content,
      timestamp: new Date(Date.now() - (messages.length - index) * 300000),
      type: msg.type as 'message' | 'system',
      roomId
    };
  });
};

// Emoji categories and data
export const emojiCategories = [
  {
    name: 'Smileys',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋']
  },
  {
    name: 'Gestures',
    emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤏', '💪']
  },
  {
    name: 'Objects',
    emojis: ['💻', '📱', '⌨️', '🖥️', '🖨️', '💾', '💿', '📷', '📹', '🎮', '🕹️', '📺', '📻', '🎵', '🎶', '🎤', '🎧', '📢', '📣', '📯']
  },
  {
    name: 'Nature',
    emojis: ['🌱', '🌿', '🍀', '🌾', '🌵', '🌴', '🌳', '🌲', '🌊', '⭐', '🌟', '✨', '⚡', '☀️', '🌤️', '⛅', '🌦️', '🌧️', '⛈️', '🌈']
  }
];

// Search messages
export const searchMessages = (messages: Message[], query: string): Message[] => {
  const lowerQuery = query.toLowerCase();
  return messages.filter(message => 
    message.content.toLowerCase().includes(lowerQuery) ||
    message.userName.toLowerCase().includes(lowerQuery)
  );
};

// Get user initials for avatar fallback
export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Simulate typing delay
export const simulateTyping = async (callback: () => void, delay: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};