package mx.edu.utez.cronograma_back.services;

import lombok.RequiredArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Estado.Estado;
import mx.edu.utez.cronograma_back.repositories.EstadoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class EstadoService {

    private final EstadoRepository estadoRepository;

    public EstadoService(EstadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    public List<Estado> obtenerTodos() {
        return estadoRepository.findAll();
    }

    public Optional<Estado> obtenerPorId(Integer id) {
        return estadoRepository.findById(id);
    }

    public Optional<Estado> obtenerPorNombre(String estado) {
        return estadoRepository.findByEstado(estado);
    }

    public Estado guardar(Estado estado) {
        return estadoRepository.save(estado);
    }

    public Optional<Estado> actualizar(Integer id, Estado estadoActualizado) {
        return estadoRepository.findById(id).map(estadoExistente -> {
            estadoActualizado.setIdEstado(estadoExistente.getIdEstado());
            return estadoRepository.save(estadoActualizado);
        });
    }

    public boolean eliminar(Integer id) {
        return estadoRepository.findById(id).map(estado -> {
            estadoRepository.delete(estado);
            return true;
        }).orElse(false);
    }
}
