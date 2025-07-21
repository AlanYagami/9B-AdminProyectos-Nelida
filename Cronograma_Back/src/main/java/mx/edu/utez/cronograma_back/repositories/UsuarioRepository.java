package mx.edu.utez.cronograma_back.repositories;


import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreo(String correo);

}