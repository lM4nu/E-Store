package com.utn.estore.controllers;

import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.UsuariosRepository;
import com.utn.estore.services.EncryptarService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
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
				if(reqPassword.equals("d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892")){
					return "{ \"success\":true, \"token\":\""+dbPassword+"\", \"id\":\""+id+"\", \"admin\":true }";
				}else{
					return "{ \"success\":true, \"token\":\""+dbPassword+"\", \"id\":\""+id+"\"}";
				}
			}else{
				return "{ \"success\":false, \"msg\":\"Contrasena incorrecta\"}";
			}
		}else{
			return "{ \"success\":false, \"msg\":\"Usuario no existe\"}";
		}
	}

	@GetMapping("/isAdmin")
	public @ResponseBody String isAdmin(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) throws Exception{
		if(!usuariosRepository.findByPassword(authHeader).isEmpty() 
				&& usuariosRepository.findByPassword(authHeader).get(0).getId() == 1){
			return "{ \"success\":true, \"admin\":true}";
		}else{
			return "{ \"success\":true, \"admin\":false}";
		}
	}


}
