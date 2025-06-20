
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import AssignInternDialog from "@/components/projects/AssignInternDialog";
import { useProjectsData } from "@/hooks/useProjectsData";
import { useInternsData } from "@/hooks/useInternsData";

const Projects = () => {
  const { projects, loading, refetch } = useProjectsData();
  const { interns } = useInternsData();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  // Rafraîchir automatiquement la liste des projets
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetch]);

  const calculateProgress = (tasks: any[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedCount = tasks.filter(task => task.status === "completed").length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "not-started": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  // Filtrer les projets en cours et terminés
  const ongoingProjects = projects.filter(p => {
    if (!p.interns || p.interns.length === 0) return false;
    return p.interns.some(i => i.status === "en cours");
  });

  const completedProjects = projects.filter(p => {
    if (!p.interns || p.interns.length === 0) return false;
    return p.interns.some(i => i.status === "terminé");
  });

  if (loading) {
    return (
      <MainLayout title="Gestion des projets" currentPage="projects">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Gestion des Projets</h2>
            <p className="text-gray-600 mt-2">Assignez des stagiaires aux projets et suivez leur progression</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button 
              onClick={() => setIsAssignDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="m19 8 2 2-2 2" />
                <path d="m17 10 2 2-2 2" />
              </svg>
              Assigner un stagiaire
            </Button>
          </div>
        </div>

        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="mb-6 bg-blue-50 p-1 rounded-xl">
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-medium">
              En cours ({ongoingProjects.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-medium">
              Terminés ({completedProjects.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing">
            {ongoingProjects.length > 0 ? (
              <ProjectsList 
                projects={ongoingProjects} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun projet en cours</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedProjects.length > 0 ? (
              <ProjectsList 
                projects={completedProjects} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun projet terminé</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <ProjectDetails 
        project={selectedProject} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
        getStatusColor={getStatusColor}
      />

      <AssignInternDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        projects={projects}
        interns={interns}
        onAssignmentSuccess={() => {
          refetch();
          setIsAssignDialogOpen(false);
        }}
      />
    </MainLayout>
  );
};

export default Projects;
