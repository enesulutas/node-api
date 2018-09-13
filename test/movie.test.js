
const chai =require('chai');
const chaiHttp =require('chai-http');
const should =chai.should();


const server =require('../app'); // app.js i çağıyoruz çalışması için

chai.use(chaiHttp);
let token,movieID;
describe('/api/movies tests',()=>{    // ne testi olduğunu belirttik
   before((done)=>{                                 // test başlamadan önce işlem yapmaya yarar
    chai.request(server)
    .post('/auth')
    .send({username:'enesulutas',password:'enes543321'})
    .end((err,res)=>{
        token=res.body.token;
        done();
    });
   });
   
   
   describe('/GET movies',()=>{ 
       it('filmleri listelemeli',(done)=>{
           chai.request(server)
           .get('/api/movies')
           .set('x-access-token',token)
           .end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           })
       })
   });

   describe('/POST movie',()=>{
       it('bir tane filmi post etmeli',(done)=>{

        const movie={
            title:'Udemy',
            director_id:'5b927e029d7ae7248447bef6',
            category:'komedi',
            country:'Türkiye',
            year:1950,
            point:9
        };

            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');                
                res.body.should.have.property('director_id'); //test db oluşturup oraya kaydetmek mantıklı
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('point');
                movieID=res.body._id;
                done();

            });
       });
   });

   describe('/GET/:director_id_movie',()=>{
       it('verilen id ile filmi getirmeli',(done)=>{
           chai.request(server)
           .get('/api/movies/'+movieID)
           .set('x-access-token',token)
           .end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('title');                
                res.body.should.have.property('director_id'); //test db oluşturup oraya kaydetmek mantıklı
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('point');
                res.body.should.have.property('_id').eql(movieID);
                done();


           })
       })
   })
});