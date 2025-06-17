
import React from "react";
import ProjectCard from "./ProjectCard";
import { ProjectData } from "@/hooks/useProjectsData";

interface ProjectsListProps {
  projects: ProjectData[];
  calculateProgress: (tasks: any[]) => number;
  onViewDetails: (project: ProjectData) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ 
  projects, 
  calculateProgress,
  onViewDetails 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => {
        const progress = calculateProgress(project.tasks);
        return (
          <ProjectCard
            key={project.id}
            project={project}
            progress={progress}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
};

export default ProjectsList;
