
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CreateInternDialogProps {
  onInternCreated: (intern: any) => void;
}

export const CreateInternDialog = ({ onInternCreated }: CreateInternDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    startDate: "",
    endDate: "",
    status: "début"
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.title || !formData.startDate || !formData.endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive"
      });
      return;
    }

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (endDate <= startDate) {
      toast({
        title: "Erreur",
        description: "La date de fin doit être postérieure à la date de début",
        variant: "destructive"
      });
      return;
    }

    const newIntern = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      completion: 0
    };

    onInternCreated(newIntern);
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      startDate: "",
      endDate: "",
      status: "début"
    });
    
    setIsOpen(false);
    
    toast({
      title: "Stagiaire ajouté",
      description: `${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover-scale transition-all duration-300 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>
          Ajouter un stagiaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800">Nouveau stagiaire</DialogTitle>
          <DialogDescription>
            Formulaire d'ajout d'un nouveau stagiaire
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange}
                className="transition-all duration-300 focus:scale-105"
                placeholder="Prénom du stagiaire"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange}
                className="transition-all duration-300 focus:scale-105"
                placeholder="Nom du stagiaire"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleInputChange}
              className="transition-all duration-300 focus:scale-105"
              placeholder="email@exemple.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Titre du stage *</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange}
              className="transition-all duration-300 focus:scale-105"
              placeholder="Ex: Développement web, Administration système..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate} 
                onChange={handleInputChange}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin *</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                value={formData.endDate} 
                onChange={handleInputChange}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger className="transition-all duration-300 focus:scale-105">
                <SelectValue placeholder="Sélectionnez le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="début">Début</SelectItem>
                <SelectItem value="en cours">En cours</SelectItem>
                <SelectItem value="terminé">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="hover-scale transition-all duration-300">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="hover-scale transition-all duration-300">
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
