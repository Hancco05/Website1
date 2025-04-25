package com.miweb.repository;

import com.miweb.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email); // ← este es el método que necesitas
}
