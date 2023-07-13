package com.upao.runnersunited.service;
import com.upao.runnersunited.domain.Usuario;
import com.upao.runnersunited.repository.UsuarioRepository;
import com.upao.runnersunited.validators.UsuarioValidator;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario crearUsuario(Usuario usuario) {
        UsuarioValidator.validate(usuario);
        return usuarioRepository.save(usuario);
    }

    @Transactional
    @Override
    public Usuario modificarUsuario(Usuario usuario) {
        UsuarioValidator.validate(usuario);
        return usuarioRepository.save(usuario);
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el ID proporcionado: " + idUsuario));
        usuarioRepository.delete(usuario);
    }


    @Override
    public List<Usuario> listarUsuario() {
        return usuarioRepository.findAll();
    }

    @Override
    public List<Usuario> listarUsuariosClientes(Integer idRol) {
        return usuarioRepository.findByRol_IdRol(idRol);
    }

    @Override
    public Usuario obtenerUsuarioPorIdUsuario(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario).orElse(new Usuario());
    }

    @Override
    public Usuario fetchUserByCorreoyContra(String correoUsuario, String contrasenaUsuario){
        return usuarioRepository.findUsuarioByCorreoUsuarioAndContrasenaUsuario(correoUsuario, contrasenaUsuario);
    }

}

