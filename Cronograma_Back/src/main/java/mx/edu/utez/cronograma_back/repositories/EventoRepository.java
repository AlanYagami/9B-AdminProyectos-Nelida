package mx.edu.utez.cronograma_back.repositories;


import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByUsuario_IdUsuario(Integer id);
}
