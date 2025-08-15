package mx.edu.utez.cronograma_back.controllers;

import lombok.RequiredArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Tipo.TipoEvento;
import mx.edu.utez.cronograma_back.services.TipoEventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tipos-evento")
public class TipoEventoController {

    private final TipoEventoService tipoEventoService;

    public TipoEventoController(TipoEventoService tipoEventoService) {
        this.tipoEventoService = tipoEventoService;
    }

    @GetMapping
    public ResponseEntity<List<TipoEvento>> obtenerTodos() {
        List<TipoEvento> tipos = tipoEventoService.obtenerTodos();
        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/publico")
    public ResponseEntity<List<TipoEvento>> obtenerTodosPublico() {
        List<TipoEvento> tipos = tipoEventoService.obtenerTodos();
        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/publico/{id}")
    public ResponseEntity<TipoEvento> obtenerPorIdPublico(@PathVariable Integer id) {
        return tipoEventoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoEvento> obtenerPorId(@PathVariable Integer id) {
        return tipoEventoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<TipoEvento> obtenerPorNombre(@PathVariable String nombre) {
        return tipoEventoService.obtenerPorNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TipoEvento> crear(@RequestBody TipoEvento tipoEvento) {
        TipoEvento nuevoTipo = tipoEventoService.guardar(tipoEvento);
        return new ResponseEntity<>(nuevoTipo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoEvento> actualizar(@PathVariable Integer id, @RequestBody TipoEvento tipoEvento) {
        return tipoEventoService.actualizar(id, tipoEvento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        boolean eliminado = tipoEventoService.eliminar(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}