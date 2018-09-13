const chai =require('chai');
const chaiHttp =require('chai-http');
const should =chai.should();


const server =require('../app'); // app.js i çağıyoruz çalışması için

chai.use(chaiHttp);

describe('node server',()=>{    // ne tesi olduğunu belirttik
    it('(GET/) anasayfayı döndürür',(done)=>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    } )                        //itler içinde test yapıcaz
});