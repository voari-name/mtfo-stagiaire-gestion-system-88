
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import EvaluationCard from "@/components/evaluations/EvaluationCard";
import { useEvaluations } from "@/hooks/useEvaluations";
import { EditEvaluationDialog } from "@/components/evaluations/EditEvaluationDialog";

const Attestations = () => {
  const {
    evaluations,
    currentEvaluation,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleEditEvaluation,
    handleSaveEvaluation,
    handleDeleteEvaluation,
    handleGeneratePdf,
    handleInputChange
  } = useEvaluations();

  return (
    <MainLayout title="Attestations" currentPage="evaluations">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Attestations</h2>
            <p className="text-gray-600 mt-2">Liste des évaluations de stage et attestations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {evaluations.map((evaluation, index) => (
            <div key={evaluation.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <EvaluationCard
                evaluation={evaluation}
                onEdit={handleEditEvaluation}
                onDelete={handleDeleteEvaluation}
                onGeneratePdf={handleGeneratePdf}
              />
            </div>
          ))}

          {evaluations.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune attestation disponible</h3>
                <p className="text-gray-500">
                  Les attestations apparaîtront ici une fois que vous aurez créé des évaluations de stage.
                </p>
              </div>
            </div>
          )}
        </div>

        <EditEvaluationDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          evaluation={currentEvaluation}
          onSave={handleSaveEvaluation}
          onInputChange={handleInputChange}
        />
      </div>
    </MainLayout>
  );
};

export default Attestations;
