const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const app = require('../../src/app');
const request = chai.request;

describe('Car Route Suite', () => {
  beforeEach(() => {
    carObj = { license_plate: 'CA3124KT', make: 'Peugeot', model: '204', year: 2019 };
  });

  describe('/client/:id/car POST', () => {
    it('should request with empty body fail', function (done) {
      request(app)
        .post('/client/1/car')
        .send({})
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    });

    it('should request with non existant client ID fail', function (done) {
      request(app)
        .post('/client/312312/car')
        .send(carObj)
        .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should request without license plate fail', function (done) {
      carObj.license_plate = '';
      request(app)
        .post('/client/1/car')
        .send(carObj)
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    });

    it('should request without make and model fail', function (done) {
      carObj.make = '';
      carObj.model = '';
      request(app)
        .post('/client/1/car')
        .send(carObj)
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    });

    it('should valid request pass', function (done) {
      request(app)
        .post('/client/1/car')
        .send(carObj)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});