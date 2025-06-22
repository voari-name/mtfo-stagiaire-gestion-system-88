
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
  let yPosition = 15;

  // En-tête République de Madagascar avec logos
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition, { align: 'center' });
  
  // Placeholder pour logo République au centre et MTEFoP à droite
  yPosition += 15;
  doc.setFontSize(8);
  doc.text('🇲🇬', pageWidth / 2, yPosition, { align: 'center' });
  doc.text('LOGO MTEFoP', pageWidth - 30, 20);
  
  yPosition += 20;
  
  // Ministère
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MINISTÈRE DU TRAVAIL, DE L\'EMPLOI', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('ET DE LA FONCTION PUBLIQUE', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('SECRÉTARIAT GÉNÉRAL', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Direction
  doc.text('DIRECTION DU SYSTÈME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Numéro
  doc.setFontSize(10);
  doc.text(`N° …… 2025/MTEFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
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
  const studentText = `étudiant à ${intern.student || '                      '}, a effectué un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(studentText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  // Période
  if (intern.startDate && intern.endDate) {
    const periodText = `durant la période du ${new Date(intern.startDate).toLocaleDateString('fr-FR')} au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}.`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
  } else {
    const periodText = `durant la période du                    au                       .`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
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

export const generateImprovedAttestationPDF = (intern: AttestationData & { student?: string; startDate?: string; endDate?: string }) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 15;

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
  
  yPosition += 8;
  
  // Secrétariat Général
  doc.text('SECRÉTARIAT GÉNÉRAL', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Direction
  doc.text('DIRECTION DU SYSTÈME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Numéro
  doc.setFontSize(10);
  doc.text(`N° …… 2025/MTEFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
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
  const studentText = `étudiant à ${intern.student || '                      '}, a effectué un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(studentText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  // Période
  if (intern.startDate && intern.endDate) {
    const periodText = `durant la période du ${new Date(intern.startDate).toLocaleDateString('fr-FR')} au ${new Date(intern.endDate).toLocaleDateString('fr-FR')}.`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
  } else {
    const periodText = `durant la période du                    au                       .`;
    doc.text(periodText, margin, yPosition);
    yPosition += 20;
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
