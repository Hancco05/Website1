package com.miweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios") // Organización de rutas para React
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/guardar")
    public String guardarUsuario(@Valid @RequestBody Usuario usuario, BindingResult result) {
        if (result.hasErrors()) {
            return "Error en los datos enviados.";
        }

        try {
            String contraseñaCifrada = passwordEncoder.encode(usuario.getContraseña());
            usuario.setContraseña(contraseñaCifrada);
            usuarioRepository.save(usuario);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al guardar el usuario.";
        }

        return "Usuario registrado exitosamente.";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public String procesarLogin(@RequestBody Usuario usuario) {
        Usuario usuarioEnDB = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioEnDB != null && passwordEncoder.matches(usuario.getContraseña(), usuarioEnDB.getContraseña())) {
            return "Bienvenido, " + usuarioEnDB.getNombre();
        } else {
            return "Email o contraseña incorrecta.";
        }
    }
}
