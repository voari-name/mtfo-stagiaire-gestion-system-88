
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit } from "lucide-react";
import AttestationForm from "./AttestationForm";

interface AttestationCardProps {
  intern: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  project?: {
    title: string;
  };
  evaluation?: {
    grade: number;
  };
}

const AttestationCard = ({ intern, project, evaluation }: AttestationCardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
              {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Projet terminé & Évalué
            </Badge>
          </div>
          <CardTitle className="text-lg">{intern.firstName} {intern.lastName}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{intern.email}</span>
            </div>
            
            {project && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Projet:</span>
                <span className="font-medium text-blue-600">{project.title}</span>
              </div>
            )}
            
            {evaluation && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Note d'évaluation:</span>
                <span className="font-medium text-green-600">{evaluation.grade}/20</span>
              </div>
            )}
          </div>
          
          <div className="pt-3 border-t">
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Créer l'attestation
            </Button>
          </div>
        </CardContent>
      </Card>

      <AttestationForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        intern={intern}
        project={project}
        evaluation={evaluation}
      />
    </>
  );
};

export default AttestationCard;
