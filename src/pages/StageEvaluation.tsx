
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateAttestationPDF } from "@/utils/attestationPdfGenerator";
import { useInternsData } from "@/hooks/useInternsData";

const StageEvaluation = () => {
  const { interns } = useInternsData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    internId: "",
    tutorName: "",
    presence: "",
    technicalSkills: "",
    behavior: "",
    globalGrade: "",
    comment: "",
    school: ""
  });

  const eligibleInterns = interns.filter(intern => 
    intern.status === 'en cours' || intern.status === 'terminé'
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.internId || !formData.tutorName || !formData.globalGrade) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const selectedIntern = interns.find(intern => intern.id === formData.internId);
    if (!selectedIntern) return;

    // Generate PDF attestation
    const attestationData = {
      firstName: selectedIntern.firstName,
      lastName: selectedIntern.lastName,
      email: selectedIntern.email,
      student: formData.school,
      startDate: selectedIntern.startDate,
      endDate: selectedIntern.endDate,
      grade: parseInt(formData.globalGrade),
      tutorName: formData.tutorName,
      evaluation: {
        presence: formData.presence,
        technicalSkills: formData.technicalSkills,
        behavior: formData.behavior,
        comment: formData.comment
      }
    };

    generateAttestationPDF(attestationData);

    toast({
      title: "Évaluation enregistrée",
      description: "L'attestation PDF a été générée avec succès",
    });

    // Reset form
    setFormData({
      internId: "",
      tutorName: "",
      presence: "",
      technicalSkills: "",
      behavior: "",
      globalGrade: "",
      comment: "",
      school: ""
    });
  };

  return (
    <MainLayout title="Évaluation du stage" currentPage="stage-evaluation">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Formulaire d'Évaluation de Stage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sélection du stagiaire */}
            <div className="space-y-2">
              <Label htmlFor="internId">Stagiaire *</Label>
              <Select value={formData.internId} onValueChange={(value) => handleInputChange("internId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un stagiaire" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleInterns.map((intern) => (
                    <SelectItem key={intern.id} value={intern.id}>
                      {intern.firstName} {intern.lastName} - {intern.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* École */}
            <div className="space-y-2">
              <Label htmlFor="school">École/Université *</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                placeholder="Nom de l'établissement"
              />
            </div>

            {/* Tuteur */}
            <div className="space-y-2">
              <Label htmlFor="tutorName">Nom du Tuteur/Encadreur *</Label>
              <Input
                id="tutorName"
                value={formData.tutorName}
                onChange={(e) => handleInputChange("tutorName", e.target.value)}
                placeholder="Nom complet du tuteur"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Présence */}
              <div className="space-y-2">
                <Label htmlFor="presence">Présence</Label>
                <Select value={formData.presence} onValueChange={(value) => handleInputChange("presence", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Note" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (18-20)</SelectItem>
                    <SelectItem value="tres-bien">Très bien (16-17)</SelectItem>
                    <SelectItem value="bien">Bien (14-15)</SelectItem>
                    <SelectItem value="assez-bien">Assez bien (12-13)</SelectItem>
                    <SelectItem value="passable">Passable (10-11)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Compétences techniques */}
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Compétences techniques</Label>
                <Select value={formData.technicalSkills} onValueChange={(value) => handleInputChange("technicalSkills", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Note" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (18-20)</SelectItem>
                    <SelectItem value="tres-bien">Très bien (16-17)</SelectItem>
                    <SelectItem value="bien">Bien (14-15)</SelectItem>
                    <SelectItem value="assez-bien">Assez bien (12-13)</SelectItem>
                    <SelectItem value="passable">Passable (10-11)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comportement */}
              <div className="space-y-2">
                <Label htmlFor="behavior">Comportement</Label>
                <Select value={formData.behavior} onValueChange={(value) => handleInputChange("behavior", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Note" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (18-20)</SelectItem>
                    <SelectItem value="tres-bien">Très bien (16-17)</SelectItem>
                    <SelectItem value="bien">Bien (14-15)</SelectItem>
                    <SelectItem value="assez-bien">Assez bien (12-13)</SelectItem>
                    <SelectItem value="passable">Passable (10-11)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Note globale */}
            <div className="space-y-2">
              <Label htmlFor="globalGrade">Note globale sur 20 *</Label>
              <Select value={formData.globalGrade} onValueChange={(value) => handleInputChange("globalGrade", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">Excellent (20/20)</SelectItem>
                  <SelectItem value="19">Excellent (19/20)</SelectItem>
                  <SelectItem value="18">Excellent (18/20)</SelectItem>
                  <SelectItem value="17">Très bien (17/20)</SelectItem>
                  <SelectItem value="16">Très bien (16/20)</SelectItem>
                  <SelectItem value="15">Bien (15/20)</SelectItem>
                  <SelectItem value="14">Bien (14/20)</SelectItem>
                  <SelectItem value="13">Assez bien (13/20)</SelectItem>
                  <SelectItem value="12">Assez bien (12/20)</SelectItem>
                  <SelectItem value="11">Passable (11/20)</SelectItem>
                  <SelectItem value="10">Passable (10/20)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Commentaire */}
            <div className="space-y-2">
              <Label htmlFor="comment">Commentaire d'évaluation</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
                placeholder="Commentaires détaillés sur le stage et les performances du stagiaire..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setFormData({
                  internId: "",
                  tutorName: "",
                  presence: "",
                  technicalSkills: "",
                  behavior: "",
                  globalGrade: "",
                  comment: "",
                  school: ""
                })}
              >
                Réinitialiser
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Générer l'Attestation PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StageEvaluation;
