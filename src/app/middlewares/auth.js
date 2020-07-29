const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({info: "token not passed as header property"});
    }

    parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ info: "incorrect token format length" });
    }

    const [ scheme, blankSpace, token ] = parts;

    if (!scheme.match(/Bearer/i)) {
        return res.status(401).send({ info: "incorrect token format" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ err, info: "invalid token", token, scheme });
        }

        req.userId = decoded.id;
        return next();
    });
}