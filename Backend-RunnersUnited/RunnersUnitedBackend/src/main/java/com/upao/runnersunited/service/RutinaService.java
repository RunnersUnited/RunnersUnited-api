package com.upao.runnersunited.service;

import com.upao.runnersunited.domain.Rutina;

import java.util.List;

public interface RutinaService {
    List<Rutina> obtenerTodasLasRutinas();
    Rutina obtenerRutinaPorId(Long id);
    Rutina crearRutina(Rutina rutina);
    Rutina actualizarRutina(Long id, Rutina rutinaActualizada);
    void eliminarRutina(Long id);
}



