package mx.edu.utez.cronograma_back.repositories;

import mx.edu.utez.cronograma_back.modules.Estado.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadoRepository extends JpaRepository<Estado, Integer> {
    Optional<Estado> findByEstado(String estado);
}
