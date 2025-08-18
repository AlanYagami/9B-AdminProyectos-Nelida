import { useState, useEffect } from "react";
import {userSchema} from "../validations/userSchema";

function UserModal({ show, onClose, onSubmit, userData }) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
  });

  const [errors, setErrors] = useState({});

  // Esquema de validación con Yup
  const validationSchema = userSchema;

  useEffect(() => {
    if (userData) {
      setFormData({
        nombre: userData.nombre || "",
        correo: userData.correo || "",
      });
    }
    // Limpiar errores cuando se abre el modal
    setErrors({});
  }, [userData, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    const processedValue = value;

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Validar con Yup
      await validationSchema.validate(formData, { abortEarly: false });

      setErrors({}); // Limpiar errores si la validación pasa
      onSubmit(formData); // Enviar datos si todo está correcto

    } catch (error) {
      if (error.name === 'ValidationError') {
        // Errores de validación
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
        <div className="modal-content custom-modal-content">
          <div className="modal-header custom-modal-header">
            <h5 className="modal-title text-white">Editar Usuario</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body text-white">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                className="form-control custom-input"
                placeholder="Juan Carlos Bodoque"
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
                className="form-control custom-input"
                placeholder="ejemplo@org.mx"
                value={formData.correo}
                onChange={handleChange}
              />
              {errors.correo && <div style={errorStyle}>{errors.correo}</div>}
            </div>
          </div>

          <div className="modal-footer justify-content-between">
            <button className="btn btn-secondary custom-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary custom-btn-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>

          <style jsx="true">{`
            .custom-modal-dialog {
              max-width: 600px;
              margin: 1.75rem auto;
            }
            .custom-modal-content {
              background-color: #1e1e2f;
              border-radius: 8px;
              color: white;
            }
            .custom-modal-header {
              border-bottom: 1px solid #44475a;
              background-color: #292b3c;
            }
            .custom-input {
              background-color: #2a2a3d;
              color: white;
              border: 1px solid #555770;
            }
            .custom-input::placeholder {
              color: #bbb;
              opacity: 1;
            }
            .custom-input:focus {
              background-color: #3b3b5c;
              border-color: #764ba2;
              color: white;
              box-shadow: 0 0 8px #764ba2;
              outline: none;
            }
            .btn-close-white {
              filter: invert(1);
            }
            .custom-btn-primary {
              background-color: #764ba2;
              border-color: #764ba2;
              font-weight: bold;
              padding: 6px 20px;
            }
            .custom-btn-primary:hover {
              background-color: #5e3a7a;
              border-color: #5e3a7a;
            }
            .custom-btn-secondary {
              background-color: #44475a;
              border-color: #44475a;
              color: #ccc;
            }
            .custom-btn-secondary:hover {
              background-color: #5a5f78;
              border-color: #5a5f78;
              color: white;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default UserModal; 