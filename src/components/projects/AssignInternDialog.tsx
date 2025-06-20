
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AssignInternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: any[];
  interns: any[];
}

const predefinedProjects = [
  "Développement d'une application de gestion des stagiaires",
  "Création d'un site web vitrine pour une entreprise",
  "Mise en place d'un système de gestion de stock",
  "Développement d'un chatbot avec intelligence artificielle",
  "Sécurisation d'un réseau local d'entreprise",
  "Création d'une application mobile pour la réservation de services",
  "Automatisation d'un processus administratif avec Python",
  "Intégration d'une base de données pour une plateforme e-commerce",
  "Déploiement d'un serveur web avec Linux et Apache/Nginx",
  "Mise en œuvre d'un système de sauvegarde et de récupération de données"
];

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
    customProject: "",
    useCustomProject: false,
    startDate: "",
    endDate: "",
    status: "en cours"
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (name === "projectTitle" && value === "custom") {
      setFormData(prev => ({ ...prev, useCustomProject: true, projectTitle: "" }));
    } else if (name === "projectTitle") {
      setFormData(prev => ({ ...prev, useCustomProject: false, customProject: "" }));
    }
  };

  const handleSave = () => {
    const finalProjectTitle = formData.useCustomProject ? formData.customProject : formData.projectTitle;
    
    if (!formData.lastName || !formData.firstName || !finalProjectTitle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    console.log("Assigning intern to project:", {
      ...formData,
      finalProjectTitle
    });
    
    toast({
      title: "Stagiaire assigné",
      description: `${formData.firstName} ${formData.lastName} a été assigné au projet "${finalProjectTitle}".`,
    });

    setFormData({
      lastName: "",
      firstName: "",
      projectTitle: "",
      customProject: "",
      useCustomProject: false,
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
      customProject: "",
      useCustomProject: false,
      startDate: "",
      endDate: "",
      status: "en cours"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Assigner un stagiaire à un projet
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800">Nom *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Nom du stagiaire"
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800">Prénom *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Prénom du stagiaire"
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="projectTitle" className="text-sm font-semibold text-gray-800">Sélectionner un projet *</Label>
            <Select 
              value={formData.useCustomProject ? "custom" : formData.projectTitle} 
              onValueChange={(value) => handleSelectChange("projectTitle", value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                <SelectValue placeholder="Choisissez un projet dans la liste" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {predefinedProjects.map((project, index) => (
                  <SelectItem key={index} value={project} className="py-3">
                    {project}
                  </SelectItem>
                ))}
                <SelectItem value="custom" className="font-semibold text-blue-600 py-3">
                  ✏️ Saisir un projet personnalisé
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.useCustomProject && (
            <div className="space-y-2">
              <Label htmlFor="customProject" className="text-sm font-semibold text-gray-800">Projet personnalisé *</Label>
              <Textarea
                id="customProject"
                name="customProject"
                value={formData.customProject}
                onChange={handleInputChange}
                placeholder="Décrivez le projet personnalisé..."
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg min-h-20"
              />
            </div>
          )}

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
            <Label htmlFor="status" className="text-sm font-semibold text-gray-800">Statut</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
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
          <Button variant="outline" onClick={handleCancel} className="px-6">
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6">
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignInternDialog;
