package mx.edu.utez.cronograma_back.controllers;

import mx.edu.utez.cronograma_back.modules.Estado.Estado;
import mx.edu.utez.cronograma_back.services.EstadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/estados")

public class EstadoController {

    private final EstadoService estadoService;

    public EstadoController(EstadoService estadoService) {
        this.estadoService = estadoService;
    }

    @GetMapping
    public ResponseEntity<List<Estado>> obtenerTodos() {
        List<Estado> estados = estadoService.obtenerTodos();
        return ResponseEntity.ok(estados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estado> obtenerPorId(@PathVariable Integer id) {
        return estadoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Estado> obtenerPorNombre(@PathVariable String nombre) {
        return estadoService.obtenerPorNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Estado> crear(@RequestBody Estado estado) {
        Estado nuevoEstado = estadoService.guardar(estado);
        return new ResponseEntity<>(nuevoEstado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estado> actualizar(@PathVariable Integer id, @RequestBody Estado estado) {
        return estadoService.actualizar(id, estado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        boolean eliminado = estadoService.eliminar(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
