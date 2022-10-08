package com.utn.estore.controllers;

import com.utn.estore.models.Usuarios;
import com.utn.estore.repositories.UsuariosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/usuarios") // This means URL's start with /demo (after Application path)
public class UsuariosController {
    @Autowired // This means to get the bean called userRepository
    private UsuariosRepository usuariosRepository;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewProduct(
            @RequestParam String name,
            @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

	Usuarios n = new Usuarios();
	n.setName(name);
	n.setPassword(password);
	usuariosRepository.save(n);
        return "Saved";
    }

    @GetMapping("/delete/{id}") // Map ONLY POST Requests
    public @ResponseBody String deleteUserById(@PathVariable Integer id) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        usuariosRepository.deleteById(id);
        return "Deleted";
    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Usuarios> getAllUsers() {
        // This returns a JSON or XML with the users
        return usuariosRepository.findAll();
    }
}
