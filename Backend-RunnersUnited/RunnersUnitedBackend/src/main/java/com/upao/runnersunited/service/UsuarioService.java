package com.upao.runnersunited.service;

import com.upao.runnersunited.domain.Usuario;

import java.util.List;

public interface UsuarioService {

    Usuario crearUsuario(Usuario usuario);
    Usuario modificarUsuario(Usuario usuario);
    void eliminarUsuario(Integer idUsuario);
    List<Usuario> listarUsuario();
    List<Usuario> listarUsuariosClientes(Integer idRol);
    Usuario obtenerUsuarioPorIdUsuario(Integer idUsuario);
    Usuario fetchUserByCorreoyContra(String correoUsuario, String contrasenaUsuario);

}

