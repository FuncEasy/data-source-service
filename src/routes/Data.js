const Router = require('koa-router');
const DynamicCreateModule = require('../../libs/models/DynamicCreateModule');
const CustomDataOperateCheck = require('../middleware/CustomDataOperateCheck');
let router = new Router();

router.post('/create/:id', CustomDataOperateCheck, async ctx => {
  const id = ctx.params.id;
  const { data } = ctx.request.body;
  if (!data) {
    ctx.status = 422;
    ctx.body = {
      err: "Invalid Input",
      message: "data is required"
    };
    return
  }
  try {
    const customModule = DynamicCreateModule.initModule(id, JSON.parse(ctx._data_source.define));
    await customModule.create(data);
    ctx.body = {
      message: "success"
    }
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e.message,
      message: "create data error"
    }
  }
});

router.post('/update/:id', CustomDataOperateCheck, async ctx => {
  const id = ctx.params.id;
  let { data, where } = ctx.request.body;
  if (!data || !where) {
    ctx.status = 422;
    ctx.body = {
      err: "Invalid Input",
      message: "data and where is required"
    };
    return
  }
  const customModule = DynamicCreateModule.initModule(id, JSON.parse(ctx._data_source.define));
  try {
    if (typeof where === 'string') {
      where = JSON.parse(where)
    }
    await customModule.update(data, {where});
    ctx.body = {
      message: "success"
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      err: e.message,
      message: "update data error"
    }
  }
});

router.del('/:id', CustomDataOperateCheck, async ctx => {
  const id = ctx.params.id;
  let { where } = ctx.request.body;
  if (!where) {
    ctx.status = 422;
    ctx.body = {
      err: "Invalid Input",
      message: "where is required"
    };
    return
  }
  const customModule = DynamicCreateModule.initModule(id, JSON.parse(ctx._data_source.define));
  try {
    if (typeof where === 'string') {
      where = JSON.parse(where)
    }
    await customModule.destroy({where});
    ctx.body = {
      message: "success"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e.message,
      message: "delete data error"
    }
  }
});

router.post('/get/:id', CustomDataOperateCheck, async ctx => {
  const id = ctx.params.id;
  let { where } = ctx.request.body;
  const customModule = DynamicCreateModule.initModule(id, JSON.parse(ctx._data_source.define));
  try {
    if (where && typeof where === 'string') {
      where = JSON.parse(where)
    }
    const opts = where ? {where: where} : {};
    const data = await customModule.findAll(opts);
    ctx.body = {
      data: data,
      message: "success"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      err: e.message,
      message: "update data error"
    }
  }
});

module.exports = router;
