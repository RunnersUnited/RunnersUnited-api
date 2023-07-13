package com.upao.runnersunited.service;

import com.upao.runnersunited.domain.Tiempo;
import com.upao.runnersunited.repository.TiempoRepository;
import com.upao.runnersunited.validators.exceptions.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TiempoServiceImpl implements TiempoService {

    private final TiempoRepository tiempoRepository;

    @Autowired
    public TiempoServiceImpl(TiempoRepository tiempoRepository) {
        this.tiempoRepository = tiempoRepository;
    }

    @Override
    public List<Tiempo> obtenerTodosLosTiempos() {
        return tiempoRepository.findAll();
    }

    @Override
    public Tiempo obtenerTiempoPorId(Long id) {
        return tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));
    }

    @Override
    public Tiempo crearTiempo(Tiempo tiempo) {
        tiempo.registrarFechaActual(); // Registrar fecha actual automáticamente
        return tiempoRepository.save(tiempo);
    }

    @Override
    public Tiempo actualizarTiempo(Long id, Tiempo tiempoActualizado) {
        Tiempo tiempo = tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));

        tiempo.setDuracion(tiempoActualizado.getDuracion());
        tiempo.setFecha(tiempoActualizado.getFecha());

        return tiempoRepository.save(tiempo);
    }

    @Override
    public void eliminarTiempo(Long id) {
        Tiempo tiempo = tiempoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tiempo no encontrado"));

        tiempoRepository.delete(tiempo);
    }
}
