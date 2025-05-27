
import jsPDF from 'jspdf';

export interface InternData {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const generateInternPDF = (intern: InternData) => {
  const doc = new jsPDF();
  
  // Configuration
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;
  
  // Titre du document
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICAT DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Ligne de séparation
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 20;
  
  // Informations du stagiaire
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMATIONS DU STAGIAIRE', margin, yPosition);
  
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const infoLines = [
    `Nom complet: ${intern.firstName} ${intern.lastName}`,
    `Email: ${intern.email}`,
    `Intitulé du stage: ${intern.title}`,
    `Date de début: ${new Date(intern.startDate).toLocaleDateString('fr-FR')}`,
    `Date de fin: ${new Date(intern.endDate).toLocaleDateString('fr-FR')}`,
    `Statut: ${intern.status === 'en cours' ? 'En cours' : intern.status === 'fin' ? 'Terminé' : 'À commencer'}`
  ];
  
  infoLines.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 10;
  });
  
  yPosition += 20;
  
  // Certificat de stage
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICAT', margin, yPosition);
  
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const certificateText = [
    `Nous certifions que ${intern.firstName} ${intern.lastName} a effectué un stage`,
    `au sein de notre organisation du ${new Date(intern.startDate).toLocaleDateString('fr-FR')}`,
    `au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}.`,
    '',
    `Intitulé du stage: ${intern.title}`,
    '',
    'Ce certificat est délivré pour servir et valoir ce que de droit.'
  ];
  
  certificateText.forEach(line => {
    if (line) {
      doc.text(line, margin, yPosition);
    }
    yPosition += 8;
  });
  
  yPosition += 30;
  
  // Signature
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Fait le:', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 25, yPosition);
  
  yPosition += 20;
  doc.text('Signature:', pageWidth - margin - 60, yPosition);
  
  // Télécharger le PDF
  const fileName = `stage_${intern.firstName}_${intern.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
