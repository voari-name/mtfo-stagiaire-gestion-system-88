import jsPDF from 'jspdf';

export interface AttestationData {
  firstName: string;
  lastName: string;
  email: string;
  student?: string;
  startDate?: string;
  endDate?: string;
  projectTitle?: string;
  grade?: number;
  tutorName?: string;
  evaluation?: {
    presence: string;
    technicalSkills: string;
    behavior: string;
    comment: string;
  };
}

export const generateAttestationPDF = (intern: AttestationData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 20;

  // En-tête République de Madagascar
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('RÉPUBLIQUE DE MADAGASCAR', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition, { align: 'center' });
  
  // Logo placeholders - À remplacer par de vraies images si disponibles
  yPosition += 15;
  doc.setFontSize(8);
  doc.text('🇲🇬', pageWidth / 2, yPosition, { align: 'center' });
  doc.text('LOGO MTEFoP', pageWidth - 30, 20);
  
  yPosition += 20;
  
  // Ministère
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MINISTÈRE DU TRAVAIL, DE L\'EMPLOI ET DE LA FONCTION PUBLIQUE', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  
  doc.text('SECRÉTARIAT GÉNÉRAL', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  
  doc.text('DIRECTION DU SYSTÈME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Numéro
  doc.setFontSize(10);
  doc.text(`N° …… /${new Date().getFullYear()}/MTEFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Titre principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ATTESTATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Corps du texte
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const introText = `Nous, soussignés, la Direction du Système d'Information du Ministère du Travail, de l'Emploi et de la Fonction Publique, certifions que :`;
  doc.text(introText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  // Informations du stagiaire
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const gender = Math.random() > 0.5 ? 'Mr' : 'Mme'; // Placeholder - à adapter selon les données
  const studentInfo = `${gender} ${intern.firstName} ${intern.lastName},`;
  doc.text(studentInfo, margin, yPosition);
  
  yPosition += 12;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const studentText = `étudiant(e) à ${intern.student || '[ÉCOLE]'},`;
  doc.text(studentText, margin, yPosition);
  
  yPosition += 12;
  
  const stageText = `a effectué un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(stageText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 12;
  
  // Période
  if (intern.startDate && intern.endDate) {
    const periodText = `durant la période du ${new Date(intern.startDate).toLocaleDateString('fr-FR')} au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}.`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
  }
  
  // Note si disponible
  if (intern.grade) {
    yPosition += 10;
    const gradeText = `Le stagiaire a obtenu la note de ${intern.grade}/20 lors de son évaluation finale.`;
    doc.text(gradeText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 15;
  }
  
  // Détails de l'évaluation si disponibles
  if (intern.evaluation) {
    yPosition += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Détail de l\'évaluation :', margin, yPosition);
    yPosition += 10;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const evaluationDetails = [
      `• Présence : ${intern.evaluation.presence}`,
      `• Compétences techniques : ${intern.evaluation.technicalSkills}`,
      `• Comportement : ${intern.evaluation.behavior}`
    ];
    
    evaluationDetails.forEach(detail => {
      doc.text(detail, margin + 5, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
  }
  
  yPosition += 15;
  
  // Conclusion
  doc.setFontSize(12);
  const conclusionText = `La présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
  doc.text(conclusionText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  // Signatures en bas
  yPosition = pageHeight - 80;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  if (intern.tutorName) {
    doc.text(`Encadreur : ${intern.tutorName}`, margin, yPosition);
  }
  
  doc.text(`Fait à Antananarivo, le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
  
  yPosition += 20;
  doc.text('[Signature + Cachet]', pageWidth - margin - 80, yPosition);
  
  // Télécharger le PDF
  const fileName = `attestation_stage_${intern.firstName}_${intern.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};

export const generateImprovedAttestationPDF = (intern: AttestationData & { student?: string; startDate?: string; endDate?: string }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 20;

  // En-tête avec informations République
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition, { align: 'center' });
  
  // Espace pour logo Madagascar au milieu
  yPosition += 15;
  doc.setFontSize(14);
  doc.text('🇲🇬', pageWidth / 2, yPosition, { align: 'center' });
  
  // Logo MTEFoP à droite (placeholder)
  doc.setFontSize(8);
  doc.text('LOGO MTEFoP', pageWidth - 30, 20);
  
  yPosition += 20;
  
  // Ministère
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MINISTÈRE DU TRAVAIL, DE L\'EMPLOI', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('ET DE LA FONCTION PUBLIQUE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Secrétariat Général
  doc.text('SECRÉTARIAT GÉNÉRAL', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Direction
  doc.text('DIRECTION DU SYSTÈME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Numéro
  doc.setFontSize(10);
  doc.text(`N° …… ${new Date().getFullYear()}/MTEFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Titre principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ATTESTATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Corps du texte
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const introText = `Nous soussignés, la Direction du Système d'Information du Ministère du Travail, de l'Emploi et de la Fonction Publique, certifions que :`;
  doc.text(introText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 25;
  
  // Informations du stagiaire
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const studentInfo = `Mr. ${intern.firstName} ${intern.lastName},`;
  doc.text(studentInfo, margin, yPosition);
  
  yPosition += 15;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const studentText = `étudiant à ${intern.student || 'l\'établissement'}, a effectué un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(studentText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  // Période
  if (intern.startDate && intern.endDate) {
    const periodText = `durant la période du ${new Date(intern.startDate).toLocaleDateString('fr-FR')} au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}.`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
  }
  
  // Note si disponible
  if (intern.grade) {
    yPosition += 10;
    const gradeText = `Le stagiaire a obtenu la note de ${intern.grade}/20 lors de son évaluation finale.`;
    doc.text(gradeText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 15;
  }
  
  yPosition += 15;
  
  // Conclusion
  const conclusionText = `La présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
  doc.text(conclusionText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  // Signatures en bas
  yPosition = pageHeight - 60;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Encadreur.', margin + 30, yPosition);
  doc.text(`Antananarivo, le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
  
  // Télécharger le PDF
  const fileName = `attestation_stage_${intern.firstName}_${intern.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
