SET SESSION FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `warehouse`;

CREATE DATABASE IF NOT EXISTS `warehouse`
  DEFAULT CHARACTER SET `utf8mb4`
  DEFAULT COLLATE `utf8mb4_unicode_ci`;

USE `warehouse`;

/* Drop Tables */

DROP TABLE IF EXISTS t_brand;
DROP TABLE IF EXISTS t_category;
DROP TABLE IF EXISTS t_category_relation;
DROP TABLE IF EXISTS t_inventory_record;
DROP TABLE IF EXISTS t_product;
DROP TABLE IF EXISTS t_product_warehouse;
DROP TABLE IF EXISTS t_contact;
DROP TABLE IF EXISTS t_merchant;
DROP TABLE IF EXISTS t_picture;
DROP TABLE IF EXISTS t_rack;
DROP TABLE IF EXISTS t_unit;
DROP TABLE IF EXISTS t_user;
DROP TABLE IF EXISTS t_warehouse;
DROP TABLE IF EXISTS t_warehousing;




/* Create Tables */

-- 品牌表
CREATE TABLE t_brand
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(50) DEFAULT '' NOT NULL COMMENT '名称',
	code varchar(100) DEFAULT '' COMMENT '编码',
	active tinyint DEFAULT 1 COMMENT '是否启用,1-启用;0-不启用',
	remark varchar(200) DEFAULT '' COMMENT '备注',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '品牌表';


-- 分类表
CREATE TABLE t_category
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(50) DEFAULT '' NOT NULL COMMENT '名称',
	-- 类别的类型, 1-供应商类别;2-客户类别3-商品类别
	type smallint DEFAULT -1 NOT NULL COMMENT '类型',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '分类表';


-- 分类关系表
CREATE TABLE t_category_relation
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	parent_id int DEFAULT -1 NOT NULL COMMENT '父结点ID',
	child_id int DEFAULT -1 NOT NULL COMMENT '子结点ID',
	parent_ind tinyint DEFAULT 0 NOT NULL COMMENT '是否直接父结点',
  level   tinyint default 0 comment '层级',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '分类关系表';


-- 盘点记录表
CREATE TABLE t_inventory_record
(
  id int NOT NULL AUTO_INCREMENT COMMENT 'id',
  code varchar(100) DEFAULT '' COMMENT '编码',
  inventory int DEFAULT -1 COMMENT '盘点库存',
  profit int DEFAULT -1 COMMENT '盘盈盘亏',
  created_time datetime COMMENT '创建时间',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
  PRIMARY KEY (id)
) COMMENT = '盘点记录表';


-- 商品表
CREATE TABLE t_product
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	code varchar(100) DEFAULT '' NOT NULL COMMENT '编码',
	name varchar(200) DEFAULT '' NOT NULL COMMENT '名称',
	bar_code varchar(200) DEFAULT '' COMMENT '条码',
	category_id int DEFAULT -1 NOT NULL COMMENT '商品类别ID',
	specification varchar(200) DEFAULT '' COMMENT '规格型号',
	brand_id int DEFAULT -1 COMMENT '商品品牌ID',
	unit_id int DEFAULT -1 COMMENT '单位ID',
	prefered_warehouse_id int DEFAULT -1 COMMENT '首选仓库ID',
	parameter text COMMENT '参数',
	active tinyint DEFAULT 1 COMMENT '是否启用,1-启用;0-不启用',
	remark varchar(200) DEFAULT '' COMMENT '备注',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '商品表';


-- 商品仓库关系表
CREATE TABLE t_product_warehouse
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	product_id int DEFAULT -1 NOT NULL COMMENT '商品ID',
	warehouse_id int DEFAULT -1 NOT NULL COMMENT '仓库ID',
	init_quantity int DEFAULT -1 COMMENT '期初数量',
	price float(10,2) DEFAULT -1 COMMENT '单位价格',
	min_inventory int DEFAULT -1 COMMENT '最低库存',
	max_inventory int DEFAULT -1 COMMENT '最高库存',
	inventory int DEFAULT -1 COMMENT '库存',
	rack_id int DEFAULT -1 COMMENT '货架ID',
	layer varchar(10) DEFAULT '' COMMENT '货架层',
	place varchar(10) DEFAULT '' COMMENT '位置',
	remark varchar(200) COMMENT '备注',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '商品仓库关系表';


