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
@RequestMapping("/data")
public class DataController {
	@Autowired
	private UsuariosRepository usuariosRepository;

	@Autowired
	private CarritosRepository carritosRepository;

    	// metodo GET
    	// funcion contenidoUser de tipo string
	// recibe por paramtetro del Header Authorization
	// un string llamado authHeader
	@GetMapping(path = "/carrito")
	public @ResponseBody String contenidoUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) throws Exception{
		// reviso si existe un usuario con esa contraseña
		// si no esta vacio
		if(!usuariosRepository.findByPassword(authHeader).isEmpty()){
			// findByPassword devuelve un iterable de Usuarios
			// los iterables tienen el metodo get(indice)
			// lo usamos para obtener el primero (y unico) Usuario con esa contraseña por eso get(0)
			Usuarios user = usuariosRepository.findByPassword(authHeader).get(0);
			// uso ObjectMapper para escribir un json con la informacion
			// que me devuelve findByUsuarioid de carritosRepository con la id del Usuario
			// es decir todas las entradas de carrito que correspondan a ese usuario
			// en otras palabras Su carrito
			String json = new ObjectMapper().writeValueAsString(carritosRepository.findByUsuarioid(user.getId()));

			return "{ \"success\":true, \"id\":\""+user.getId()+"\", \"name\":\""+user.getName()+"\", \"carritoContent\":"+json+"}"; // devuelve un string json de respuesta

		}else{// si no existe un usuario con ese token
			return "{ \"success\":false, \"msg\":\"token incorrecto\"}"; // devuelve un string json de respuesta
		}
	}
}
