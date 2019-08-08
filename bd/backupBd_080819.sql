-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: sanautos
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ACL`
--

DROP TABLE IF EXISTS `ACL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(455) DEFAULT NULL,
  `property` varchar(455) DEFAULT NULL,
  `accessType` varchar(455) DEFAULT NULL,
  `permission` varchar(455) DEFAULT NULL,
  `principalType` varchar(455) DEFAULT NULL,
  `principalId` varchar(455) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ACL`
--

LOCK TABLES `ACL` WRITE;
/*!40000 ALTER TABLE `ACL` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccessToken`
--

DROP TABLE IF EXISTS `AccessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccessToken` (
  `id` text NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `scopes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccessToken`
--

LOCK TABLES `AccessToken` WRITE;
/*!40000 ALTER TABLE `AccessToken` DISABLE KEYS */;
INSERT INTO `AccessToken` VALUES ('ECR6zyxYbXm4i99775JuwBpldHF9PHOb7JAKPFxiIfgPDCWs6b7vAStBcSTCnmNG',1209600,1,'2019-08-07 04:24:55',NULL),('Hv2PHqrRhYBNrnFp5OAxKOcRIrLg9B9c58FVyVRu7gzDgSiiLQ0N8vU99WAcDtND',1209600,1,'2019-08-07 04:27:33',NULL),('fch3Cyhb2JJuufkhScYHrJ2JuBESmZVTls0sEePgB6FNqdDYdWsEsNj0wxRfrjxV',1209600,1,'2019-08-07 04:32:04',NULL),('msaJaqrEzV26Tf245qT4hjpTQhCL0GB3mgW2QGkXIHAp8wu8gcFwxYEmivLogyB6',1209600,1,'2019-08-07 04:36:08',NULL),('D3D8i0JJwbBxsnPcsYGyODdPTQUkFessuW7GEZBeO217haHlE5A4NsOuviuFBF7B',1209600,1,'2019-08-07 04:37:10',NULL),('wb7rCxqdYQKQAlyyLkwjFGqkbAXC3WVUp0lQXo9Inzm2ColRJ5PhmDFiSTlJAJmz',1209600,1,'2019-08-07 04:57:10',NULL),('pvw4Pv9RcmPZddtbhPQ2wuzNA9qxqrkNYtCwS1yeXyJ3Fnyaqz0qIFQpwsEEvsQg',1209600,1,'2019-08-08 02:27:54',NULL);
/*!40000 ALTER TABLE `AccessToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(455) DEFAULT NULL,
  `description` text,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'Administrador','Role administrador del sistema','2019-02-26 22:37:29','2019-02-26 22:37:29'),(2,'Cliente','Role cliente solo lectura','2019-02-26 22:37:53','2019-02-26 22:37:53');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `productsId` int(11) DEFAULT NULL,
  `path` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'32a4715f0f32c704dd0b55ffd3441d3ecdcd341f_5.jpeg',5,'32a4715f0f32c704dd0b55ffd3441d3ecdcd341f_5.jpeg','2019-08-07 21:40:30','2019-08-07 21:40:29.952'),(2,'5965e792b0ed81f74d87a86bebd64eaa4e7d7462_5.jpeg',5,'5965e792b0ed81f74d87a86bebd64eaa4e7d7462_5.jpeg','2019-08-07 21:40:30','2019-08-07 21:40:29.953'),(3,'39ba219dc1f27eaa40ef985adba49e06aab86a90_6.jpeg',6,'39ba219dc1f27eaa40ef985adba49e06aab86a90_6.jpeg','2019-08-07 21:42:49','2019-08-07 21:42:48.899'),(4,'ca90a96f4bdceaa3ba2c1051c8a31b9d848c72ff_7.jpeg',7,'ca90a96f4bdceaa3ba2c1051c8a31b9d848c72ff_7.jpeg','2019-08-07 21:59:56','2019-08-07 21:59:56.130'),(5,'cde39f67d2fc9cb069727b8bc36ec75915e65a9a_7.jpeg',7,'cde39f67d2fc9cb069727b8bc36ec75915e65a9a_7.jpeg','2019-08-07 21:59:56','2019-08-07 21:59:56.129'),(6,'b4dd76e46ff4be8d3c44ed5f97a6b97b4fb79e18_7.png',7,'b4dd76e46ff4be8d3c44ed5f97a6b97b4fb79e18_7.png','2019-08-07 21:59:56','2019-08-07 21:59:56.130'),(7,'8cc11d1205b6b66fbb8b666c33425aceadf92d5e_7.jpeg',7,'8cc11d1205b6b66fbb8b666c33425aceadf92d5e_7.jpeg','2019-08-07 21:59:56','2019-08-07 21:59:56.130'),(8,'a0bc6a7b1c268c59118c7c2e1f3f7db4278f9775_7.jpeg',7,'a0bc6a7b1c268c59118c7c2e1f3f7db4278f9775_7.jpeg','2019-08-07 22:26:48','2019-08-07 22:26:48.139'),(9,'4535483689d8112507e0d7a4399c12a515e64a97_7.jpeg',7,'4535483689d8112507e0d7a4399c12a515e64a97_7.jpeg','2019-08-07 22:26:48','2019-08-07 22:26:48.140'),(10,'24002f8e0cde9b9c65ad4ebba1d3caeadf91b661_7.png',7,'24002f8e0cde9b9c65ad4ebba1d3caeadf91b661_7.png','2019-08-07 22:26:48','2019-08-07 22:26:48.141'),(11,'3bac648c77a1002303073f38bcd2d34fddc7c56e_7.png',7,'3bac648c77a1002303073f38bcd2d34fddc7c56e_7.png','2019-08-07 22:26:48','2019-08-07 22:26:48.142');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vehículos',NULL,NULL),(2,'Camionetas','2019-08-05 01:32:21','2019-08-05 01:32:21'),(3,'Pick Up','2019-08-05 01:32:39','2019-08-05 01:32:39'),(4,'Electricos','2019-08-07 19:48:10','2019-08-07 19:48:10');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` float DEFAULT NULL,
  `description` text,
  `promotion` text,
  `subCategoriesId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Renault Logan Life',50000000,'Una versión para adaptarse a cada necesidad. Renault te ofrece niveles de acabados para satisfacer todas tus expectativas. Descubre los equipos que ofrecen a continuación.','80%',1,'2019-08-05 01:45:38','2019-08-05 01:45:38'),(2,'Renault Logan Life plus polar',50000000,'Estilo y confort para conducir con seguridad en cada movimiento\nRenault LOGAN Serie Limitada Polar\nRompe los límites con la Serie Limitada Renault Polar estrena hoy y recibe un reloj A370','45000000',1,'2019-08-05 01:45:57','2019-08-05 01:45:57'),(3,'StepWay ',56000000,'El nuevo Renault SANDERO STEPWAY está hecho para los que les gusta ver las calles como un lugar lleno de aventuras. Con un diseño pensado para destacar, ahora con mayor altura al piso y rin 16\". ','1200000',2,'2019-08-07 21:35:37','2019-08-07 21:35:37'),(4,'StepWay ',56000000,'El nuevo Renault SANDERO STEPWAY está hecho para los que les gusta ver las calles como un lugar lleno de aventuras. Con un diseño pensado para destacar, ahora con mayor altura al piso y rin 16\". ','1200000',2,'2019-08-07 21:36:38','2019-08-07 21:36:38'),(5,'test',12121200,'asdadasdasdadsasdadasdasdasdasdasdasd asd asd asd','12212',1,'2019-08-07 21:40:30','2019-08-07 21:40:30'),(6,'xxxxxxxxxxx',22222200,'asdssssssssssssssssssssssssss','11212',2,'2019-08-07 21:42:49','2019-08-07 21:42:49'),(7,'Renault Last',35000000,'Prueba del concepto general','500000',1,'2019-08-07 21:59:56','2019-08-07 22:26:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` text,
  `productId` int(11) NOT NULL,
  `acceptTerms` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (1,'BrangerBriz P.M',14297922,'7868638420','info@farmaciacentral.com.ar ',1,NULL,'2019-08-07 03:58:36','2019-08-07 03:58:36'),(2,'Ericson Hernandez',14297922,'3127714046','eryoher8@hotmail.com',1,1,'2019-08-07 04:00:11','2019-08-07 04:00:11'),(3,'yohany franco',1231241212,'7868638420','eryoher8@hotmail.com',1,1,'2019-08-07 04:01:15','2019-08-07 04:01:15'),(4,'Gero Hernandez',9875648,'325659859','eryoher@gmail.com',1,1,'2019-08-07 04:04:58','2019-08-07 04:04:58'),(5,'BrangerBriz P.M',21212,'7868638420','eryoher@gmail.com',1,1,'2019-08-07 04:05:56','2019-08-07 04:05:56');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanautos.AccessToken`
--

DROP TABLE IF EXISTS `sanautos.AccessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanautos.AccessToken` (
  `id` text NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `scopes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanautos.AccessToken`
--

LOCK TABLES `sanautos.AccessToken` WRITE;
/*!40000 ALTER TABLE `sanautos.AccessToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `sanautos.AccessToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subCategories`
--

DROP TABLE IF EXISTS `subCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoriesId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subCategories`
--

LOCK TABLES `subCategories` WRITE;
/*!40000 ALTER TABLE `subCategories` DISABLE KEYS */;
INSERT INTO `subCategories` VALUES (1,'Logan',1,'2019-08-05 01:33:53','2019-08-05 01:33:53'),(2,'Sandero',1,'2019-08-05 01:34:11','2019-08-05 01:34:11'),(3,'Todo Terreno 2.0',2,'2019-08-08 03:46:41','2019-08-08 03:46:51');
/*!40000 ALTER TABLE `subCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `name` varchar(455) DEFAULT NULL,
  `lastname` varchar(455) DEFAULT NULL,
  `city` varchar(455) DEFAULT NULL,
  `phone` text,
  `realm` varchar(45) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `password` text,
  `verificationToken` text,
  `email` text,
  `roleId` int(11) DEFAULT NULL,
  `consentWeb` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `activeCode` varchar(45) DEFAULT NULL,
  `recoverCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'eryoher','Ericson','Hernandez','Lerida','9874569',NULL,NULL,'$2a$10$BnKxnscdZpJJ5n5l0AQxs.FCcL8GSQ/ZFbv/m3jHV8zZzrxMnd2we',NULL,'eryoher@gmail.com',1,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-07 23:58:45
