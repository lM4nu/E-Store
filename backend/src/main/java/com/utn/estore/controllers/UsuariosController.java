package com.utn.estore.controllers;

import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.UsuariosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/usuarios")
public class UsuariosController {
    @Autowired
    private UsuariosRepository usuariosRepository;

    // metodo POST
    // funcion add de tipo string recibe por parametro del body
    // un newUsuario de tipo Usuarios
    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Usuarios newUsuario) {
	usuariosRepository.save(newUsuario); //lo guarda 
	return "{ \"success\":true, \"msg\":\"usuario agregado\" }"; // devuelve un string json de respuesta
    }

    // metodo GET
    // funcion getAll de tipo iterable de Usuarios
    // devuelve lo que devuelve findAll del repository
    // es decir un iterable con todos los usuarios
    @GetMapping("/all")
    public @ResponseBody Iterable<Usuarios> getAll() {
        return usuariosRepository.findAll();
    }

    // metodo DELETE
    // funcion delete de tipo string recibo por parametro la id
    // en el string del path 
    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
        usuariosRepository.deleteById(id); // lo borra
	return "{ \"success\":true, \"msg\":\"usuario borrado\" }"; // devuelve un string json de respuesta
    }

}
