
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectData } from "@/hooks/useProjectsData";

type TaskStatus = 'completed' | 'in-progress' | 'not-started';

interface ProjectDetailsProps {
  project: ProjectData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getStatusColor: (status: TaskStatus) => string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  project, 
  open, 
  onOpenChange, 
  getStatusColor 
}) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date de début</p>
              <p className="font-medium">{new Date(project.startDate).toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de fin</p>
              <p className="font-medium">{new Date(project.endDate).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Liste des stagiaires</h3>
            <div className="space-y-4">
              {project.interns.map((intern) => (
                <div key={intern.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold mr-3">
                      {intern.name.split(' ').map((n) => n[0]).join('')}
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
              {project.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(task.status as TaskStatus)}`}></div>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
            <Button>Modifier le projet</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetails;
