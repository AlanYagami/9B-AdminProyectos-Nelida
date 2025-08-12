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

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime fechaFin;

    @Column(name = "ubicacion", length = 255)
    private String ubicacion;

    @Column(name = "num_asistentes", nullable = false)
    private Integer numAsistentes;

    @Column(name = "responsable", length = 255)
    private String responsable;

    @Column(name = "qr_codigo", length = 255)
    private String qrCodigo;

    @Column(name = "qr_url", columnDefinition = "TEXT")
    private String qrUrl;

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

    public Evento(Integer idEvento, String nombreEvento, LocalDateTime fechaInicio, LocalDateTime fechaFin, String ubicacion, Integer numAsistentes, String responsable, String qrCodigo, String qrUrl, Usuario usuario, TipoEvento tipoEvento, Estado estado, List<Bloque> bloques) {
        this.idEvento = idEvento;
        this.nombreEvento = nombreEvento;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.ubicacion = ubicacion;
        this.numAsistentes = numAsistentes;
        this.responsable = responsable;
        this.qrCodigo = qrCodigo;
        this.qrUrl = qrUrl;
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

    public Integer getNumAsistentes() {
        return numAsistentes;
    }

    public void setNumAsistentes(Integer numAsistentes) {
        this.numAsistentes = numAsistentes;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getQrCodigo() {
        return qrCodigo;
    }

    public void setQrCodigo(String qrCodigo) {
        this.qrCodigo = qrCodigo;
    }

    public String getQrUrl() {
        return qrUrl;
    }

    public void setQrUrl(String qrUrl) {
        this.qrUrl = qrUrl;
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
