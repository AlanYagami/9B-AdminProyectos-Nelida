import * as Yup from 'yup';

// Validación para correo
export const correo = Yup.string()
  .transform(value => (value ? value.trim() : ''))
  .email('Ingresa un correo electrónico válido')
  .matches(
    /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'El formato del correo no es válido'
  )
  .matches(/^[^<>/;"'`\\]*$/, 'El correo contiene caracteres inválidos')
  .required('El correo electrónico es obligatorio');

// Validación para contraseña
export const contrasena = Yup.string()
  .transform(value => (value ? value.trim() : ''))
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Debe contener al menos una mayúscula, una minúscula y un número'
  )
  .matches(/^[^<>/;"'`\\]*$/, 'El correo contiene caracteres inválidos como: <>, /, ;, comillas, etc.')
  .required('La contraseña es obligatoria');

  // Validación para nombre (sin <>, espacios dobles, etc)
export const nombre = Yup.string()
  .transform(value => (value ? value.trim().replace(/\s{2,}/g, ' ') : ''))
  .matches(
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+){0,2}$/,
    'Solo se permiten hasta 3 nombres, sin espacios dobles ni al inicio o final'
  )
  .matches(/^[^<>\/;"'`\\]*$/, 'El nombre no debe contener caracteres especiales')
  .min(3, 'El nombre debe tener al menos 3 caracteres')
  .required('El nombre es obligatorio');