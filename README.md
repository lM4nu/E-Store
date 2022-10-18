# E-Store


En este proyecto creamos un Home de una tienda. En este Home se pueden visualizar los productos contenidos en una base de datos SQL obtenidos a través del backend


## Tecnologías usadas
* Spring-Boot (Backend)
* MariaDB (Backend)
* Angular (Frontend)

## Como iniciar el proyecto

Para iniciar el proyecto es un requisito instalar MariaDB
y usar el archivo *estoredb.sql* para crear la base de datos a la que el backend se intentara conectar

### Prerrequisitos 
* Java 11
* Maven
* Instalar mariadb
* Abrir HeidiSQL (En Windows)
* Archivo > ejecutar archivo SQL y seleccionar el archivo estoredb.sql

### Arrancar Backend
	$ cd E-Store/backend
	$ mvnw spring-boot:run
### Arrancar Frontend
	$ cd E-Store/frontend
	$ ng serve

Entrando a [localhost:4200](https://localhost:4200) deberíamos ver la pagina de la tienda
hola
