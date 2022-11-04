package com.utn.estore.controllers;

import java.util.Optional;

import com.utn.estore.models.Productos;
import com.utn.estore.repositories.CarritosRepository;
import com.utn.estore.repositories.ProductosRepository;

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
@RequestMapping("/productos")
public class ProductosController {
    @Autowired
    private ProductosRepository productosRepository;

    @Autowired
    private CarritosRepository carritosRepository;

    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Productos newproducto) {
	productosRepository.save(newproducto);
	return "{ \"success\":true, \"msg\":\"producto agregado\" }";
    }

    @PostMapping("/addarray")
    public @ResponseBody String add(@RequestBody Productos[] newproductos) {
		//for(int i =0; i< newproductos.length;i++){
			//productosRepository.save(newproductos[i]);
		//}

		for(Productos i: newproductos){
			productosRepository.save(i);

		}
	return "{ \"success\":true, \"msg\":\"productos agregados\" }";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Productos> getAllUsers() {
        return productosRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Productos> get(@PathVariable Integer id) {
        return productosRepository.findById(id);
    }

    @PutMapping("/edit/{id}")
    public @ResponseBody String edit(@RequestBody Productos producto, @PathVariable Integer id){
	    producto.setId(id);
	    productosRepository.save(producto);
	    return "{ \"success\":true, \"msg\":\"producto editado\" }";
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
        productosRepository.deleteById(id);
	carritosRepository.deleteByProductoid(id);
	return "{ \"success\":true, \"msg\":\"producto borrado\" }";
    }
}
