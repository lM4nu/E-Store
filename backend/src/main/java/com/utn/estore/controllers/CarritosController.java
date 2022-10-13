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
@RequestMapping(path = "/carritos")
public class CarritosController {
    @Autowired
    private CarritosRepository carritosRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewProduct(
            @RequestBody Carritos carrito) {

	carritosRepository.save(carrito);
	return "{ \"success\":true, \"msg\":\"producto agregado\" }";
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String deleteUserById(@PathVariable Integer id) {
        carritosRepository.deleteById(id);
        return "Deleted";
    }

    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Carritos> getById(@PathVariable Integer id) {
        return carritosRepository.findById(id);
    }

    @PutMapping("/edit/{id}")
    public @ResponseBody String reemplazarCarrito(@RequestBody Carritos newCarrito, @PathVariable Integer id){

	    Carritos x = carritosRepository.findById(id).get();
	    x.setCantidad(newCarrito.getCantidad());
	    carritosRepository.save(x);

	return "{ \"success\":true, \"msg\":\"producto editado\" }";


    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Carritos> getAllUsers() {
        return carritosRepository.findAll();
    }

    @PostMapping(path = "/userandproduct")
    public @ResponseBody Iterable<Carritos> findByUserIdAndProductId(@RequestBody Carritos carrito){
	    return carritosRepository.findByUsuarioidAndProductoid(carrito.getUsuarioid(),carrito.getProductoid());
    }


}
