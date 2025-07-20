package mx.edu.utez.cronograma_back.services;

import lombok.RequiredArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Tipo.TipoEvento;
import mx.edu.utez.cronograma_back.repositories.TipoEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class TipoEventoService {

    private final TipoEventoRepository tipoEventoRepository;

    public TipoEventoService(TipoEventoRepository tipoEventoRepository) {
        this.tipoEventoRepository = tipoEventoRepository;
    }

    public List<TipoEvento> obtenerTodos() {
        return tipoEventoRepository.findAll();
    }

    public Optional<TipoEvento> obtenerPorId(Integer id) {
        return tipoEventoRepository.findById(id);
    }

    public Optional<TipoEvento> obtenerPorNombre(String tipoEvento) {
        return tipoEventoRepository.findByTipoEvento(tipoEvento);
    }

    public TipoEvento guardar(TipoEvento tipoEvento) {
        return tipoEventoRepository.save(tipoEvento);
    }

    public Optional<TipoEvento> actualizar(Integer id, TipoEvento tipoEventoActualizado) {
        return tipoEventoRepository.findById(id).map(tipoExistente -> {
            tipoEventoActualizado.setIdTipoEvento(tipoExistente.getIdTipoEvento());
            return tipoEventoRepository.save(tipoEventoActualizado);
        });
    }

    public boolean eliminar(Integer id) {
        return tipoEventoRepository.findById(id).map(tipo -> {
            tipoEventoRepository.delete(tipo);
            return true;
        }).orElse(false);
    }
}