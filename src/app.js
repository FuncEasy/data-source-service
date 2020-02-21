const Koa = require('koa');
const router = require('./routes');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const AuthenticationDataSource = require('./libs/models/authentication');
const port = process.env.DATA_SOURCE_SERVICE_PORT || 8081;
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    ctx.response.status = e.statusCode || e.status || 500;
    ctx.response.body = e
  }
};
try {
  (async () => {
    await AuthenticationDataSource.sync();
    const app = new Koa();
    app.use(koaBody({
      multipart: true,
      strict: false,
    }));
    app.use(logger());
    app.use(handler);
    app.use(router.routes());
    app.listen(port);
    console.log(`Data Source Service Listening port: ${port}`);
  })()
} catch (e) {
  console.log(e);
  process.exit(1);
}

