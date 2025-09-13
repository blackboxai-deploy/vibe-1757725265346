'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/chat';
import { getUserInitials } from '@/lib/chatUtils';

interface UserAvatarProps {
  user: Pick<User, 'name' | 'avatar' | 'status'>;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  showStatus = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500'
  };

  const statusSizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5', 
    lg: 'h-3 w-3'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Avatar className={`${sizeClasses[size]} ring-2 ring-background`}>
        <AvatarImage 
          src={user.avatar} 
          alt={`${user.name}'s avatar`}
          className="object-cover"
        />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
          {getUserInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${statusSizes[size]} rounded-full border-2 border-background ${statusColors[user.status]}`} />
      )}
    </div>
  );
};