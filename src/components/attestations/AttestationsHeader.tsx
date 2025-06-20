
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface AttestationsHeaderProps {
  eligibleInternsCount: number;
}

const AttestationsHeader = ({ eligibleInternsCount }: AttestationsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Attestations de Stage</h2>
        <p className="text-gray-600 mt-2">
          Générez et téléchargez les attestations officielles pour les stagiaires ayant terminé leur projet avec évaluation
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Award className="w-8 h-8 text-blue-600" />
        <Badge variant="outline" className="text-lg px-4 py-2">
          {eligibleInternsCount} attestation(s) disponible(s)
        </Badge>
      </div>
    </div>
  );
};

export default AttestationsHeader;
