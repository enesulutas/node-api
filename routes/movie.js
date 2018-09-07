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

router.get('/between/:start_year/:finish_year', (req, res) => {
  const{start_year,finish_year}=req.params;
  const promise = MovieModel.find({
    year:{"$gte":parseInt(start_year),"$lte":parseInt(finish_year)} //gte büyük eşit lte küçük eşit e hgarfi olmazsa eşit olmaz
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/topten', (req, res) => {
  const promise = MovieModel.find({});
  promise.then((data) => {
    res.json(data).limit(10).sort({point: -1});
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => {
  const promise = MovieModel.findById(req.params.movie_id);
  promise.then((data) => {
    if (!data)
      next({ message: 'Fim Bulunamadı' });
    
      res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = MovieModel.findOneAndRemove(req.params.movie_id);
  promise.then((data) => {
    if (!data)
      next({ message: 'Fim Bulunamadı' });
    
      res.json({status:1});
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:movie_id', (req, res, next) => {
  const promise = MovieModel.findByIdAndUpdate(req.params.movie_id,req.body,{new:true}); //new true güncelleme enasında yeni kaydı getirir
  promise.then((data) => {
    if (!data)
      next({ message: "Fim Bulunamadı" });
    if(data)
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
