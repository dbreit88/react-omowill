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
  `date` date NOT NULL,
  `title` text NOT NULL,
  `subTitle` text NOT NULL,
  `content` text NOT NULL,
  `kind` varchar(100) NOT NULL,
  `senderInfo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES (1,'2024-05-15','リカレント教育動画コンテンツに関するニーズアンケートにご協力ください【12/17（日）まで】','当サイトからのお知らせ','長岡技術科学大学では、今後「まなびスクエア」のオンライン学習用動画コンテンツを充実させ、企業等で働く方々のリカレント教育にもご活用いただきたいと考えております。つきましては、本学が地方都市の工学系大学としてどのような動画コンテンツを提供していくか、各企業様等のニーズをお聴きし、ご意見を動画コンテンツ企画の参考としたいため、本アンケートにご協力くださるようお願い申し上げます。','admin','admin@admin.com'),(2,'2024-05-14','2023年度「まちなかキャンパス長岡」開講講座をお知らせします','イベント情報','「まちなかキャンパス長岡」で開催の本学教員等による開講講座をお知らせします。','admin','admin@admin.com'),(3,'0000-00-00','2022年度「長岡モノづくりアカデミー」が開催されます','イベント情報','長岡モノづくりアカデミーは、モノづくりにおける技術者の養成と企業の人材基盤の強化を図るため、産学官の連携により、NICO（公益財団法人にいがた産業創造機構）が運営し開催している人材育成講座です。\n\nアカデミー内のいくつかのコースで、本学教員が講義を担当しております。対象者は新潟県内企業の技術者に限られておりますが、ご興味のある方は下記リンクよりお申込みください。','admin','admin@admin.com');
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_data`
--

DROP TABLE IF EXISTS `pay_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `birth` timestamp NOT NULL DEFAULT current_timestamp(),
  `address` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `relation_file` varchar(500) NOT NULL,
  `death_file` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pay_state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_data`
--

