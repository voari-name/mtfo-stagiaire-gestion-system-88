
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

  const safeInterns = project.interns || [];
  const safeTasks = project.tasks || [];

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
            <h3 className="font-semibold mb-3">Liste des stagiaires ({safeInterns.length})</h3>
            {safeInterns.length > 0 ? (
              <div className="space-y-4">
                {safeInterns.map((intern, index) => (
                  <div key={intern.id || index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold mr-3">
                        {intern.name ? intern.name.split(' ').map((n) => n[0]).join('') : 'N/A'}
                      </div>
                      <div>
                        <h4 className="font-medium">{intern.name || 'Nom non disponible'}</h4>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${intern.completion || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{intern.completion || 0}% complété</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      intern.status === 'terminé' ? 'border-green-500 text-green-700 bg-green-50' : 
                      intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                      'border-amber-500 text-amber-700 bg-amber-50'
                    }>
                      {intern.status === 'terminé' ? 'Terminé' : 
                       intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun stagiaire assigné</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Gestion des tâches ({safeTasks.length})</h3>
            {safeTasks.length > 0 ? (
              <div className="space-y-2">
                {safeTasks.map((task, index) => (
                  <div key={task.id || index} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(task.status as TaskStatus)}`}></div>
                      <span>{task.name || 'Tâche sans nom'}</span>
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
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune tâche définie</p>
            )}
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
