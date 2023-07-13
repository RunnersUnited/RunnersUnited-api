package com.upao.runnersunited.service;

import com.upao.runnersunited.domain.Tiempo;

import java.util.List;

public interface TiempoService {
    List<Tiempo> obtenerTodosLosTiempos();
    Tiempo obtenerTiempoPorId(Long id);
    Tiempo crearTiempo(Tiempo tiempo);
    Tiempo actualizarTiempo(Long id, Tiempo tiempoActualizado);
    void eliminarTiempo(Long id);
}


