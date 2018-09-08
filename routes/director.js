const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const Director =require('../models/Director');


router.post('/', (req, res, next)=> {
const director=new Director(req.body);

const promise=director.save();
promise.then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
})
});

router.delete('/:director_id',(req,res)=>{
const promise =Director.findByIdAndRemove(req.params.director_id)
promise
.then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
})

})


router.put('/:director_id',(req,res,next)=>{
const promise =Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});

promise
.then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
})

})
router.get('/',(req,res)=>{
 
 const promise =Director.aggregate([
   {
     $lookup:{
        from: 'movies', //hangi tablo ile 
        localField: '_id', // neresi ile eşletirirlcek director tablosunun
        foreignField: 'director_id',//movieste eşleşecek alanı belirttik
        as: 'movies' //dönen datanın atanacağı değişken
      }
   },
   {
     $unwind:{
       path:'$movies', // as de belirtilen datayı almak için kullandık
       preserveNullAndEmptyArrays:true // eşlemeyen dataları da listelemeye yarar örn:filmi olmayan yönetmen
      }
   },
   {
     $group:{
       _id:{
         _id:'$_id',
       name:'$name',
       surname:'$surname',
       bio:'$bio'
       },
       movies:{
         $push: '$movies'
       }
     }    
   },
   {
   $project: {
     _id:'$_id._id',
     name:'$_id.name',
     surname:'$_id.surname',
     movies :'$movies'


   }
  }
 ]).then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
});
});
 
router.get('/:director_id',(req,res)=>{
 
  const promise =Director.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.director_id) //Match operatoru id si yalnızca bu olamları çek filtrelemeye yarar
      }
    },
    {
      $lookup:{
         from: 'movies', //hangi tablo ile 
         localField: '_id', // neresi ile eşletirirlcek director tablosunun
         foreignField: 'director_id',//movieste eşleşecek alanı belirttik
         as: 'movies' //dönen datanın atanacağı değişken
       }
    },
    {
      $unwind:{
        path:'$movies', // as de belirtilen datayı almak için kullandık
        preserveNullAndEmptyArrays:true // eşlemeyen dataları da listelemeye yarar örn:filmi olmayan yönetmen
       }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
        name:'$name',
        surname:'$surname',
        bio:'$bio'
        },
        movies:{
          $push: '$movies'
        }
      }    
    },
    {
    $project: {
      _id:'$_id._id',
      name:'$_id.name',
      surname:'$_id.surname',
      movies :'$movies'
 
 
    }
   }
  ]).then((data)=>{
   res.json(data);
 }).catch((err)=>{
   res.json(err);
 });
 });
  


module.exports = router;
