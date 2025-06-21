
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
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des stagiaires.",
        variant: "destructive"
      });
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
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le stagiaire.",
        variant: "destructive"
      });
      throw error;
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
      toast({
        title: "Erreur",
        description: "Impossible de modifier le stagiaire.",
        variant: "destructive"
      });
      throw error;
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
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le stagiaire.",
        variant: "destructive"
      });
      throw error;
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
