const logger = require('./logger');

module.exports = async (ctx, next) => {
    const reg = /\.[jpg | png | css | js | ico]/;
    if (!reg.test(ctx.path)) {
        logger.infos(
            ctx.headers['x-real-ip'] || ctx.headers['x-forward-for'] || ctx.ip,
            ctx.method,
            ctx.url,
            ctx.request.query,
            ctx.request.body);
    }
    await next();
};
