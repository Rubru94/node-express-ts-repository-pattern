
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         mysql:8.0 - docker official image
-- SO del servidor:              linux - amd64
-- --------------------------------------------------------

-- Volcando estructura de base de datos para KodotiWallet
CREATE DATABASE IF NOT EXISTS `KodotiWallet` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `KodotiWallet`;

-- Volcando estructura para tabla KodotiWallet.AuthUser
CREATE TABLE IF NOT EXISTS `AuthUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  CONSTRAINT PK_AuthUser_id PRIMARY KEY (`id`),
  CONSTRAINT UQ_AuthUser_email UNIQUE (`email`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla KodotiWallet.WalletBalance
CREATE TABLE IF NOT EXISTS `WalletBalance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  CONSTRAINT PK_WalletBalance_id PRIMARY KEY (`id`),
  CONSTRAINT FK_WalletBalance_user_id_AuthUser_id FOREIGN KEY (`user_id`) REFERENCES AuthUser (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla KodotiWallet.WalletMovement
CREATE TABLE IF NOT EXISTS `WalletMovement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  CONSTRAINT PK_WalletMovement_id PRIMARY KEY (`id`),
  CONSTRAINT FK_WalletMovement_user_id_AuthUser_id FOREIGN KEY (`user_id`) REFERENCES AuthUser (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla KodotiWallet.WalletSubscription
CREATE TABLE IF NOT EXISTS `WalletSubscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `cron` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  CONSTRAINT PK_WalletSubscription_id PRIMARY KEY (id),
  CONSTRAINT FK_WalletSubscription_user_id_AuthUser_id FOREIGN KEY (`user_id`) REFERENCES AuthUser (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- Default user
INSERT INTO `AuthUser` (`email`, `password`, `created_at`, `updated_at`) VALUES
	('eduardo@kodoti.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', '2020-07-09 00:36:13', NULL);