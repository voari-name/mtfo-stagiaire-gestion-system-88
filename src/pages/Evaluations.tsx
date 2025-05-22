
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Sample data for evaluations
const initialEvaluations = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Rakoto",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    grade: 16,
    comment: "Très bon stagiaire, autonome et créatif."
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Razafy",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    grade: 14,
    comment: "Bon travail, mais peut améliorer sa communication."
  },
  {
    id: 3,
    firstName: "Hery",
    lastName: "Randriamaro",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    grade: 18,
    comment: "Excellent stagiaire, compétences techniques remarquables."
  }
];

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditEvaluation = (evaluation: any) => {
    setCurrentEvaluation({ ...evaluation });
    setIsEditDialogOpen(true);
  };

  const handleSaveEvaluation = () => {
    if (currentEvaluation) {
      setEvaluations(evaluations.map(item => 
        item.id === currentEvaluation.id ? currentEvaluation : item
      ));
      
      setIsEditDialogOpen(false);
      toast({
        title: "Évaluation mise à jour",
        description: `L'évaluation de ${currentEvaluation.firstName} ${currentEvaluation.lastName} a été modifiée.`,
      });
    }
  };

  const handleDeleteEvaluation = (id: number) => {
    setEvaluations(evaluations.filter(item => item.id !== id));
    toast({
      title: "Évaluation supprimée",
      description: "L'évaluation a été supprimée avec succès.",
      variant: "destructive"
    });
  };

  const handleGeneratePdf = (id: number) => {
    const evaluation = evaluations.find(e => e.id === id);
    if (evaluation) {
      toast({
        title: "PDF généré",
        description: `Le fichier PDF pour l'évaluation de ${evaluation.firstName} ${evaluation.lastName} est prêt à être téléchargé.`,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentEvaluation) {
      setCurrentEvaluation({
        ...currentEvaluation,
        [name]: name === "grade" ? parseInt(value, 10) || 0 : value
      });
    }
  };

  return (
    <MainLayout title="Évaluations des stagiaires" currentPage="evaluations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Évaluations</h2>
          <Input
            type="text"
            placeholder="Rechercher une évaluation..."
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {evaluations.map(evaluation => (
            <Card key={evaluation.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-white text-lg font-bold">
                        {evaluation.firstName.charAt(0)}{evaluation.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{evaluation.firstName} {evaluation.lastName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Du {new Date(evaluation.startDate).toLocaleDateString('fr-FR')} au {new Date(evaluation.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Note</p>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold">{evaluation.grade}/20</span>
                          <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-xs">
                            {evaluation.grade >= 16 ? 'Excellent' : 
                             evaluation.grade >= 14 ? 'Très bien' : 
                             evaluation.grade >= 12 ? 'Bien' : 
                             evaluation.grade >= 10 ? 'Passable' : 'Insuffisant'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Commentaire</p>
                        <p className="font-medium">{evaluation.comment}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 flex flex-col justify-center space-y-3 md:w-48">
                    <Button onClick={() => handleGeneratePdf(evaluation.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleEditEvaluation(evaluation)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      </svg>
                      Modifier
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action supprimera définitivement l'évaluation de {evaluation.firstName} {evaluation.lastName}.
                            Cette action ne peut pas être annulée.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteEvaluation(evaluation.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Modifier l'évaluation</DialogTitle>
          </DialogHeader>
          {currentEvaluation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={currentEvaluation.firstName} 
                    onChange={handleInputChange} 
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={currentEvaluation.lastName} 
                    onChange={handleInputChange} 
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input 
                    id="startDate" 
                    name="startDate" 
                    type="date" 
                    value={currentEvaluation.startDate} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="date" 
                    value={currentEvaluation.endDate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Note (sur 20)</Label>
                <Input 
                  id="grade" 
                  name="grade" 
                  type="number" 
                  min="0" 
                  max="20" 
                  value={currentEvaluation.grade}
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Commentaire</Label>
                <Input 
                  id="comment" 
                  name="comment" 
                  value={currentEvaluation.comment} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveEvaluation}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Evaluations;
