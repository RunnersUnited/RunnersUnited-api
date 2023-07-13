package com.upao.runnersunited.controller;

import com.upao.runnersunited.WrapperResponse;
import com.upao.runnersunited.domain.Usuario;
import com.upao.runnersunited.repository.UsuarioRepository;
import com.upao.runnersunited.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.upao.runnersunited.domain.Rol;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<WrapperResponse<Usuario>> registrarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioNew = usuarioService.crearUsuario(usuario);
        return new WrapperResponse<>(true, "success", usuarioNew).createResponse();
    }

    @PutMapping
    public ResponseEntity<WrapperResponse<Usuario>> modificarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioUpdate = usuarioService.modificarUsuario(usuario);
        return new WrapperResponse<>(true, "success", usuarioUpdate).createResponse();
    }


    @PostMapping("/login")
    public ResponseEntity<WrapperResponse<Usuario>> logIn(@RequestBody Usuario user) throws Exception {
        String correoUsuario = user.getCorreoUsuario();
        String contrasenaUsuario = user.getContrasenaUsuario();
        Usuario userObj = null;
        if (correoUsuario != null && contrasenaUsuario != null) {
            userObj = usuarioService.fetchUserByCorreoyContra(correoUsuario, contrasenaUsuario);
        }
        if (userObj == null) {
            throw new Exception("Escriba correctamente sus datos.");
        }
        return new WrapperResponse<>(true, "success", userObj).createResponse();
    }

    @GetMapping
    public ResponseEntity<WrapperResponse<List<Usuario>>> listarUsuario() {
        List<Usuario> usuarios = usuarioService.listarUsuario();
        return new WrapperResponse<>(true, "success", usuarios).createResponse();
    }

    @GetMapping("/clientes")
    public ResponseEntity<WrapperResponse<List<Usuario>>> listarUsuariosClientes() {
        List<Usuario> usuarios = usuarioRepository.findByRol_IdRol(2); // Filtrar por ID de rol igual a 2
        return new WrapperResponse<>(true, "success", usuarios).createResponse();
    }


    @GetMapping("/{idUsuario}")
    public ResponseEntity<WrapperResponse<Usuario>> obtenerUsuarioPorIdUsuario(@PathVariable("idUsuario") Integer idUsuario) {
        Usuario usuario = usuarioService.obtenerUsuarioPorIdUsuario(idUsuario);
        return new WrapperResponse<>(true, "success", usuario).createResponse();
    }

    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable("idUsuario") Integer idUsuario) {
        usuarioService.eliminarUsuario(idUsuario);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
