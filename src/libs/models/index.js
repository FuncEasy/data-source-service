const { Sequelize } = require('sequelize');
const username = 'root';
const password = process.env.DATABASE_PASSWORD || 'administrator';
const host = process.env.DATABASE_HOST || 'localhost';
const sequelize = new Sequelize('funceasy_custom_data_source', username, password, {
  host: host,
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;