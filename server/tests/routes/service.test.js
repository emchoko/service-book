const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const request = chai.request;
const app = require('../../src/app');
const db = require('../../src/config/db');
const dbDrop = require('../../src/utils/db_operations').dropDb;

describe('Service Route Suite', () => {
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
    service = {
      date: Date.now(),
      kilometers: 12250,
      next_change_km: 25000,
      length_of_service: 50,
    }
  });

  it('should request fail with empty body', function (done) {
    request(app)
      .post('/car/CA3132KT/service')
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(412);
        done();
      });
  });

  it('should fail if licence plate doesn\'t exists', function (done) {
    request(app)
      .post('/car/CA313/service')
      .send(service)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should fail if kilometers are not provided', function (done) {
    service.kilometers = null;
    request(app)
      .post('/car/CA313/service')
      .send(service)
      .end(function (err, res) {
        expect(res).to.have.status(412);
        done();
      });
  });

  it('should valid request pass', function (done) {
    request(app)
      .post('/car/CA3131KT/service')
      .send(service)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });


});