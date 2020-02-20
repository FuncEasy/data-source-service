const Router = require('koa-router');
const DataSource = require('./DataSource');
const Data = require('./Data');
let router = new Router();
router.use('/dataSource', DataSource.routes(), DataSource.allowedMethods());
router.use('/data', Data.routes(), Data.allowedMethods());
module.exports = router;
