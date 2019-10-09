const jwt = require('jsonwebtoken');
const config = require('../config');

const payload = userId => {
    return { uid: userId };
};

const getToken = userId => {
    return jwt.sign(payload(userId), config.secret, { expiresIn: config.tokenLife});
};

const getRefresh = userId => {
    return jwt.sign(payload(userId), config.refreshTokenSecret, { expiresIn: config.refreshTokenLife});
};

const getPair = userId => {
    return {
        'token': getToken(userId),
        'refresh': getRefresh(userId),
    };
};

module.exports = {
    getToken,
    getRefresh,
    getPair,
};
