package mx.edu.utez.cronograma_back.modules.Evento;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import mx.edu.utez.cronograma_back.modules.Bloque.Bloque;
import mx.edu.utez.cronograma_back.modules.Estado.Estado;
import mx.edu.utez.cronograma_back.modules.Tipo.TipoEvento;
import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "evento")
@Data
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Integer idEvento;

    @Column(name = "nombre_evento", nullable = false, length = 200)
    private String nombreEvento;

    @Column(name = "descripcion_evento", nullable = false, length = 200)
    private String descripcionEvento;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime fechaFin;

    @Column(name = "ubicacion", length = 255)
    private String ubicacion;

    @Column(name = "num_horas", nullable = false)
    private Integer numHoras;

    @Column(name = "responsable", length = 255)
    private String responsable;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_tipo_evento", nullable = false)
    private TipoEvento tipoEvento;

    @ManyToOne
    @JoinColumn(name = "id_estado", nullable = false)
    private Estado estado;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bloque> bloques;

    //
    public Evento() {
    }

    public Evento(Integer idEvento, String nombreEvento, String descripcionEvento, LocalDateTime fechaInicio, LocalDateTime fechaFin,
                  String ubicacion, String responsable, Usuario usuario, TipoEvento tipoEvento, Estado estado,
                  List<Bloque> bloques) {
        this.idEvento = idEvento;
        this.nombreEvento = nombreEvento;
        this.descripcionEvento = descripcionEvento;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.ubicacion = ubicacion;
        this.responsable = responsable;
        this.usuario = usuario;
        this.tipoEvento = tipoEvento;
        this.estado = estado;
        this.bloques = bloques;
    }

    //

    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public String getDescripcionEvento() {
        return descripcionEvento;
    }

    public void setDescripcionEvento(String descripcionEvento) {
        this.descripcionEvento = descripcionEvento;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Integer getNumHoras() {
        return numHoras;
    }

    public void setNumHoras(Integer numHoras) {
        this.numHoras = numHoras;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoEvento getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(TipoEvento tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public List<Bloque> getBloques() {
        return bloques;
    }

    public void setBloques(List<Bloque> bloques) {
        this.bloques = bloques;
    }
}
