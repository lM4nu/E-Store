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

    // metodo POST
    // fundion add de tipo string recibe por parametro del body
    // un newCarrito de tipo Carritos
    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Carritos newCarrito) {
	carritosRepository.save(newCarrito); // lo guarda
	return "{ \"success\":true, \"msg\":\"carrito agregado\" }"; // devuelve un string json de respuesta
    }

    // metodo GET
    // funcion getAll de tipo Iterable de Carritos
    // devuelve lo que devuelve findAll del repository
    // es decir un iterable con todos los carritos
    @GetMapping("/all")
    public @ResponseBody Iterable<Carritos> getAll() {
        return carritosRepository.findAll();
    }

    // metodo GET
    // funcion get de tipo Optional de Carritos recibe por parametro la id
    // en el string del path 
    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Carritos> get(@PathVariable Integer id) {
        return carritosRepository.findById(id);
	// por default la funcion findById de repository devuelve un optional
	// ya que puede existir o no un elemento con esa id
    }

    // metodo POST
    // fundion findByUsuarioIdAndProductId de tipo Iterable de Carritos recibe por parametro del body
    // un carrito de tipo Carritos
    // que tiene usuarioid y productoid
    @PostMapping("/userandproduct")
    public @ResponseBody Iterable<Carritos> findByUsuarioIdAndProductId(@RequestBody Carritos carrito){
	    // le pasa usuarioid y productoid por parametro al find del repository y devuelve eso
	    return carritosRepository.findByUsuarioidAndProductoid(carrito.getUsuarioid(),carrito.getProductoid());
    }

    // metodo PUT
    // funcion edit de tipo string recibe por parametro del body
    // un Carrito de tipo Carritos y como segundo parametro
    // la id en el string del path 
    @PutMapping("/edit/{id}")
    public @ResponseBody String edit(@RequestBody Carritos newCarrito, @PathVariable Integer id){
	    newCarrito.setId(id); // al carrito que enviamos en el body le seteamos la id a la del parametro
	    carritosRepository.save(newCarrito);
	    // por defecto cuando guardamos un elemento y tiene la id de uno ya existente
	    // este va a a ser sobreescrito
	    return "{ \"success\":true, \"msg\":\"carrito editado\" }"; // devuelve un string json de respuesta
    }

    // metodo DELETE
    // funcion delete de tipo string recibe por parametro la id
    // en el string del path 
    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
        carritosRepository.deleteById(id); // lo borra
	return "{ \"success\":true, \"msg\":\"carrito borrado\" }"; // devuelve un string json de respuesta
    }
}
