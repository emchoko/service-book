const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
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

  beforeEach(() => {});

});