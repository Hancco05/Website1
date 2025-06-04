package com.miweb.controller;

import com.miweb.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    private final List<User> usuarios = new ArrayList<>();

    @PostMapping("/register")
    public String registrarUsuario(@RequestBody User user) {
        for (User u : usuarios) {
            if (u.getUsuario().equals(user.getUsuario())) {
                return "El usuario ya existe";
            }
        }
        usuarios.add(user);
        return "Registro exitoso";
    }

    @PostMapping("/login")
    public User login(@RequestBody User credentials) {
        for (User u : usuarios) {
            if (u.getUsuario().equals(credentials.getUsuario()) &&
                    u.getPassword().equals(credentials.getPassword())) {
                return u;
            }
        }
        return null;
    }
}
