
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample interns data (instead of importing from Internships)
const interns = [
  { id: 1, name: "Jean Rakoto", status: "en cours", completion: 65 },
  { id: 2, name: "Marie Razafy", status: "en cours", completion: 45 },
  { id: 3, name: "Hery Randriamaro", status: "fin", completion: 100 }
];

// Sample projects data
const initialProjects = [
  {
    id: 1,
    title: "Développement Web",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    interns: [
      { id: 1, name: "Jean Rakoto", status: "en cours", completion: 65 }
    ],
    tasks: [
      { id: 1, name: "Conception de la base de données", status: "completed" },
      { id: 2, name: "Développement Frontend", status: "in-progress" },
      { id: 3, name: "Intégration API", status: "not-started" }
    ]
  },
  {
    id: 2,
    title: "Gestion de Projet",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    interns: [
      { id: 2, name: "Marie Razafy", status: "en cours", completion: 45 }
    ],
    tasks: [
      { id: 1, name: "Analyse des besoins", status: "completed" },
      { id: 2, name: "Planification", status: "completed" },
      { id: 3, name: "Suivi du projet", status: "in-progress" }
    ]
  },
  {
    id: 3,
    title: "Analyse de données",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    interns: [
      { id: 3, name: "Hery Randriamaro", status: "fin", completion: 100 }
    ],
    tasks: [
      { id: 1, name: "Collecte des données", status: "completed" },
      { id: 2, name: "Nettoyage des données", status: "completed" },
      { id: 3, name: "Analyse et visualisation", status: "completed" }
    ]
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to calculate overall project progress
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

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => {
                const progress = calculateProgress(project.tasks);
                return (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge variant={project.interns[0].status === "fin" ? "outline" : "default"}>
                          {project.interns[0].status === "fin" ? "Terminé" : "En cours"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Période</p>
                          <p className="font-medium">
                            {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">Progression</span>
                            <span className="text-sm font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                          <div className="space-y-2">
                            {project.interns.map(intern => (
                              <div key={intern.id} className="flex items-center justify-between">
                                <span className="text-sm">{intern.name}</span>
                                <Badge variant="outline" className={
                                  intern.status === 'fin' ? 'border-green-500 text-green-700 bg-green-50' : 
                                  intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                                  'border-amber-500 text-amber-700 bg-amber-50'
                                }>
                                  {intern.status === 'fin' ? 'Terminé' : 
                                   intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleViewDetails(project)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.interns.some(i => i.status === "en cours")).map(project => {
                const progress = calculateProgress(project.tasks);
                return (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    {/* Same card content structure as "all" tab */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge>En cours</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Période</p>
                          <p className="font-medium">
                            {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">Progression</span>
                            <span className="text-sm font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                          <div className="space-y-2">
                            {project.interns.map(intern => (
                              <div key={intern.id} className="flex items-center justify-between">
                                <span className="text-sm">{intern.name}</span>
                                <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50">
                                  En cours
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleViewDetails(project)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.interns.every(i => i.status === "fin")).map(project => {
                return (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    {/* Content similar to other tabs but with "Terminé" badge */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge variant="outline">Terminé</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Période</p>
                          <p className="font-medium">
                            {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">Progression</span>
                            <span className="text-sm font-medium">100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                          <div className="space-y-2">
                            {project.interns.map(intern => (
                              <div key={intern.id} className="flex items-center justify-between">
                                <span className="text-sm">{intern.name}</span>
                                <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
                                  Terminé
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleViewDetails(project)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date de début</p>
                  <p className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date de fin</p>
                  <p className="font-medium">{new Date(selectedProject.endDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Liste des stagiaires</h3>
                <div className="space-y-4">
                  {selectedProject.interns.map((intern: any) => (
                    <div key={intern.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold mr-3">
                          {intern.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{intern.name}</h4>
                          <div className="flex items-center">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${intern.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{intern.completion}% complété</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={
                        intern.status === 'fin' ? 'border-green-500 text-green-700 bg-green-50' : 
                        intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                        'border-amber-500 text-amber-700 bg-amber-50'
                      }>
                        {intern.status === 'fin' ? 'Terminé' : 
                         intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Gestion des tâches</h3>
                <div className="space-y-2">
                  {selectedProject.tasks.map((task: any) => (
                    <div key={task.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(task.status)}`}></div>
                        <span>{task.name}</span>
                      </div>
                      <Badge variant={
                        task.status === 'completed' ? 'default' : 
                        task.status === 'in-progress' ? 'secondary' : 'outline'
                      }>
                        {task.status === 'completed' ? 'Terminé' : 
                         task.status === 'in-progress' ? 'En cours' : 'À faire'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Fermer</Button>
                <Button>Modifier le projet</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Projects;
