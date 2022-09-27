package com.utn.estore.controllers;

import com.utn.estore.models.Productos;
import com.utn.estore.repositories.ProductosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/productos") // This means URL's start with /demo (after Application path)
public class ProductosController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ProductosRepository productosRepository;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewProduct(
            @RequestParam String name,
            @RequestParam Integer price,
            @RequestParam String imgpath) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        //Productos n = new Productos();
        //n.setName(name);
        //n.setPrice(price);
        //n.setImgpath(imgpath);
        //productosRepository.save(n);
        return "Saved";
    }

    @GetMapping("/delete/{id}") // Map ONLY POST Requests
    public @ResponseBody String deleteUserById(@PathVariable Integer id) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        productosRepository.deleteById(id);
        return "Deleted";
    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Productos> getAllUsers() {
        // This returns a JSON or XML with the users
        return productosRepository.findAll();
    }
}
