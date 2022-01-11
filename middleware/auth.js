const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        req.isAuth = false;
        return next();
    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'specialsecretkey');
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodeToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.uid = decodeToken.data._id;
    req.utype = decodeToken.data.type;
    return next();
}