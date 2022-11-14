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

    // metodo POST
    // fundion add de tipo string recibe por parametro del body
    // un newProducto de tipo Productos
    @PostMapping("/add")
    public @ResponseBody String add(@RequestBody Productos newProducto) {
	productosRepository.save(newProducto); // lo guarda
	return "{ \"success\":true, \"msg\":\"producto agregado\" }"; // devuelve un string json de respuesta
    }

    // metodo POST
    // fundion add de tipo string recibe por parametro del body
    // un newProductos de tipo array de Productos
    @PostMapping("/addarray")
    public @ResponseBody String add(@RequestBody Productos[] newProductos) {
	    //loopea el array y guarda cada uno de los productos
	    for(Productos i: newProductos){
		    productosRepository.save(i);
	    }
	    return "{ \"success\":true, \"msg\":\"productos agregados\" }"; // devuelve un string json de respuesta
    }

    // metodo GET
    // funcion getAll de tipo Iterable de Productos
    // devuelve lo que devuelve findAll del repository
    // es decir un iterable con todos los productos
    @GetMapping("/all")
    public @ResponseBody Iterable<Productos> getAll() {
        return productosRepository.findAll();
    }

    // metodo GET
    // funcion getAllPublic de tipo Iterable de Productos
    // devuelve lo que devuelve findByMostrar del repository
    // es decir un iterable con todos los productos
    // que tengan el valor mostrar igual al que se esta usando 
    // para buscar en este caso true
    // es decir nos devolvera todos los productos visibles
    @GetMapping("/publicall")
    public @ResponseBody Iterable<Productos> getAllPublic() {
        return productosRepository.findByMostrar(true);
    }

    // metodo GET
    // funcion get de tipo Optional de Productos recibe por parametro la id
    // en el string del path 
    @GetMapping("/get/{id}")
    public @ResponseBody Optional<Productos> get(@PathVariable Integer id) {
        return productosRepository.findById(id);
	// por default la funcion findById de repository devuelve un optional
	// ya que puede existir o no un elemento con esa id
    }

    // metodo PUT
    // funcion edit de tipo string recibe por parametro del body
    // un producto de tipo Productos y como segundo parametro
    // la id en el string del path 
    @PutMapping("/edit/{id}")
    public @ResponseBody String edit(@RequestBody Productos producto, @PathVariable Integer id){
	    producto.setId(id); // al producto que enviamos en el body le seteamos la id a la del parametro
	    productosRepository.save(producto);
	    // por defecto cuando guardamos un elemento y tiene la id de uno ya existente
	    // este va a a ser sobreescrito

	    // si el atributo mostrar se edito con el valor falso
	    if(!producto.getMostrar()){
		    carritosRepository.deleteByProductoid(producto.getId()); // se borra del carrito de los usuarios
	    }
	    return "{ \"success\":true, \"msg\":\"producto editado\" }"; // devuelve un string json de respuesta
    }

    // metodo DELETE
    // funcion delete de tipo string recibe por parametro la id
    // en el string del path 
    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable Integer id) {
	productosRepository.deleteById(id); // lo borra
	carritosRepository.deleteByProductoid(id); //borra del carrito de los usuarios
	return "{ \"success\":true, \"msg\":\"producto borrado\" }"; // devuelve un string json de respuesta
    }
}
