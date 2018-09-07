const mongoose = require('mongoose');



module.exports = () => {
    mongoose.connect("mongodb://enesulutas:enes543321@ds145562.mlab.com:45562/movie-api", { useNewUrlParser: true });
    mongoose.connection.on('open', () => {
        console.log("mongoose bağlandı");
    });

    mongoose.connection.on('error',(err)=>{
        console.log(err);
    });

    mongoose.Promise =global.Promise;

};