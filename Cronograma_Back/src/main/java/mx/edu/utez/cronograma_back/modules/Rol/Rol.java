package mx.edu.utez.cronograma_back.modules.Rol;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.cronograma_back.modules.Usuario.Usuario;

import java.util.List;

@Entity
@Table(name = "rol")
@Data
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer idRol;

    @Column(name = "rol", nullable = false, unique = true, length = 50)
    private String rol;

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL)
    @JsonIgnore // Se ignora para evitar ciclos de referencia infinitos en JSON
    private List<Usuario> usuarios;

    //


    public Rol() {
    }

    public Rol(Integer idRol, String rol, List<Usuario> usuarios) {
        this.idRol = idRol;
        this.rol = rol;
        this.usuarios = usuarios;
    }

    //

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
}