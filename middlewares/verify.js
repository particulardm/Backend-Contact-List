const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const verify = function(req, res, next) {
    console.log('Middleware launched');
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch {
       return res.json({error: "auth error!"});
    }

    req.user = decoded;
    next();
}

module.exports = verify;