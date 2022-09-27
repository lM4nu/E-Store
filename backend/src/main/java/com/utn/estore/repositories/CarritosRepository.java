package com.utn.estore.repositories;

import com.utn.estore.models.Carrtios;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CarrtiosRepository extends CrudRepository<Carrtios, Integer> {

}
