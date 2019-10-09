const db = require('../db');
const bcrypt = require('../utilities/bcrypt');
const token = require('../utilities/token');

module.exports = async (ctx) => {
    const { username, password } = ctx.request.body;

    if (!username) {
        ctx.throw(422, 'Username required.');
    }
    if (!password) {
        ctx.throw(422, 'Password required.');
    }

    const dbUser = await db.first(['id', 'password'])
        .from('users')
        .where({ username });

    if (!dbUser) {
        ctx.throw(401, 'User not found');
    }

    if (await bcrypt.compare(password, dbUser.password) !== true) {
        ctx.throw(401, 'Wrong password');
    }

    ctx.body = {
        status: 'success',
        ...token.getPair(dbUser.uid)
    };
};
