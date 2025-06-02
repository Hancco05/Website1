package com.miweb.demo.controller;

import com.miweb.demo.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final List<User> users = new ArrayList<>();

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> res = new HashMap<>();
        Optional<User> exists = users.stream()
                .filter(u -> u.getUsername().equals(user.getUsername()))
                .findFirst();
        if (exists.isPresent()) {
            res.put("success", false);
            res.put("message", "Usuario ya existe");
            return res;
        }
        users.add(user);
        res.put("success", true);
        res.put("message", "Usuario registrado correctamente");
        return res;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        Map<String, Object> res = new HashMap<>();
        String username = credentials.get("username");
        String password = credentials.get("password");
        Optional<User> user = users.stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst();
        if (user.isPresent()) {
            res.put("success", true);
            res.put("user", user.get());
        } else {
            res.put("success", false);
            res.put("message", "Credenciales inválidas");
        }
        return res;
    }
}
