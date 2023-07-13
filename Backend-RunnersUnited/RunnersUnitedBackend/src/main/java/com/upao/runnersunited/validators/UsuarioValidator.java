package com.upao.runnersunited.validators;

import com.upao.runnersunited.domain.Usuario;
import com.upao.runnersunited.validators.exceptions.IncorrectResourceRequestException;

public class UsuarioValidator {

    public static void validate(Usuario usuario) {

        if (usuario.getNombre() == null || usuario.getNombre().trim().isEmpty()) {
            throw new IncorrectResourceRequestException("Escriba su nombre correctamente.");
        }

        if(usuario.getNombre().length() < 5) {
            throw new IncorrectResourceRequestException("Escriba su nombre correctamente.");

        }

        if(usuario.getNombre().length() > 50) {
            throw new IncorrectResourceRequestException("Escriba su nombre correctamente.");

        }

        if (usuario.getCorreoUsuario() == null || usuario.getCorreoUsuario().trim().isEmpty()) {
            throw new IncorrectResourceRequestException("Escriba el correo correctamente.");
        }

        if (usuario.getContrasenaUsuario() == null || usuario.getContrasenaUsuario().trim().isEmpty()) {
            throw new IncorrectResourceRequestException("Escriba la contraseña correctamente.");
        }

        if(usuario.getContrasenaUsuario().length() < 5) {
            throw new IncorrectResourceRequestException("Escriba la contraseña correctamente.");

        }

        if(usuario.getContrasenaUsuario().length() > 20) {
            throw new IncorrectResourceRequestException("Escriba la contraseña correctamente.");

        }

    }

}

