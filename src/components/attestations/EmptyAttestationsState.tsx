
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Award } from "lucide-react";

interface EmptyAttestationsStateProps {
  activeInternsCount: number;
  evaluationsCount: number;
}

const EmptyAttestationsState = ({ activeInternsCount, evaluationsCount }: EmptyAttestationsStateProps) => {
  return (
    <Card className="p-12">
      <div className="text-center space-y-4">
        <FileText className="w-16 h-16 text-gray-400 mx-auto" />
        <h3 className="text-xl font-semibold text-gray-600">Aucune attestation disponible</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Les attestations ne peuvent être générées que pour les stagiaires ayant terminé leur projet ET ayant été évalués.
        </p>
        <div className="mt-6 flex flex-col items-center space-y-2">
          <Badge variant="outline" className="text-lg px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            {activeInternsCount} stage(s) en cours
          </Badge>
          <Badge variant="outline" className="text-lg px-6 py-2 bg-blue-50">
            {evaluationsCount} évaluation(s) réalisée(s)
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default EmptyAttestationsState;
