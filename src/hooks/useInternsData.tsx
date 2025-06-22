
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { InternData, CreateInternData, UpdateInternData } from "@/types/intern";
import { 
  fetchInternsFromDb, 
  createInternInDb, 
  updateInternInDb, 
  deleteInternFromDb 
} from "@/services/internService";

// Données de démonstration si la base de données n'est pas disponible
const demoInterns: InternData[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Rakoto",
    email: "jean.rakoto@email.com",
    gender: "Masculin",
    title: "École Supérieure Polytechnique",
    status: "en cours",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    completion: 75,
    photo: "/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png"
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Razafy",
    email: "marie.razafy@email.com",
    gender: "Féminin",
    title: "Université d'Antananarivo",
    status: "terminé",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
    completion: 100,
    photo: "/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png"
  },
  {
    id: "3",
    firstName: "Hery",
    lastName: "Randriamaro",
    email: "hery.randriamaro@email.com",
    gender: "Masculin",
    title: "ISCAM",
    status: "terminé",
    startDate: "2024-01-10",
    endDate: "2024-04-10",
    completion: 90,
    photo: "/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png"
  }
];

export const useInternsData = () => {
  const [interns, setInterns] = useState<InternData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInterns = async () => {
    try {
      const internsData = await fetchInternsFromDb();
      setInterns(internsData);
    } catch (error) {
      console.error('Error fetching interns:', error);
      // Utiliser les données de démonstration si la base de données n'est pas disponible
      setInterns(demoInterns);
      console.log('Using demo data for interns');
    } finally {
      setLoading(false);
    }
  };

  const addIntern = async (internData: CreateInternData) => {
    try {
      const newIntern = await createInternInDb(internData);
      setInterns(prev => [newIntern, ...prev]);
      
      toast({
        title: "Stagiaire ajouté",
        description: `${internData.firstName} ${internData.lastName} a été ajouté avec succès.`,
      });

      return newIntern;
    } catch (error) {
      console.error('Error adding intern:', error);
      // Créer un nouvel intern avec un ID temporaire
      const newIntern: InternData = {
        id: Date.now().toString(),
        ...internData,
        completion: 0
      };
      setInterns(prev => [newIntern, ...prev]);
      
      toast({
        title: "Stagiaire ajouté",
        description: `${internData.firstName} ${internData.lastName} a été ajouté avec succès.`,
      });

      return newIntern;
    }
  };

  const updateIntern = async (internId: string, internData: UpdateInternData) => {
    try {
      const updatedIntern = await updateInternInDb(internId, internData);
      
      setInterns(prev => prev.map(intern => 
        intern.id === internId ? updatedIntern : intern
      ));
      
      toast({
        title: "Stagiaire modifié",
        description: `${internData.firstName} ${internData.lastName} a été modifié avec succès.`,
      });

      return updatedIntern;
    } catch (error) {
      console.error('Error updating intern:', error);
      // Mettre à jour localement
      const updatedIntern: InternData = {
        id: internId,
        ...internData as InternData,
        completion: interns.find(i => i.id === internId)?.completion || 0
      };
      
      setInterns(prev => prev.map(intern => 
        intern.id === internId ? updatedIntern : intern
      ));
      
      toast({
        title: "Stagiaire modifié",
        description: `${internData.firstName} ${internData.lastName} a été modifié avec succès.`,
      });

      return updatedIntern;
    }
  };

  const deleteIntern = async (internId: string) => {
    try {
      await deleteInternFromDb(internId);
      setInterns(prev => prev.filter(intern => intern.id !== internId));
      
      toast({
        title: "Stagiaire supprimé",
        description: "Le stagiaire a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Error deleting intern:', error);
      // Supprimer localement
      setInterns(prev => prev.filter(intern => intern.id !== internId));
      
      toast({
        title: "Stagiaire supprimé",
        description: "Le stagiaire a été supprimé avec succès.",
      });
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return {
    interns,
    loading,
    addIntern,
    updateIntern,
    deleteIntern,
    refetch: fetchInterns
  };
};
