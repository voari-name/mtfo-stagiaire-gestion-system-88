
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/hooks/useProjectsData";

interface ProjectMenuListProps {
  projects: ProjectData[];
  onProjectClick: (project: ProjectData) => void;
}

const ProjectMenuList: React.FC<ProjectMenuListProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <Card 
          key={project.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onProjectClick(project)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Intitulés de stage:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.interns.map((intern, index) => (
                        <Badge key={intern.id} variant="secondary" className="text-xs">
                          {intern.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Du {new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
                    <span>au {new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <Badge variant="outline">
                  {project.tasks.filter(t => t.status === 'completed').length}/{project.tasks.length} tâches
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectMenuList;
