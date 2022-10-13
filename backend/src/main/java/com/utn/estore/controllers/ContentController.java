package com.utn.estore.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.CarritosRepository;
import com.utn.estore.repositories.UsuariosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/content")
public class ContentController {

	@Autowired
	private UsuariosRepository usuariosRepository;

	@Autowired
	private CarritosRepository carritosRepository;

	@GetMapping(path = "/forUser")
	public @ResponseBody String contenidoUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) throws Exception{
		if(!usuariosRepository.findByPassword(authHeader).isEmpty()){
			Usuarios user = usuariosRepository.findByPassword(authHeader).get(0);
			//return "{ \"success\":true, \"id\":\""+user.getId()+"\", \"name\":\""+user.getName()+"\"}";
			String json = new ObjectMapper().writeValueAsString(carritosRepository.findByUsuarioid(user.getId()));
			return "{ \"success\":true, \"id\":\""+user.getId()+"\", \"name\":\""+user.getName()+"\", \"carritoContent\":"+json+"}";

		}else{
			return "{ \"success\":false, \"msg\":\"token incorrecto\"}";
		}
	}
}
