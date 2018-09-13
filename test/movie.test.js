const chai =require('chai');
const chaiHttp =require('chai-http');
const should =chai.should();


const server =require('../app'); // app.js i çağıyoruz çalışması için

chai.use(chaiHttp);
let token;
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
   })
});