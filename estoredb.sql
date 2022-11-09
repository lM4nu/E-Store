-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.0-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para estoredb
CREATE DATABASE IF NOT EXISTS `estoredb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `estoredb`;

-- Volcando estructura para tabla estoredb.carrito
CREATE TABLE IF NOT EXISTS `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `productoid` int(11) DEFAULT NULL,
  `usuarioid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla estoredb.carrito: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estoredb.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgpath` varchar(255) DEFAULT NULL,
  `mostrar` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla estoredb.productos: ~6 rows (aproximadamente)
INSERT INTO `productos` (`id`, `imgpath`, `mostrar`, `name`, `price`) VALUES
	(1, 'https://http2.mlstatic.com/D_NQ_NP_846944-MLA31043118891_062019-O.jpg', 1, 'Mesa', 2700),
	(2, 'https://ken-brown.com.ar/wp-content/uploads/2019/10/KBL400-licuadora-con_molinillo_Ken-Brown-600x600.jpg', 1, 'Licuadora', 5200),
	(3, 'https://http2.mlstatic.com/D_NQ_NP_848951-MLA49760260536_042022-O.webp', 1, 'Cortina', 6000),
	(4, 'https://http2.mlstatic.com/D_NQ_NP_952741-MLA47767831732_102021-O.webp', 1, 'Almohada', 2100),
	(5, 'https://www.gardenlife.com.ar/public/images/productos/producto_91_3032.jpg', 1, 'Silla', 1400),
	(6, 'https://http2.mlstatic.com/D_NQ_NP_918798-MLA48100138165_112021-O.webp', 1, 'Mate', 3500);

-- Volcando estructura para tabla estoredb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `realname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla estoredb.usuarios: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
