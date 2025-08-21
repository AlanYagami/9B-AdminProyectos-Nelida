export const validarDisponibilidad = event => {
    if (!event) return { valido: false };
    const ahora = new Date();
    const fechaEvento = new Date(event.fechaInicio);
    const diaEvento = fechaEvento.toDateString();
    const hoy = ahora.toDateString();

    if (hoy !== diaEvento) return {
      valido: false,
      alerta: {
        icon: 'warning',
        title: 'QR no disponible',
        text: 'Solo puedes acceder al QR el día del evento.',
      },
    };

    const fechaHoraInicio = new Date(`${event.fechaInicio.split('T')[0]}T${event.horaInicio}`);
    const fechaHoraFin = new Date(`${event.fechaInicio.split('T')[0]}T${event.horaFin}`);
    const dosHorasAntes = new Date(fechaHoraInicio.getTime() - 2 * 60 * 60 * 1000);

    if (ahora < dosHorasAntes) {
      const msRestantes = dosHorasAntes - ahora;
      const horas = Math.floor(msRestantes / (1000 * 60 * 60));
      const minutos = Math.ceil((msRestantes % (1000 * 60 * 60)) / (1000 * 60));
      return {
        valido: false,
        alerta: {
          icon: 'info',
          title: 'Aún no disponible',
          text: `Puedes acceder al QR solo 2 horas antes del evento. Faltan aproximadamente ${horas}h ${minutos}min.`,
        },
      };
    }

    if (ahora > fechaHoraFin) return {
      valido: false,
      alerta: {
        icon: 'error',
        title: 'Evento finalizado',
        text: 'El evento ya ha terminado. El QR ya no está disponible.',
      },
    };

    return { valido: true };
  };

  const handleShowQR = () => {
    const resultado = validarDisponibilidad(event);
    if (!resultado.valido && resultado.alerta) {
      Swal.fire(resultado.alerta);
      return;
    }
    setShowQRModal(true);
  };