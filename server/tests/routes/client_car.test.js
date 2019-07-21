const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const app = require('../../src/app');
const request = chai.request;

describe('Car Route Suite', () => {
  describe('/client/:id/car POST', () => {
    it('should request with empty body fail', function (done) {
      request(app)

    });

    it('should request with non existant client ID fail', function (done) {

    });

    it('should request without license plate fail', function (done) {

    });

    it('should request without make, model and year fail', function (done) {

    });

    it('should valid request pass', function (done) {

    });
  });
});