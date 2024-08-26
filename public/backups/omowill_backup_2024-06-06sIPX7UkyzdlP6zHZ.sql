-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: omowill
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL DEFAULT 'admin@admin.com',
  `password` varchar(100) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'2024-06-06 18:40:33','admin@admin.com','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` text NOT NULL,
  `subTitle` text NOT NULL,
  `content` text NOT NULL,
  `kind` varchar(100) NOT NULL,
  `senderInfo` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES (1,'2024-06-06 18:36:24','友人の遺言書を入手するにはどうすればいいですか?','友人の遺言書を入手するにはどうすればいいですか?','数日前、友人が突然交通事故に遭いました。友人の遺言を見たいです','sender@sender.com','admin@admin.com',0),(2,'2024-06-06 18:36:25','友人の遺言書を入手するにはどうすればいいですか?','友人の遺言書を入手するにはどうすればいいですか?','数日前、友人が突然交通事故に遭いました。友人の遺言を見たいです','sender@sender.com','admin@admin.com',0);
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `update_data`
--

DROP TABLE IF EXISTS `update_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `update_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `database_path` varchar(300) NOT NULL,
  `data_path` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update_data`
--

LOCK TABLES `update_data` WRITE;
/*!40000 ALTER TABLE `update_data` DISABLE KEYS */;
INSERT INTO `update_data` VALUES (7,'2024-06-06 18:34:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06jZe5f4D34UNRdhKs.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_rCc3GNRbLG9g63rQ.zip'),(8,'2024-06-06 18:35:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-069hC1oGvDGl5bZJQ3.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_6KspUPaNBJhwJHr7.zip'),(9,'2024-06-06 18:36:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06H48jxQCBGPDV0VLA.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_ym61eGFdEyEIlMpr.zip'),(10,'2024-06-06 18:37:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06iWkApYx3wXxn49LL.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_EtEvEOL94wtHyCb4.zip'),(11,'2024-06-06 18:37:57','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-060kjASI6ry94PSexY.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_6PBtYiPDbjpweDst.zip'),(12,'2024-06-06 18:38:00','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-069xBbEZW99KvfdrvE.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_M2sW3cJx8MfK8hOK.zip'),(13,'2024-06-06 18:38:12','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-067592F9Y62cx8d4gQ.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_8EuVuCPwY9JNble1.zip'),(14,'2024-06-06 18:39:02','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-060QWv1iOYt6Ldiyan.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_hrgLjpKEea3PNuC2.zip'),(15,'2024-06-06 18:40:00','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06B75y3lyeSQynrbyz.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_p3B6CRPtUCCnUwiZ.zip'),(16,'2024-06-06 18:41:00','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06N4Frxu41CZNQTppn.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_Lsyv8ueoUwVSdvk9.zip'),(17,'2024-06-06 18:41:22','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06crgJV48Q1crkZZC0.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_GBGbUWQZJh9L1PmX.zip'),(18,'2024-06-06 18:41:30','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06lwrvuedQ0Lih00aE.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_IME85NwCwDjrgsGN.zip'),(19,'2024-06-06 18:41:36','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06TRcJzDi4t0qVbWbI.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_jCUD2kx8QYYa7rkl.zip'),(20,'2024-06-06 18:41:48','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06BROe5oSnalB3E4IN.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_aCnScz9geNdMvGdw.zip'),(21,'2024-06-06 18:41:54','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06yBaYvOhBqG6cR1dk.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_lHGkmpMfbL3TnSTL.zip'),(22,'2024-06-06 18:41:56','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-064mW7MiXZo8Eb11qU.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_Vuade3c3Vq648D0r.zip'),(23,'2024-06-06 18:42:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06dUapWkKZ1oSCCZYP.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_ypsFvC4xRsKTg6po.zip'),(24,'2024-06-06 18:42:06','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06iIKLeXkJJWAlmwcW.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_L2FYWmHiGmxSpy9q.zip'),(25,'2024-06-06 18:42:13','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06o2hNhSRew7rqI9Sd.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_Igy6pxqOKevvlxRt.zip'),(26,'2024-06-06 18:42:16','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06I4mbgQPy2hm1KUiy.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_yW2sh77CeHCXoIOs.zip'),(27,'2024-06-06 18:42:24','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06hJSjQJg4FUL0owAx.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_XHJOrc8ueNwVL2DO.zip'),(28,'2024-06-06 18:42:31','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06qtc6A4E4TjuaRnen.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_518094Hh8vkt4K4W.zip'),(29,'2024-06-06 18:42:50','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06AklNmW3AuKDcWYVh.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_093C4LlRYJfPUyy9.zip'),(30,'2024-06-06 18:43:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06HeJ5yjYiHOjZMipj.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_uVnXGsxK8K1i4kLt.zip'),(31,'2024-06-06 18:43:20','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06h3QAPc3aX1IeQyvV.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_q1O8GuPETkIOULnE.zip'),(32,'2024-06-06 18:44:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06fYxMMVTTVoFrJqFq.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_gNMEsHtxwADepMCn.zip'),(33,'2024-06-06 18:45:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-0677ZhWDM5amTt3Suk.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_acv25jxLZXaL2AUe.zip'),(34,'2024-06-06 18:46:05','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06LCfR9DM33Z0ilRzO.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_H1jALuMBRXKnyxTD.zip'),(35,'2024-06-06 18:47:01','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06fDjFzEBSrcB9bbKm.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_5c7C2JwS89X35SMn.zip'),(36,'2024-06-06 18:47:33','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-06-06HxGSybQAcBZK3S5V.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-06-06_lyLY8SisL4zRhvqS.zip');
/*!40000 ALTER TABLE `update_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `birthdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `prefectures` varchar(100) NOT NULL,
  `address1` varchar(200) NOT NULL,
  `address2` varchar(200) NOT NULL,
  `postal_code` varchar(100) NOT NULL,
  `apartment` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'name','last name','2024-06-05 15:00:00','location','address1','address2','postal code','apart','pacodev0312@gmail.com','aaa','','user','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_borns_pdf`
