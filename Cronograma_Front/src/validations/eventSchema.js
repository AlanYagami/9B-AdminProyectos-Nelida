import * as Yup from 'yup';

const textoComunRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9][a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]*[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/;
const sinCaracteresInvalidosRegex = /^[^<>/;"'`\\]*$/;
const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*[a-zA-ZáéíóúÁÉÍÓÚñÑ]$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/;
const horaEnPuntoRegex = /^([0-1]?[0-9]|2[0-3]):00$/;

const horaValidaRegex = /^(0?[7-9]|1[0-7]):00$/;


const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

export const eventoFields = {
  nombreEvento: Yup.string()
    .trim()
    .matches(textoComunRegex, 'Usa un nombre válido (letras, números, comas, puntos, guiones)')
    .matches(sinCaracteresInvalidosRegex, 'El nombre contiene caracteres inválidos')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede exceder 20 caracteres')
    .required('El nombre del evento es obligatorio'),

  descripcionEvento: Yup.string()
    .trim()
    .matches(textoComunRegex, 'Usa una descripción válida (letras, números, comas, puntos, guiones)')
    .matches(sinCaracteresInvalidosRegex, 'La descripción contiene caracteres inválidos')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(50, 'La descripción no puede exceder 50 caracteres')
    .required('La descripción es obligatoria'),

  tipoEventoId: Yup.string()
    .required('Debes seleccionar un tipo de evento'),

  fechaInicio: Yup.date()
    .min(hoy, 'La fecha del evento no puede ser anterior a hoy')
    .required('La fecha del evento es obligatoria')
    .typeError('Ingresa una fecha válida'),

  fechaFin: Yup.date()
    .min(Yup.ref('fechaInicio'), 'La fecha de fin no puede ser anterior a la fecha de inicio')
    .required('La fecha de fin es obligatoria')
    .typeError('Ingresa una fecha válida'),

  horaInicio: Yup.string()
    .matches(horaValidaRegex, 'Selecciona una hora válida entre 07:00 y 17:00 (en punto)')
    .required('La hora de inicio es obligatoria')
    .test('hora-no-anterior', 'La hora de inicio no puede ser anterior a la hora actual', function (value) {
      if (!value) return true;
      const { fechaInicio } = this.parent;
      if (!fechaInicio) return true;

      const [hora, minutos] = value.split(':').map(Number);
      const fechaConHora = new Date(fechaInicio);
      fechaConHora.setHours(hora, minutos, 0, 0);

      const ahora = new Date();

      // Normalizamos fecha actual sin horas para comparar "día"
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const fechaSolo = new Date(fechaInicio);
      fechaSolo.setHours(0, 0, 0, 0);

      // Caso 1: si la fecha es HOY → validar contra la hora actual
      if (fechaSolo.getTime() === hoy.getTime()) {
        return fechaConHora >= ahora;
      }

      // Caso 2: si la fecha es FUTURA → no importa la hora actual
      return true;
    }),

  horaFin: Yup.string()
    .matches(horaValidaRegex, 'Selecciona una hora válida entre 07:00 y 17:00 (en punto)')
    .required('La hora de fin es obligatoria')
    .test('es-mayor', 'La hora de fin no puede ser anterior o igual a la hora de inicio', function (value) {
      const { horaInicio } = this.parent;
      if (!horaInicio || !value) return true;

      const [hInicio] = horaInicio.split(':').map(Number);
      const [hFin] = value.split(':').map(Number);

      return hFin > hInicio;
    }),

  ubicacion: Yup.string()
    .trim()
    .matches(soloLetrasRegex, 'Usa una ubicación válida (solo letras)')
    .min(3, 'La ubicación debe tener al menos 3 caracteres')
    .max(50, 'La ubicación no puede exceder 50 caracteres')
    .required('La ubicación es obligatoria'),

  responsable: Yup.string()
    .trim()
    .matches(soloLetrasRegex, 'Usa un nombre válido (solo letras)')
    .min(3, 'El nombre del responsable debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede exceder 20 caracteres')
    .required('El nombre del responsable es obligatorio'),
};

export const eventoSchema = Yup.object(eventoFields);