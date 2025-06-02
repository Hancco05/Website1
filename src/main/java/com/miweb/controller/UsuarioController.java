package com.miweb.authapp.controller;

import com.miweb.authapp.model.Usuario;
import com.miweb.authapp.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public boolean registrar(@RequestBody Usuario usuario) {
        return usuarioService.registrarUsuario(usuario);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getEmail(), usuario.getPassword()).isPresent();
    }

    @GetMapping("/usuario/{email}")
    public Optional<Usuario> obtenerUsuario(@PathVariable String email) {
        return usuarioService.buscarPorEmail(email);
    }
}
