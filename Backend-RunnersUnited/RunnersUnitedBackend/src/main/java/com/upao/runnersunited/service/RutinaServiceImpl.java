package com.upao.runnersunited.service;

import com.upao.runnersunited.domain.Rutina;
import com.upao.runnersunited.repository.RutinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RutinaServiceImpl implements RutinaService {

    @Autowired
    private RutinaRepository rutinaRepository;

    @Override
    public List<Rutina> obtenerTodasLasRutinas() {
        return rutinaRepository.findAll();
    }

    @Override
    public Rutina obtenerRutinaPorId(Long id) {
        return rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));
    }

    @Override
    public Rutina crearRutina(Rutina rutina) {
        return rutinaRepository.save(rutina);
    }

    @Override
    public Rutina actualizarRutina(Long id, Rutina rutinaActualizada) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));

        rutina.setProgreso(rutinaActualizada.getProgreso());

        return rutinaRepository.save(rutina);
    }

    @Override
    public void eliminarRutina(Long id) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));

        rutinaRepository.delete(rutina);
    }
}



