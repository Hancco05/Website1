package com.miweb.Service;

import com.miweb.model.Usuario;
import com.miweb.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepository.findByCorreo(usuario.getCorreo()) != null) {
            throw new RuntimeException("Correo ya registrado.");
        }

        usuario.setContraseña(encoder.encode(usuario.getContraseña()));
        return usuarioRepository.save(usuario);
    }

    // 🔐 Nuevo método de autenticación
    public boolean autenticarUsuario(String correo, String contraseñaIngresada) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return false;
        }
        return encoder.matches(contraseñaIngresada, usuario.getContraseña());
    }
}
