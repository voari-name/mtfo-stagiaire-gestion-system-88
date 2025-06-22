
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternsData } from "@/hooks/useInternsData";
import { InternData } from "@/types/intern";
import { InternshipsHeader } from "@/components/internships/InternshipsHeader";
import { InternCard } from "@/components/internships/InternCard";
import { EditInternDialog } from "@/components/internships/EditInternDialog";

const Internships = () => {
  const { interns, loading, addIntern, updateIntern, deleteIntern, refetch } = useInternsData();
  const [formData, setFormData] = useState({
    photo: "",
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    school: "",
    status: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIntern, setEditingIntern] = useState<InternData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Rafraîchir automatiquement la liste
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [refetch]);

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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.school || !formData.status) {
      return;
    }

    try {
      await addIntern({
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.school, 
        email: formData.email,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: formData.status,
        photo: formData.photo,
        gender: formData.gender
      });
      
      setFormData({
        photo: "",
        lastName: "",
        firstName: "",
        email: "",
        gender: "",
        school: "",
        status: ""
      });
      
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleEditIntern = (intern: InternData) => {
    setEditingIntern(intern);
    setFormData({
      photo: intern.photo || "",
      lastName: intern.lastName,
      firstName: intern.firstName,
      email: intern.email,
      gender: intern.gender || "",
      school: intern.title || "",
      status: intern.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateIntern = async () => {
    if (!editingIntern || !formData.firstName || !formData.lastName || !formData.email || !formData.school || !formData.status) {
      return;
    }

    try {
      await updateIntern(editingIntern.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.school,
        email: formData.email,
        status: formData.status,
        photo: formData.photo,
        gender: formData.gender,
        startDate: editingIntern.startDate,
        endDate: editingIntern.endDate
      });
      
      setIsEditDialogOpen(false);
      setEditingIntern(null);
      refetch();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleDeleteIntern = async (internId: string) => {
    try {
      await deleteIntern(internId);
      refetch();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const filteredInterns = interns.filter(intern =>
    intern.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFormValid = !!(formData.firstName && formData.lastName && formData.email && formData.school && formData.status);

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
        <InternshipsHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          addDialogProps={{
            isOpen: isDialogOpen,
            onOpenChange: setIsDialogOpen,
            formData,
            onInputChange: handleInputChange,
            onSelectChange: handleSelectChange,
            onPhotoChange: handlePhotoChange,
            onSubmit: handleAddIntern,
            isFormValid
          }}
        />

        <EditInternDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          formData={formData}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleUpdateIntern}
          isFormValid={isFormValid}
        />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50 p-1 rounded-xl">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-medium">
              Tous ({filteredInterns.length})
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-medium">
              En cours ({filteredInterns.filter(intern => intern.status === 'En cours').length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredInterns.length > 0 ? (
              <div className="grid gap-6">
                {filteredInterns.map(intern => (
                  <InternCard
                    key={intern.id}
                    intern={intern}
                    onEdit={handleEditIntern}
                    onDelete={handleDeleteIntern}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">Aucun stagiaire trouvé</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-6">
            {filteredInterns.filter(intern => intern.status === 'En cours').map(intern => (
              <InternCard
                key={intern.id}
                intern={intern}
                onEdit={handleEditIntern}
                onDelete={handleDeleteIntern}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Internships;
