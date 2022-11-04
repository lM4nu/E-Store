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

    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Usuarios newUsuario) {
	usuariosRepository.save(newUsuario);
	return "{ \"success\":true, \"msg\":\"usuario agregado\" }";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Usuarios> getAll() {
        return usuariosRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
        usuariosRepository.deleteById(id);
	return "{ \"success\":true, \"msg\":\"usuario borrado\" }";
    }

}
