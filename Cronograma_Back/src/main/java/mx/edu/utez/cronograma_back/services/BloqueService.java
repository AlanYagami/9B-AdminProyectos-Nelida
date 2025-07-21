package mx.edu.utez.cronograma_back.services;

import mx.edu.utez.cronograma_back.modules.Bloque.Bloque;
import mx.edu.utez.cronograma_back.repositories.BloqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloqueService {

    private final BloqueRepository bloqueRepository;

    public BloqueService(BloqueRepository bloqueRepository) {
        this.bloqueRepository = bloqueRepository;
    }


    public List<Bloque> obtenerTodos() {
        return bloqueRepository.findAll();
    }

    public Optional<Bloque> obtenerPorId(Integer id) {
        return bloqueRepository.findById(id);
    }

    public List<Bloque> obtenerPorEvento(Integer idEvento) {
        return bloqueRepository.findByEvento_IdEvento(idEvento);
    }

    public Bloque guardar(Bloque bloque) {
        return bloqueRepository.save(bloque);
    }

    public Optional<Bloque> actualizar(Integer id, Bloque bloqueActualizado) {
        return bloqueRepository.findById(id).map(bloqueExistente -> {
            bloqueActualizado.setIdBloque(bloqueExistente.getIdBloque());
            return bloqueRepository.save(bloqueActualizado);
        });
    }

    public boolean eliminar(Integer id) {
        return bloqueRepository.findById(id).map(bloque -> {
            bloqueRepository.delete(bloque);
            return true;
        }).orElse(false);
    }
}
