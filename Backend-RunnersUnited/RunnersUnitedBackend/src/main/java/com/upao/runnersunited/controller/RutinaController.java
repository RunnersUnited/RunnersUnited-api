package com.upao.runnersunited.controller;

import com.upao.runnersunited.domain.Rutina;
import com.upao.runnersunited.repository.RutinaRepository;
import com.upao.runnersunited.validators.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rutinas")
public class RutinaController {
    @Autowired
    private RutinaRepository rutinaRepository;

    @GetMapping
    public List<Rutina> obtenerRutinas() {
        return rutinaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rutina obtenerRutinaPorId(@PathVariable Long id) {
        return rutinaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rutina no encontrada"));
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Rutina> obtenerRutinasPorIdUsuario(@PathVariable Long idUsuario) {
        return rutinaRepository.findByUsuarioId(idUsuario);
    }


    @PostMapping
    public Rutina crearRutina(@RequestBody Rutina rutina) {
        return rutinaRepository.save(rutina);
    }

    @PutMapping("/{id}")
    public Rutina actualizarRutina(@PathVariable Long id, @RequestBody Rutina rutinaActualizada) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rutina no encontrada"));

        rutina.setProgreso(rutinaActualizada.getProgreso());

        return rutinaRepository.save(rutina);
    }

    @DeleteMapping("/{id}")
    public void eliminarRutina(@PathVariable Long id) {
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rutina no encontrada"));

        rutinaRepository.delete(rutina);
    }
}


