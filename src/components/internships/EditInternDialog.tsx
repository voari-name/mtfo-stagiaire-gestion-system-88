
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InternForm } from "./InternForm";

interface EditInternDialogProps {
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
}

export const EditInternDialog = ({
  isOpen,
  onOpenChange,
  formData,
  onInputChange,
  onSelectChange,
  onPhotoChange,
  onSubmit,
  isFormValid
}: EditInternDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-blue-100">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Modifier le stagiaire
          </DialogTitle>
          <p className="text-gray-600 mt-2">Modifiez les informations du stagiaire</p>
        </DialogHeader>
        <div className="py-6">
          <InternForm
            formData={formData}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            onPhotoChange={onPhotoChange}
            isEdit={true}
          />
        </div>
        <div className="flex justify-end space-x-4 pt-6 border-t border-blue-100">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 transition-all duration-200"
          >
            Annuler
          </Button>
          <Button 
            onClick={onSubmit}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            disabled={!isFormValid}
          >
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
