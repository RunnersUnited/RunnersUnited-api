package com.upao.runnersunited.repository;

import com.upao.runnersunited.domain.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {
    List<Rutina> findByUsuarioId(Long idUsuario);
}

