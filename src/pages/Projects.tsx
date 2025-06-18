
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectMenuList from "@/components/projects/ProjectMenuList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { useProjectsData } from "@/hooks/useProjectsData";
import { BarChart3 } from "lucide-react";

const Projects = () => {
  const { projects, loading, addProject } = useProjectsData();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const calculateProgress = (tasks: any[]) => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(task => task.status === "completed").length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleViewStatistics = () => {
    // Pour l'instant, on affiche une notification
    // Plus tard, on pourra ajouter une page ou modal de statistiques
    console.log("Afficher statistiques des projets");
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
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Projets</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="7" height="7" x="3" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/>
                  <rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                Grille
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="8" x2="21" y1="6" y2="6"/>
                  <line x1="8" x2="21" y1="12" y2="12"/>
                  <line x1="8" x2="21" y1="18" y2="18"/>
                  <line x1="3" x2="3.01" y1="6" y2="6"/>
                  <line x1="3" x2="3.01" y1="12" y2="12"/>
                  <line x1="3" x2="3.01" y1="18" y2="18"/>
                </svg>
                Liste
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleViewStatistics}
              className="flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Statistiques
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M5 12h14" /><path d="M12 5v14" />
              </svg>
              Nouveau projet
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {viewMode === 'grid' ? (
              <ProjectsList 
                projects={projects} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <ProjectMenuList 
                projects={projects} 
                onProjectClick={handleViewDetails}
              />
            )}
          </TabsContent>
          
          <TabsContent value="active">
            {viewMode === 'grid' ? (
              <ProjectsList 
                projects={projects.filter(p => p.interns.some(i => i.status === "en cours"))} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <ProjectMenuList 
                projects={projects.filter(p => p.interns.some(i => i.status === "en cours"))} 
                onProjectClick={handleViewDetails}
              />
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {viewMode === 'grid' ? (
              <ProjectsList 
                projects={projects.filter(p => p.interns.every(i => i.status === "fin"))} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <ProjectMenuList 
                projects={projects.filter(p => p.interns.every(i => i.status === "fin"))} 
                onProjectClick={handleViewDetails}
              />
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

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={addProject}
      />
    </MainLayout>
  );
};

export default Projects;
