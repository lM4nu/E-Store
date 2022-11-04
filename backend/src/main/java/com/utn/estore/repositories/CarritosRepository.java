package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Carritos;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CarritosRepository extends CrudRepository<Carritos, Integer> {

	List<Carritos> findByUsuarioid(Integer usuarioid);

	List<Carritos> findByUsuarioidAndProductoid(Integer usuarioid, Integer productoid);

	@Modifying
	@Transactional
	@Query(value="delete from Carritos c where c.productoid = ?1")
  	void deleteByProductoid(Integer productoid);
}
