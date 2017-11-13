-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 13, 2017 lúc 04:46 PM
-- Phiên bản máy phục vụ: 10.1.21-MariaDB
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sale3`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalog`
--

CREATE TABLE `catalog` (
  `id` bigint(20) NOT NULL,
  `code` char(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL,
  `id_customer` bigint(20) DEFAULT NULL,
  `content` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass_word` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DATABASECHANGELOG`
--

CREATE TABLE `DATABASECHANGELOG` (
  `ID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `AUTHOR` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FILENAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MD5SUM` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `COMMENTS` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TAG` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LIQUIBASE` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CONTEXTS` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LABELS` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `DATABASECHANGELOG`
--

INSERT INTO `DATABASECHANGELOG` (`ID`, `AUTHOR`, `FILENAME`, `DATEEXECUTED`, `ORDEREXECUTED`, `EXECTYPE`, `MD5SUM`, `DESCRIPTION`, `COMMENTS`, `TAG`, `LIQUIBASE`, `CONTEXTS`, `LABELS`, `DEPLOYMENT_ID`) VALUES
('0', 'Tran Van Linh', 'classpath:/static/data-changelog.xml', '2017-09-27 12:31:49', 1, 'EXECUTED', '7:62158c72e6c6ea7d9d3920ad06c4b42e', 'empty', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_catalog', 'tvlinh', 'classpath:static/liquibase/create_catalog.xml', '2017-09-27 12:31:51', 2, 'EXECUTED', '7:f3933aaf684cc7cf18e1dd74d7e70e9a', 'createTable tableName=catalog', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_product', 'tvlinh', 'classpath:static/liquibase/create_product.xml', '2017-09-27 12:31:53', 3, 'EXECUTED', '7:5ba4aac682cbde447218ec8760ff732f', 'createTable tableName=product', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_comment', 'tvlinh', 'classpath:static/liquibase/create_comment.xml', '2017-09-27 12:31:55', 4, 'EXECUTED', '7:bf78bf056b1f50f122e99ed6a4d5547b', 'createTable tableName=comment', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_customer', 'tvlinh', 'classpath:static/liquibase/create_customer.xml', '2017-09-27 12:31:57', 5, 'EXECUTED', '7:17585f27ae1e52603a0a397c4ba985c6', 'createTable tableName=customer', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_employee', 'tvlinh', 'classpath:static/liquibase/create_employee.xml', '2017-09-27 12:31:58', 6, 'EXECUTED', '7:c1cc04c6e877d6d0ed0f8aae770bdfc8', 'createTable tableName=employee', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_order', 'tvlinh', 'classpath:static/liquibase/create_order.xml', '2017-09-27 12:31:59', 7, 'EXECUTED', '7:5b78ff0c04d65c21b7ee5298289800f1', 'createTable tableName=order', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_order_detail', 'tvlinh', 'classpath:static/liquibase/create_order_detail.xml', '2017-09-27 12:31:59', 8, 'EXECUTED', '7:6da21b0e42e490be3d32b81598b4d95b', 'createTable tableName=order_detail', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_user', 'tvlinh', 'classpath:static/liquibase/create_user.xml', '2017-09-27 12:32:01', 9, 'EXECUTED', '7:8ed020968dc0a19726f994c5ff37b8e2', 'createTable tableName=user', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('1_create_role', 'tvlinh', 'classpath:static/liquibase/create_role.xml', '2017-09-27 12:32:03', 10, 'EXECUTED', '7:4a0924e8c4bda9402b8518a4ea8e2586', 'createTable tableName=role', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('add_contrainst_product', 'tvinh', 'classpath:static/liquibase/add_contrainst_comment.xml', '2017-09-27 12:32:07', 11, 'EXECUTED', '7:e74bf5a90b3c4f6169889e2667d26cb4', 'addForeignKeyConstraint baseTableName=comment, constraintName=fk_comment_customer, referencedTableName=customer', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('add_contrainst_product', 'tvinh', 'classpath:static/liquibase/add_contrainst_order.xml', '2017-09-27 12:32:10', 12, 'EXECUTED', '7:b946a89dc64ab79bedd1665a17500de2', 'addForeignKeyConstraint baseTableName=order, constraintName=fk_order_customer, referencedTableName=customer', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('add_contrainst_product', 'tvinh', 'classpath:static/liquibase/add_contrainst_orderdetail.xml', '2017-09-27 12:32:15', 13, 'EXECUTED', '7:b475d5327b4afce42d513de31b31aa71', 'addForeignKeyConstraint baseTableName=order_detail, constraintName=fk_order_detail_product, referencedTableName=product; addForeignKeyConstraint baseTableName=order_detail, constraintName=fk_order_detail_customer, referencedTableName=product', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('add_contrainst_product', 'tvinh', 'classpath:static/liquibase/add_contrainst_product.xml', '2017-09-27 12:32:21', 14, 'EXECUTED', '7:15ed6247e5c5830f893ee6fe012a4829', 'addForeignKeyConstraint baseTableName=product, constraintName=fk_catalog_product, referencedTableName=catalog', '', NULL, '3.5.3', NULL, NULL, '6490309598'),
('add_contrainst_role', 'tvinh', 'classpath:static/liquibase/add_contrainst_role.xml', '2017-09-27 12:32:27', 15, 'EXECUTED', '7:08d28c840f9b7d5a205db9925b2afe46', 'addForeignKeyConstraint baseTableName=role, constraintName=fk_user_role, referencedTableName=user', '', NULL, '3.5.3', NULL, NULL, '6490309598');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DATABASECHANGELOGLOCK`
--

CREATE TABLE `DATABASECHANGELOGLOCK` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `DATABASECHANGELOGLOCK`
--

INSERT INTO `DATABASECHANGELOGLOCK` (`ID`, `LOCKED`, `LOCKGRANTED`, `LOCKEDBY`) VALUES
(1, b'0', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` bigint(20) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `id_product` bigint(20) DEFAULT NULL,
  `id_order` bigint(20) DEFAULT NULL,
  `price` double DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` longblob,
  `amount` int(11) DEFAULT NULL,
  `catalog_code` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `name` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `phone` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` char(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `enable`, `phone`, `email`) VALUES
(35, 'linhitvnua', '123456789', 'tranvanlinh', 1, '016449524648', 'abc@gmail.com'),
(37, 'leduchieu', '11111111', 'Lê đức hiếu', 1, '0164926688', 'leduchieu@gmail'),
(38, 'admin', 'admin', 'Tran Van Linh', 1, '016449524648', 'admin@gmail.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_customer` (`id_customer`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `DATABASECHANGELOGLOCK`
--
ALTER TABLE `DATABASECHANGELOGLOCK`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `test_id_uindex` (`id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_detail_customer` (`id_product`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_catalog_product` (`catalog_code`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_role` (`user_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT cho bảng `employee`
--
ALTER TABLE `employee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_customer` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `fk_order_detail_customer` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `fk_order_detail_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_catalog_product` FOREIGN KEY (`catalog_code`) REFERENCES `catalog` (`code`);

--
-- Các ràng buộc cho bảng `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
