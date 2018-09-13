const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token // bu 3 şekilde geleb.lir headerde post atarkan body de ve linkte queryde 

    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'token geçersiz'
                })
            }
            else {
                req.decode=decoded;
                next();
            }
        });
    }
    else {
        res.json({
            status: false,
            message: 'token bulanamadı'
        })
    }
};