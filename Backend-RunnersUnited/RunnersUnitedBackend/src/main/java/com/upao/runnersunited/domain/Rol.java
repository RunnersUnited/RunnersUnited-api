package com.upao.runnersunited.domain;
import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRol;

    @NotNull
    @Column(name = "nombre_usuario", nullable = false)
    private String nombreRol;

    @OneToMany(mappedBy ="rol")
    private List<Usuario> usuario;

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
}
