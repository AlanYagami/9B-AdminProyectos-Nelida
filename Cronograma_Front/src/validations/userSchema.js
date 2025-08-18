import * as yup from 'yup';
import { nombre, correo } from './fields';

export const userSchema = yup.object({
  nombre: nombre,
  correo: correo,
});