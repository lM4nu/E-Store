package com.utn.estore.controllers;

import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.UsuariosRepository;
import com.utn.estore.services.EncryptarService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {


	@Autowired
	private UsuariosRepository usuariosRepository;

	@Autowired
	private EncryptarService encryptarService;


	@PostMapping("/registrarse")
	public @ResponseBody String registrarUsuario(@RequestBody Usuarios reqData) throws Exception{
		if(usuariosRepository.existsByName(reqData.getName())){
			return "{ \"success\":false, \"msg\":\"Usuarios ya existe\" }";
		}

		Usuarios newUser = new Usuarios();
		newUser.setName(reqData.getName());
		newUser.setPassword(encryptarService.hashearString(reqData.getName()+reqData.getPassword()));
		usuariosRepository.save(newUser);

		return "{ \"success\":true}";
	}

	@PostMapping("/logearse")
	public @ResponseBody String logearUsuario(@RequestBody Usuarios reqData) throws Exception{
		if(usuariosRepository.existsByName(reqData.getName())) {
			String reqPassword = encryptarService.hashearString(reqData.getName()+reqData.getPassword());
			String dbPassword = usuariosRepository.findByName(reqData.getName()).get(0).getPassword(); 
			Integer id = usuariosRepository.findByName(reqData.getName()).get(0).getId();

			if(dbPassword.equals(reqPassword)){
				return "{ \"success\":true, \"token\":\""+dbPassword+"\", \"id\":\""+id+"\"}";
			}else{
				return "{ \"success\":false, \"msg\":\"Contrasena incorrecta\"}";
			}
		}else{
			return "{ \"success\":false, \"msg\":\"Usuario no existe\"}";
		}

	}

}
