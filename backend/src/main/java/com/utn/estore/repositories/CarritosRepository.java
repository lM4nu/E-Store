package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Carritos;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CarritosRepository extends CrudRepository<Carritos, Integer> {
	//declaro funciones de busqueda personalizadas
	//buscar por usuarioid
	//me devualve una lista de Usuarios con esa usuarioid
	List<Carritos> findByUsuarioid(Integer usuarioid);

	//buscar por usuarioid y productoid
	//me devualve una lista de Usuarios con esa usuarioid y productoid
	List<Carritos> findByUsuarioidAndProductoid(Integer usuarioid, Integer productoid);

	//funcion void para borrar por productoid
	//debe ser transactional y hay que especificar el comando sql
	//a ejecutar
	@Modifying
	@Transactional
	@Query(value="delete from Carritos c where c.productoid = ?1")
  	void deleteByProductoid(Integer productoid);
}
