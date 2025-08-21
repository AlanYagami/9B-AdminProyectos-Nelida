import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generarPDF } from './../utils/pdfUtils';
import { validarDisponibilidad } from '../validations/validaciones';
import api from './../services/api';
import Swal from 'sweetalert2';

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

        // VALIDACIÓN
        const resultado = validarDisponibilidad(evento);
        if (!resultado.valido) {
          if (resultado.alerta) {
            Swal.fire(resultado.alerta); // mostrar alerta si hay
          }
          setMensaje('El PDF no está disponible en este momento.');
          return; // detener ejecución
        }

        const bloquesRes = await api.publico.getBloquesPublicosByEvento(eventoId);
        const bloques = bloquesRes.data;

        const tiposResponse = await api.publico.getTiposEventosPublico();
        const tiposEvento = tiposResponse.data;
        const tipoEvento = tiposEvento.find(tipo => tipo.id === evento.tipoEventoId);

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