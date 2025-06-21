
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useProjectsData } from "@/hooks/useProjectsData";

interface AssignInternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: any[];
  interns: any[];
  onAssignmentSuccess?: () => void;
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
  interns,
  onAssignmentSuccess
}) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [customProject, setCustomProject] = useState("");
  const [selectedIntern, setSelectedIntern] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCustomProject, setIsCustomProject] = useState(false);
  const { toast } = useToast();
  const { assignInternToProject } = useProjectsData();

  const availableInterns = interns.filter(intern => intern.status === 'En cours');

  const handleSubmit = async () => {
    const projectTitle = isCustomProject ? customProject : selectedProject;
    
    if (!projectTitle || !selectedIntern || !startDate || !endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const selectedInternData = availableInterns.find(intern => intern.id === selectedIntern);
    
    if (selectedInternData) {
      try {
        await assignInternToProject(projectTitle, selectedIntern, startDate, endDate);
        
        // Reset form
        setSelectedProject("");
        setCustomProject("");
        setSelectedIntern("");
        setStartDate("");
        setEndDate("");
        setIsCustomProject(false);
        
        if (onAssignmentSuccess) {
          onAssignmentSuccess();
        }
        
        onOpenChange(false);
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const handleProjectChange = (value: string) => {
    if (value === "custom") {
      setIsCustomProject(true);
      setSelectedProject("");
    } else {
      setIsCustomProject(false);
      setSelectedProject(value);
      setCustomProject("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Assigner un stagiaire à un projet
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project">Projet</Label>
            <Select onValueChange={handleProjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un projet" />
              </SelectTrigger>
              <SelectContent>
                {predefinedProjects.map((project, index) => (
                  <SelectItem key={index} value={project}>
                    {project}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Projet personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCustomProject && (
            <div className="space-y-2">
              <Label htmlFor="customProject">Nom du projet personnalisé</Label>
              <Input
                id="customProject"
                value={customProject}
                onChange={(e) => setCustomProject(e.target.value)}
                placeholder="Entrez le nom du projet"
                className="border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="intern">Stagiaire</Label>
            <Select onValueChange={setSelectedIntern}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un stagiaire" />
              </SelectTrigger>
              <SelectContent>
                {availableInterns.map((intern) => (
                  <SelectItem key={intern.id} value={intern.id}>
                    {intern.firstName} {intern.lastName} - {intern.title}
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
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Assigner
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignInternDialog;
