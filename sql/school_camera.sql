SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for school_camera
-- ----------------------------
DROP TABLE IF EXISTS `school_camera`;
CREATE TABLE `school_camera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '节点名',
  `type` int(1) DEFAULT NULL COMMENT '0学校 1 监控点',
  `pid` int(11) DEFAULT NULL COMMENT '父节点id',
  `port` int(11) DEFAULT NULL COMMENT '端口号',
  `ip` varchar(20) DEFAULT NULL COMMENT 'ip地址',
  `channel` int(2) DEFAULT NULL COMMENT '通道',
  `sort` int(11) DEFAULT NULL COMMENT '排序，数字小的优先',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
