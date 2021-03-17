CREATE DATABASE  IF NOT EXISTS `milid_analytics` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `milid_analytics`;

/* usefull if run when tables already exists */
SET FOREIGN_KEY_CHECKS=0;

/* events  
 */
DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id_event` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `module` int NOT NULL,
  `lesson` int NOT NULL,
  `state` int NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id_event`),
  UNIQUE KEY `id_event_UNIQUE` (`id_event`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


/* re enable foreign key constraint */
SET FOREIGN_KEY_CHECKS=1;

