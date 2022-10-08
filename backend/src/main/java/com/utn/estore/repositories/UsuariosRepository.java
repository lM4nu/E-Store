package com.utn.estore.repositories;

import java.util.List;

import com.utn.estore.models.Usuarios;

import org.springframework.data.repository.CrudRepository;

public interface UsuariosRepository extends CrudRepository<Usuarios, Integer> {
	List<Usuarios> findByName(String name);

	List<Usuarios> findByPassword(String password);

	Boolean existsByName(String name);

}
