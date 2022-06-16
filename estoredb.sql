-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.7.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para estoredb
CREATE DATABASE IF NOT EXISTS `estoredb` /*!40100 DEFAULT CHARACTER SET latin1 */;

DROP USER IF EXISTS `estore` @`%`;
CREATE USER 'estore'@'localhost' IDENTIFIED BY '1234';
GRANT USAGE ON *.* TO 'estore'@'localhost';
GRANT EXECUTE, SELECT, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON `estoredb`.* TO 'estore'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;


USE `estoredb`;

-- Volcando estructura para tabla estoredb.hibernate_sequence
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla estoredb.hibernate_sequence: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` (`next_val`) VALUES
	(11);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;

-- Volcando estructura para tabla estoredb.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `imgpath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla estoredb.productos: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `name`, `price`, `imgpath`) VALUES
	(0, 'Televisor', 300, NULL),
	(1, 'Camara', 200, NULL),
	(2, 'Microondas', 100, NULL),
	(3, 'Lampara', 60, NULL),
	(4, 'Licuadoraa', 420, 'https://cdnlaol.laanonimaonline.com/web/images/productos/b/0000013000/13195.jpg'),
	(5, 'Parlante', 150, NULL),
	(6, 'Computadora', 600, NULL),
	(7, 'Auto', 3400, NULL),
	(8, 'Moto', 1000, NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
