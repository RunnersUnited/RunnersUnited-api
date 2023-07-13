package com.upao.runnersunited.repository;

import com.upao.runnersunited.domain.Tiempo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TiempoRepository extends JpaRepository<Tiempo,Long> {
    List<Tiempo> findByUsuarioId(Long idUsuario);
}
