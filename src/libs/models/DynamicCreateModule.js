const Sequelize = require('sequelize');
const sequelize = require('./index');
const Model = Sequelize.Model;
const _TypeMap = {
  'integer': Sequelize.INTEGER,
  'string': Sequelize.STRING,
  'text': Sequelize.TEXT,
  'date': Sequelize.DATE,
  'float': Sequelize.FLOAT,
  'double': Sequelize.DOUBLE
};
class DynamicCreateModule {
  static initModule(dataSourceID, moduleDefine) {
    Object.keys(moduleDefine).forEach(column => {
      moduleDefine[column].type = _TypeMap[moduleDefine[column].type]
    });
    class _tmpClass extends Model{}
    _tmpClass.init(moduleDefine, {
      sequelize,
      modelName: dataSourceID,
      freezeTableName: true,
    });
    return _tmpClass
  }
}

module.exports = DynamicCreateModule;