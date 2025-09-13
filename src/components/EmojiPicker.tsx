'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { emojiCategories } from '@/lib/chatUtils';
import { EmojiPickerProps } from '@/types/chat';

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ 
  onEmojiSelect, 
  isOpen, 
  onClose 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(emojiCategories[0].name);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open emoji picker"
        >
          😊
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        align="start"
        side="top"
      >
        <div className="border-b p-2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
            Choose an emoji
          </h4>
        </div>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
            {emojiCategories.map((category) => (
              <TabsTrigger 
                key={category.name}
                value={category.name}
                className="text-xs px-2 py-1"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {emojiCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="m-0">
              <ScrollArea className="h-48">
                <div className="grid grid-cols-8 gap-1 p-2">
                  {category.emojis.map((emoji, index) => (
                    <Button
                      key={`${category.name}-${index}`}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-lg"
                      onClick={() => handleEmojiClick(emoji)}
                      aria-label={`Select ${emoji} emoji`}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="border-t p-2 text-xs text-gray-500 dark:text-gray-400">
          Click an emoji to add it to your message
        </div>
      </PopoverContent>
    </Popover>
  );
};