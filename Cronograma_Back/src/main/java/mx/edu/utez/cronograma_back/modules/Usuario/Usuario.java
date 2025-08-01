package mx.edu.utez.cronograma_back.modules.Usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import mx.edu.utez.cronograma_back.modules.Evento.Evento;
import mx.edu.utez.cronograma_back.modules.Rol.Rol;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "correo", nullable = false, unique = true, length = 150)
    private String correo;

    @Column(name = "contra", nullable = false, length = 255)
    private String contra;

    @Column(name = "empresa", nullable = false, length = 255)
    private String empresa;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Column(name = "activo", nullable = false)
    private Boolean activo = true;

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Evento> eventos;

    public Usuario(String nombre, String correo, String contra, String empresa, Rol rol) {
        this.nombre = nombre;
        this.correo = correo;
        this.contra = contra;
        this.empresa = empresa;
        this.rol = rol;
        this.fechaRegistro = LocalDateTime.now();
        this.activo = true;
    }
}
