
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface InternData {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  startDate: string;
  endDate: string;
  status: string;
  completion?: number;
}

export const useInternsData = () => {
  const [interns, setInterns] = useState<InternData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInterns = async () => {
    try {
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedInterns = data?.map(intern => ({
        id: intern.id,
        firstName: intern.first_name,
        lastName: intern.last_name,
        title: intern.title,
        email: intern.email,
        startDate: intern.start_date,
        endDate: intern.end_date,
        status: intern.status,
        completion: intern.completion || 0
      })) || [];

      setInterns(formattedInterns);
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

  const addIntern = async (internData: Omit<InternData, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('interns')
        .insert([{
          first_name: internData.firstName,
          last_name: internData.lastName,
          title: internData.title,
          email: internData.email,
          start_date: internData.startDate,
          end_date: internData.endDate,
          status: internData.status,
          completion: internData.completion || 0
        }])
        .select()
        .single();

      if (error) throw error;

      const newIntern: InternData = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        title: data.title,
        email: data.email,
        startDate: data.start_date,
        endDate: data.end_date,
        status: data.status,
        completion: data.completion || 0
      };

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

  useEffect(() => {
    fetchInterns();
  }, []);

  return {
    interns,
    loading,
    addIntern,
    refetch: fetchInterns
  };
};
