
import jsPDF from 'jspdf';

export interface EvaluationData {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  grade: number;
  comment: string;
}

export const generateEvaluationPDF = (evaluation: EvaluationData) => {
  const doc = new jsPDF();
  
  // Configuration
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;
  
  // Titre du document
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ÉVALUATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
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
    `Nom complet: ${evaluation.firstName} ${evaluation.lastName}`,
    `Période de stage: ${new Date(evaluation.startDate).toLocaleDateString('fr-FR')} au ${new Date(evaluation.endDate).toLocaleDateString('fr-FR')}`,
  ];
  
  infoLines.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 10;
  });
  
  yPosition += 20;
  
  // Évaluation
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ÉVALUATION', margin, yPosition);
  
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Note
  doc.setFont('helvetica', 'bold');
  doc.text(`Note obtenue: ${evaluation.grade}/20`, margin, yPosition);
  yPosition += 15;
  
  // Appréciation
  const appreciation = evaluation.grade >= 16 ? 'Excellent' : 
                     evaluation.grade >= 14 ? 'Très bien' : 
                     evaluation.grade >= 12 ? 'Bien' : 
                     evaluation.grade >= 10 ? 'Passable' : 'Insuffisant';
  
  doc.text(`Appréciation: ${appreciation}`, margin, yPosition);
  yPosition += 20;
  
  // Commentaire
  doc.setFont('helvetica', 'bold');
  doc.text('Commentaire:', margin, yPosition);
  yPosition += 10;
  
  doc.setFont('helvetica', 'normal');
  const splitComment = doc.splitTextToSize(evaluation.comment, pageWidth - 2 * margin);
  doc.text(splitComment, margin, yPosition);
  yPosition += splitComment.length * 6 + 20;
  
  // Signature
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Fait le:', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 25, yPosition);
  
  yPosition += 20;
  doc.text('Signature du responsable:', pageWidth - margin - 80, yPosition);
  
  // Télécharger le PDF
  const fileName = `evaluation_${evaluation.firstName}_${evaluation.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
