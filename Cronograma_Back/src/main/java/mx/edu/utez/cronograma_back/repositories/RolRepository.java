package mx.edu.utez.cronograma_back.repositories;

import mx.edu.utez.cronograma_back.modules.Rol.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByRol(String nombre);
}