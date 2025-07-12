"use server"

const mysql2 = require('mysql2');
import { Sequelize, DataTypes } from 'sequelize';

// 初始化连接
const sequelize = new Sequelize('testdb', 'testuser', 'testpass', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', // 指定数据库类型,=
  dialectModule: require('mysql2'),
  logging: false, // 禁用 SQL 日志
  define: {
    underscored: true,          // 自动将驼峰转为蛇形（用于表名和字段名）
    underscoredAll: true,       // 所有字段名强制使用蛇形
    createdAt: 'create_date',    // 自定义时间戳字段名
    updatedAt: 'update_date',
  },
});

const Detail = sequelize.define('Detail', {
  // 字段定义（自动生成 id、createdAt、updatedAt 字段）
  // 定义字段，例如：
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  detailType: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 不允许为 null
  },
  detailId: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 不允许为 null
  },
  detailTitle: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 不允许为 null
  },
  detailUrl: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 不允许为 null
  },
  readFlag: {
    type: DataTypes.INTEGER, // 字符串类型
    allowNull: false // 不允许为 null
  },
  localFlag: {
    type: DataTypes.INTEGER, // 字符串类型
    allowNull: false // 不允许为 null
  },
  pageNo: {
    type: DataTypes.INTEGER, // 字符串类型
    allowNull: false // 不允许为 null
  },

  createDate: {
    type: DataTypes.DATE, // 字符串类型
    allowNull: false // 不允许为 null
  },
  updateDate: {
    type: DataTypes.DATE, // 字符串类型
    allowNull: false // 不允许为 null
  },
  keyword: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 不允许为 null
  },
  tagId: {
    type: DataTypes.INTEGER, // 字符串类型
    allowNull: false // 不允许为 null
  },
  score: {
    type: DataTypes.INTEGER, // 字符串类型
    allowNull: false // 不允许为 null
  },
  detailOrder: {
    type: DataTypes.BIGINT, // 字符串类型
    allowNull: false // 不允许为 null
  },
});


//await sequelize.sync({ force: true }); // 开发环境使用，生产环境慎用


// 从环境变量读取配置（推荐做法）
// const config = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'testuser',
//   password: process.env.DB_PASSWORD || 'testpass',
//   database: process.env.DB_NAME || 'testdb',
//   port: process.env.DB_PORT || 3306
// };

export async function queryApi(query) {
  let result = await Detail.findAll({ where: query });
  return result;
}

export async function markReadByDetailIdApi(params) {

}

export async function createDetailApi(rdata) {
  let time = new Date();
  for (let data of rdata) {
    data.createDate = new Date();
    data.updateDate = new Date();
    if (!data.keyword) {
      data.keyword = ''
    }
    if (!data.score) {
      data.score = 0
    }

  }

  console.log('----------------------------')
  let successCount = 0
  for (let data of rdata) {
    try {
      const result = await Detail.create(data);
      successCount++;
      //console.log('成功:', result);
    } catch (error) {
      //console.error('失败:', error);
    }

  }
  console.log('successCount', successCount)
  console.log('time', new Date() - time)
  return { success: true, data: successCount }
}