-- 联系人表
CREATE TABLE t_contact
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(100) DEFAULT '' NOT NULL COMMENT '名称',
	phone varchar(30) DEFAULT '' COMMENT '手机',
	tel varchar(30) DEFAULT '' COMMENT '座机',
	sns_contact varchar(200) DEFAULT '' COMMENT 'QQ/微信/Email',
	address varchar(200) DEFAULT '' COMMENT '联系地址',
	primary_ind tinyint DEFAULT 0 NOT NULL COMMENT '首要联系人标识',
	merchant_id int DEFAULT -1 NOT NULL COMMENT '供应商/客户id',
	active tinyint DEFAULT 1 COMMENT '是否启用,1-启用;0-不启用',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '联系人表';


-- 供应商客户表
CREATE TABLE t_merchant
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(500) DEFAULT '' NOT NULL COMMENT '名称',
	code varchar(100) DEFAULT '' NOT NULL COMMENT '编号',
	category_id int NOT NULL COMMENT '类别id',
	type tinyint DEFAULT 1 NOT NULL COMMENT '类别,1-供应商;2-客户',
  remark varchar(200) COMMENT '备注',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '供应商客户表';


-- 图片表
CREATE TABLE t_picture
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	target_id int DEFAULT -1 NOT NULL COMMENT '目标表ID',
	type tinyint DEFAULT -1 NOT NULL COMMENT '类别, 1-商品表',
	path text NOT NULL COMMENT '路径',
	name varchar(100) DEFAULT '' COMMENT '名称',
  seq int DEFAULT 0 COMMENT '顺序',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '图片表';


-- 货架表
CREATE TABLE t_rack
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	code varchar(100) DEFAULT '' NOT NULL COMMENT '编码',
	warehouse_id int DEFAULT -1 NOT NULL COMMENT '仓库id',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '货架表';


-- 计量单位表
CREATE TABLE t_unit
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(10) DEFAULT '' NOT NULL COMMENT '名称',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '计量单位表';


-- 用户表
CREATE TABLE t_user
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	name varchar(30) DEFAULT '' NOT NULL COMMENT '名称',
	phone varchar(30) DEFAULT '' COMMENT '手机号码',
	code varchar(100) DEFAULT '' COMMENT '编码',
	active tinyint DEFAULT 1 COMMENT '是否启用,1-启用;0-不启用',
	password varchar(200) DEFAULT '' COMMENT '密码',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '用户表';


-- 仓库表
CREATE TABLE t_warehouse
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	code varchar(100) DEFAULT '' NOT NULL COMMENT '编码',
	name varchar(100) DEFAULT '' NOT NULL COMMENT '名称',
	active tinyint DEFAULT 1 NOT NULL COMMENT '是否启用,1-启用;0-不启用',
  created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
  created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '仓库表';


-- 出库入库记录表
CREATE TABLE t_warehousing
(
	id int NOT NULL AUTO_INCREMENT COMMENT 'id',
	action tinyint DEFAULT -1 NOT NULL COMMENT '出库/入库, 1-出库;2-入库',
	quantity int DEFAULT -1 NOT NULL COMMENT '数量',
	warehouse_id int DEFAULT -1 NOT NULL COMMENT '仓库ID',
	merchant_id int DEFAULT -1 NOT NULL COMMENT '供应商/客户ID',
	created_by int DEFAULT -1 NOT NULL COMMENT '创建人',
	created_time datetime  COMMENT '创建时间',
  updated_by int DEFAULT -1 NOT NULL COMMENT '更新人',
  updated_time datetime  COMMENT '更新时间',
  deleted_ind tinyint DEFAULT 0 COMMENT '是否已删除,1-是;0-否',
  deleted_by int DEFAULT -1 NOT NULL COMMENT '删除人',
  deleted_time datetime COMMENT '删除时间',
	PRIMARY KEY (id)
) COMMENT = '出库入库记录表';



