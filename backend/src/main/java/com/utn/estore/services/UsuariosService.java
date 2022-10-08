package com.utn.estore.services;

import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.UsuariosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuariosService {

	@Autowired
	private UsuariosRepository usuariosRepository;


	public void registrarUsuario(Usuarios User){
		usuariosRepository.save(User);
	}


}
