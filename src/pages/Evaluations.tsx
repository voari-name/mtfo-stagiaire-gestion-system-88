
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import EvaluationCard from "@/components/evaluations/EvaluationCard";
import EditEvaluationDialog from "@/components/evaluations/EditEvaluationDialog";
import { CreateEvaluationDialog } from "@/components/evaluations/CreateEvaluationDialog";
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
    handleInputChange,
    addEvaluation
  } = useEvaluations();

  return (
    <MainLayout title="Évaluations des stagiaires" currentPage="evaluations" username="RAHAJANIAINA Olivier">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Évaluations</h2>
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Rechercher une évaluation..."
              className="max-w-xs transition-all duration-300 focus:scale-105"
            />
            <CreateEvaluationDialog onEvaluationCreated={addEvaluation} />
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
