import React from 'react';
import jsPDF from 'jspdf';

function PDFGenerator({ evento, cronograma }) {
  const generarPDF = () => {
    if (!evento || !cronograma || Object.keys(cronograma).length === 0) {
      alert('Faltan datos del evento o cronograma.');
      return;
    }

    const doc = new jsPDF();

    const {
      title = 'Evento sin título',
      description = '-',
      eventType = '-',
      duration = '-',
      schedule = '-',
      startDate = '-',
      endDate = '-',
      location = '-',
      organizer = '-',
    } = evento;

    doc.setFontSize(18);
    doc.text(title, 10, 20);

    doc.setFontSize(12);
    doc.text(`Descripción: ${description}`, 10, 30);
    doc.text(`Tipo: ${eventType}`, 10, 40);
    doc.text(`Duración: ${duration} hrs`, 10, 50);
    doc.text(`Horario: ${schedule}`, 10, 60);
    doc.text(`Fechas: ${startDate} a ${endDate}`, 10, 70);
    doc.text(`Ubicación: ${location}`, 10, 80);
    doc.text(`Responsable: ${organizer}`, 10, 90);

    doc.setFontSize(14);
    doc.text('Cronograma:', 10, 105);

    const actividadesOrdenadas = Object.values(cronograma).sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    let y = 115;
    doc.setFontSize(11);
    actividadesOrdenadas.forEach((actividad) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      const actividadTexto = `${actividad.date} ${actividad.time} - ${actividad.title}`;
      doc.text(actividadTexto, 10, y);
      y += 6;
      if (actividad.description) {
        doc.text(`   ${actividad.description}`, 10, y);
        y += 6;
      }
    });

    const fileName = title.replace(/[\/\\:*?"<>|]/g, '_');
    doc.save(`${fileName}.pdf`);
  };
  
}

export default PDFGenerator;
