const db = require('../db');
const bcrypt = require('../utilities/bcrypt');

module.exports = async (ctx) => {
    const { username, password } = ctx.request.body;

    if (!username) {
        ctx.throw(422, 'Username required.');
    }
    if (!password) {
        ctx.throw(422, 'Password required.');
    }

    const user = await db('users').where('username', username).first();
    if (user) {
        ctx.throw(422, 'This username is occupied');
    }

    const hash = await bcrypt.hash(password);
    const result = await db('users')
        .insert({
            username: username,
            password: hash
        });

    ctx.body = {
        'status': 'success',
        'userId': result.shift()
    };
};
