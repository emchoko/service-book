const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const app = require('../../src/app');
const request = chai.request;
const db = require('../../src/config/db');
const dbDrop = require('../../src/utils/db_operations').dropDb;

describe('Car Route Suite', () => {

  before((done) => {
    dbDrop(db, () => {
      const mockClient = {
        name: 'Petar Petrov',
        telephone: '089999999999',
        email: 'emil@gmail.com'
      };

      db.clients.create(mockClient)
        .then(_ => {
          db.clientCars.create({ license_plate: 'CA3131KT' })
            .then(() => { done() });
        });
    });
  });

  beforeEach(() => {
    carObj = { license_plate: 'CA3124KT', make: 'Peugeot', model: '204', year: 2019, api_car_id: '312312' };
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

    it('should request with non existent client ID fail', function (done) {
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

    it('should request without make, model and api_car_id fail', function (done) {
      carObj.make = '';
      carObj.model = '';
      carObj.api_car_id = '';

      request(app)
        .post('/client/1/car')
        .send(carObj)
        .end(function (err, res) {
          expect(res).to.have.status(412);
          done();
        });
    });

    it('should request with existing license plate fail', function (done) {
      carObj.license_plate = 'CA3131KT';
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