LOCK TABLES `pay_data` WRITE;
/*!40000 ALTER TABLE `pay_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_data` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update_data`
--

LOCK TABLES `update_data` WRITE;
/*!40000 ALTER TABLE `update_data` DISABLE KEYS */;
INSERT INTO `update_data` VALUES (133,'2024-08-21 07:42:34','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(134,'2024-08-21 07:43:20','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(135,'2024-08-21 07:43:53','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(136,'2024-08-21 07:44:24','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(137,'2024-08-21 07:44:42','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(138,'2024-08-21 07:45:45','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(139,'2024-08-21 07:46:38','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(140,'2024-08-21 07:47:26','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(141,'2024-08-21 07:51:59','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(142,'2024-08-21 07:53:26','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(143,'2024-08-21 07:53:48','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(144,'2024-08-21 07:54:14','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(145,'2024-08-21 07:55:12','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(146,'2024-08-21 07:55:31','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(147,'2024-08-21 07:56:05','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(148,'2024-08-21 07:57:31','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(149,'2024-08-21 07:58:29','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(150,'2024-08-21 07:58:42','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(151,'2024-08-21 07:58:49','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(152,'2024-08-21 07:58:56','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(153,'2024-08-21 07:59:11','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(154,'2024-08-21 08:00:45','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(155,'2024-08-21 08:01:15','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(156,'2024-08-21 08:03:18','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(157,'2024-08-21 08:04:15','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(158,'2024-08-21 08:04:48','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(159,'2024-08-21 08:05:25','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(160,'2024-08-21 08:06:07','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(161,'2024-08-21 08:06:14','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip'),(162,'2024-08-21 08:07:30','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-21.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-21}.zip');
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
  `birthdate` date NOT NULL,
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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'first name','last name','2024-07-17','dd','addr','addr','115600','dd','pacodev0312@gmail.com','aaa','','user','2024-07-17 00:01:41'),(6,'first name','last name','2024-07-17','dd','addr','addr','115600','dd','pacodev@gmail.com','aaa','','user','2024-07-17 00:02:22'),(7,'first name','last name','2024-07-17','dd','addr','addr','115600','dd','paco@gmail.com','aaa','','user','2024-07-17 00:02:36');
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
  `pdf_child0_birth` date NOT NULL,
  `pdf_child0_url` varchar(100) NOT NULL,
  `pdf_child0_description` text NOT NULL,
  `pdf_child0_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child1_status` tinyint(1) NOT NULL,
  `pdf_child1_name` varchar(50) NOT NULL,
  `pdf_child1_birth` date NOT NULL,
  `pdf_child1_url` varchar(100) NOT NULL,
  `pdf_child1_description` text NOT NULL,
  `pdf_child1_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child2_status` tinyint(1) NOT NULL,
  `pdf_child2_name` varchar(50) NOT NULL,
  `pdf_child2_birth` date NOT NULL,
  `pdf_child2_url` varchar(100) NOT NULL,
  `pdf_child2_description` text NOT NULL,
  `pdf_child2_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child3_status` tinyint(1) NOT NULL,
  `pdf_child3_name` varchar(50) NOT NULL,
  `pdf_child3_birth` date NOT NULL,
  `pdf_child3_url` varchar(100) NOT NULL,
  `pdf_child3_description` text NOT NULL,
  `pdf_child3_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_child4_status` tinyint(1) NOT NULL,
  `pdf_child4_name` varchar(50) NOT NULL,
  `pdf_child4_birth` date NOT NULL,
  `pdf_child4_url` varchar(100) NOT NULL,
  `pdf_child4_description` text NOT NULL,
  `pdf_child4_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `user_borns_pdf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_borns_pdf`
--

LOCK TABLES `user_borns_pdf` WRITE;
/*!40000 ALTER TABLE `user_borns_pdf` DISABLE KEYS */;
INSERT INTO `user_borns_pdf` VALUES (5,5,0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41'),(6,6,0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22'),(7,7,0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36');
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
  `video_child0_birth` date NOT NULL,
  `video_child0_url` varchar(100) NOT NULL,
  `video_child0_description` text NOT NULL,
  `video_child0_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child1_status` tinyint(1) NOT NULL,
  `video_child1_name` varchar(50) NOT NULL,
  `video_child1_birth` date NOT NULL,
  `video_child1_url` varchar(100) NOT NULL,
  `video_child1_description` text NOT NULL,
  `video_child1_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child2_status` tinyint(1) NOT NULL,
  `video_child2_name` varchar(50) NOT NULL,
  `video_child2_birth` date NOT NULL,
  `video_child2_url` varchar(100) NOT NULL,
  `video_child2_description` text NOT NULL,
  `video_child2_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child3_status` tinyint(1) NOT NULL,
  `video_child3_name` varchar(50) NOT NULL,
  `video_child3_birth` date NOT NULL,
  `video_child3_url` varchar(100) NOT NULL,
  `video_child3_description` text NOT NULL,
  `video_child3_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_child4_status` tinyint(1) NOT NULL,
  `video_child4_name` varchar(50) NOT NULL,
  `video_child4_birth` date NOT NULL,
  `video_child4_url` varchar(100) NOT NULL,
  `video_child4_description` text NOT NULL,
  `video_child4_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `user_borns_video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_borns_video`
--

LOCK TABLES `user_borns_video` WRITE;
/*!40000 ALTER TABLE `user_borns_video` DISABLE KEYS */;
INSERT INTO `user_borns_video` VALUES (5,5,0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41',0,'','0000-00-00','','','2024-07-17 00:01:41'),(6,6,0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22',0,'','0000-00-00','','','2024-07-17 00:02:22'),(7,7,0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36',0,'','0000-00-00','','','2024-07-17 00:02:36');
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
  `will_status` tinyint(4) NOT NULL,
  `will_real_estate` varchar(300) NOT NULL,
  `will_real_url` varchar(300) NOT NULL,
  `will_real_description` text DEFAULT NULL,
  `will_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `user_make_will_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_make_will`
--

LOCK TABLES `user_make_will` WRITE;
/*!40000 ALTER TABLE `user_make_will` DISABLE KEYS */;
INSERT INTO `user_make_will` VALUES (5,5,0,'','',NULL,'2024-07-17 00:01:41'),(6,6,0,'','',NULL,'2024-07-17 00:02:22'),(7,7,0,'','',NULL,'2024-07-17 00:02:36');
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
  `pdf_family_lawyer_relation` varchar(50) NOT NULL,
  `pdf_family_lawyer_birth` date NOT NULL,
  `pdf_family_name` varchar(50) NOT NULL,
  `pdf_family_url` varchar(100) NOT NULL,
  `pdf_family_description` text NOT NULL,
  `pdf_family_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_relation_status` tinyint(1) NOT NULL,
  `pdf_relation_lawyer_state` tinyint(1) NOT NULL,
  `pdf_relation_lawyer_name` varchar(50) NOT NULL,
  `pdf_relation_lawyer_relation` varchar(50) NOT NULL,
  `pdf_relation_lawyer_birth` date NOT NULL,
  `pdf_relation_name` varchar(50) NOT NULL,
  `pdf_relation_url` varchar(100) NOT NULL,
  `pdf_relation_description` text NOT NULL,
  `pdf_relation_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf_other_status` tinyint(1) NOT NULL,
  `pdf_other_lawyer_state` tinyint(1) NOT NULL,
  `pdf_other_lawyer_name` varchar(50) NOT NULL,
  `pdf_other_lawyer_relation` varchar(50) NOT NULL,
  `pdf_other_lawyer_birth` date NOT NULL,
  `pdf_other_name` varchar(50) NOT NULL,
  `pdf_other_url` varchar(100) NOT NULL,
  `pdf_other_description` text NOT NULL,
  `pdf_other_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `user_will_pdf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_will_pdf`
--

LOCK TABLES `user_will_pdf` WRITE;
/*!40000 ALTER TABLE `user_will_pdf` DISABLE KEYS */;
INSERT INTO `user_will_pdf` VALUES (5,5,0,0,'','','0000-00-00','','','','2024-07-17 00:01:41',0,0,'','','0000-00-00','','','','2024-07-17 00:01:41',0,0,'','','0000-00-00','','','','2024-07-17 00:01:41'),(6,6,0,0,'','','0000-00-00','','','','2024-07-17 00:02:22',0,0,'','','0000-00-00','','','','2024-07-17 00:02:22',0,0,'','','0000-00-00','','','','2024-07-17 00:02:22'),(7,7,0,0,'','','0000-00-00','','','','2024-07-17 00:02:36',0,0,'','','0000-00-00','','','','2024-07-17 00:02:36',0,0,'','','0000-00-00','','','','2024-07-17 00:02:36');
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
  `video_family_lawyer_relation` varchar(50) NOT NULL,
  `video_family_lawyer_birth` date NOT NULL,
  `video_family_name` varchar(50) NOT NULL,
  `video_family_url` varchar(100) NOT NULL,
  `video_family_description` text NOT NULL,
  `video_family_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_relation_status` tinyint(1) NOT NULL,
  `video_relation_lawyer_state` tinyint(1) NOT NULL,
  `video_relation_lawyer_name` varchar(50) NOT NULL,
  `video_relation_lawyer_relation` varchar(50) NOT NULL,
  `video_relation_lawyer_birth` date NOT NULL,
  `video_relation_name` varchar(50) NOT NULL,
  `video_relation_url` varchar(100) NOT NULL,
  `video_relation_description` text NOT NULL,
  `video_relation_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_other_status` tinyint(1) NOT NULL,
  `video_other_lawyer_state` tinyint(1) NOT NULL,
  `video_other_lawyer_name` varchar(50) NOT NULL,
  `video_other_lawyer_relation` varchar(50) NOT NULL,
  `video_other_lawyer_birth` date NOT NULL,
  `video_other_name` varchar(50) NOT NULL,
  `video_other_url` varchar(100) NOT NULL,
  `video_other_description` text NOT NULL,
  `video_other_update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `user_will_video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_will_video`
--

LOCK TABLES `user_will_video` WRITE;
/*!40000 ALTER TABLE `user_will_video` DISABLE KEYS */;
INSERT INTO `user_will_video` VALUES (5,5,0,0,'','','0000-00-00','','','','2024-07-17 00:01:41',0,0,'','','0000-00-00','','','','2024-07-17 00:01:41',0,0,'','','0000-00-00','','','','2024-07-17 00:01:41'),(6,6,0,0,'','','0000-00-00','','','','2024-07-17 00:02:22',0,0,'','','0000-00-00','','','','2024-07-17 00:02:22',0,0,'','','0000-00-00','','','','2024-07-17 00:02:22'),(7,7,0,0,'','','0000-00-00','','','','2024-07-17 00:02:36',0,0,'','','0000-00-00','','','','2024-07-17 00:02:36',0,0,'','','0000-00-00','','','','2024-07-17 00:02:36');
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

-- Dump completed on 2024-08-22  0:00:01
