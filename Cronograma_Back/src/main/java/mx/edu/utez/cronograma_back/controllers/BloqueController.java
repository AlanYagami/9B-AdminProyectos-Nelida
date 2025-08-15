package mx.edu.utez.cronograma_back.controllers;

import mx.edu.utez.cronograma_back.modules.Bloque.Bloque;
import mx.edu.utez.cronograma_back.services.BloqueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/bloques")
public class BloqueController {

    private final BloqueService bloqueService;

    public BloqueController(BloqueService bloqueService) {
        this.bloqueService = bloqueService;
    }

    @GetMapping
    public ResponseEntity<List<Bloque>> obtenerTodos() {
        return ResponseEntity.ok(bloqueService.obtenerTodos());
    }

    @GetMapping("/publico/evento/{idEvento}")
    public ResponseEntity<List<Bloque>> obtenerTodosPublicoID(@PathVariable Integer idEvento) {
        List<Bloque> bloques = bloqueService.obtenerPorEvento(idEvento);
        return ResponseEntity.ok(bloques);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bloque> obtenerPorId(@PathVariable Integer id) {
        return bloqueService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<List<Bloque>> obtenerPorEvento(@PathVariable Integer idEvento) {
        List<Bloque> bloques = bloqueService.obtenerPorEvento(idEvento);
        return ResponseEntity.ok(bloques);
    }

    @PostMapping
    public ResponseEntity<Bloque> crear(@RequestBody Bloque bloque) {
        Bloque nuevoBloque = bloqueService.guardar(bloque);
        return new ResponseEntity<>(nuevoBloque, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bloque> actualizar(@PathVariable Integer id, @RequestBody Bloque bloque) {
        return bloqueService.actualizar(id, bloque)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        boolean eliminado = bloqueService.eliminar(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
