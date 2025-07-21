package mx.edu.utez.cronograma_back.repositories;
import mx.edu.utez.cronograma_back.modules.Bloque.Bloque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloqueRepository extends JpaRepository<Bloque, Integer> {
    List<Bloque> findByEvento_IdEvento(Integer idEvento);
}
