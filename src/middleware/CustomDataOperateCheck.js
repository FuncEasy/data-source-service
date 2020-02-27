const Authentication = require('../libs/models/Authentication');
module.exports = async function (ctx, next) {
  let token = ctx.request.headers['authentication'] || ctx.request.headers['Authentication'];
  const id = ctx.params.id;
  if (!token || !id) {
    ctx.status = 401;
    ctx.body = {
      err: "Forbidden",
      message: "Forbidden Token or ID"
    };
    return
  }
  let dataSource = await Authentication.findOne({where: {token: token, dataSourceName: id}});
  if (!dataSource) {
    ctx.status = 401;
    ctx.body = {
      err: "Forbidden",
      message: "Data Source Not Found"
    };
    return
  }
  ctx._data_source = dataSource;
  return next()
};