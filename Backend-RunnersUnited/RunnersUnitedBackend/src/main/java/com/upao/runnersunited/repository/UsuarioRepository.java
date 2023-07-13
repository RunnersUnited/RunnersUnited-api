package com.upao.runnersunited.repository;

import com.upao.runnersunited.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>  {


    Usuario findUsuarioByCorreoUsuarioAndContrasenaUsuario(String correoUsuario, String contrasenaUsuario);
    List<Usuario> findByRol_IdRol(Integer idRol);

}

