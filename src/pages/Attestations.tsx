
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Award } from "lucide-react";
import { useInternsData } from "@/hooks/useInternsData";
import { useProjectsData } from "@/hooks/useProjectsData";
import jsPDF from 'jspdf';

const Attestations = () => {
  const { interns, loading: internsLoading } = useInternsData();
  const { projects, loading: projectsLoading } = useProjectsData();

  const completedInterns = interns.filter(intern => intern.status === "terminé");

  const generateAttestation = (intern: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 40;

    // En-tête avec logos (simulation - dans un vrai projet, vous utiliseriez les vraies images)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MTeFoP', 30, 25);
    doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth - 100, 15);
    doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth - 100, 25);

    // Titre du ministère
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('MINISTERE DU TRAVAIL, DE L\'EMPLOI', pageWidth / 2, 40, { align: 'center' });
    doc.text('ET DE LA FONCTION PUBLIQUE', pageWidth / 2, 50, { align: 'center' });
    
    yPosition = 70;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 10;
    doc.text('SECRETARIAT GENERAL', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 15;
    doc.text('DIRECTION DU SYSTEME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.text(`N°............. 2025/MTeFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 30;
    
    // Titre principal
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ATTESTATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 30;
    
    // Corps du texte
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const introText = `Nous soussigné, la Direction du Système d'Information du Ministère du Travail de l'Emploi et de la Fonction Publique, certifie que :`;
    doc.text(introText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    
    yPosition += 25;
    
    // Nom du stagiaire
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Mr. ${intern.firstName} ${intern.lastName}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    // Trouver le projet associé
    const associatedProject = projects.find(project => 
      project.interns.some(projectIntern => 
        projectIntern.name.includes(intern.firstName) && projectIntern.name.includes(intern.lastName)
      )
    );
    
    const stageText = `Étudiant à Université St Vincent de Paul AKAMASOA, a effectué un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
    doc.text(stageText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    
    yPosition += 20;
    
    const periodText = `durant la période de ${new Date(intern.startDate).toLocaleDateString('fr-FR')} au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}`;
    doc.text(periodText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    
    yPosition += 25;
    
    if (associatedProject) {
      const projectText = `dans le cadre du projet "${associatedProject.title}".`;
      doc.text(projectText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
      yPosition += 20;
    }
    
    yPosition += 10;
    const validationText = `La présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
    doc.text(validationText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    
    // Signature et date
    yPosition = pageHeight - 80;
    doc.text('Encadreur', margin + 50, yPosition);
    doc.text(`Antananarivo, le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
    
    // Télécharger le PDF
    const fileName = `attestation_stage_${intern.firstName}_${intern.lastName}_${new Date().getFullYear()}.pdf`;
    doc.save(fileName);
  };

  if (internsLoading || projectsLoading) {
    return (
      <MainLayout title="Attestations de stage" currentPage="evaluations">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Attestations de stage" currentPage="evaluations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Attestations de Stage</h2>
            <p className="text-gray-600 mt-2">Générez et téléchargez les attestations officielles pour les stagiaires ayant terminé leur stage</p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-8 h-8 text-blue-600" />
            <Badge variant="outline" className="text-lg px-4 py-2">
              {completedInterns.length} attestation(s) disponible(s)
            </Badge>
          </div>
        </div>

        {completedInterns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedInterns.map((intern) => {
              // Trouver le projet associé
              const associatedProject = projects.find(project => 
                project.interns.some(projectIntern => 
                  projectIntern.name.includes(intern.firstName) && projectIntern.name.includes(intern.lastName)
                )
              );

              return (
                <Card key={intern.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                        {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Stage terminé
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{intern.firstName} {intern.lastName}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Période:</span>
                        <span className="font-medium">
                          {new Date(intern.startDate).toLocaleDateString('fr-FR')} - {new Date(intern.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{intern.email}</span>
                      </div>
                      
                      {associatedProject && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Projet:</span>
                          <span className="font-medium text-blue-600">{associatedProject.title}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">
                          {Math.ceil((new Date(intern.endDate).getTime() - new Date(intern.startDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <Button 
                        onClick={() => generateAttestation(intern)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger l'attestation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <FileText className="w-16 h-16 text-gray-400 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-600">Aucune attestation disponible</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Les attestations ne peuvent être générées que pour les stagiaires ayant terminé leur stage avec succès.
              </p>
              <div className="mt-6">
                <Badge variant="outline" className="text-lg px-6 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  {interns.filter(intern => intern.status === "en cours").length} stage(s) en cours
                </Badge>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Attestations;
