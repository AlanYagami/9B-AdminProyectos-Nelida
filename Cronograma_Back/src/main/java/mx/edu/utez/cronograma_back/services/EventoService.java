package mx.edu.utez.cronograma_back.services;

import mx.edu.utez.cronograma_back.modules.Estado.Estado;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import mx.edu.utez.cronograma_back.modules.Tipo.TipoEvento;
import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;
import mx.edu.utez.cronograma_back.repositories.EstadoRepository;
import mx.edu.utez.cronograma_back.repositories.EventoRepository;
import mx.edu.utez.cronograma_back.repositories.TipoEventoRepository;
import mx.edu.utez.cronograma_back.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TipoEventoRepository tipoEventoRepository;
    private final EstadoRepository estadoRepository;

    public EventoService(EventoRepository eventoRepository, UsuarioRepository usuarioRepository, TipoEventoRepository tipoEventoRepository, EstadoRepository estadoRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
        this.tipoEventoRepository = tipoEventoRepository;
        this.estadoRepository = estadoRepository;
    }


    public List<Evento> obtenerTodos() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> obtenerPorId(Integer id) {
        return eventoRepository.findById(id);
    }

    public Evento guardar(Evento evento) {
        Usuario usuario = usuarioRepository.findById(evento.getUsuario().getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        evento.setUsuario(usuario);

        TipoEvento tipo = tipoEventoRepository.findById(evento.getTipoEvento().getIdTipoEvento())
                .orElseThrow(() -> new RuntimeException("Tipo de evento no encontrado"));
        evento.setTipoEvento(tipo);

        Estado estado = estadoRepository.findById(evento.getEstado().getIdEstado())
                .orElseThrow(() -> new RuntimeException("Estado no encontrado"));
        evento.setEstado(estado);

        return eventoRepository.save(evento);
    }

    public Optional<Evento> actualizar(Integer id, Evento eventoActualizado) {
        return eventoRepository.findById(id).map(eventoExistente -> {
            eventoActualizado.setIdEvento(id);
            return eventoRepository.save(eventoActualizado);
        });
    }

    public boolean eliminar(Integer id) {
        return eventoRepository.findById(id).map(evento -> {
            eventoRepository.delete(evento);
            return true;
        }).orElse(false);
    }

    public List<Evento> obtenerEventosPorUsuarioId(Integer idUsuario) {
        return eventoRepository.findByUsuario_IdUsuario(idUsuario);
    }

}