--

DROP TABLE IF EXISTS `user_borns_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_borns_pdf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pdf_child0_status` tinyint(1) NOT NULL,
  `pdf_child0_name` varchar(50) NOT NULL,
  `pdf_child0_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child0_url` varchar(100) NOT NULL,
  `pdf_child0_description` text NOT NULL,
  `pdf_child0_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child1_status` tinyint(1) NOT NULL,
  `pdf_child1_name` varchar(50) NOT NULL,
  `pdf_child1_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child1_url` varchar(100) NOT NULL,
  `pdf_child1_description` text NOT NULL,
  `pdf_child1_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child2_status` tinyint(1) NOT NULL,
  `pdf_child2_name` varchar(50) NOT NULL,
  `pdf_child2_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child2_url` varchar(100) NOT NULL,
  `pdf_child2_description` text NOT NULL,
  `pdf_child2_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child3_status` tinyint(1) NOT NULL,
  `pdf_child3_name` varchar(50) NOT NULL,
  `pdf_child3_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child3_url` varchar(100) NOT NULL,
  `pdf_child3_description` text NOT NULL,
  `pdf_child3_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child4_status` tinyint(1) NOT NULL,
  `pdf_child4_name` varchar(50) NOT NULL,
  `pdf_child4_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child4_url` varchar(100) NOT NULL,
  `pdf_child4_description` text NOT NULL,
  `pdf_child4_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_borns_pdf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_borns_pdf`
--

