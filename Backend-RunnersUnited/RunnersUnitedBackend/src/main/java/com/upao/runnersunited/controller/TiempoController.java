package com.upao.runnersunited.controller;

import com.upao.runnersunited.domain.Tiempo;
import com.upao.runnersunited.repository.TiempoRepository;
import com.upao.runnersunited.validators.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tiempos")
public class TiempoController {
    @Autowired
    private TiempoRepository tiempoRepository;

    @GetMapping
    public List<Tiempo> obtenerTiempos() {
        return tiempoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tiempo obtenerTiempoPorId(@PathVariable Long id) {
        return tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Tiempo> obtenerTiemposPorIdUsuario(@PathVariable Long idUsuario) {
        return tiempoRepository.findByUsuarioId(idUsuario);
    }

    @PostMapping
    public Tiempo crearTiempo(@RequestBody Tiempo tiempo) {
        tiempo.registrarFechaActual();
        return tiempoRepository.save(tiempo);
    }

    @PutMapping("/{id}")
    public Tiempo actualizarTiempo(@PathVariable Long id, @RequestBody Tiempo tiempoActualizado) {
        Tiempo tiempo = tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));

        tiempo.setDuracion(tiempoActualizado.getDuracion());
        tiempo.setFecha(tiempoActualizado.getFecha());

        return tiempoRepository.save(tiempo);
    }

    @DeleteMapping("/{id}")
    public void eliminarTiempo(@PathVariable Long id) {
        Tiempo tiempo = tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));

        tiempoRepository.delete(tiempo);
    }
}
