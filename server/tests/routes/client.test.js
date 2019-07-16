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
  json: function(arg) {
    this.sendCalledWith = arg;
  },
};

describe('Create Client Route', () => {
  describe('createClient()', () => {
    it('get clients', (done) => {
      request(app)
        .get('/client')
        .end(function(err, res) {
          expect(res).to.have.status(203);
          done()
        }); 
    })
  });
});

