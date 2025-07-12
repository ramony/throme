"use server"

import { Sequelize, DataTypes, Op } from 'sequelize';

// 初始化连接
const sequelize = new Sequelize('throme', 'testuser', 'testpass', {
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


/***
 *  
 */
export async function queryApi(query) {
  if (query['maxId'] != null) {
    let maxId = query['maxId'];
    delete query['maxId'];
    query = { ...query, detailOrder: { [Op.lt]: maxId } }
  }
  if (query['readFlag'] == null) {
    query['readFlag'] = 0
  }
  console.log('query', query)
  const pageSize = 20;
  console.log('query', query)
  let { count, rows } = await Detail.findAndCountAll({
    where: query,
    limit: pageSize,              // 每页数量
    order: [['detailOrder', 'DESC']], // 排序（重要！确保分页顺序稳定）
  });
  let pageCount = Math.ceil(count / pageSize)
  let next = '';
  if (rows.length > 0) {
    let minId = rows.reduce((min, item) => {
      return Math.min(min, item.detailOrder);
    }, Number.MAX_SAFE_INTEGER);

    rows = rows.map(detail => {
      let item = detail.toJSON();
      return {
        title: '[' + item.pageNo + ']' + item.detailTitle,
        url: item.detailUrl
      }
    });
    //{ [Op.lt]: minId }
    query = { ...query, maxId: minId };
    next = "query(" + JSON.stringify(query) + ")"
  }

  let result = {
    success: true,
    data: {
      list: rows,
      next: next,
      totalPages: pageCount
    }
  }

  return JSON.stringify(result);
}

export async function markReadByDetailIdApi(detailType, detailId) {
  // 1. 查询记录
  const detail = await Detail.findOne({
    where: { detailType: detailType, detailId: detailId },
  });
  console.log(detailType, detailId, detail)

  // 2. 存在则更新
  if (detail) {
    await detail.update(
      { readFlag: 1 }
    );
  }
}

export async function markReadLaterByDetailIdApi(detailType, detailId) {
  // 1. 查询记录
  const detail = await Detail.findOne({
    where: { detailType: detailType, detailId: detailId },
  });
  console.log('markReadLaterByDetailIdApi', detailType, detailId, detail != null)
  // 2. 存在则更新
  if (detail) {
    await detail.update(
      { readFlag: 9 }
    );
  }
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