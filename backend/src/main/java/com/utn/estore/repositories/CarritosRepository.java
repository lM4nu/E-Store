package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Carritos;

import org.springframework.data.repository.CrudRepository;

public interface CarritosRepository extends CrudRepository<Carritos, Integer> {

	List<Carritos> findByUsuarioid(Integer usuarioid);

}
