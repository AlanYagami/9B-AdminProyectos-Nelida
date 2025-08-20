package mx.edu.utez.cronograma_back.services;

import mx.edu.utez.cronograma_back.modules.Bloque.Bloque;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import mx.edu.utez.cronograma_back.repositories.BloqueRepository;
import mx.edu.utez.cronograma_back.repositories.EventoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class BloqueService {

    private final BloqueRepository bloqueRepository;
    private final EventoRepository eventoRepository;

    public BloqueService(BloqueRepository bloqueRepository, EventoRepository eventoRepository) {
        this.bloqueRepository = bloqueRepository;
        this.eventoRepository = eventoRepository;
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
        Evento evento = bloque.getEvento();

        if (evento == null || evento.getIdEvento() == null) {
            throw new RuntimeException("El evento es obligatorio para crear un bloque");
        }

        // Validación: obtener el evento real (por si viene incompleto)
        Evento eventoCompleto = eventoRepository.findById(evento.getIdEvento())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Validación 1: Fecha del bloque debe estar dentro del rango del evento
        if (bloque.getFechaBloque().toLocalDate().isBefore(eventoCompleto.getFechaInicio().toLocalDate()) ||
                bloque.getFechaBloque().toLocalDate().isAfter(eventoCompleto.getFechaFin().toLocalDate())) {
            throw new RuntimeException("La fecha del bloque está fuera del rango del evento");
        }

        // Validación 2: Hora del bloque debe estar dentro del horario del evento
        LocalTime horaInicioEvento = eventoCompleto.getFechaInicio().toLocalTime();
        LocalTime horaFinEventoMenosUnaHora = eventoCompleto.getFechaFin().toLocalTime().minusHours(1);

        if (bloque.getHoraInicio().isBefore(horaInicioEvento) ||
                bloque.getHoraInicio().isAfter(horaFinEventoMenosUnaHora)) {
            throw new RuntimeException("La hora del bloque está fuera del horario del evento");
        }

        // Seteamos el evento completo para evitar errores si venía incompleto
        bloque.setEvento(eventoCompleto);

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
