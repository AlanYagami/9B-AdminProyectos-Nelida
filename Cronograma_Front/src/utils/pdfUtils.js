import jsPDF from 'jspdf';

export function generarPDF(evento = {}, cronograma = {}) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Membrete
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text('SICALE', 10, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema de Planificación de Cronogramas para Eventos', 10, 26);

  // Línea decorativa
  doc.setDrawColor(0, 102, 204); // Azul
  doc.setLineWidth(1.2);
  doc.line(10, 30, pageWidth - 10, 30);

  let y = 45;

  // Datos del evento
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

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text(title, 10, y);

  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80);

  const datosEvento = [
    [`Descripción`, description],
    [`Tipo`, eventType],
    [`Duración`, `${duration} hrs`],
    [`Horario`, schedule],
    [`Fechas`, `${startDate} a ${endDate}`],
    [`Ubicación`, location],
    [`Responsable`, organizer],
  ];

  datosEvento.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 10, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${value}`, 40, y);
    y += 8;
  });

  y += 5;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Cronograma:', 10, y);

  y += 10;

  const actividades = Object.values(cronograma);

  if (actividades.length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('No hay actividades registradas.', 10, y);
  } else {
    const actividadesOrdenadas = actividades.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    doc.setFontSize(11);
    doc.setTextColor(50);

    actividadesOrdenadas.forEach((actividad) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const actividadTexto = `${actividad.date} ${actividad.time} - ${actividad.title}`;
      doc.setFont('helvetica', 'bold');
      doc.text(actividadTexto, 10, y);
      y += 6;

      if (actividad.description) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(90);
        doc.text(`   ${actividad.description}`, 10, y);
        y += 6;
        doc.setTextColor(50);
      }
    });
  }

  const safeTitle = title.replace(/[\/\\:*?"<>|]/g, '_');
  const safeStart = startDate.replace(/-/g, '_');
  const safeEnd = endDate.replace(/-/g, '_');
  const fileName = `${safeTitle} (${safeStart} - ${safeEnd})`;

  doc.save(`${fileName}.pdf`);
}
