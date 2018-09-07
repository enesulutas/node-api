const express = require('express');
const router = express.Router();
const MovieModel = require('../models/Models')
/* GET movie listing. */

router.get('/', (req, res) => {
  const promise = MovieModel.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res) => {
  const promise = MovieModel.findById(req.params.movie_id);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', function (req, res, next) {
  // const {title,category,country,year,point,date}=req.body; //post ile gönderilen datayı aldık
  const movie = new MovieModel(req.body // kısa yolu tek tek yerine 
  );
  movie.save()
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

});

module.exports = router;
