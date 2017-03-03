LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `first_name`, `last_name`, `user_name`, `password`, `email`, `address`, `city`, `image`, `createdAt`, `updatedAt`)
VALUES
	(1,'Alejandro','Harb','aharb','pass','alejandroharb@gmail.com','4545 Louetta Rd, Apt 3601',NULL,'aharb.jpg','2017-02-28 19:11:08','2017-02-28 22:51:03'),
	(2,'David','Kolacny','dkolacny','pass','dkolacny@email.com','Montrose, Houston, Texas',NULL,'blank-person.png','2017-02-28 20:50:29','2017-02-28 20:50:29'),
	(3,'Cristhian','Harb','charb','pass','charb@gmail.com','3800 Atascocita Rd. Humble, Texas',NULL,'blank-person.png','2017-02-28 20:52:08','2017-02-28 20:52:08'),
	(4,'Jorge','Foster','jfoster','pass','foster@gmail.com','6th st. Houston, texas',NULL,'blank-person.png','2017-02-28 20:57:05','2017-02-28 20:57:05'),
	(5,'Daniel','Grossing','dgrossing','pass','dgross@gmail.com','242 W 19th St, Houston, TX 77008',NULL,'blank-person.png','2017-03-01 20:07:32','2017-03-01 20:07:32'),
	(6,'Colin','Caldwell','ccaldwell','pass','caldwell@gmail.com','1400 Shepherd Dr, Houston, TX 77007',NULL,'blank-person.png','2017-03-01 20:08:31','2017-03-01 20:08:31'),
	(7,'Stanley','Kindred','skindred','pass','kindred@email.com','501 Crawford St, Houston, TX 77002',NULL,'blank-person.png','2017-03-01 20:09:42','2017-03-01 20:09:42'),
	(8,'Mylan','Museum','mmuseum','pass','mus@email.com','1500 Binz St, Houston, TX 77004',NULL,'blank-person.png','2017-03-01 20:10:53','2017-03-01 20:10:53'),
	(9,'Hopper','Daddy','hdaddy','pass','daddy@email.com','River Oaks District, 4444 Westheimer Rd H100, Houston, TX 77027',NULL,'blank-person.png','2017-03-01 20:12:03','2017-03-01 20:12:03'),
	(10,'Cinthia','ElHage','celhage','pass','hage@gmail.com','Marq-E Entertainment Center, 7620 Katy Fwy #455, Houston, TX 77024',NULL,'blank-person.png','2017-03-01 20:13:47','2017-03-01 20:13:47'),
	(11,'Alfred','Ruiz','aruiz','pass','ruiz@gmail.com','Lazy Brook, 1732 W 18th St, Houston, TX 77008',NULL,'blank-person.png','2017-03-01 20:28:53','2017-03-01 20:28:53'),
	(12,'Alicia','Friend','afriend','pass','afriend@email.com','1641 Westheimer Rd # B, Houston, TX 77006',NULL,'blank-person.png','2017-03-01 20:30:19','2017-03-01 20:30:19'),
	(13,'Adrian','Coy','acoy','pass','acoy@email.com','5607 Morningside Dr, Houston, TX 77005',NULL,'blank-person.png','2017-03-01 20:31:24','2017-03-01 20:31:24'),
	(14,'Alex','stalin','astalin','pass','stalin@email.com','NRG Pkwy, Houston, TX 77054',NULL,'blank-person.png','2017-03-01 20:32:40','2017-03-01 20:32:40'),
	(15,'Aldo','Sanchez','asanchez','pass','aldo@email.com','4800 Calhoun Rd, Houston, TX 77004',NULL,'blank-person.png','2017-03-01 20:33:43','2017-03-01 20:33:43'),
	(16,'Carmen','Filler','cfiller','pass','cfiller@gmail.com','555 Community College Dr, Houston, TX 77013',NULL,'blank-person.png','2017-03-01 20:35:02','2017-03-01 20:35:02'),
	(17,'Dillon','Way','dway','pass','way@email.com','17350 North Fwy, Houston, TX 77090',NULL,'blank-person.png','2017-03-01 20:37:14','2017-03-01 20:37:14'),
	(18,'Fred','Mcdonald','fmcdonald','pass','mac@email.com','3203 FM 1960, Humble, TX 77338',NULL,'blank-person.png','2017-03-01 20:38:34','2017-03-01 20:38:34');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Golf` WRITE;
/*!40000 ALTER TABLE `Golf` DISABLE KEYS */;

INSERT INTO `Golf` (`id`, `user_name`, `year_experience`, `experience_rating`, `city`, `createdAt`, `updatedAt`, `UserId`)
VALUES
	(1,'aharb','5',2,'Spring','2017-02-28 19:32:40','2017-02-28 19:32:40',1),
	(2,'dkolacny','5',2,'Houston','2017-02-28 20:50:48','2017-02-28 20:50:48',2),
	(3,'charb','0',0,'Humble','2017-02-28 20:52:22','2017-02-28 20:52:22',3),
	(4,'jfoster','8',3,'Houston','2017-02-28 21:04:20','2017-02-28 21:04:20',4),
	(5,'dgrossing','3',1,'Houston','2017-03-01 20:07:47','2017-03-01 20:07:47',5),
	(6,'ccaldwell','8',2,'Houston','2017-03-01 20:08:50','2017-03-01 20:08:50',6),
	(7,'skindred','3',1,'Houston','2017-03-01 20:10:13','2017-03-01 20:10:13',7),
	(8,'mmuseum','7',3,'Houston','2017-03-01 20:11:05','2017-03-01 20:11:05',8),
	(9,'hdaddy','2',1,'Houston','2017-03-01 20:12:17','2017-03-01 20:12:17',9),
	(10,'celhage','0',0,'Houston','2017-03-01 20:14:00','2017-03-01 20:14:00',10),
	(11,'aruiz','2',1,'Houston','2017-03-01 20:29:26','2017-03-01 20:29:26',11),
	(12,'afriend','0',0,'Houston','2017-03-01 20:30:34','2017-03-01 20:30:34',12),
	(13,'acoy','2',1,'Houston','2017-03-01 20:31:43','2017-03-01 20:31:43',13),
	(14,'astalin','0',0,'Houston','2017-03-01 20:32:53','2017-03-01 20:32:53',14),
	(15,'asanchez','2',1,'Houston','2017-03-01 20:33:58','2017-03-01 20:33:58',15),
	(16,'cfiller','4',1,'Houston','2017-03-01 20:35:20','2017-03-01 20:35:20',16),
	(17,'fmcdonald','4',2,'Humble','2017-03-01 20:38:49','2017-03-01 20:38:49',18);

/*!40000 ALTER TABLE `Golf` ENABLE KEYS */;
UNLOCK TABLES;

