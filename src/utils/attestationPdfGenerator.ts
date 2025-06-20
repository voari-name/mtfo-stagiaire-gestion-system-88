
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
}

export const generateAttestationPDF = (intern: AttestationData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 30;

  // En-tête avec logos
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, 15, { align: 'center' });
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, 25, { align: 'center' });
  
  // Logo placeholder (vous pouvez ajouter une vraie image ici)
  doc.setFontSize(8);
  doc.text('🇲🇬', pageWidth / 2 - 10, 35, { align: 'center' });
  
  yPosition = 50;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MINISTERE DU TRAVAIL, DE L\'EMPLOI', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text('ET DE LA FONCTION PUBLIQUE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 15;
  doc.text('SECRETARIAT GENERAL', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 15;
  doc.text('DIRECTION DU SYSTEME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.text(`N°............. ${new Date().getFullYear()}/MTeFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
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
  doc.text(`${intern.firstName} ${intern.lastName}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 25;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  const stageText = `a effectué avec succès un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(stageText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  if (intern.projectTitle) {
    const projectText = `dans le cadre du projet "${intern.projectTitle}".`;
    doc.text(projectText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 20;
  }
  
  if (intern.grade) {
    yPosition += 10;
    const evaluationText = `Le stagiaire a obtenu la note de ${intern.grade}/20 lors de son évaluation finale.`;
    doc.text(evaluationText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 15;
  }
  
  yPosition += 10;
  const validationText = `La présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
  doc.text(validationText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  // Signature et date
  yPosition = pageHeight - 80;
  doc.text('Le Directeur du Système d\'Information', margin + 50, yPosition);
  doc.text(`Antananarivo, le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
  
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
