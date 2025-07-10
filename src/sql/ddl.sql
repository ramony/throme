-- detail 

CREATE TABLE `detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `detail_type` varchar(10) NOT NULL,
  `detail_id` varchar(100) NOT NULL,
  `detail_title` varchar(1000) NOT NULL,
  `detail_url` varchar(5000) NOT NULL,
  `read_flag` int(11) NOT NULL,
  `local_flag` int(11) NOT NULL,
  `page_no` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `keyword` varchar(100) NOT NULL DEFAULT 'NONE',
  `tag_id` int(10) unsigned NOT NULL DEFAULT '0',
  `score` int(10) unsigned DEFAULT NULL,
  `detail_order` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `detail_UN` (`detail_type`,`detail_id`),
  KEY `detail_keyword_IDX` (`keyword`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;