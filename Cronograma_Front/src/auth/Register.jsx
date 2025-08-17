import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    repetirContrasena: '',
  });

  const [errors, setErrors] = useState({});

  // Esquema de validación con Yup
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .transform((value) => (value ? value.trim().replace(/\s{2,}/g, ' ') : '')) // trim y eliminar dobles espacios
      .matches(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+){0,2}$/,
        'Solo se permiten hasta 3 nombres, sin espacios dobles ni al inicio o final'
      )
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('El nombre es obligatorio'),
    correo: Yup.string()
      .transform((value) => (value ? value.trim() : ''))
      .email('Ingresa un correo electrónico válido')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'El formato del correo no es válido'
      )
      .required('El correo electrónico es obligatorio'),
    contrasena: Yup.string()
      .transform((value) => (value ? value.trim() : ''))
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Debe contener al menos una mayúscula, una minúscula y un número'
      )
      .required('La contraseña es obligatoria'),
    repetirContrasena: Yup.string()
      .oneOf([Yup.ref('contrasena')], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña')
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'nombre') {
      // Quitar espacios dobles
      processedValue = processedValue.replace(/\s{2,}/g, ' ');
      // Quitar espacio al inicio
      if (processedValue.startsWith(' ')) {
        processedValue = processedValue.trimStart();
      }
      // Quitar espacio al final
      if (processedValue.endsWith(' ')) {
        processedValue = processedValue.trimEnd();
      }
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const handleSubmit = async () => {
    try {
      // Validar con Yup
      await validationSchema.validate(formData, { abortEarly: false });

      setErrors({}); // Limpiar errores si la validación pasa

      await api.auth.register({
        nombre: formData.nombre,
        correo: formData.correo,
        contra: formData.contrasena,
        rol: { idRol: 2 }
      });

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Ya puedes iniciar sesión',
        confirmButtonColor: '#667eea',
        background: '#2c2c2c',
        color: 'white'
      }).then(() => navigate('/login'));

    } catch (error) {
      if (error.name === 'ValidationError') {
        // Errores de validación
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);

        Swal.fire({
          icon: 'warning',
          title: 'Datos inválidos',
          text: 'Por favor, corrige los errores en el formulario',
          confirmButtonColor: '#667eea',
          background: '#2c2c2c',
          color: 'white'
        });
      }
      // El error del API ya es manejado automáticamente por el interceptor
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#2c2c2c',
    borderRadius: '15px',
    padding: '2rem',
    color: 'white',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    backgroundColor: '#4a4a4a',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    padding: '12px 16px',
    marginBottom: '0.5rem'
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem'
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div className="text-white">
              <h1 className="display-1 fw-bold mb-0">SICALE</h1>
              <div className="mt-4">
                <img
                  src="src/assets/img/calendario.png"
                  alt="Calendario"
                  className="img-fluid"
                  style={{ maxWidth: '80%', height: 'auto' }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div style={cardStyle}>
              <div onClick={() => navigate('/landing')} style={{ cursor: 'pointer' }}>
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="img-fluid mb-4 w-25 mx-auto d-block"
                />
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Juan Carlos Bodoque"
                    style={inputStyle}
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <div style={errorStyle}>{errors.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    placeholder="ejemplo@org.mx"
                    style={inputStyle}
                    value={formData.correo}
                    onChange={handleChange}
                  />
                  {errors.correo && <div style={errorStyle}>{errors.correo}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="contrasena"
                    className="form-control"
                    placeholder="••••••••"
                    style={inputStyle}
                    value={formData.contrasena}
                    onChange={handleChange}
                  />
                  {errors.contrasena && <div style={errorStyle}>{errors.contrasena}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Repetir Contraseña</label>
                  <input
                    type="password"
                    name="repetirContrasena"
                    className="form-control"
                    placeholder="••••••••"
                    style={inputStyle}
                    value={formData.repetirContrasena}
                    onChange={handleChange}
                  />
                  {errors.repetirContrasena && <div style={errorStyle}>{errors.repetirContrasena}</div>}
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100 mb-3"
                  style={buttonStyle}
                  onClick={handleSubmit}
                >
                  Registrarme
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    style={linkStyle}
                    onClick={() => navigate('/login')}
                  >
                    ¿Ya tienes una cuenta? <strong>Iniciar sesión</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;