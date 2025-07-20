package mx.edu.utez.cronograma_back.repositories;

import mx.edu.utez.cronograma_back.modules.Tipo.TipoEvento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoEventoRepository extends JpaRepository<TipoEvento, Integer> {
    Optional<TipoEvento> findByTipoEvento(String tipoEvento);
}
