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
    };

    const products = [
      {
        "product_type": "oil_filter",
        "code": "OC105",
        "brand": "Mahle"
      },
      {
        product_type: "oil",
        "code": "5W40",
        "brand": "Castrol"
      },
    ];

    service.products = products;
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
      .post('/car/CA3131KW/service')
      .send(service)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should fail if kilometers are not provided', function (done) {
    const newService = service;
    newService.kilometers = null;

    request(app)
      .post('/car/CA3131KT/service')
      .send(newService)
      .end(function (err, res) {
        expect(res).to.have.status(412);
        done();
      });
  });

  it('should request with no products fail', function (done) {
    const newService = service;
    newService.products = [];
    request(app)
      .post('/car/CA3131KT/service')
      .send(newService)
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
        expect(res.body).to.include.keys(["kilometers", "id"]);
        expect(res.body).to.have.deep.property('length_of_service', 50);
        expect(res.body).to.have.deep.property('products');
        done();
      });
  });

});