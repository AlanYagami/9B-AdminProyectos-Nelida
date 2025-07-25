package mx.edu.utez.cronograma_back.modules.Bloque;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;

import java.time.LocalTime;

@Entity
@Table(name = "bloque")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bloque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bloque")
    private Integer idBloque;

    @Column(name = "nombre_bloque", nullable = false, length = 100)
    private String nombreBloque;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "color", length = 7)
    private String color;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    public Bloque(String nombreBloque, LocalTime horaInicio, LocalTime horaFin,
                  String color, String descripcion, Evento evento) {
        this.nombreBloque = nombreBloque;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.color = color;
        this.descripcion = descripcion;
        this.evento = evento;
    }
}
