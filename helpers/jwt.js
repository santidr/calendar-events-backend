const jwt = require('jsonwebtoken');

const genJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject('Failed token generation.');
            }

            resolve(token);
        });
    });
}

module.exports = genJWT;