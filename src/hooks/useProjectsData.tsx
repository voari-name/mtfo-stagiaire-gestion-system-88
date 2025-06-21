
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProjectData {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  interns: Array<{
    id: string;
    name: string;
    status: string;
    completion: number;
  }>;
  tasks: Array<{
    id: string;
    name: string;
    status: 'completed' | 'in-progress' | 'not-started';
  }>;
}

export const useProjectsData = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      // Récupérer les projets avec leurs tâches et stagiaires associés
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          tasks (*),
          project_interns (
            interns (*)
          )
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const formattedProjects = projectsData?.map(project => ({
        id: project.id,
        title: project.title,
        startDate: project.start_date,
        endDate: project.end_date,
        description: project.description,
        tasks: project.tasks?.map((task: any) => ({
          id: task.id,
          name: task.name,
          status: task.status as 'completed' | 'in-progress' | 'not-started'
        })) || [],
        interns: project.project_interns?.map((pi: any) => ({
          id: pi.interns.id,
          name: `${pi.interns.first_name} ${pi.interns.last_name}`,
          status: pi.interns.status,
          completion: pi.interns.completion || 0
        })) || []
      })) || [];

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des projets.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData: Omit<ProjectData, 'id' | 'interns' | 'tasks'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          start_date: projectData.startDate,
          end_date: projectData.endDate,
          description: projectData.description
        }])
        .select()
        .single();

      if (error) throw error;

      const newProject: ProjectData = {
        id: data.id,
        title: data.title,
        startDate: data.start_date,
        endDate: data.end_date,
        description: data.description,
        interns: [],
        tasks: []
      };

      setProjects(prev => [newProject, ...prev]);
      
      toast({
        title: "Projet créé",
        description: `Le projet "${projectData.title}" a été créé avec succès.`,
      });

      return newProject;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const assignInternToProject = async (projectTitle: string, internId: string, startDate: string, endDate: string) => {
    try {
      // D'abord créer le projet s'il n'existe pas
      let { data: existingProject, error: findError } = await supabase
        .from('projects')
        .select('id')
        .eq('title', projectTitle)
        .single();

      let projectId = existingProject?.id;

      if (!projectId) {
        const { data: newProject, error: createError } = await supabase
          .from('projects')
          .insert([{
            title: projectTitle,
            start_date: startDate,
            end_date: endDate,
            description: `Projet assigné à un stagiaire`
          }])
          .select()
          .single();

        if (createError) throw createError;
        projectId = newProject.id;
      }

      // Ensuite assigner le stagiaire au projet
      const { error: assignError } = await supabase
        .from('project_interns')
        .insert([{
          project_id: projectId,
          intern_id: internId
        }]);

      if (assignError) throw assignError;

      // Rafraîchir les données
      await fetchProjects();
      
      toast({
        title: "Assignment réussi",
        description: `Le stagiaire a été assigné au projet "${projectTitle}".`,
      });

      return projectId;
    } catch (error) {
      console.error('Error assigning intern to project:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'assigner le stagiaire au projet.",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    addProject,
    assignInternToProject,
    refetch: fetchProjects
  };
};
