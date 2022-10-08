package com.utn.estore.controllers;

import com.utn.estore.models.Carritos;
import com.utn.estore.repositories.CarritosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/carritos")
public class CarritosController {
    @Autowired
    private CarritosRepository carritosRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewProduct(
            @RequestParam Integer productoid,
            @RequestParam Integer cantidad,
            @RequestParam Integer usuarioid) {

	Carritos n = new Carritos();
	n.setProductoid(productoid);
	n.setCantidad(cantidad);
	n.setUsuarioid(usuarioid);
	carritosRepository.save(n);
	return "Saved";
    }

    @GetMapping("/delete/{id}")
    public @ResponseBody String deleteUserById(@PathVariable Integer id) {
        carritosRepository.deleteById(id);
        return "Deleted";
    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Carritos> getAllUsers() {
        return carritosRepository.findAll();
    }
}
