package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Productos;

import org.springframework.data.repository.CrudRepository;

public interface ProductosRepository extends CrudRepository<Productos, Integer> {
	//declaro funciones de busqueda personalizadas
	//buscar por mostrar
	//me devualve una lista de Productos con el valor mostrar que use para buscar
	List<Productos> findByMostrar(Boolean mostrar);

}
