package com.miweb.controller;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Muestra el formulario
    @GetMapping("/")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "formulario";
    }

    // Procesa los datos enviados desde el formulario
    @PostMapping("/guardar")
    public String guardarUsuario(@Valid @ModelAttribute Usuario usuario, BindingResult result) {
        if (result.hasErrors()) {
            // Si hay errores de validación, vuelve al formulario con los mensajes de error
            return "formulario";
        }

        try {
            usuarioRepository.save(usuario);
        } catch (Exception e) {
            // Loguea el error en consola y redirige al formulario con un mensaje de error
            e.printStackTrace();
            return "formulario";
        }

        return "redirect:/";
    }

}
