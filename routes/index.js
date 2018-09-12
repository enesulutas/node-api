const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/Users');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
  const { username, password } = req.body;



  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,// veritabnından gelen username =username password =password
      password: hash
    });
    const promise = user.save();
    promise
      .then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      })
  });
});


router.post('/auth', (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    username // =username demek
  }, (err, user) => {
    if (err)
      throw err;

    if (!user) {
      res.json({
        status: false,
        message: 'kullanıcı yetkis bulunamadı'
      });
    }
    else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'yanlış parola'
          });
        }
        else {
          const payload = {
            username
          };

          const token = jwt.sign(payload, req.app.get('api_secret_key'), { // burada appjs de set yaptık apisecretkey kısmını burada çaığrarak get yaptık
            expiresIn: 720 // 12 saat token süresi verdik
          });
          res.json({
            status: true,
            token: token
          });
        }
      });

    }
  });
});




module.exports = router;
