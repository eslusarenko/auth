const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

const genSalt = rounds => new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

const hash = data => new Promise(async (resolve, reject) => {
    const salt = await genSalt(config.saltRounds);
    bcrypt.hash(data, salt, null, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

const compare = (data, encrypted) => new Promise((resolve, reject) => {
    bcrypt.compare(data, encrypted, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

module.exports = {
    hash,
    compare,
};
