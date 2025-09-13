'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EmojiPicker } from '@/components/EmojiPicker';
import { useChat } from '@/hooks/useChat';
import { useUserInteractions } from '@/hooks/useChat';

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  
  const { sendMessage, currentRoom } = useChat();
  const { setUserTyping } = useUserInteractions();

  // Handle typing indicators
  useEffect(() => {
    if (message.trim() && !isTyping) {
      setIsTyping(true);
      setUserTyping(true);
    } else if (!message.trim() && isTyping) {
      setIsTyping(false);
      setUserTyping(false);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    if (message.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setUserTyping(false);
      }, 3000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, setUserTyping]);

  const handleSendMessage = () => {
    if (!message.trim() || !currentRoom) return;
    
    sendMessage(message.trim());
    setMessage('');
    setIsTyping(false);
    setUserTyping(false);
    
    // Focus back to textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage = message.slice(0, start) + emoji + message.slice(end);
      setMessage(newMessage);
      
      // Move cursor after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setMessage(prev => prev + emoji);
    }
  };

  if (!currentRoom) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          Select a room to start messaging
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-end gap-3">
        {/* Emoji Picker */}
        <div className="flex-shrink-0">
          <EmojiPicker
            onEmojiSelect={handleEmojiSelect}
            isOpen={isEmojiPickerOpen}
            onClose={() => setIsEmojiPickerOpen(false)}
          />
        </div>
        
        {/* Message Input */}
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Message #${currentRoom.name}...`}
            className="min-h-[40px] max-h-32 resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            rows={1}
            style={{
              height: 'auto',
              overflowY: message.split('\n').length > 3 ? 'scroll' : 'hidden'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
        </div>
        
        {/* Send Button */}
        <div className="flex-shrink-0">
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="sm"
            className="h-10 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm font-medium">Send</span>
          </Button>
        </div>
      </div>
      
      {/* Input helper text */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {message.length > 0 && (
          <span className={message.length > 500 ? 'text-red-500' : ''}>
            {message.length}/1000
          </span>
        )}
      </div>
    </div>
  );
};