
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
    <header className="bg-white shadow-sm z-10 animate-fade-in">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <NotificationBar />
          {username && (
            <>
              <span className="text-sm text-gray-600">Bienvenue, {username}</span>
              <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm hover-scale transition-all duration-300">
                {initials}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