LOCK TABLES `user_borns_pdf` WRITE;
/*!40000 ALTER TABLE `user_borns_pdf` DISABLE KEYS */;
INSERT INTO `user_borns_pdf` VALUES (1,1,0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user_borns_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_borns_video`
--

DROP TABLE IF EXISTS `user_borns_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_borns_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `video_child0_status` tinyint(1) NOT NULL,
  `video_child0_name` varchar(50) NOT NULL,
  `video_child0_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child0_url` varchar(100) NOT NULL,
  `video_child0_description` text NOT NULL,
  `video_child0_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child1_status` tinyint(1) NOT NULL,
  `video_child1_name` varchar(50) NOT NULL,
  `video_child1_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child1_url` varchar(100) NOT NULL,
  `video_child1_description` text NOT NULL,
  `video_child1_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child2_status` tinyint(1) NOT NULL,
  `video_child2_name` varchar(50) NOT NULL,
  `video_child2_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child2_url` varchar(100) NOT NULL,
  `video_child2_description` text NOT NULL,
  `video_child2_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child3_status` tinyint(1) NOT NULL,
  `video_child3_name` varchar(50) NOT NULL,
  `video_child3_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child3_url` varchar(100) NOT NULL,
  `video_child3_description` text NOT NULL,
  `video_child3_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child4_status` tinyint(1) NOT NULL,
  `video_child4_name` varchar(50) NOT NULL,
  `video_child4_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child4_url` varchar(100) NOT NULL,
  `video_child4_description` text NOT NULL,
  `video_child4_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_borns_video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_borns_video`
--

LOCK TABLES `user_borns_video` WRITE;
/*!40000 ALTER TABLE `user_borns_video` DISABLE KEYS */;
INSERT INTO `user_borns_video` VALUES (1,1,0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,'','2024-06-06 18:32:31','','','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user_borns_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_make_will`
--

DROP TABLE IF EXISTS `user_make_will`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_make_will` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `will_status` tinyint(1) NOT NULL,
  `will_real_estate` varchar(300) NOT NULL,
  `will_real_url` varchar(100) NOT NULL,
  `will_real_description` text NOT NULL,
  `will_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_make_will_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_make_will`
--

LOCK TABLES `user_make_will` WRITE;
/*!40000 ALTER TABLE `user_make_will` DISABLE KEYS */;
INSERT INTO `user_make_will` VALUES (1,1,0,'','','','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user_make_will` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_will_pdf`
--

DROP TABLE IF EXISTS `user_will_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_will_pdf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pdf_family_status` tinyint(1) NOT NULL,
  `pdf_family_lawyer_state` tinyint(1) NOT NULL,
  `pdf_family_lawyer_name` varchar(50) NOT NULL,
  `pdf_family_lawyer_relation` varchar(50) NOT NULL DEFAULT '家族・恋人',
  `pdf_family_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_family_url` varchar(100) NOT NULL,
  `pdf_family_description` text NOT NULL,
  `pdf_family_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_relation_status` tinyint(1) NOT NULL,
  `pdf_relation_lawyer_state` tinyint(1) NOT NULL,
  `pdf_relation_lawyer_name` varchar(50) NOT NULL,
  `pdf_relation_lawyer_relation` varchar(50) NOT NULL DEFAULT '友人',
  `pdf_relation_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_relation_url` varchar(100) NOT NULL,
  `pdf_relation_description` text NOT NULL,
  `pdf_relation_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_other_status` tinyint(1) NOT NULL,
  `pdf_other_lawyer_state` tinyint(1) NOT NULL,
  `pdf_other_lawyer_name` varchar(50) NOT NULL,
  `pdf_other_lawyer_relation` varchar(50) NOT NULL DEFAULT '他の',
  `pdf_other_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_other_url` varchar(100) NOT NULL,
  `pdf_other_description` text NOT NULL,
  `pdf_other_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_will_pdf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_will_pdf`
--

LOCK TABLES `user_will_pdf` WRITE;
/*!40000 ALTER TABLE `user_will_pdf` DISABLE KEYS */;
INSERT INTO `user_will_pdf` VALUES (1,1,1,1,'Akay','家族・恋人','2024-06-06 15:00:00','\\data\\1717698789014.pdf','動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。','2024-06-06 18:33:09',1,1,'Asai','友人','2024-06-06 15:00:00','/data/1717698819416.pdf','動画投稿サービスであるYoutubeを活用して、動画でのメッセージをマイページに残しておくことができます。動画ではなく、手紙としてメッセージを残しておきたい方はPDFとして手紙を残すこともできます。','2024-06-06 18:33:42',0,0,'','他の','2024-06-06 18:32:31','','','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user_will_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_will_video`
--

DROP TABLE IF EXISTS `user_will_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_will_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `video_family_status` tinyint(1) NOT NULL,
  `video_family_lawyer_state` tinyint(1) NOT NULL,
  `video_family_lawyer_name` varchar(50) NOT NULL,
  `video_family_lawyer_relation` varchar(50) NOT NULL DEFAULT '家族・恋人',
  `video_family_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_family_url` varchar(100) NOT NULL,
  `video_family_description` text NOT NULL,
  `video_family_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_relation_status` tinyint(1) NOT NULL,
  `video_relation_lawyer_state` tinyint(1) NOT NULL,
  `video_relation_lawyer_name` varchar(50) NOT NULL,
  `video_relation_lawyer_relation` varchar(50) NOT NULL DEFAULT '友人',
  `video_relation_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_relation_url` varchar(100) NOT NULL,
  `video_relation_description` text NOT NULL,
  `video_relation_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_other_status` tinyint(1) NOT NULL,
  `video_other_lawyer_state` tinyint(1) NOT NULL,
  `video_other_lawyer_name` varchar(50) NOT NULL,
  `video_other_lawyer_relation` varchar(50) NOT NULL DEFAULT '他の',
  `video_other_lawyer_birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_other_url` varchar(100) NOT NULL,
  `video_other_description` text NOT NULL,
  `video_other_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_will_video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_will_video`
--

LOCK TABLES `user_will_video` WRITE;
/*!40000 ALTER TABLE `user_will_video` DISABLE KEYS */;
INSERT INTO `user_will_video` VALUES (1,1,0,0,'','家族・恋人','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,0,'','友人','2024-06-06 18:32:31','','','2024-06-06 18:32:31',0,0,'','他の','2024-06-06 18:32:31','','','2024-06-06 18:32:31');
/*!40000 ALTER TABLE `user_will_video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07  3:47:44
