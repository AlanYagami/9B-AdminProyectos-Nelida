import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generarPDF } from './../utils/pdfUtils';

const CronogramaPage = () => {
  const [params] = useSearchParams();
  const eventoId = params.get('id');

  useEffect(() => {
    const eventoRaw = localStorage.getItem('eventoQR');
    const cronogramaRaw = localStorage.getItem('cronogramaQR');

    if (!eventoRaw || !cronogramaRaw) return;

    const evento = JSON.parse(eventoRaw);
    const cronograma = JSON.parse(cronogramaRaw);

    if (!evento || !cronograma) return;

    generarPDF(evento, cronograma);
  }, []);

  return (
    <div className="text-center mt-5">
      <h3>Generando PDF...</h3>
      <p>La descarga comenzará automáticamente si los datos están disponibles.</p>
    </div>
  );
};

export default CronogramaPage;