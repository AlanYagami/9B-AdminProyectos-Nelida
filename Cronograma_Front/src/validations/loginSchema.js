import * as Yup from 'yup';
import { correo, contrasena } from './fields';

export const loginSchema = Yup.object({
  correo,
  contrasena
});