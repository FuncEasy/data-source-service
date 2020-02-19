const Router = require('koa-router');
const DynamicCreateModule = require('../../libs/models/DynamicCreateModule');
const sequelize = require('../../libs/models');
const Authentication = require('../../libs/models/authentication');
const uuidV4 = require('uuid/v4');
let router = new Router();

router.post('/create', async ctx => {
  const { dataSourceId, dataSourceDefine } = ctx.request.body;
  if (!dataSourceId || !dataSourceDefine) {
    ctx.status = 422;
    ctx.body = {
      err: "",
      message: "dataSourceId and dataSourceDefine is required"
    };
    return
  }
  const customModule = DynamicCreateModule.initModule(dataSourceId, dataSourceDefine);
  try {
    const auth = await Authentication.findOne({where: {dataSourceName: dataSourceId}});
    if (!auth) {
      await Authentication.create({
        dataSourceName: dataSourceId,
        token: uuidV4(),
      });
    }
    await customModule.sync();
    ctx.body = {
      message: "success"
    }
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e,
      message: "create data source error"
    }
  }
});

router.post('/update', async ctx => {
  const { dataSourceId, dataSourceDefine } = ctx.request.body;
  if (!dataSourceId || !dataSourceDefine) {
    ctx.status = 422;
    ctx.body = {
      err: "",
      message: "dataSourceId and dataSourceDefine is required"
    };
    return
  }
  const customModule = DynamicCreateModule.initModule(dataSourceId, dataSourceDefine);
  try {
    await customModule.sync({
      alter: true
    });
    ctx.body = {
      message: "success"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e,
      message: "update data source error"
    }
  }
});

router.del('/:id', async ctx => {
  const id = ctx.params.id;
  if (!id) {
    ctx.status = 422;
    ctx.body = {
      err: "",
      message: "dataSourceId is required"
    };
    return
  }
  try {
    await sequelize.query(`DROP TABLE ${id};`);
    ctx.body = {
      message: "success"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e,
      message: "delete data source error"
    }
  }
});

module.exports = router;
