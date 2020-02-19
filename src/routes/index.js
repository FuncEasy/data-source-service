const Router = require('koa-router');
const DataSource = require('./DataSource');
let router = new Router();
router.use('/dataSource', DataSource.routes(), DataSource.allowedMethods());

module.exports = router;
