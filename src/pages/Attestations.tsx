
import MainLayout from "@/components/MainLayout";
import { useInternsData } from "@/hooks/useInternsData";
import { useProjectsData } from "@/hooks/useProjectsData";
import { useEvaluations } from "@/hooks/useEvaluations";
import AttestationsHeader from "@/components/attestations/AttestationsHeader";
import AttestationCard from "@/components/attestations/AttestationCard";
import EmptyAttestationsState from "@/components/attestations/EmptyAttestationsState";

const Attestations = () => {
  const { interns, loading: internsLoading } = useInternsData();
  const { projects, loading: projectsLoading } = useProjectsData();
  const { evaluations } = useEvaluations();

  // Only show interns who have completed their projects AND have been evaluated
  const eligibleInterns = interns.filter(intern => {
    const hasCompletedProject = projects.some(project => 
      project.interns.some(projectIntern => 
        projectIntern.name.includes(intern.firstName) && 
        projectIntern.name.includes(intern.lastName) &&
        projectIntern.status === "terminé"
      )
    );
    
    const hasEvaluation = evaluations.some(evaluation =>
      evaluation.firstName === intern.firstName && 
      evaluation.lastName === intern.lastName
    );
    
    return hasCompletedProject && hasEvaluation;
  });

  if (internsLoading || projectsLoading) {
    return (
      <MainLayout title="Attestations de stage" currentPage="evaluations">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </MainLayout>
    );
  }

  const activeInternsCount = interns.filter(intern => intern.status === "en cours").length;

  return (
    <MainLayout title="Attestations de stage" currentPage="evaluations">
      <div className="space-y-6">
        <AttestationsHeader eligibleInternsCount={eligibleInterns.length} />

        {eligibleInterns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleInterns.map((intern) => {
              const associatedProject = projects.find(project => 
                project.interns.some(projectIntern => 
                  projectIntern.name.includes(intern.firstName) && 
                  projectIntern.name.includes(intern.lastName) &&
                  projectIntern.status === "terminé"
                )
              );

              const evaluation = evaluations.find(evaluation => 
                evaluation.firstName === intern.firstName && evaluation.lastName === intern.lastName
              );

              return (
                <AttestationCard
                  key={intern.id}
                  intern={intern}
                  project={associatedProject}
                  evaluation={evaluation}
                />
              );
            })}
          </div>
        ) : (
          <EmptyAttestationsState 
            activeInternsCount={activeInternsCount}
            evaluationsCount={evaluations.length}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Attestations;
