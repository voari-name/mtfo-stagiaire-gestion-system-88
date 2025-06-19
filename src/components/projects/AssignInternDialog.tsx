
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AssignInternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: any[];
  interns: any[];
}

const AssignInternDialog: React.FC<AssignInternDialogProps> = ({
  open,
  onOpenChange,
  projects,
  interns
}) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    projectTitle: "",
    startDate: "",
    endDate: "",
    status: "en cours"
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.lastName || !formData.firstName || !formData.projectTitle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    console.log("Assigning intern to project:", formData);
    
    toast({
      title: "Stagiaire assigné",
      description: `${formData.firstName} ${formData.lastName} a été assigné au projet "${formData.projectTitle}".`,
    });

    setFormData({
      lastName: "",
      firstName: "",
      projectTitle: "",
      startDate: "",
      endDate: "",
      status: "en cours"
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      lastName: "",
      firstName: "",
      projectTitle: "",
      startDate: "",
      endDate: "",
      status: "en cours"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Assigner un stagiaire à un projet
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Nom du stagiaire"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Prénom du stagiaire"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectTitle">Intitulé du projet *</Label>
            <Select 
              value={formData.projectTitle} 
              onValueChange={(value) => handleSelectChange("projectTitle", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Sélectionnez un projet" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.title}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en cours">En cours</SelectItem>
                <SelectItem value="terminé">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignInternDialog;
