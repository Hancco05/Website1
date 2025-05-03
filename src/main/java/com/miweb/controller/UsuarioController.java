package com.miweb.controller;

import com.miweb.model.Usuario;
import com.miweb.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") // React local, ajusta si es necesario
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Registro de usuario
    @PostMapping("/register")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.registrarUsuario(usuario);
    }

    // Autenticación de usuario (login)
    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        boolean autenticado = usuarioService.autenticarUsuario(
                usuario.getCorreo(),
                usuario.getContraseña());

        if (autenticado) {
            return "Inicio de sesión exitoso";
        } else {
            return "Correo o contraseña incorrectos";
        }
    }
}
