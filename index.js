
const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const staticServer = require('koa-static');
const compression = require('koa-compress');

const path = require('path');
const config = require('config');
const morgan = require('./middleware/morgan');
const logger = require('./middleware/logger');
const i18n = require('./middleware/i18n');
const webRouter = require('./routes');

const app = new Koa();

// 请求内容解析中间件  [req.body][req.query]
app.use(convert(bodyParser()));

// cookie解析中间件 [res.cookies]
// app.use(cookieParser());

// gzip压缩中间件
app.use(compression());

// 用户请求日志中间件
app.use(morgan);

// express安全中间件 XSS保护
app.use(helmet());

// 统一接口返回格式
app.use(i18n);

app.use(staticServer(path.join(__dirname, 'docs')));

// 路由统一入口
app.use(webRouter.routes()).use(webRouter.allowedMethods());

// 定时器统一入口
require('./middleware/schedule')();

const env = config.get('env');
const port = config.get('port');
app.listen(port);
logger.infos(`env:${env} | port:${port} `);

module.exports = app;
