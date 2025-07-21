package mx.edu.utez.cronograma_back.controllers;

import lombok.RequiredArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import mx.edu.utez.cronograma_back.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping
    public ResponseEntity<List<Evento>> obtenerTodos() {
        List<Evento> eventos = eventoService.obtenerTodos();
        return new ResponseEntity<>(eventos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obtenerPorId(@PathVariable Integer id) {
        return eventoService.obtenerPorId(id)
                .map(evento -> new ResponseEntity<>(evento, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Evento> crear(@RequestBody Evento nuevoEvento) {
        Evento eventoGuardado = eventoService.guardar(nuevoEvento);
        return new ResponseEntity<>(eventoGuardado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizar(@PathVariable Integer id, @RequestBody Evento eventoActualizado) {
        return eventoService.actualizar(id, eventoActualizado)
                .map(evento -> new ResponseEntity<>(evento, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        boolean eliminado = eventoService.eliminar(id);
        return eliminado ?
                new ResponseEntity<>(HttpStatus.NO_CONTENT) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}