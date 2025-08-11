package mx.edu.utez.cronograma_back.modules.auth;

import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.modules.auth.dto.LoginRequestDTO;
import mx.edu.utez.cronograma_back.utils.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthServices authService;

    @PostMapping("")
    public ResponseEntity<APIResponse> doLogin(@RequestBody LoginRequestDTO payload){
        APIResponse response = authService.doLogin(payload);
        return new ResponseEntity<>(response,response.getStatus());
    }

    @PostMapping("/register")
    public ResponseEntity<APIResponse> doRegister(@RequestBody Usuario payload){
        APIResponse response = authService.register(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("/forgot-password")
    public APIResponse forgotPassword(@RequestBody Map<String, String> request) {
        return authService.forgotPassword(request.get("correo"));
    }

    @PostMapping("/reset-password")
    public APIResponse resetPassword(@RequestBody Map<String, String> request) {
        return authService.resetPassword(request.get("token"), request.get("nuevaContraseña"));
    }
}