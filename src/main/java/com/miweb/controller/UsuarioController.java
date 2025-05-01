package com.miweb.controller;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Mostrar formulario de registro
    @GetMapping("/registro")
    public String mostrarFormularioRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "registro";
    }

    // Guardar usuario
    @PostMapping("/guardar")
    public String guardarUsuario(
            @RequestParam("nombre") String nombre,
            @RequestParam("email") String email,
            @RequestParam("nombreUsuario") String nombreUsuario,
            @RequestParam("fechaNacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaNacimiento,
            @RequestParam("edad") int edad,
            @RequestParam("genero") String genero,
            @RequestParam("contraseña") String contraseña,
            @RequestParam("confirmarContraseña") String confirmarContraseña,
            Model model) {
        // Validar contraseñas
        if (!contraseña.equals(confirmarContraseña)) {
            model.addAttribute("error", "Las contraseñas no coinciden.");
            return "registro";
        }

        // Validar email existente
        if (usuarioRepository.findByEmail(email) != null) {
            model.addAttribute("error", "El correo ya está registrado.");
            return "registro";
        }

        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setNombreUsuario(nombreUsuario);
        usuario.setFechaNacimiento(fechaNacimiento);
        usuario.setEdad(edad);
        usuario.setGenero(genero);
        usuario.setFechaRegistro(LocalDate.now());

        String contraseñaCifrada = passwordEncoder.encode(contraseña);
        usuario.setContraseña(contraseñaCifrada);

        usuarioRepository.save(usuario);
        return "redirect:/login";
    }

    // Mostrar login
    @GetMapping("/login")
    public String mostrarLogin(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "login";
    }

    // Procesar login
    @PostMapping("/login")
    public String procesarLogin(@ModelAttribute Usuario usuario, Model model) {
        Usuario usuarioEnDB = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioEnDB != null && passwordEncoder.matches(usuario.getContraseña(), usuarioEnDB.getContraseña())) {
            model.addAttribute("nombreUsuario", usuarioEnDB.getNombreUsuario());
            return "bienvenido";
        } else {
            model.addAttribute("error", "Email o contraseña incorrecta.");
            return "login";
        }
    }

    // Cerrar sesión (opcional)
    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }
}
