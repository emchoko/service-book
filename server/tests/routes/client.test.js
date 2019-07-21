const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const app = require('../../src/app');
const request = chai.request;

const req = {
  body: {},
};

const res = {
  sendCalledWith: '',
  json: function (arg) {
    this.sendCalledWith = arg;
  },
};

describe('POST Client Route', () => {
  describe('/client POST', () => {

    it('should request with empty body fail', function (done) {
      request(app)
        .post('/client')
        .send({})
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done()
        });
    });

    it('should request with email existing fail', function (done) {
      request(app)
        .post('/client')
        .send({ email: 'emil@gmail.com' })
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    });

    it('should request with valid email work', function (done) {
      request(app)
        .post('/client')
        .send({ email: 'uniquemail@gmail.com' })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should request only with email pass', function (done) {
      request(app)
        .post('/client')
        .send({ email: 'somerandomemail@gmaci.com' })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should request only with telephone pass', function (done) {
      request(app)
        .post('/client')
        .send({ telephone: '08884243223' })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should request without email or phone fail', function (done) {
      request(app)
        .post('/client')
        .send({ email: '', telephone: '', name: 'Petar Petrov' })
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    })
  });
});

