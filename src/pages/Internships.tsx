
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternsData } from "@/hooks/useInternsData";

const Internships = () => {
  const { interns, loading, addIntern, deleteIntern } = useInternsData();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    startDate: "",
    endDate: "",
    status: "début",
    gender: "",
    photo: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIntern, setEditingIntern] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, photo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddIntern = async () => {
    try {
      await addIntern({
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: "", // Keep for compatibility but not used in form
        email: formData.email,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status
      });
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        startDate: "",
        endDate: "",
        status: "début",
        gender: "",
        photo: ""
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleEditIntern = (intern: any) => {
    setEditingIntern(intern);
    setFormData({
      firstName: intern.firstName,
      lastName: intern.lastName,
      email: intern.email,
      startDate: intern.startDate,
      endDate: intern.endDate,
      status: intern.status,
      gender: intern.gender || "",
      photo: intern.photo || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteIntern = async (internId: string) => {
    try {
      await deleteIntern(internId);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const renderInternCard = (intern: any) => (
    <Card key={intern.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-white text-lg font-bold">
                {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{intern.firstName} {intern.lastName}</h3>
                <p className="text-sm text-muted-foreground">{intern.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Période</p>
                <p className="font-medium">
                  {new Date(intern.startDate).toLocaleDateString('fr-FR')} au {new Date(intern.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  intern.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                  intern.status === 'fin' ? 'bg-green-100 text-green-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {intern.status === 'en cours' ? 'En cours' : 
                   intern.status === 'fin' ? 'Terminé' : 'À commencer'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button 
              variant="outline"
              onClick={() => handleEditIntern(intern)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera définitivement le stagiaire {intern.firstName} {intern.lastName}.
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => handleDeleteIntern(intern.id)}
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
  );

  if (loading) {
    return (
      <MainLayout title="Stagiaires" currentPage="internships">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Stagiaires" currentPage="internships">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Stagiaires</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M5 12h14" /><path d="M12 5v14" />
                </svg>
                Ajouter un stagiaire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau stagiaire</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Sélectionnez le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculin">Masculin</SelectItem>
                      <SelectItem value="feminin">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo du stagiaire</Label>
                  <Input 
                    id="photo" 
                    name="photo" 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoChange} 
                  />
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
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="début">Début</SelectItem>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="fin">Fin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddIntern}>Ajouter le stagiaire</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Modifier le stagiaire</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editFirstName">Prénom</Label>
                  <Input 
                    id="editFirstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLastName">Nom</Label>
                  <Input 
                    id="editLastName" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input 
                  id="editEmail" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editGender">Sexe</Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger id="editGender">
                    <SelectValue placeholder="Sélectionnez le sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculin">Masculin</SelectItem>
                    <SelectItem value="feminin">Féminin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStartDate">Date de début</Label>
                  <Input 
                    id="editStartDate" 
                    name="startDate" 
                    type="date" 
                    value={formData.startDate} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEndDate">Date de fin</Label>
                  <Input 
                    id="editEndDate" 
                    name="endDate" 
                    type="date" 
                    value={formData.endDate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="editStatus">
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="début">Début</SelectItem>
                    <SelectItem value="en cours">En cours</SelectItem>
                    <SelectItem value="fin">Fin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={() => {
                // Here you would call an update function
                setIsEditDialogOpen(false);
              }}>Sauvegarder</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="ongoing">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="starting">À commencer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {interns.map(renderInternCard)}
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-6">
            {interns.filter(intern => intern.status === 'en cours').map(renderInternCard)}
          </TabsContent>
          
          <TabsContent value="completed">
            {interns.filter(intern => intern.status === 'fin').length > 0 ? (
              interns.filter(intern => intern.status === 'fin').map(renderInternCard)
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun stage terminé pour le moment</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="starting">
            {interns.filter(intern => intern.status === 'début').length > 0 ? (
              interns.filter(intern => intern.status === 'début').map(renderInternCard)
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun stage à commencer pour le moment</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Internships;
