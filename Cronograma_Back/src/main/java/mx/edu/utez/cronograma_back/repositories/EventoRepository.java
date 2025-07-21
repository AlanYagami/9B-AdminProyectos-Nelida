package mx.edu.utez.cronograma_back.repositories;


import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
}
