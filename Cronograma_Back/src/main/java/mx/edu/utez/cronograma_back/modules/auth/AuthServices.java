package mx.edu.utez.cronograma_back.modules.auth;

import mx.edu.utez.cronograma_back.modules.Rol.Rol;
import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.modules.auth.dto.LoginRequestDTO;
import mx.edu.utez.cronograma_back.repositories.RolRepository;
import mx.edu.utez.cronograma_back.repositories.UsuarioRepository;
import mx.edu.utez.cronograma_back.security.jwt.JWTUtils;
import mx.edu.utez.cronograma_back.security.jwt.UDService;
import mx.edu.utez.cronograma_back.utils.APIResponse;
import mx.edu.utez.cronograma_back.utils.EmailUtils;
import mx.edu.utez.cronograma_back.utils.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
public class AuthServices {
    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UDService udService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private EmailUtils emailUtils;

    @Transactional(readOnly = true)
    public APIResponse doLogin(LoginRequestDTO payload) {
        try {
            Usuario found = userRepository.findByCorreo(payload.getCorreo()).orElse(null);
            if (found == null) return new APIResponse("Correo no encontrado", true, HttpStatus.NOT_FOUND);

            if (!PasswordEncoder.verifyPassword(payload.getContra(), found.getContra()))
                return new APIResponse("Las contrasenas no coniciden", true, HttpStatus.BAD_REQUEST);

            UserDetails ud = udService.loadUserByUsername(found.getCorreo());
            String token = jwtUtils.generateToken(ud, found.getIdUsuario(), found.getNombre());
            return new APIResponse("Operacion exitosa", token, false, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new APIResponse(
                    "Error al iniciar sesion",
                    true,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }

    @Transactional (rollbackFor = {SQLException.class, Exception.class})
    public APIResponse register(Usuario payload) {
        try {
            Usuario found = userRepository.findByCorreo(payload.getCorreo()).orElse(null);
            if (found != null) return new APIResponse("El correo ya esta registrado", true, HttpStatus.BAD_REQUEST);

            if (payload.getRol() == null) {
                Rol rol = rolRepository.findByRol("ORGANIZADOR")
                        .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
                payload.setRol(rol);
            }

            payload.setContra(PasswordEncoder.encodePassword(payload.getContra()));
            userRepository.save(payload);
            return new APIResponse("Operacion exitosa",false, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new APIResponse(
                    "Error al registrar al usuario",
                    true,
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    @Transactional(readOnly = true)
    public APIResponse forgotPassword(String correo) {
        try {
            // Buscar al usuario por su correo electrónico
            Usuario found = userRepository.findByCorreo(correo).orElse(null);
            if (found == null) {
                return new APIResponse("Correo no encontrado", true, HttpStatus.NOT_FOUND);
            }

            // Generar un token de recuperación
            String token = jwtUtils.generatePasswordResetToken(correo);

            // Enviar el token al correo del usuario (incluir un enlace para restablecer la contraseña)
            String resetUrl = "http://localhost:5173/reset-password?token=" + token;
            emailUtils.sendPasswordResetEmail(correo, resetUrl);

            return new APIResponse("Correo de recuperación enviado", false, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new APIResponse("Error al enviar el correo de recuperación", true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public APIResponse resetPassword(String token, String nuevaContraseña) {
        try {
            // Validar y decodificar el token para obtener el correo del usuario
            String correo = jwtUtils.validatePasswordResetToken(token);
            if (correo == null) {
                return new APIResponse("Token inválido o expirado", true, HttpStatus.BAD_REQUEST);
            }

            // Buscar al usuario con el correo decodificado
            Usuario found = userRepository.findByCorreo(correo).orElse(null);
            if (found == null) {
                return new APIResponse("Correo no encontrado", true, HttpStatus.NOT_FOUND);
            }

            // Actualizar la contraseña del usuario
            found.setContra(PasswordEncoder.encodePassword(nuevaContraseña));
            userRepository.save(found);

            return new APIResponse("Contraseña actualizada con éxito", false, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new APIResponse("Error al restablecer la contraseña", true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}