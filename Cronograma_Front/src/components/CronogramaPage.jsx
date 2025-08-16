import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generarPDF } from './../utils/pdfUtils';
import api from './../services/api';

const CronogramaPage = () => {
  const [params] = useSearchParams();
  const eventoId = params.get('id');

  useEffect(() => {
    const fetchData = async () => {
      if (!eventoId) return;

      try {
        const eventoRes = await api.publico.getEventosPublicosById(eventoId); 
        const evento = eventoRes.data;

        const bloquesRes = await api.publico.getBloquesPublicosByEvento(eventoId);
        const bloques = bloquesRes.data;

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
            time: horaInicio
          };
        });

        generarPDF(evento, formatted);
      } catch (error) {
        console.error('Error cargando cronograma:', error);
      }
    };

    fetchData();
  }, [eventoId]);

  return (
    <div className="text-center mt-5">
      <h3>Generando PDF...</h3>
      <p>La descarga comenzará automáticamente si los datos están disponibles.</p>
    </div>
  );
};

export default CronogramaPage;