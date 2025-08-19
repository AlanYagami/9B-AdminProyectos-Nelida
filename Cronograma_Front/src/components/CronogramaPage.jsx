import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generarPDF } from './../utils/pdfUtils';
import api from './../services/api';

const CronogramaPage = () => {
  const [params] = useSearchParams();
  const eventoId = params.get('id');

  const [mensaje, setMensaje] = useState('Generando PDF...');
  const [pdfGenerado, setPdfGenerado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!eventoId) return;

      try {
        const eventoRes = await api.publico.getEventosPublicosById(eventoId);
        const evento = eventoRes.data;

        const bloquesRes = await api.publico.getBloquesPublicosByEvento(eventoId);
        const bloques = bloquesRes.data;

        const tiposResponse = await api.publico.getTiposEventosPublico();
        const tiposEvento = tiposResponse.data;
        const tipoEvento = tiposEvento.find(tipo => tipo.id === evento.tipoEventoId);

        // Fecha y hora inicio del evento:
        // Si hay bloques, tomamos la fecha y hora del primer bloque ordenado
        // Si NO hay bloques, usamos evento.fechaInicio (suponiendo que incluye hora)
        let fechaInicioEvento;

        if (bloques.length > 0) {
          const bloquesOrdenados = bloques.sort((a, b) => {
            const fechaHoraA = new Date(`${a.fechaBloque}T${a.horaInicio}`);
            const fechaHoraB = new Date(`${b.fechaBloque}T${b.horaInicio}`);
            return fechaHoraA - fechaHoraB;
          });
          const primerBloque = bloquesOrdenados[0];
          fechaInicioEvento = new Date(`${primerBloque.fechaBloque}T${primerBloque.horaInicio}`);
        } else {
          // Aquí asumimos que evento.fechaInicio tiene fecha y hora en ISO string o similar
          fechaInicioEvento = new Date(evento.fechaInicio);
        }

        // Fecha fin del evento (ajustamos fin de día si solo tiene fecha)
        let fechaFinEvento = new Date(evento.fechaFin);
        if (
          fechaFinEvento.getHours() === 0 &&
          fechaFinEvento.getMinutes() === 0 &&
          fechaFinEvento.getSeconds() === 0
        ) {
          fechaFinEvento.setHours(23, 59, 59, 999);
        }

        const ahora = new Date();
        const dosHorasAntes = new Date(fechaInicioEvento.getTime() - 2 * 60 * 60 * 1000);

        // Validaciones
        if (ahora.toDateString() !== fechaInicioEvento.toDateString()) {
          setMensaje('Solo puedes descargar el PDF el día del evento.');
          return;
        }

        if (ahora < dosHorasAntes) {
          const horasFaltantes = Math.ceil((dosHorasAntes - ahora) / (1000 * 60 * 60));
          setMensaje(`Puedes descargar el PDF solo 2 horas antes del inicio del evento. Faltan aproximadamente ${horasFaltantes} hora(s).`);
          return;
        }

        if (ahora > fechaFinEvento) {
          setMensaje('El evento ya ha finalizado. No se puede descargar el PDF.');
          return;
        }

        // Formatear bloques para PDF (si no hay bloques, formatted quedará vacío y es válido)
        const formatted = {};
        bloques.forEach(b => {
          const fechaBloque = new Date(b.fechaBloque);
          const horaInicio = b.horaInicio.slice(0, 5);
          const key = `${fechaBloque.toISOString().split('T')[0]}-${horaInicio}`;

          formatted[key] = {
            idBloque: b.idBloque,
            title: b.nombreBloque,
            description: b.descripcion,
            color: b.color || '#757575',
            date: fechaBloque,
            time: horaInicio,
          };
        });

        generarPDF(evento, formatted, tipoEvento);
        setMensaje('Descarga en curso...');
        setPdfGenerado(true);

      } catch (error) {
        console.error('Error cargando cronograma:', error);
        setMensaje('Ocurrió un error al generar el PDF. Intenta nuevamente más tarde.');
      }
    };

    fetchData();
  }, [eventoId]);

  return (
    <div className="text-center mt-5">
      <h3>{mensaje}</h3>
      {!pdfGenerado && <p>La descarga comenzará automáticamente si los datos están disponibles.</p>}
    </div>
  );
};

export default CronogramaPage;