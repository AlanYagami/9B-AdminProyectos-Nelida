import jsPDF from 'jspdf';

export function generarPDF(evento = {}, cronograma = {}) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 45;

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

  y += 1;

  // Desestructuración de los datos del evento con valores predeterminados
  const {
    nombreEvento = 'Evento sin nombre',
    descripcionEvento = 'Sin descripción',
    eventType = 'Sin tipo',
    duration = Math.ceil((new Date(evento.fechaFin) - new Date(evento.fechaInicio)) / 3600000) || '-',
    schedule = `${evento.fechaInicio?.split("T")[1]?.slice(0, 5)} - ${evento.fechaFin?.split("T")[1]?.slice(0, 5)}` || '-',
    startDate = evento.fechaInicio?.split("T")[0] || '-',
    endDate = evento.fechaFin?.split("T")[0] || '-',
    ubicacion = evento.ubicacion || 'Sin ubicación',
    organizer = evento.responsable || 'Sin responsable',
  } = evento;

  // Datos del evento
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text(nombreEvento, 10, y);

  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80);

  const datosEvento = [
    [`Descripción`, descripcionEvento],
    [`Tipo`, eventType],
    [`Duración`, `${duration} hrs`],
    [`Horario`, schedule],
    [`Fecha inicio`, `${endDate}`],
    [`Fecha fin`, `${startDate}`],
    [`Ubicación`, ubicacion],
    [`Responsable`, organizer],
  ];

  // Imprimir los detalles del evento
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

  // Transformación y ordenación del cronograma
  const actividades = Object.values(cronograma);

  if (actividades.length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('No hay actividades registradas.', 10, y);
  } else {
    
    // Ordenar actividades por fecha y hora
    const actividadesOrdenadas = actividades.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    doc.setFontSize(11);
    doc.setTextColor(50);

    // Imprimir cada actividad
    actividadesOrdenadas.forEach((actividad) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      // Formateo de fecha y hora
      const date = new Date(`${actividad.date}`);
      const formattedDate = date.toLocaleDateString("es-ES", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Sumar 1 hora a la hora de inicio
      const timeString = actividad.time;
      const [hours, minutes] = timeString.split(':').map(Number);
      const dateWithTime = new Date(actividad.date);
      dateWithTime.setHours(hours, minutes);
      dateWithTime.setHours(dateWithTime.getHours() + 1);
      const newTime = `${String(dateWithTime.getHours()).padStart(2, '0')}:${String(dateWithTime.getMinutes()).padStart(2, '0')}`;

      // Crear el texto formateado para la actividad
      const actividadTexto = `${actividad.title}: ${actividad.description} (${actividad.time} - ${newTime})`;
      const tiempoTexto = `${formattedDate}`;

      // Bloque con color para resaltar la actividad
      doc.setFillColor(240, 240, 240); // Gris claro
      doc.rect(10, y - 3, pageWidth - 20, 15, 'F');  // Fondo gris
      doc.setFont('helvetica', 'bold');
      doc.text(actividadTexto, 10, y);
      y += 6;

      // Imprimir el tiempo y la fecha de la actividad
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80);
      doc.text(tiempoTexto, 10, y);
      y += 6;

      if (actividad.descripcionEvento) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(90);
        doc.text(`   ${actividad.descripcionEvento}`, 10, y);
        y += 6;
        doc.setTextColor(50);
      }

      // Línea decorativa para separar cada actividad
      doc.setDrawColor(0, 102, 204); // Azul
      doc.setLineWidth(0.8);
      doc.line(10, y, pageWidth - 10, y);
      y += 5;
    });
  }

  // Crear un nombre de archivo seguro para el PDF
  const safenombreEvento = nombreEvento.replace(/[\/\\:*?"<>|]/g, '_');
  const safeStart = startDate.replace(/-/g, '_');
  const safeEnd = endDate.replace(/-/g, '_');
  const fileName = `${safenombreEvento} (${safeStart} - ${safeEnd})`;

  // Guardar el archivo PDF
  doc.save(`${fileName}.pdf`);
}