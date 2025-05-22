
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import EvaluationCard from "@/components/evaluations/EvaluationCard";
import EditEvaluationDialog from "@/components/evaluations/EditEvaluationDialog";
import { useEvaluations } from "@/hooks/useEvaluations";

const Evaluations = () => {
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
    <MainLayout title="Évaluations des stagiaires" currentPage="evaluations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Évaluations</h2>
          <Input
            type="text"
            placeholder="Rechercher une évaluation..."
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {evaluations.map(evaluation => (
            <EvaluationCard
              key={evaluation.id}
              evaluation={evaluation}
              onEdit={handleEditEvaluation}
              onDelete={handleDeleteEvaluation}
              onGeneratePdf={handleGeneratePdf}
            />
          ))}
        </div>
      </div>

      <EditEvaluationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        evaluation={currentEvaluation}
        onSave={handleSaveEvaluation}
        onInputChange={handleInputChange}
      />
    </MainLayout>
  );
};

export default Evaluations;
