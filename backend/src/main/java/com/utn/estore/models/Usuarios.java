package com.utn.estore.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//crea getters y setters automaticamente
@Data
@Entity
@Table(name = "usuarios") // especifico el nombre de la tabla
public class Usuarios {
    @Id // especifica que el integer id sea la primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//identity significa que este campo sea la primary key en las columnas y tenga auto-increment
    private Integer id;
    private String name;
    private String realname;
    private String password;
}
