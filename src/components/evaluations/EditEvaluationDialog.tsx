
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EvaluationType } from "@/types/evaluations";

interface EditEvaluationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluation: EvaluationType | null;
  onSave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditEvaluationDialog = ({ 
  open, 
  onOpenChange, 
  evaluation, 
  onSave, 
  onInputChange 
}: EditEvaluationDialogProps) => {
  if (!evaluation) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Modifier l'évaluation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={evaluation.firstName} 
                onChange={onInputChange} 
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={evaluation.lastName} 
                onChange={onInputChange} 
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={evaluation.startDate} 
                onChange={onInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                value={evaluation.endDate} 
                onChange={onInputChange} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Note (sur 20)</Label>
            <Input 
              id="grade" 
              name="grade" 
              type="number" 
              min="0" 
              max="20" 
              value={evaluation.grade}
              onChange={onInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Input 
              id="comment" 
              name="comment" 
              value={evaluation.comment} 
              onChange={onInputChange} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={onSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvaluationDialog;
