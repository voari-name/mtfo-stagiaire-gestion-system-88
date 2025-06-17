
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { useProjectsData } from "@/hooks/useProjectsData";

const Projects = () => {
  const { projects, loading, addProject } = useProjectsData();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const calculateProgress = (tasks: any[]) => {
    if (tasks.length === 0) return 0;
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            Nouveau projet
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <ProjectsList 
              projects={projects} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          
          <TabsContent value="active">
            <ProjectsList 
              projects={projects.filter(p => p.interns.some(i => i.status === "en cours"))} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <ProjectsList 
              projects={projects.filter(p => p.interns.every(i => i.status === "fin"))} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ProjectDetails 
        project={selectedProject} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
        getStatusColor={getStatusColor}
      />

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={addProject}
      />
    </MainLayout>
  );
};

export default Projects;
