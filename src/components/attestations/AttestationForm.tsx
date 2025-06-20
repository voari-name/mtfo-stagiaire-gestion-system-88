
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateImprovedAttestationPDF } from "@/utils/attestationPdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface AttestationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intern: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  project?: {
    title: string;
  };
  evaluation?: {
    grade: number;
  };
}

const AttestationForm: React.FC<AttestationFormProps> = ({
  open,
  onOpenChange,
  intern,
  project,
  evaluation
}) => {
  const [formData, setFormData] = useState({
    firstName: intern.firstName,
    lastName: intern.lastName,
    student: "Étudiant",
    startDate: "",
    endDate: "",
    grade: evaluation?.grade || 0
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownloadPDF = () => {
    if (!formData.startDate || !formData.endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les dates de début et de fin.",
        variant: "destructive"
      });
      return;
    }

    generateImprovedAttestationPDF({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: intern.email,
      student: formData.student,
      startDate: formData.startDate,
      endDate: formData.endDate,
      projectTitle: project?.title,
      grade: formData.grade
    });
    
    toast({
      title: "Attestation générée",
      description: "L'attestation a été téléchargée avec succès.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Attestation sauvegardée",
      description: "Les informations de l'attestation ont été sauvegardées.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Formulaire d'Attestation
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="student" className="text-sm font-semibold text-gray-800">Étudiant</Label>
            <Input
              id="student"
              name="student"
              value={formData.student}
              onChange={handleInputChange}
              placeholder="École/Université"
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-semibold text-gray-800">Date de début</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-semibold text-gray-800">Date de fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade" className="text-sm font-semibold text-gray-800">Note de stage sur 20</Label>
            <Input
              id="grade"
              name="grade"
              type="number"
              min="0"
              max="20"
              step="0.5"
              value={formData.grade}
              onChange={handleInputChange}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="outline" onClick={handleSave} className="border-green-300 text-green-700 hover:bg-green-50">
            Enregistrer
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
            Télécharger PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttestationForm;
