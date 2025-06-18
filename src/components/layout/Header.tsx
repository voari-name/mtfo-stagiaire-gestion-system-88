
import React from "react";
import { NotificationBar } from "./NotificationBar";

interface HeaderProps {
  title: string;
  username?: string;
}

export const Header = ({ title, username = "" }: HeaderProps) => {
  // Get initials from username if provided
  const initials = username
    ? username
        .split(' ')
        .map(name => name[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : "";

  return (
    <header className="bg-white dark:bg-blue-900 shadow-sm z-10 animate-fade-in">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-blue-100">{title}</h1>
        <div className="flex items-center space-x-4">
          <NotificationBar />
          {username && (
            <>
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                  alt="User Avatar" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-blue-200">Bienvenue, {username}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-800 dark:bg-blue-600 flex items-center justify-center text-white text-sm hover-scale transition-all duration-300">
                {initials}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
