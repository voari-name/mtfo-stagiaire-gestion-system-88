
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { InternForm } from "./InternForm";

interface AddInternDialogProps {
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

export const AddInternDialog = ({
  isOpen,
  onOpenChange,
  formData,
  onInputChange,
  onSelectChange,
  onPhotoChange,
  onSubmit,
  isFormValid
}: AddInternDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un stagiaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Ajouter un nouveau stagiaire</DialogTitle>
        </DialogHeader>
        <InternForm
          formData={formData}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          onPhotoChange={onPhotoChange}
        />
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={!isFormValid}
          >
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
