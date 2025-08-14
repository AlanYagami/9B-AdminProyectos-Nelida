package mx.edu.utez.cronograma_back.modules.Bloque;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bloque")
@Data
public class Bloque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bloque")
    private Integer idBloque;

    @Column(name = "nombre_bloque", nullable = false, length = 100)
    private String nombreBloque;

    @Column(name = "fecha_bloque", nullable = false)
    private LocalDateTime fechaBloque;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "color", length = 7)
    private String color;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    public Bloque() {
    }

    public Bloque(Integer idBloque, String nombreBloque, LocalDateTime fechaBloque, LocalTime horaInicio, String color, String descripcion, Evento evento) {
        this.idBloque = idBloque;
        this.nombreBloque = nombreBloque;
        this.fechaBloque = fechaBloque;
        this.horaInicio = horaInicio;
        this.color = color;
        this.descripcion = descripcion;
        this.evento = evento;
    }

    public Bloque(String nombreBloque, LocalDateTime fechaBloque, LocalTime horaInicio,
                  String color, String descripcion, Evento evento) {
        this.nombreBloque = nombreBloque;
        this.fechaBloque = fechaBloque;
        this.horaInicio = horaInicio;
        this.color = color;
        this.descripcion = descripcion;
        this.evento = evento;
    }

    //


    public Integer getIdBloque() {
        return idBloque;
    }

    public void setIdBloque(Integer idBloque) {
        this.idBloque = idBloque;
    }

    public String getNombreBloque() {
        return nombreBloque;
    }

    public void setNombreBloque(String nombreBloque) {
        this.nombreBloque = nombreBloque;
    }

    public LocalDateTime getFechaBloque() {
        return fechaBloque;
    }

    public void setFechaBloque(LocalDateTime fechaBloque) {
        this.fechaBloque = fechaBloque;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
