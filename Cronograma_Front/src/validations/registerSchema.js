import * as Yup from 'yup';
import { nombre, correo, contrasena } from './fields';

export const registerSchema = Yup.object({
  nombre,
  correo,
  contrasena,
  repetirContrasena: Yup.string()
    .oneOf([Yup.ref('contrasena')], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});
