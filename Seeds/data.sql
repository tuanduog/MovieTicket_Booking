-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: booking_ticket
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `chair` varchar(255) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `combo` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `showtime_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `status` enum('CANCELLED','DONE','PENDING','REFUNDED','WAITING') DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_showtime_id_idx` (`showtime_id`),
  CONSTRAINT `fk_showtime_id` FOREIGN KEY (`showtime_id`) REFERENCES `show_time` (`showtime_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (5,'G7',130000,'','2025-08-02',1,1,NULL,NULL),(7,'A13',70000,'','2025-08-02',1,3,NULL,NULL),(8,'G7',190000,'Beta Combo x1','2025-08-02',2,2,NULL,NULL),(10,'G13',178500,'Sweet Combo x1','2025-08-02',1,1,NULL,NULL),(11,'G9',130000,'','2025-08-02',1,7,NULL,NULL),(12,'E11',70000,'','2025-08-03',1,1,NULL,NULL),(13,'C9',100000,'','2025-08-03',1,1,NULL,NULL),(14,'F7',70000,'','2025-08-06',1,19,NULL,NULL),(15,'E8',70000,'','2025-08-06',8,1,NULL,NULL),(16,'G11',130000,'','2025-08-07',12,1,NULL,NULL),(17,'E10',70000,'','2025-08-07',13,1,NULL,NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  PRIMARY KEY (`cartid`),
  KEY `fk_movie3_id` (`movie_id`),
  KEY `fk_user3_id` (`user_id`),
  CONSTRAINT `fk_movie3_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  CONSTRAINT `fk_user3_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_like` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user5_id` (`user_id`),
  CONSTRAINT `fk_user5_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentid` int NOT NULL AUTO_INCREMENT,
  `movie_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `review_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `point` int NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `theater_id` int DEFAULT NULL,
  PRIMARY KEY (`commentid`),
  KEY `fk_movie4_id` (`movie_id`),
  KEY `fk_user4_id` (`user_id`),
  KEY `FKq3avlei33gj22ytokiu45nseb` (`theater_id`),
  CONSTRAINT `fk_movie4_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  CONSTRAINT `fk_user4_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKq3avlei33gj22ytokiu45nseb` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalid_token`
--

DROP TABLE IF EXISTS `invalid_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalid_token` (
  `token_id` varchar(255) NOT NULL,
  `expired_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalid_token`
--

LOCK TABLES `invalid_token` WRITE;
/*!40000 ALTER TABLE `invalid_token` DISABLE KEYS */;
INSERT INTO `invalid_token` VALUES ('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYmIiLCJleHAiOjE3NTM1MjUyNDgsImlhdCI6MTc1MzUyMTY0OCwic2NvcGUiOiJDdXN0b21lciJ9.WMGW9JF97STa53ujR2o91SL2Jk-VVjTtcx6PlOwGx6-AIyaZFJDRfCbaU3ijaDMRgaNi1gSzD2pU9A0JwhNK_w','2025-07-26 10:20:48.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYmIiLCJleHAiOjE3NTM5NDM0OTQsImlhdCI6MTc1MzkzOTg5NCwic2NvcGUiOiJDdXN0b21lciJ9.ujVc-8rDyGahgOx_LhDqH4WiDq6ynQHhmz2-EBn5c5-GIAjnYv3R5VCGggPQmIECc4jPqH3Hb5prFeuhZ_q6kQ','2025-07-31 06:31:34.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYmIiLCJleHAiOjE3NTM5Njk4MTMsImlhdCI6MTc1Mzk2NjIxMywic2NvcGUiOiJDdXN0b21lciJ9.T2rZ079aYUGC7H1jEMNM0lBQfey2rOmMkDz1xL1gi61eAEVcUQj7RGaFLGpdyVToB6j1pwC-Uacm8JS5h3lGjA','2025-07-31 13:50:13.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYmIiLCJleHAiOjE3NTM5NTYwNzAsImlhdCI6MTc1Mzk1MjQ3MCwic2NvcGUiOiJDdXN0b21lciJ9.Fm1hIoExNRzl8-LZpVdUHH73eh4v-mYo_sSdAuhy4kJnDmpQFOqLJZf5VjiRaqwtvXhDo4NZH7iByMPBM-CFIg','2025-07-31 10:01:10.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYmIiLCJleHAiOjE3NTM5NzY4MjAsImlhdCI6MTc1Mzk3MzIyMCwic2NvcGUiOiJDdXN0b21lciJ9.rWTp7eV8XkUfcLPJe1kszup5TgNxczvn58IS0X5xl51F_iWztpxBT4xt4FKjk6YJLKcrOJ-annLqIJmS3jLI3w','2025-07-31 15:47:00.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjMyNDQsImlhdCI6MTc1MzUxOTY0NCwic2NvcGUiOiJDdXN0b21lciJ9.4R3uM66wR05lqZqqetqZQoftBwyT1hi6sL5JHRIBNhvcuPxk6RbFRtPu_tNgPEBKyo7pjEg7oVGo_jCXPjqIVw','2025-07-26 09:47:24.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjMzOTcsImlhdCI6MTc1MzUxOTc5Nywic2NvcGUiOiJDdXN0b21lciJ9.ZT_Cwp8Fe-8hcAAIs9-t3GJU4CM_VLZe1k15-2yPDDupSaxQy361mQXAwOL7Y8laNXppe4KcE4WSG3LTy6b_OA','2025-07-26 09:49:57.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjQ1MjAsImlhdCI6MTc1MzUyMDkyMCwic2NvcGUiOiJDdXN0b21lciJ9.qip_-xIccpmyFPt1XPZXLLlIdayeSkFmgpfAwMcOz4XkpXKdzcGhCnD6pc76oKkel7PI0rkqtyKgSvf0tOIlZA','2025-07-26 10:08:40.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjQ2MDcsImlhdCI6MTc1MzUyMTAwNywic2NvcGUiOiJDdXN0b21lciJ9.k06M_PcyTfEjaOwIbMxeQJvvccDMYErJL8wyCLKVMqfK-YteVrbjR8Ms7qn71urX9utmzYT578C9m700mNo1SA','2025-07-26 10:10:07.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjQwNzEsImlhdCI6MTc1MzUyMDQ3MSwic2NvcGUiOiJDdXN0b21lciJ9.rJOnQsegpSpS0HWaadmQgHPc4zciD1RM4KWqpig6WrHkrU9SneZZXrv0VlVY9oMmR19hNTpYgKknfkiojC9g-Q','2025-07-26 10:01:11.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjQyMjksImlhdCI6MTc1MzUyMDYyOSwic2NvcGUiOiJDdXN0b21lciJ9.o0vQRX5s9FLKejLa0k3J88V8asDa9AbPdkK6IbCf05qxIxRTt_iYLI88_W0C5qNmxgAyLayB2mjaSv0QqbRsUg','2025-07-26 10:03:49.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjQyNDEsImlhdCI6MTc1MzUyMDY0MSwic2NvcGUiOiJDdXN0b21lciJ9.H7aJWeKcPO_fkEY08GZh86-UzcdmCU9qFoZrz06eK6c1EKItt6JXGvbAis7E3azuM8WupI6jhrViebUCiBGntQ','2025-07-26 10:04:01.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjUxMzMsImlhdCI6MTc1MzUyMTUzMywic2NvcGUiOiJDdXN0b21lciJ9.E7ep1ren4dbMxEnMgL2QTjetU3fLlh3TdrZuIZl32Yq3whHhupnDRK3-eFtijwATIchJCJVEpV_ntVLicbH0iQ','2025-07-26 10:18:53.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjYzMDQsImlhdCI6MTc1MzUyMjcwNCwic2NvcGUiOiJDdXN0b21lciJ9.88su93vHR2uJEKiCIWmi16oXFCjkv4lBSrQj0woIH7suZFdE1xHtSpsMA8e9XJ3Mvu0a88AJpAeNI0MoFnYb0A','2025-07-26 10:38:24.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1MjYzMTIsImlhdCI6MTc1MzUyMjcxMiwic2NvcGUiOiJDdXN0b21lciJ9.zqV5S6Kl07-dOqr4A60gD3UVRwXkgQNM9M6sQUZ9qk1dPHYo7N6ZY-KFuK5JTSVeBcLVsfgi3vt1ma7QyTwDQA','2025-07-26 10:38:32.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM1NTA1NjYsImlhdCI6MTc1MzU0Njk2Niwic2NvcGUiOiJDdXN0b21lciJ9.t9HprAJoRiM-dvRnDaOkng3qHrATbS9vHcsLNPXTcYO95yA7m-iqdBe5TQiTN7SQkTzaw6g7jqnb_nrUszVBlw','2025-07-26 17:22:46.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5Mzg1OTksImlhdCI6MTc1MzkzNDk5OSwic2NvcGUiOiJDdXN0b21lciJ9.bGeRNkJi9M99DLiv_FcHLZHpv9By_j563ngXoDx6FhBdUPDGY9JnHda8ivcGWI54Dn5Pssfm0hKHd8IaPb_1ww','2025-07-31 05:09:59.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5MzkxNTksImlhdCI6MTc1MzkzNTU1OSwic2NvcGUiOiJDdXN0b21lciJ9.aVIIu1iSoImrIhm9glMG0yJ3RLmu28zdYkjtd0E8USVLE4jfxUGvlBMzV3BAUwpaoFokdNS4JkgvhibHA3FTBA','2025-07-31 05:19:19.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NDMwMjcsImlhdCI6MTc1MzkzOTQyNywic2NvcGUiOiJDdXN0b21lciJ9.sQBveYpfd1F4PDMiemHX_3_QrYTJvRsTSju5jvrx-ed6tW5HsNoU5g_vSpWIB6gmWAlIjyHqUCoZ8dpAyUpDzw','2025-07-31 06:23:47.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NjAwMTcsImlhdCI6MTc1Mzk1NjQxNywic2NvcGUiOiJDdXN0b21lciJ9.UA9fV-TDfKczPDtuS3KYntQIHzvFVaqkeZD4Qr2xCdU6xLKDesiBjficPyac0OcWEPOcMHKNnzrX2IA1M_ORaQ','2025-07-31 11:06:57.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NjEzODYsImlhdCI6MTc1Mzk1Nzc4Niwic2NvcGUiOiJDdXN0b21lciJ9.XGn9NjGuuzpV1zLpDUitjlIeDpyerX3gCviZuamMaV26Bw91JD-JKZ2SvXTm4wmMfNM9wLW1yKIPGPcLpM9juQ','2025-07-31 11:29:46.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NjgxNTMsImlhdCI6MTc1Mzk2NDU1Mywic2NvcGUiOiJDdXN0b21lciJ9.CU5U-g3g8VdPo-gNjxuNzB_RyvkzJpGjSZg-caayoB8Nk-4FAwYErcaymzveJfzfvQcfJq40fe9tKTakRgFS3w','2025-07-31 13:22:33.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTc4MzksImlhdCI6MTc1Mzk1NDIzOSwic2NvcGUiOiJDdXN0b21lciJ9.3a6J9dy70PxcVOZTMAQn0QBc9rY_ExQ5xcipYO6NVlxeirqHsmOJzYFhDy_AvZewBG5QD7y-EnSV7ssCNwmTsA','2025-07-31 10:30:39.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTcyNjIsImlhdCI6MTc1Mzk1MzY2Miwic2NvcGUiOiJDdXN0b21lciJ9.F3R2966dfm39a0Mrvok2r1bJP9Ct0BbPjr0xppRWwTvqpm6MEGZROHwSVVesK189mf0gbQBWIFejEPjMHC78zg','2025-07-31 10:21:02.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTg5MzQsImlhdCI6MTc1Mzk1NTMzNCwic2NvcGUiOiJDdXN0b21lciJ9.ypyEZji0i6p3GP4-c-2uceSp8DS2c2nHAj8P1r7WM28A1tNXRlk5hY5hZ5326Ll1JSA4eNTWNaYIgxF5yS90tA','2025-07-31 10:48:54.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTgxNjcsImlhdCI6MTc1Mzk1NDU2Nywic2NvcGUiOiJDdXN0b21lciJ9.KTCSEH42HjDnzxD_ehZeorbjIIXja7ccBV-_uXiXI-v5EC4poWogsfbG38O1vllFT6RAIQsV-NCU95XYpBtnCw','2025-07-31 10:36:07.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTk1MTYsImlhdCI6MTc1Mzk1NTkxNiwic2NvcGUiOiJDdXN0b21lciJ9.NoJG--Rur775hgPyz02ytn8g5F9PP97oHqwebuCUMx33QbY1zIqpPigVcLPX7Q_bUfxEN_VN8Zqq5cnUG0TJPQ','2025-07-31 10:58:36.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTk3NTEsImlhdCI6MTc1Mzk1NjE1MSwic2NvcGUiOiJDdXN0b21lciJ9.OKbygFpy1TJFqoDbiNTNtJ9KwOYhWVLDoDGC9qljIXZgLjMvcOKp7nNDbTa_SbE1FhOV3tI-IQB9IPBsk1QAjA','2025-07-31 11:02:31.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTQ3ODcsImlhdCI6MTc1Mzk1MTE4Nywic2NvcGUiOiJDdXN0b21lciJ9.EPJir_aIKS5A1zyJkMB_EkStzAbwbGES-olUMf4i6oo5G92z52lJTNjARrzx9SOcF0Bx_9gH2aa6p_eovXNSkA','2025-07-31 09:39:47.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTU1OTksImlhdCI6MTc1Mzk1MTk5OSwic2NvcGUiOiJDdXN0b21lciJ9.Lz3kyZeTd29hg6wfham8w-IPlA7-FbWtJCg-_l6f_Ue0rHAL5q7vBmfRlVbq70wZGO3-QJbJeN0f9RFZyoR0gg','2025-07-31 09:53:19.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTU2MzcsImlhdCI6MTc1Mzk1MjAzNywic2NvcGUiOiJDdXN0b21lciJ9.25yiQwyVK9Ro1TfPIN5iQrrrnr1VmQhZ-zjMJJsSCf6WmU1YgYeJPRBoSo6We8RSunL4cakRn7QY2ENJjLxOcw','2025-07-31 09:53:57.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTU3ODcsImlhdCI6MTc1Mzk1MjE4Nywic2NvcGUiOiJDdXN0b21lciJ9.wjP_ge7TLhqh2TXpPiYE07T1WAXQwJaAImoXFuCwJlaT3g6JIFNB3IqShYPzy17k547kLAULA4JzVo4Roixh0Q','2025-07-31 09:56:27.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTU5NTcsImlhdCI6MTc1Mzk1MjM1Nywic2NvcGUiOiJDdXN0b21lciJ9.5Kx3SW5N-i4umnzIGfNzm7GbgMIFJ0m2iQurZt48xh3JRP-lO10wlebEt3fwVOyLrQ1DgZLg_NPT_-a3bzQLpQ','2025-07-31 09:59:17.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NTUwNjksImlhdCI6MTc1Mzk1MTQ2OSwic2NvcGUiOiJDdXN0b21lciJ9.Rr3QUUnFvykNVjFltlmIvw8l5M6DLNLja8b7XAQeRMa4laZ49Ut-qmUCVpzvNUcqqLsNFDWRaofnpEaYsxN-dg','2025-07-31 09:44:29.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5NzY3ODUsImlhdCI6MTc1Mzk3MzE4NSwic2NvcGUiOiJDdXN0b21lciJ9.OunQjVEHCLxUK33AK038CZAnMk-dojQo_-wURLIVv-HnZs_R-le4D2NVjzr0cLRuDv6kT2bBPe69x7lzjbK8zw','2025-07-31 15:46:25.000000'),('eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJCZXRhQ2luZXBsZXguY29tIiwic3ViIjoiYWEiLCJleHAiOjE3NTM5ODAyNTcsImlhdCI6MTc1Mzk3NjY1Nywic2NvcGUiOiJDdXN0b21lciJ9.BcOtyo0bbl_Ftq7trY6HhsCQhYFd3QGfBniXfUAklINugPVPo4udnJtYSVqyRf66GYDk8uba_J2H43qlC5DmTA','2025-07-31 16:44:17.000000');
/*!40000 ALTER TABLE `invalid_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `movie_name` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `cast` varchar(255) DEFAULT NULL,
  `description` text,
  `genre` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `release_date` date NOT NULL,
  `showing` varchar(255) NOT NULL,
  `date_show` int DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753524500/nlsxecyvabqnfswa9fej.jpg','https://www.youtube.com/embed/BGS4l3xEc-0&t=4s','Con Nít Quỷ','Sidharta Tata','Khalid Kashogi, Bayu Kurnia Prasetya, Sidharta Tata','Hai mươi năm sau thảm kịch Jatijajar, ác quỷ Ummu Sibyan một lần nữa trỗi dậy, \nlần này gieo rắc nỗi kinh hoàng tại làng Giritirto. Sau một trận bóng đá, \ntám đứa trẻ thua cuộc buông lời nguyền rủa trong cơn giận dữ. Không ai ngờ, \nchính lời nói vu vơ ấy đã đánh thức một thế lực tà ác bị chôn vùi từ quá khứ. \nKhi bóng đêm phủ xuống rừng sâu, một đứa trẻ mất tích bí ẩn. Từ đó, cuộc săn đuổi \nbắt đầu—điên loạn, nghẹt thở và không lối thoát.','Kinh dị','105 phút','2025-07-18','Đang chiếu',30),(2,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753524783/ujj2yel1xmer2w0khysc.jpg','https://www.youtube.com/embed/lo0X86UxPNY','Ma Xưởng Mía','Awi Suryadi','Arbani Yasiz, Ersya Aurelia, Erika Carlina','Để trang trải nợ nần, Endah cùng nhóm bạn thân phải đến làm việc thời vụ tại một nhà máy sản xuất đường mía ở vùng Java hẻo lánh. Tất cả những người công nhân làm việc ở đây đều phải tuân theo quy định giờ giới nghiêm, không được tự do ra ngoài vào ban đêm và luôn có bảo vệ canh giữ. Trong một đêm lẻn ra ngoài, Endah vô tình chứng kiến nghi lễ kỳ lạ làm trỗi dậy loài quỷ dữ. Kể từ đó, những sự kiện rùng rợn liên tiếp xảy ra trong xưởng mía khiến ai cũng có thể trở thành vật tế tiếp theo. Để giữ được mạng sống, Endah và nhóm bạn buộc phải khám phá bí mật đen tối ẩn sâu bên trong xưởng mía và bước vào trận chiến với thế lực vô hình có sức mạnh vô biên.','Kinh dị','121 phút','2025-07-15','Đang chiếu',33),(3,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753524824/v89kctsaxba5bmncapt7.png','https://www.youtube.com/embed/nl1HxGkVOvU','Quỷ Ăn Hồn','Chad Archibald','Ashley Greene, Shawn Ashmore, Ellie O\'Brien','Sau khi tìm về ký ức tàn khốc và chứng kiến hàng loạt sự kiện tang thương, nhà ngoại cảm nổi tiếng Cynthia bất ngờ gặp tai ương sau khi tiếp nhận một khách hàng đặc biệt.','Kinh dị','102 phút','2025-07-25','Đang chiếu',33),(4,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753524898/jfks9cjgleeci6phevle.jpg','https://www.youtube.com/embed/AeSLZOBmZk8','Mang Mẹ Đi Bỏ','Mo Hong-jin','Hồng Đào, Tuấn Trần, Jung Il-woo, Juliet Bảo Ngọc, Quốc Khánh, Hải Triều, Lâm Vỹ Dạ, Vinh Râu','Mang Mẹ Đi Bỏ kể về số phận của Hoan (Tuấn Trần) - một chàng trai trẻ ngày ngày hóa thân thành “thằng hề đường phố” với ngón nghề cắt tóc vỉa hè để kiếm tiền lo cho mẹ. Mẹ Hoan là bà Lê Thị Hạnh (Hồng Đào), mắc bệnh Alzheimer và cư xử như một đứa trẻ con. Căn bệnh của mẹ không chỉ là gánh nặng mưu sinh, mà còn lấy đi của Hoan một cuộc đời tự do với những ước mơ chưa thể thực hiện. Một ngày, Hoan quyết định mang mẹ “đi bỏ” cho người anh trai ở Hàn Quốc, người mà chính Hoan còn không biết mặt mũi ra sao.','Tâm lý, Gia đình','113 phút','2025-08-18','Sắp chiếu',33),(5,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753529594/nb147wnacs5e7tpf2zux.jpg','https://www.youtube.com/embed/arH4X5tsKTQ','Phim Xì Trum','Chris Miller','Rihanna, James Corden, Nick Offerman, Natasha Lyonne, Amy Sedaris, Nick Kroll, Daniel Levy, Octavia Spencer,...','Câu chuyện trở lại với ngôi làng Xì Trum, nơi mà mỗi ngày đều là lễ hội. Bỗng một ngày, sự yên bình của ngôi làng bị phá vỡ khi Tí Vua bị bắt cóc một cách bí ẩn bởi hai phù thủy độc ác Gà Mên và Cà Mên. Từ đây, Tí Cô Nương phải dẫn dắt các Tí đi vào thế giới thực để giải cứu ông. Với sự giúp đỡ của những người bạn mới, các Tí sẽ bước vào cuộc phiêu lưu khám phá định mệnh của mình để cứu lấy vũ trụ.','Hoạt hình','92 phút','2025-07-18','Đang chiếu',50),(6,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753541777/ezr6xrqwsqrahfos6ass.jpg','https://www.youtube.com/embed/ZFx83vfbe8A','Toàn Trí Độc Giả','KIM Byung-woo','LEE Min-ho, AHN Hyo-seop, KIM Jisoo, CHAE Soo-bin, Nana, SHIN Seung-ho.','Khi thế giới diệt vong trong cuốn tiểu thuyết yêu thích bỗng biến thành hiện thực, Kim Dokja (Ahn Hyo-seop) - 1 nhân viên văn phòng bình thường cũng là người duy nhất biết được kết truyện phải bắt tay vào cuộc hành trình đến phân cảnh cuối cùng. Cùng những đồng đội ngẫu nhiên và người hùng Yu Jeong-hyeok (Lee Min-ho) tập hợp thành 1 nhóm, Kim Dokja cần vượt qua mọi thử thách để sống sót trong thế giới bộ truyện mà anh yêu thích.','Hành động','116 phút','2025-08-18','Sắp chiếu',50),(7,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753541940/iz3hpmj31fdqqcsx3ytn.jpg','https://www.youtube.com/embed/cPIm-yAG59Y','Mùa Hè Kinh Hãi','Jim Gillespie','Jennifer Love Hewitt, Sarah Michelle Gellar, Anne Heche','Bốn người bạn trẻ bị ràng buộc bởi một tai nạn thương tâm đã đoàn tụ khi họ phát hiện mình bị một tên điên cuồng cầm móc rình rập tại thị trấn nhỏ ven biển của họ.','Kinh dị, Tội Phạm','111 phút','2025-07-18','Đang chiếu',50),(8,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753542060/suro9qgnfp6umuetyfub.jpg','https://www.youtube.com/embed/Pf6V-7GvdUQ','Thế Giới Khủng Long: Tái Sinh','Gareth Edwards','Scarlett Johansson, Mahershala Ali, Jonathan Baile','Thế Giới Khủng Long: Tái Sinh lấy bối cảnh 5 năm sau phần phim Thế Giới Khủng Long: Lãnh Địa, môi trường Trái đất đã chứng tỏ phần lớn là không phù hợp với khủng long. Nhiều loài thằn lằn tiền sử được tái sinh đã chết. Những con chưa chết đã rút lui đến một vùng nhiệt đới hẻo lánh gần phòng thí nghiệm. Địa điểm đó chính là nơi bộ ba Scarlett Johansson, Mahershala Ali và Jonathan Bailey dấn thân vào một nhiệm vụ cực kỳ hiểm nguy.','Hành động, Phiêu lưu','134 phút','2025-07-04','Đang chiếu',50),(9,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753544232/de0ey2jpgyi1yyweacrt.png','https://www.youtube.com/embed/KHfU57tzFjk','Bộ Tứ Siêu Đẳng','Matt Shakman','Pedro Pascal, Vanessa Kirby, Joseph Quinn','Buộc phải cân bằng giữa vai trò anh hùng với sức mạnh của mối quan hệ gia đình, Fantastic Four phải bảo vệ Trái Đất khỏi vị thần không gian hung dữ tên là Galactus và sứ giả bí ẩn của hắn, Silver Surfer.','Hành động, Phiêu lưu','115 phút','2025-07-25','Đang chiếu',50),(10,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753544339/ry3vao3zbua2fzewoduy.png','https://www.youtube.com/embed/HRixBa8pDi8','Kaiju No. 8: Nhiệm Vụ Trinh Sát','Tomomi Kamiya, Shigeyuki Miya','Pedro Pascal, Vanessa Kirby, Joseph Quinn','\"Kaiju No. 8: Mission Recon\" là một phần ngoại truyện của bộ manga \"Kaiju No. 8\" (Kaijuu 8-gou). Câu chuyện tập trung vào Kafka Hibino, người có khả năng biến hình thành quái vật (Kaiju) và phải giữ bí mật về năng lực này khi gia nhập Lực lượng Phòng vệ Nhật Bản, một tổ chức chuyên tiêu diệt quái vật. Nhiệm vụ của anh là vừa chiến đấu với quái vật, vừa che giấu thân phận thực sự của mình.','Hành động','120 phút','2025-07-25','Đang chiếu',50),(11,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753544436/ongarnfqjajtizkexyxl.png','https://www.youtube.com/embed/4KHtGy6-nxk','Thanh Gươm Diệt Quỷ: Vô Hạn Thành','Haruo Sotozaki','Natsuki Hanae, Saori Hayami, Yoshitsugu Matsuoka','\"Kaiju No. 8: Mission Recon\" là một phần ngoại truyện của bộ manga \"Kaiju No. 8\" (Kaijuu 8-gou). Câu chuyện tập trung vào Kafka Hibino, người có khả năng biến hình thành quái vật (Kaiju) và phải giữ bí mật về năng lực này khi gia nhập Lực lượng Phòng vệ Nhật Bản, một tổ chức chuyên tiêu diệt quái vật. Nhiệm vụ của anh là vừa chiến đấu với quái vật, vừa che giấu thân phận thực sự của mình.','Hành động, Hoạt hình','150 phút','2025-08-15','Sắp chiếu',50),(12,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753544571/wugxvpis2503q55kvvcs.jpg','https://www.youtube.com/embed/R_EQMOPbm8A','Làm giàu với ma 2','Trung Lùn','NSƯT Hoài Linh, Tuấn Trần, Diệp Bảo Ngọc, Võ Tấn Phát, Ngọc Xuân','Hành trình đầy bi hài của 5 con người với những toan tính khác nhau nhằm đưa thi thể minh tinh Anh Thư (Ngọc Xuân) về quê nhà, đổi lại, hồn ma của cô hứa sẽ trả cho họ chiếc nhẫn kim cương trị giá 9 tỷ. Ai sẽ là người giành được phần thưởng, hay chuyến đi sẽ bộc lộ phần xấu xa nhất bên trong họ?','Hài hước, Hành động','100 phút','2025-09-02','Sắp chiếu',18),(13,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753544734/umqe98nguvhowud03qdi.jpg','https://www.youtube.com/embed/oPg5Nhdy4H4','Tiếng ồn quỷ dị','Kim Soo-Jin','Lee Sun-bin, Han Soo-a, Kim Min-Seok','Sau khi dọn vào căn hộ mới, hai chị em Joo-Young (Lee Sun-Bin) và Joo-Hee (Han Su-A) liên tục bị quấy nhiễu bởi những tiếng động kỳ quái phát ra từ giữa các tầng – thứ âm thanh âm ỉ, vặn vẹo như thể có ai đó… hoặc thứ gì đó đang sống giữa các bức tường. Rồi một ngày, Joo-Hee biến mất không dấu vết. Joo-Young cùng bạn trai của em gái lao vào cuộc truy tìm trong vô vọng – khi càng đào sâu, họ càng tiến gần đến một bí mật đen tối bị chôn vùi sau những bức tường cách âm. Cùng lúc đó, người đàn ông sống tầng dưới cũng bị tra tấn bởi chính thứ âm thanh đó — và tin rằng, con quái vật nằm ngay trong căn hộ của hai chị em.','Hồi hộp, Kinh Dị','94 phút','2025-07-18','Đang chiếu',40),(14,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753545028/symvfeb9t9vuaxrumvlx.jpg','https://www.youtube.com/embed/GHwhgxthTFI','Họng súng vô hình','Akiva Schaffer','Liam Neeson, Pamela Anderson, Paul Walter Hauser, CCH Pounder, Kevin Durand,Cody Rhodes, Liza Koshy, Eddie Yu, with Danny Huston.','Chỉ có một người đàn ông sở hữu bộ kỹ năng đặc biệt... để lãnh đạo Đội Cảnh sát và cứu thế giới! Trung úy Frank Drebin Jr. (do Liam Neeson thủ vai) nối tiếp bước cha mình trong Họng Súng Vô Hình, do Akiva Schaffer đạo diễn và Seth MacFarlane đảm nhận vai trò sản xuất. Tham gia vụ án này còn có dàn diễn viên Pamela Anderson, Paul Walter Hauser, CCH Pounder, Kevin Durand, Cody Rhodes, Liza Koshy, Eddie Yu, cùng Danny Huston.','Hài, Hành Động','85 phút','2025-08-18','Sắp chiếu',22),(15,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753545337/no1cmuhrjcpr52heywjw.jpg','https://www.youtube.com/embed/bLbz8w-rwis','Ma lòng thòng','Chiska Doppert','Andrew Barret, Bulan Sofya, Michael Russel, Annisa Aurela, Adelia','Sau khi nhận tin cha qua đời tại làng Kidul, Ryan quyết trở về chịu tang dù bị mẹ – bà Marlina, kiên quyết ngăn cản. Anh cùng Alana, Ben và Elsa lên đường, không ngờ đang bước vào một nơi bị nguyền rủa. Ngôi làng bị ám bởi Pulung Gantung – bóng ma rình rập trong đêm, gieo rắc lời nguyền khiến người sống dần mất kiểm soát và tự treo cổ kết liễu đời mình. Khi chuẩn bị rời khỏi nơi quái dị này, Alana – bạn gái của Ryan, bất ngờ bị thế lực hắc ám chiếm giữ. Ryan, Ben và Elsa buộc phải bước vào cuộc chiến nghẹt thở giữa ranh giới của sự sống, cái chết và bóng tối ma mị để giành lại Alana trước khi quá muộn.','Kinh Dị','99 phút','2025-08-17','Sắp chiếu',22),(16,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753719271/aoe880qxelysqijky6nx.jpg','https://www.youtube.com/embed/rvOaNwwDVZk','Bí kíp luyện rồng','Dean DeBlois','Mason Thames, Nico Parker, Gerard Butler','Câu chuyện về một chàng trai trẻ với ước mơ trở thành thợ săn rồng, nhưng định mệnh lại đưa đẩy anh đến tình bạn bất ngờ với một chú rồng.','Hài, Hành Động, Phiêu Lưu, Thần thoại','126 phút','2025-06-15','Đang chiếu',100),(17,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753719479/q4ap9y29x9tmdu3ujqqr.jpg','https://www.youtube.com/embed/qPih-Q4CZZ0','Điều ước cuối cùng','Đoàn Sĩ Nguyên','Avin Lu, Lý Hạo Mạnh Quỳnh, Hoàng Hà, Tiến Luật, Đinh Y Nhung, Quốc Cường, Kiều Anh, Katleen Phan Võ, Hoàng Minh Triết và cùng một số diễn viên khác','Biết mình không còn sống được bao lâu vì căn bệnh ALS, Hoàng tâm sự với hai người bạn thân – Thy và Long – về tâm nguyện cuối cùng: được “mất zin” trước khi chết. Hành trình giúp Hoàng thực hiện điều ước ấy đưa họ qua những tình huống dở khóc dở cười, đồng thời thử thách tình bạn, tình thân và ý nghĩa của tình yêu thương vô điều kiện.','Gia đình, Hài','114 phút','2025-07-04','Đang chiếu',42),(18,'https://res.cloudinary.com/dctstgdxn/image/upload/v1753719627/bgwbxj6mmymbxz0zso46.jpg','https://www.youtube.com/embed/C_Y2nNESqSo','Một nửa hoàn hảo','Celine Song','Dakota Johnson, Chris Evans, Pedro Pascal','Lucy (Dakota Johnson), một cô gái xinh đẹp làm công việc mai mối ở New York. “Mát tay” trong chuyện mai mối giúp người khác, nhưng trớ trêu Lucy lại “lạc lối” trong câu chuyện tình cảm của chính mình. Bất ngờ đối mặt với ngã rẽ tình cảm khi gặp lại người yêu cũ \"không hoàn hảo\" (Chris Evans) và một người đàn ông \"hoàn hảo\" (Pedro Pascal). Cô nàng bị đẩy vào tình thế khó xử. Đứng giữa những lựa chọn cảm xúc đầy mâu thuẫn, lúc này đây, Lucy mới nhận ra việc tìm kiếm tình yêu đích thực chưa bao giờ là điều dễ dàng','Hài, Tâm Lý, Tình cảm','117 phút','2025-07-04','Đang chiếu',52);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `ranking_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`ranking_id`),
  KEY `fk_movie2_id` (`movie_id`),
  CONSTRAINT `fk_movie2_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `point` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `fk_movie1_id` (`movie_id`),
  KEY `fk_user1_id` (`user_id`),
  CONSTRAINT `fk_movie1_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  CONSTRAINT `fk_user1_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,5,'2025-08-06 05:11:07','2025-08-06 05:56:23',1,1),(2,4,'2025-08-06 07:07:33','2025-08-06 07:43:01',1,5),(3,5,'2025-08-06 07:20:22','2025-08-06 07:20:22',1,7),(4,4,'2025-08-06 08:00:51','2025-08-06 08:00:51',2,1),(5,4,'2025-08-06 08:31:50','2025-08-06 08:31:50',2,10),(6,4,'2025-08-06 08:32:03','2025-08-06 08:32:03',2,16),(7,5,'2025-08-06 09:02:25','2025-08-06 09:02:25',2,5),(8,5,'2025-08-07 03:31:16','2025-08-07 03:31:16',12,2),(9,4,'2025-08-07 03:50:27','2025-08-07 03:50:27',13,2);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `theater_id` int DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `fk_theater_id_idx` (`theater_id`),
  CONSTRAINT `fk_theater_id` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Room A1',1),(2,'Room A2',2),(3,'Room A3',3),(4,'Room A4',4),(5,'Room A5',5),(6,'Room A6',6),(7,'Room A7',7),(8,'Room A8',8),(9,'Room A9',9),(10,'Room A10',10),(11,'Room B1',1),(12,'Room B2',2),(13,'Room B3',3),(14,'Room B4',4),(15,'Room B5',5),(16,'Room B6',6),(17,'Room B7',7),(18,'Room B8',8),(19,'Room B9',9),(20,'Room B10',10);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_time`
--

DROP TABLE IF EXISTS `show_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_time` (
  `showtime_id` int NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `movie_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `fk_movie_id_idx` (`movie_id`),
  KEY `fk_room_id_idx` (`room_id`),
  CONSTRAINT `fk_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  CONSTRAINT `fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show_time`
--

LOCK TABLES `show_time` WRITE;
/*!40000 ALTER TABLE `show_time` DISABLE KEYS */;
INSERT INTO `show_time` VALUES (1,'09:00:00',1,1),(2,'11:30:00',2,1),(3,'14:00:00',3,1),(4,'10:00:00',4,2),(5,'12:30:00',5,2),(6,'15:00:00',6,2),(7,'09:00:00',7,3),(8,'11:30:00',8,3),(9,'14:00:00',9,3),(10,'10:00:00',10,4),(11,'12:30:00',11,4),(12,'15:00:00',12,4),(13,'09:00:00',13,5),(14,'11:30:00',14,5),(15,'14:00:00',15,5),(16,'10:00:00',16,6),(17,'12:30:00',17,6),(18,'15:00:00',18,6),(19,'11:00:00',1,7),(20,'13:00:00',1,8),(21,'14:30:00',1,9);
/*!40000 ALTER TABLE `show_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theaters`
--

DROP TABLE IF EXISTS `theaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theaters` (
  `theater_id` int NOT NULL AUTO_INCREMENT,
  `theater_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`theater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theaters`
--

LOCK TABLES `theaters` WRITE;
/*!40000 ALTER TABLE `theaters` DISABLE KEYS */;
INSERT INTO `theaters` VALUES (1,'Beta Cineplex Hà Nội','Hà Nội'),(2,'CGV Vincom Bà Triệu','Hà Nội'),(3,'Galaxy Nguyễn Du','TP.HCM'),(4,'Lotte Cinema Cộng Hòa','TP.HCM'),(5,'CGV AEON Bình Tân','TP.HCM'),(6,'Beta Thanh Xuân','Hà Nội'),(7,'Lotte Cinema Đà Nẵng','Đà Nẵng'),(8,'CGV Vincom Đà Nẵng','Đà Nẵng'),(9,'BHD Star Bitexco','TP.HCM'),(10,'Rạp phim Quốc Gia','Hà Nội');
/*!40000 ALTER TABLE `theaters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `membership` varchar(50) NOT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `expired` int DEFAULT NULL,
  `role` enum('ADMINISTRATOR','CUSTOMER','MANAGER') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aa','asd@gmail.com','0123456789','$2a$10$e7x4qGWC0UxHxY1WSHxzO.RVvjqGEU/qDcVeORbglgRjNYTyiLRDy','Nam','2025-07-31','Tiếng Việt','vip tháng','2025-08-06 07:52:05',30,'CUSTOMER'),(2,'bb','dt123@gmail.com','0123456789','$2a$10$nR5UHSHJh4ijtXJXckFK.eVbwIwmFWM9oUBIs/3WN7uzaYUHvPiB6','Nữ',NULL,'Tiếng Pháp','vip tháng','2025-08-06 07:52:05',30,'CUSTOMER'),(8,'cc','dt123@gmail.com','0123456789','$2a$10$ivmlU5DLw33sj1tae2mXFudLtuYpisn83nLJ4i.Avzd95AefVHgGe','Nam',NULL,'Tiếng Anh','vip năm','2025-08-06 07:52:05',365,'CUSTOMER'),(9,'dd','yoyo2@gmail.com','0774303567','$2a$10$V8YUS2ATsyq8joVCJ5M4Z.t.5.pjUcAtiI7mmp7E/Lg50zdtoJKqu',NULL,NULL,NULL,'vip tháng','2025-08-06 07:52:05',30,'CUSTOMER'),(10,'ee','dt123@gmail.com','0123456789','$2a$10$j5IKJ.1FNi6pgcuCvpM1dusOB6TI2ymf4fdqeRlkqP7DtBGjcd6yy',NULL,NULL,NULL,'no membership',NULL,NULL,'CUSTOMER'),(11,'gg','dt123@gmail.com','0774303567','$2a$10$FyWE1azNh0ZgVyDloG3mL.763vcKtJWqUyDX2F72mT4iEiY/9qsEW',NULL,NULL,NULL,'no membership',NULL,NULL,'CUSTOMER'),(12,'kk','dt123@gmail.com','0123456789','$2a$10$m35FxleA9f0NtG197yt02.IyIou9AwP4lmyZvC2JnlG7SeX4KmBJy','Nam',NULL,'Tiếng Việt','no membership',NULL,NULL,'CUSTOMER'),(13,'pp','vcl@gmail.com','0774303567','$2a$10$7g9lcw1FUVaPoa5iBiV35ubm0880fG3y0QwWbpTOZeQox27ONyO/i',NULL,NULL,NULL,'no membership',NULL,NULL,'CUSTOMER');
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

-- Dump completed on 2025-08-07 12:14:29
