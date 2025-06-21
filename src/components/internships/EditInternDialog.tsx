
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Modifier le stagiaire</DialogTitle>
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
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
