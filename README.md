# E-Store


En este projecto creamos un home de una tienda. En este Home se pueden visualizar los productos contenidos en una base de datos SQL obtenidos a traves del backend


## Tecnologias usadas
* Spring-Boot (Backend)
* MariaDB (Backend)
* Angular (Frontend)

## Como iniciar el projecto

Para iniciar el projecto es un requisito instalar MariaDB
y usar el archivo estoredb.sql para crear la base de datos a la que el backend se intentara conectar

### Prerequisitos 
	* Instalar mariadb
	* Abrir HeidiSQL (En Windows)
	* Archivo ejecutar archivo SQL y abrir el archivo estoredb.sql

### Arrancar Backend
	$ cd E-Store/backend
	$ mvnw spring-boot:run
### Arrancar Frontend
	$ cd E-Store/frontend
	$ ng serve

Entrando a [localhost:4200](https://localhost:4200) deberiamos ver la pagina de la tienda
