package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Usuarios;

import org.springframework.data.repository.CrudRepository;

public interface UsuariosRepository extends CrudRepository<Usuarios, Integer> {
	//declaro funciones de busqueda personalizadas
	//buscar por nombre
	//me devualve una lista de Usuarios con ese nombre
	List<Usuarios> findByName(String name);

	//buscar por contraseña
	//me devualve una lista de Usuarios con esa contraseña
	List<Usuarios> findByPassword(String password);

	// si existe por nombre
	// me devuelve true o false si existe
	Boolean existsByName(String name);
}
