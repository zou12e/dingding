module.exports = async (ctx, next) => {
    ctx.success = (data, msg) => {
        ctx.body = { code: 1, data: data, msg: msg };
        ctx.status = 200;
    };

    ctx.error = (err, msg) => {
        ctx.body = { code: 0, data: err, msg: msg };
        ctx.status = 200;
    };
    await next();
};
