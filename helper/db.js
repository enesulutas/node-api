const mongoose = require('mongoose');



module.exports = () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect("mongodb://enesulutas:enes543321@ds145562.mlab.com:45562/movie-api", { useNewUrlParser: true });
    mongoose.connection.on('open', () => {
    });

    mongoose.connection.on('error',(err)=>{
        console.log(err);
    });
    mongoose.Promise =global.Promise;

};