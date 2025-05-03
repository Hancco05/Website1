package com.miweb.controller;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") // Permitir llamadas desde React
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/registrar")
    public Usuario registrar(@RequestBody Usuario usuario) {
        usuario.setContraseña(encoder.encode(usuario.getContraseña()));
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        Usuario existente = usuarioRepository.findByEmail(usuario.getEmail());
        if (existente != null && encoder.matches(usuario.getContraseña(), existente.getContraseña())) {
            return existente.getNombreUsuario(); // Devuelve nombre si es correcto
        }
        return "Error";
    }
}
