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
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update_data`
--

LOCK TABLES `update_data` WRITE;
/*!40000 ALTER TABLE `update_data` DISABLE KEYS */;
INSERT INTO `update_data` VALUES (335,'2024-08-23 19:39:00','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(336,'2024-08-23 19:39:18','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(337,'2024-08-23 19:39:39','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(338,'2024-08-23 19:40:07','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(339,'2024-08-23 19:40:28','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(340,'2024-08-23 19:41:03','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(341,'2024-08-23 19:46:59','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(342,'2024-08-23 19:49:26','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(343,'2024-08-23 19:49:43','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(344,'2024-08-23 19:50:08','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(345,'2024-08-23 19:51:15','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(346,'2024-08-23 19:51:49','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(347,'2024-08-23 19:52:36','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(348,'2024-08-23 19:56:32','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(349,'2024-08-23 19:56:51','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(350,'2024-08-23 19:59:24','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(351,'2024-08-23 20:00:03','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(352,'2024-08-23 20:00:37','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(353,'2024-08-23 20:01:18','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(354,'2024-08-23 20:01:25','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(355,'2024-08-23 20:02:41','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(356,'2024-08-23 20:04:04','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(357,'2024-08-23 20:08:20','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(358,'2024-08-23 20:08:31','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(359,'2024-08-23 20:09:19','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(360,'2024-08-23 20:10:42','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(361,'2024-08-23 20:11:31','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(362,'2024-08-23 20:19:16','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(363,'2024-08-23 20:23:09','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip'),(364,'2024-08-23 21:10:14','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\omowill_backup_2024-08-23.sql','C:\\Users\\Administrator\\Desktop\\omowill\\react-omowill\\public\\backups\\directories_backup_2024-08-23}.zip');
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
-- Table structure for table `user_estate_pdf`
--

DROP TABLE IF EXISTS `user_estate_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_estate_pdf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pdf_name` varchar(255) NOT NULL,
  `reg_num` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `prop_type` varchar(255) DEFAULT NULL,
  `owner` varbinary(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `land_category` varchar(255) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `acq_date` timestamp NULL DEFAULT NULL,
  `reg_right` varchar(255) DEFAULT NULL,
  `prev_owner` varchar(255) DEFAULT NULL,
  `boundary_detail` varchar(255) DEFAULT NULL,
  `usage_right` varchar(255) DEFAULT NULL,
  `other_right` varchar(255) DEFAULT NULL,
  `restriction` varchar(255) DEFAULT NULL,
  `shared_prop` varchar(255) DEFAULT NULL,
  `own_ratio` int(11) DEFAULT NULL,
  `co_owner` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_estate_pdf`
--

LOCK TABLES `user_estate_pdf` WRITE;
/*!40000 ALTER TABLE `user_estate_pdf` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_estate_pdf` ENABLE KEYS */;
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
INSERT INTO `user_make_will` VALUES (5,5,1,'/data/1724447550521.pdf','\\data\\1724428333524.pdf',NULL,'2024-08-23 21:12:30'),(6,6,0,'','',NULL,'2024-07-17 00:02:22'),(7,7,0,'','',NULL,'2024-07-17 00:02:36');
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

-- Dump completed on 2024-08-24  6:14:33
