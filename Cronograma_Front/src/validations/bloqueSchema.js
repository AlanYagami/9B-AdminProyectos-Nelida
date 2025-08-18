import * as Yup from 'yup';

const textoComunRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9][a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]*[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/;
const sinCaracteresInvalidosRegex = /^[^<>/;"'`\\]*$/;
const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*[a-zA-ZáéíóúÁÉÍÓÚñÑ]$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/;

export const bloqueFields = {
    eventTitle: Yup.string()
        .trim()
        .matches(soloLetrasRegex, 'Usa un nombre válido (Solo letras)')
        .matches(sinCaracteresInvalidosRegex, 'El nombre contiene caracteres inválidos')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(10, 'El nombre no puede exceder 10 caracteres')
        .required('El nombre del evento es obligatorio'),
    
    eventDescription: Yup.string()
        .trim()
        .matches(textoComunRegex, 'Usa una descripción válida (letras, números, comas, puntos, guiones)')
        .matches(sinCaracteresInvalidosRegex, 'La descripción contiene caracteres inválidos')
        .min(5, 'La descripción debe tener al menos 5 caracteres')
        .max(30, 'La descripción no puede exceder 50 caracteres')
        .required('La descripción es obligatoria'),
    eventColor: Yup.string()
        .required('Debes seleccionar un color'),
};

export const eventoSchema = Yup.object(bloqueFields);