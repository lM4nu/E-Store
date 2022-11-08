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
@Table(name = "carrito") // especifico el nombre de la tabla
public class Carritos {
    @Id // especifica que el integer id sea la primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//identity significa que este campo sea la primary key en las columnas y tenga auto-increment
    private Integer id;
    private Integer usuarioid;
    private Integer cantidad;
    private Integer productoid;
}
