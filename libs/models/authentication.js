const Sequelize = require('sequelize');
const sequelize = require('./index');
const Model = Sequelize.Model;
class Authentication extends Model {}
Authentication.init({
  // attributes
  dataSourceName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  },
  define: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Authentication',
  freezeTableName: true,
});

module.exports = Authentication;