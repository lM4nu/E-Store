package com.utn.estore.controllers;

import java.util.Optional;

import com.utn.estore.models.Carritos;
import com.utn.estore.repositories.CarritosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/carritos")
public class CarritosController {
    @Autowired
    private CarritosRepository carritosRepository;

    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Carritos carrito) {
	carritosRepository.save(carrito);
	return "{ \"success\":true, \"msg\":\"producto agregado\" }";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Carritos> getAll() {
        return carritosRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Carritos> get(@PathVariable Integer id) {
        return carritosRepository.findById(id);
    }

    @PostMapping("/userandproduct")
    public @ResponseBody Iterable<Carritos> findByUsuarioIdAndProductId(@RequestBody Carritos carrito){
	    return carritosRepository.findByUsuarioidAndProductoid(carrito.getUsuarioid(),carrito.getProductoid());
    }

    @PutMapping("/edit/{id}")
    public @ResponseBody String edit(@RequestBody Carritos newCarrito, @PathVariable Integer id){
	    newCarrito.setId(id);
	    carritosRepository.save(newCarrito);
	    return "{ \"success\":true, \"msg\":\"producto editado\" }";
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
        carritosRepository.deleteById(id);
	return "{ \"success\":true, \"msg\":\"producto borrado\" }";
    }
}
