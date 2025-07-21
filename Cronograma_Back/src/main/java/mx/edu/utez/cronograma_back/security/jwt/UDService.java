package mx.edu.utez.cronograma_back.security.jwt;

import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

//Tercer paso: Crear nuestro servicio de gestión de autoridades
@Service
public class UDService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        //Buscar primero al usuario
        Usuario found = usuarioRepository.findByCorreo(correo).orElse(null);
        if (found == null) throw new UsernameNotFoundException("Correo no encontrado");
        //Generar las autoridades para el contexto de seguridad
        // authority= ROLE_ADMIN,ROLE_EMPLOYEE -> filterChain
        GrantedAuthority authority=new SimpleGrantedAuthority("ROLE_" + found.getRol().getRol());

        //Retornar el objeto de usuario para registrar en el contexto de seguridad
        return new User(
                found.getCorreo(),
                found.getContra(),
                Collections.singleton(authority)
        );
    }
}

