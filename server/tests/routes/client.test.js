const expect = require('chai').expect;
const assert = require('chai').assert;
const {createClient} = require('../../src/routes/client');

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
    it('Should throw error if body empty', () => {
      createClient(req, res);
      expect(res.sendCalledWith.message).to.contain('error');
    });

    it('Should create if body present', () => {
      const newReq = req;
      newReq.body = {
        email: 'Jonh@mail.com',
      };

      createClient(newReq, res);
      assert();
      expect(res.sendCalledWith.email).to.contain('@mail.com');
    });
  });
});

