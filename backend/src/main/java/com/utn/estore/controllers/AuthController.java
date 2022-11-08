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

    	// metodo POST
    	// funcion registrarUsuario de tipo string recibe por parametro del body
    	// reqData de tipo Usuarios
	@PostMapping("/registrarse")
	public @ResponseBody String registrarUsuario(@RequestBody Usuarios reqData) throws Exception{
		// revisa que no haya otro con el mismo nombre
		if(usuariosRepository.existsByName(reqData.getName())){
			// si lo hay devuelve success false
			return "{ \"success\":false, \"msg\":\"Usuarios ya existe\" }"; // devuelve un string json de respuesta
		}
		// instancia newUser de tipo Usuarios
		Usuarios newUser = new Usuarios();
		// setea sus valores a los que enviamos en la request
		newUser.setName(reqData.getName());
		newUser.setRealname(reqData.getRealname());
		// y la contraseña es seteada al hash de dos strings
		// nombre+contraseña de lo contrario dos o mas usuarios que ingresen la misma
		// contraseña, tendran el mismo hash
		newUser.setPassword(encryptarService.hashearString(reqData.getName()+reqData.getPassword()));
		// nos guardamos la id  que obtenemos
		// porque la funcion save de repository no es void sino que devuelve el elemento
		// que guarda y del mismo tipo, en este caso Usuarios,
		// por si necesitamos seguir realizando operaciones
		// en este caso ademas de guardarlo queremos guardar su id
		Integer id = usuariosRepository.save(newUser).getId();
		// devolvemos success true
		// como token la contraseña hasheada 
		// y la id
		return "{ \"success\":true, \"token\":\""+newUser.getPassword()+"\", \"id\":\""+id+"\"}"; // devuelve un string json de respuesta
	}

    	// metodo POST
    	// funcion logearUsuario de tipo string recibe por parametro del body
    	// reqData de tipo Usuarios
	@PostMapping("/logearse")
	public @ResponseBody String logearUsuario(@RequestBody Usuarios reqData) throws Exception{
		// revisa que el usuario que se esta intentando logear exista
		if(usuariosRepository.existsByName(reqData.getName())) {
			// hasheo el nombre y contraseña de la request 
			String reqPassword = encryptarService.hashearString(reqData.getName()+reqData.getPassword());
			// obtengo la contraseña ya hasheada del usuario que ya sabemos que existe
			String dbPassword = usuariosRepository.findByName(reqData.getName()).get(0).getPassword(); 
			// y su id
			Integer id = usuariosRepository.findByName(reqData.getName()).get(0).getId();

			//comparo si son iguales los hashes 
			if(dbPassword.equals(reqPassword)){
				if(reqPassword.equals("d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892")){//reviso si es igual al hash del admin
					// ambos hashes son iguales y es el hash del admin
					return "{ \"success\":true, \"token\":\""+dbPassword+"\", \"id\":\""+id+"\", \"admin\":true }"; // devuelve un string json de respuesta
				}else{
					// ambos hashes son iguales y pero no es admin, es un usuario normal
					// es autenticado correctamente
					// y se le envia el token que usara para acceder a su carrito
					return "{ \"success\":true, \"token\":\""+dbPassword+"\", \"id\":\""+id+"\"}"; // devuelve un string json de respuesta
				}
			}else{// los hashes no son iguales la contraseña es incorrecta
				return "{ \"success\":false, \"msg\":\"Contrasena incorrecta\"}";
			}
		}else{// el usuario con ese nombre no existe
			return "{ \"success\":false, \"msg\":\"Usuario no existe\"}"; // devuelve un string json de respuesta
		}
	}

    	// metodo GET
    	// funcion isAdmin de tipo string
	// recibe por paramtetro del Header Authorization
	// un string llamado authHeader
	@GetMapping("/isAdmin")
	public @ResponseBody String isAdmin(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) throws Exception{
		// reviso si existe un usuario con esa contraseña
		// si no esta vacio
		// Y su id es 1 entonces es el admin
		if(!usuariosRepository.findByPassword(authHeader).isEmpty() 
				&& usuariosRepository.findByPassword(authHeader).get(0).getId() == 1){
			return "{ \"success\":true, \"admin\":true}"; // devuelve un string json de respuesta
		}else{// si no se cumplen esas 2 condiciones no es el admin
			return "{ \"success\":true, \"admin\":false}";
		}
	}
}
