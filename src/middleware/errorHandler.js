module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            status: 'error',
            message: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
};
