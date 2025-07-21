package mx.edu.utez.cronograma_back.modules.auth;

import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.modules.auth.dto.LoginRequestDTO;
import mx.edu.utez.cronograma_back.repositories.UsuarioRepository;
import mx.edu.utez.cronograma_back.security.jwt.JWTUtils;
import mx.edu.utez.cronograma_back.security.jwt.UDService;
import mx.edu.utez.cronograma_back.utils.APIResponse;
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
        private UDService udService;

        @Autowired
        private JWTUtils jwtUtils;

        @Transactional(readOnly = true)
        public APIResponse doLogin(LoginRequestDTO payload) {
            try {
                Usuario found = userRepository.findByCorreo(payload.getCorreo()).orElse(null);
                if (found == null) return new APIResponse("Correo no encontrado", true, HttpStatus.NOT_FOUND);

                if (!PasswordEncoder.verifyPassword(payload.getContra(), found.getContra()))
                    return new APIResponse("Las contrasenas no coniciden", true, HttpStatus.BAD_REQUEST);

                UserDetails ud = udService.loadUserByUsername(found.getCorreo());
                String token = jwtUtils.generateToken(ud);
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
            if (found != null) return new APIResponse("El usuario ya existe", true, HttpStatus.BAD_REQUEST);

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
}