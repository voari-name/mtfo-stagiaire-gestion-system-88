
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddInternDialog } from "./AddInternDialog";

interface InternshipsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  addDialogProps: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    formData: {
      photo: string;
      lastName: string;
      firstName: string;
      email: string;
      gender: string;
      school: string;
      status: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (name: string, value: string) => void;
    onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    isFormValid: boolean;
  };
}

export const InternshipsHeader = ({ searchTerm, onSearchChange, addDialogProps }: InternshipsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Gestion des Stagiaires</h2>
        <p className="text-gray-600 mt-2">Gérez vos stagiaires et suivez leur progression</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un stagiaire..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full sm:w-64 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
        </div>
        
        <AddInternDialog {...addDialogProps} />
      </div>
    </div>
  );
};
