package com.miweb.controller;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "formulario";
    }

    @PostMapping("/guardar")
    public String guardarUsuario(@Valid @ModelAttribute Usuario usuario, BindingResult result) {
        if (result.hasErrors()) {
            return "formulario";
        }

        try {
            // Cifrar contraseña
            String contraseñaCifrada = passwordEncoder.encode(usuario.getContraseña());
            usuario.setContraseña(contraseñaCifrada);

            usuarioRepository.save(usuario);
        } catch (Exception e) {
            e.printStackTrace();
            return "formulario";
        }

        return "redirect:/login";
    }

    // Mostrar login
    @GetMapping("/login")
    public String mostrarLogin(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "login"; // vista login.html
    }

    // Procesar login
    @PostMapping("/login")
    public String procesarLogin(@ModelAttribute Usuario usuario, Model model) {
        Usuario usuarioEnDB = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioEnDB != null && passwordEncoder.matches(usuario.getContraseña(), usuarioEnDB.getContraseña())) {
            // Login exitoso
            model.addAttribute("nombreUsuario", usuarioEnDB.getNombre());
            return "bienvenido"; // vista para bienvenida
        } else {
            // Login fallido
            model.addAttribute("error", "Email o contraseña incorrecta.");
            return "login";
        }
    }
}
