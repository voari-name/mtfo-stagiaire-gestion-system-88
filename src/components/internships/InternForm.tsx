
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
  isEdit?: boolean;
}

export const InternForm = ({ formData, onInputChange, onSelectChange, onPhotoChange, isEdit = false }: InternFormProps) => {
  return (
    <div className="space-y-8">
      {/* Photo Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <Label htmlFor="photo" className="text-lg font-semibold text-gray-800 mb-4 block">
          Photo du stagiaire
        </Label>
        <div className="flex flex-col items-center space-y-4">
          {formData.photo && (
            <div className="relative">
              <img 
                src={formData.photo} 
                alt="Photo du stagiaire" 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          )}
          <div className="w-full">
            <Input 
              id="photo" 
              name="photo" 
              type="file" 
              accept="image/*"
              onChange={onPhotoChange}
              className="file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100 transition-all duration-200 border-2 border-dashed border-blue-300 hover:border-blue-400 p-4 rounded-lg"
              placeholder={isEdit && formData.photo ? "Changer la photo" : "Choisir une photo"}
            />
            {isEdit && formData.photo && (
              <p className="text-sm text-gray-600 mt-2">Photo actuelle chargée. Sélectionnez un nouveau fichier pour la remplacer.</p>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Informations personnelles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800 flex items-center">
              Nom <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              onChange={onInputChange}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 px-4 py-3"
              placeholder="Entrez le nom"
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800 flex items-center">
              Prénom <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={onInputChange}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 px-4 py-3"
              placeholder="Entrez le prénom"
              required
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-800 flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            Email <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={onInputChange}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 px-4 py-3"
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-3">
            <Label htmlFor="gender" className="text-sm font-semibold text-gray-800">Sexe</Label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => onSelectChange("gender", value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3">
                <SelectValue placeholder="Sélectionnez le sexe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculin">Masculin</SelectItem>
                <SelectItem value="feminin">Féminin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="school" className="text-sm font-semibold text-gray-800 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              École <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input 
              id="school" 
              name="school" 
              value={formData.school} 
              onChange={onInputChange}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 px-4 py-3"
              placeholder="Nom de l'école"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="status" className="text-sm font-semibold text-gray-800 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Statut <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => onSelectChange("status", value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3">
                <SelectValue placeholder="Sélectionnez le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Terminé">Terminé</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
