const jwt = require('jsonwebtoken');
const config = require('../config');
const token = require('../utilities/token');

module.exports = (ctx) => {
    const { refresh } = ctx.request.body;
    if (!refresh) {
        ctx.throw(422, 'refreshToken required');
    }

    jwt.verify(refresh, config.refreshTokenSecret, function(err, decoded) {
        if (err) {
            ctx.throw(401, 'Unauthorized');
        }

        if (!decoded.uid) {
            ctx.throw(422, 'Wrong refresh token');
        }

        ctx.body = {
            status: 'success',
            ...token.getPair(decoded.uid)
        };
    });
};
