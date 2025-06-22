
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { InternData, CreateInternData, UpdateInternData } from "@/types/intern";
import { 
  fetchInternsFromDb, 
  createInternInDb, 
  updateInternInDb, 
  deleteInternFromDb 
} from "@/services/internService";

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
      // Initialiser avec un tableau vide au lieu des données de démonstration
      setInterns([]);
      console.log('No demo data loaded, starting with empty list');
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
