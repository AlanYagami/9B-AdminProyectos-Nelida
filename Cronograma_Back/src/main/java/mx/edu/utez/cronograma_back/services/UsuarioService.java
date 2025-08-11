package mx.edu.utez.cronograma_back.services;

import lombok.RequiredArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> obtenerPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    /*public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }*/

    public Optional<Usuario> actualizar(Integer id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuarioExistente -> {
            usuarioActualizado.setIdUsuario(usuarioExistente.getIdUsuario());
            return usuarioRepository.save(usuarioActualizado);
        });
    }

    public boolean eliminar(Integer id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuarioRepository.delete(usuario);
            return true;
        }).orElse(false);
    }
}
