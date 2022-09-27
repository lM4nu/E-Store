package com.utn.estore.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.net.URI;

@RestController // This means that this class is a Controller
@RequestMapping(path = "/login") // This means URL's start with /demo (after Application path)
public class LoginController {

    @PostMapping(path = "/") // Map ONLY POST Requests
    public ResponseEntity<Void> redirect(@RequestParam Map<String,String> data){
 
        System.out.println(data);
 
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/home")).build();
    }
    //public @ResponseBody String showMail(
            //@RequestParam String name,
            //@RequestParam String mail) {

        //return mail;
    //}

}
