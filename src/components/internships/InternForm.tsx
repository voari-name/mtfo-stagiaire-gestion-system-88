
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InternFormProps {
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
}

export const InternForm = ({ formData, onInputChange, onSelectChange, onPhotoChange }: InternFormProps) => {
  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-3">
        <Label htmlFor="photo" className="text-sm font-semibold text-gray-800">Photo du stagiaire</Label>
        <div className="relative">
          {formData.photo && (
            <div className="mb-4 flex justify-center">
              <img 
                src={formData.photo} 
                alt="Preview" 
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
            </div>
          )}
          <Input 
            id="photo" 
            name="photo" 
            type="file" 
            accept="image/*"
            onChange={onPhotoChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800">Nom *</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={onInputChange}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
            placeholder="Entrez le nom"
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800">Prénom *</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={onInputChange}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
            placeholder="Entrez le prénom"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-800">Email *</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={onInputChange}
          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
          placeholder="exemple@email.com"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="gender" className="text-sm font-semibold text-gray-800">Sexe</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => onSelectChange("gender", value)}
          >
            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
              <SelectValue placeholder="Sélectionnez le sexe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculin">Masculin</SelectItem>
              <SelectItem value="feminin">Féminin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="school" className="text-sm font-semibold text-gray-800">École *</Label>
          <Input 
            id="school" 
            name="school" 
            value={formData.school} 
            onChange={onInputChange}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-200"
            placeholder="Nom de l'école"
            required
          />
        </div>
      </div>
    </div>
  );
};
