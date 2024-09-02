/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ngg
-- ------------------------------------------------------
-- Server version	11.4.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_cat` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES
(1,'Teclado'),
(3,'Audifonos'),
(4,'Audio'),
(8,'Discos');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_images`
--

DROP TABLE IF EXISTS `has_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `has_images` (
  `id_prod` int(11) NOT NULL,
  `id_img` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_images`
--

LOCK TABLES `has_images` WRITE;
/*!40000 ALTER TABLE `has_images` DISABLE KEYS */;
INSERT INTO `has_images` VALUES
(92,125),
(92,126),
(92,127),
(92,128),
(93,129),
(93,130),
(93,131),
(94,132),
(95,133),
(96,134),
(97,135),
(98,136),
(99,137),
(100,138),
(101,139);
/*!40000 ALTER TABLE `has_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id_img` int(11) NOT NULL AUTO_INCREMENT,
  `url_img` varchar(45) DEFAULT NULL,
  `front` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_img`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES
(125,'images-1724977581813-357981981.jpg',0),
(126,'images-1724977581814-59726629.jpeg',0),
(127,'images-1724977581815-525096872.jpg',1),
(128,'images-1724977581815-3358786.jpg',0),
(129,'images-1724977749213-243410077.jpg',1),
(130,'images-1724977749213-172488221.jpg',0),
(131,'images-1724977749214-606432621.jpg',0),
(132,'images-1724979420397-131586145.png',1),
(133,'images-1724979756141-543618225.png',0),
(134,'images-1724979807956-131265347.png',1),
(135,'images-1724980322631-732162245.jpg',1),
(136,'images-1725037752518-397159195.png',1),
(137,'images-1725038265387-881981154.jpg',1),
(138,'images-1725038807627-586509117.jpg',1),
(139,'images-1725039276660-779973112.jpg',1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES
(1,'Logitech'),
(2,'Hyperx'),
(8,'Cougar'),
(9,'Corsair'),
(12,'Microsoft'),
(13,'Razer');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_prod` varchar(45) DEFAULT NULL,
  `desc_prod` varchar(255) DEFAULT NULL,
  `stock_prod` varchar(45) DEFAULT NULL,
  `precio_prod` varchar(45) DEFAULT NULL,
  `precio_off_prod` varchar(45) DEFAULT NULL,
  `id_marca` int(11) NOT NULL,
  `id_subCat` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id_prod`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES
(96,'Control XBOX ','mi <b>Descripción del Producto</b>','5','90990','78990',12,0,1),
(99,'Teclado Razer huntsman Mini','mi <b>Descripción del Producto</b>','1','125990','110000',13,0,1),
(100,'WebCam FIFINE K420','mi <b>Descripción del Producto</b>','1','125990','110000',1,16,3),
(101,'Mouse','mi <b>Descripción del Producto</b>','5','99999','22222',1,0,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categoria`
--

DROP TABLE IF EXISTS `sub_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_categoria` (
  `id_subCat` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_subCat` varchar(45) DEFAULT NULL,
  `categoria_id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id_subCat`,`categoria_id_cat`),
  KEY `fk_sub_categoria_categoria1_idx` (`categoria_id_cat`),
  CONSTRAINT `fk_sub_categoria_categoria1` FOREIGN KEY (`categoria_id_cat`) REFERENCES `categoria` (`id_cat`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categoria`
--

LOCK TABLES `sub_categoria` WRITE;
/*!40000 ALTER TABLE `sub_categoria` DISABLE KEYS */;
INSERT INTO `sub_categoria` VALUES
(1,'Microfonos',4),
(12,'Parlantes',4),
(13,'Audifonos',4),
(16,'11111',3);
/*!40000 ALTER TABLE `sub_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES
(3,'nachofaith','ruben.godoy@ngg.cl','$2a$10$f/vwJmiVPmzuhgoWmOKLxO4wiFBcuCoe1EeBBYaAoLjlNowiinQHu','admin','2024-08-13 21:02:00');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-09-02 14:22:16
