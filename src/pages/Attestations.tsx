
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import AttestationsHeader from "@/components/attestations/AttestationsHeader";
import AttestationCard from "@/components/attestations/AttestationCard";
import EmptyAttestationsState from "@/components/attestations/EmptyAttestationsState";
import { useInternsData } from "@/hooks/useInternsData";
import { useProjectsData } from "@/hooks/useProjectsData";

const Attestations = () => {
  const { interns, loading: internsLoading } = useInternsData();
  const { projects, loading: projectsLoading } = useProjectsData();

  const loading = internsLoading || projectsLoading;

  // Filtrer les stagiaires qui ont terminé leur stage et ont une évaluation
  const eligibleInterns = interns.filter(intern => 
    intern.status === 'terminé' && intern.completion >= 80
  );

  // Créer des données fictives d'évaluation pour la démonstration
  const internsWithEvaluations = eligibleInterns.map(intern => {
    // Trouver le projet associé au stagiaire
    const project = projects.find(p => 
      p.interns.some(i => i.name === `${intern.firstName} ${intern.lastName}`)
    );

    return {
      intern: {
        id: intern.id,
        firstName: intern.firstName,
        lastName: intern.lastName,
        email: intern.email
      },
      project: project ? { title: project.title } : undefined,
      evaluation: {
        grade: Math.floor(Math.random() * 6) + 15 // Note entre 15 et 20
      }
    };
  });

  if (loading) {
    return (
      <MainLayout title="Attestations" currentPage="evaluations">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Attestations" currentPage="evaluations">
      <div className="space-y-6">
        <AttestationsHeader />
        
        {internsWithEvaluations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internsWithEvaluations.map((data, index) => (
              <AttestationCard 
                key={data.intern.id || index}
                intern={data.intern}
                project={data.project}
                evaluation={data.evaluation}
              />
            ))}
          </div>
        ) : (
          <EmptyAttestationsState />
        )}
      </div>
    </MainLayout>
  );
};

export default Attestations;
