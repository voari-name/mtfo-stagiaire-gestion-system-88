
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
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import { useInternsData } from "@/hooks/useInternsData";

const Internships = () => {
  const { interns, loading, addIntern, deleteIntern } = useInternsData();
  const [formData, setFormData] = useState({
    photo: "",
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    startDate: "",
    endDate: "",
    status: "début"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
        title: "", 
        email: formData.email,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status
      });
      
      setFormData({
        photo: "",
        lastName: "",
        firstName: "",
        email: "",
        gender: "",
        startDate: "",
        endDate: "",
        status: "début"
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleEditIntern = (intern: any) => {
    setEditingIntern(intern);
    setFormData({
      photo: intern.photo || "",
      lastName: intern.lastName,
      firstName: intern.firstName,
      email: intern.email,
      gender: intern.gender || "",
      startDate: intern.startDate,
      endDate: intern.endDate,
      status: intern.status
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

  const filteredInterns = interns.filter(intern =>
    intern.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const InternForm = ({ isEdit = false }) => (
    <div className="grid gap-6 py-4">
      <div className="space-y-3">
        <Label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo du stagiaire</Label>
        <Input 
          id="photo" 
          name="photo" 
          type="file" 
          accept="image/*"
          onChange={handlePhotoChange}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le nom"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le prénom"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleInputChange}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="exemple@email.com"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Sexe</Label>
        <Select 
          value={formData.gender} 
          onValueChange={(value) => handleSelectChange("gender", value)}
        >
          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <SelectValue placeholder="Sélectionnez le sexe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculin">Masculin</SelectItem>
            <SelectItem value="feminin">Féminin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">Date de début</Label>
          <Input 
            id="startDate" 
            name="startDate" 
            type="date" 
            value={formData.startDate} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">Date de fin</Label>
          <Input 
            id="endDate" 
            name="endDate" 
            type="date" 
            value={formData.endDate} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="status" className="text-sm font-medium text-gray-700">Statut</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value) => handleSelectChange("status", value)}
        >
          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="début">Début</SelectItem>
            <SelectItem value="en cours">En cours</SelectItem>
            <SelectItem value="terminé">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderInternCard = (intern: any) => (
    <Card key={intern.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">{intern.firstName} {intern.lastName}</h3>
                <p className="text-sm text-gray-600">{intern.email}</p>
                <p className="text-xs text-gray-500 capitalize">{intern.gender || 'Non spécifié'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 font-medium">Période de stage</p>
                <p className="font-semibold text-gray-800">
                  {new Date(intern.startDate).toLocaleDateString('fr-FR')} 
                  <span className="text-gray-500 mx-2">→</span>
                  {new Date(intern.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 font-medium">Statut</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  intern.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                  intern.status === 'terminé' ? 'bg-green-100 text-green-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {intern.status === 'en cours' ? 'En cours' : 
                   intern.status === 'terminé' ? 'Terminé' : 'À commencer'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button 
              variant="outline"
              onClick={() => handleEditIntern(intern)}
              className="border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200">
                  <Trash2 className="w-4 h-4 mr-2" />
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Gestion des Stagiaires</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un stagiaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <InternForm />
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleAddIntern}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Enregistrer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">Modifier le stagiaire</DialogTitle>
            </DialogHeader>
            <InternForm isEdit={true} />
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Sauvegarder
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-blue-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Tous ({filteredInterns.length})
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              En cours ({filteredInterns.filter(intern => intern.status === 'en cours').length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Terminés ({filteredInterns.filter(intern => intern.status === 'terminé').length})
            </TabsTrigger>
            <TabsTrigger value="starting" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              À commencer ({filteredInterns.filter(intern => intern.status === 'début').length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredInterns.length > 0 ? (
              <div className="grid gap-6">
                {filteredInterns.map(renderInternCard)}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">Aucun stagiaire trouvé</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-6">
            {filteredInterns.filter(intern => intern.status === 'en cours').map(renderInternCard)}
          </TabsContent>
          
          <TabsContent value="completed">
            {filteredInterns.filter(intern => intern.status === 'terminé').length > 0 ? (
              <div className="grid gap-6">
                {filteredInterns.filter(intern => intern.status === 'terminé').map(renderInternCard)}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">Aucun stage terminé pour le moment</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="starting">
            {filteredInterns.filter(intern => intern.status === 'début').length > 0 ? (
              <div className="grid gap-6">
                {filteredInterns.filter(intern => intern.status === 'début').map(renderInternCard)}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">Aucun stage à commencer pour le moment</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Internships;
