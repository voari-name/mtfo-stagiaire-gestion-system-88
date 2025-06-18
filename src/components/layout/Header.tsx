
import React from "react";
import { NotificationBar } from "./NotificationBar";

interface HeaderProps {
  title: string;
  username?: string;
}

export const Header = ({ title, username = "" }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-blue-900 shadow-sm z-10 animate-fade-in">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-blue-100">{title}</h1>
        <div className="flex items-center space-x-4">
          <NotificationBar />
          {username && (
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/aa26c95a-6bcd-4977-bfdb-74e3d159fee8.png" 
                alt="User Avatar" 
                className="h-10 w-10 rounded-full object-cover hover-scale transition-transform duration-300"
              />
              <span className="text-sm text-gray-600 dark:text-blue-200">Bienvenue, {username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
