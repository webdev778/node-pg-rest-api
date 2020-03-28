var app = require('../index.js'),
  chai = require('chai'),
  should = require('should'),
  request = require('supertest');

describe('GET /pricing-models', function() {
  it('responds with staic string', function(done) {
  request(app)
    .get('/pricing-models')
    .set('Accept', 'application/json')
    //.expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // res.text.should.equal('[GET]pricing-models');
      res.status.should.equal(200);
      done();
    });
  });
});

describe('POST /pricing-models', function() {
  it('responds with staic string', function(done) {
  request(app)
    .post('/pricing-models')
    .send({
      pricing: {
          name: "newPricing",
          prices:[1, 2]
      }
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // res.text.should.equal('[GET]pricing-models');
      res.status.should.equal(200);
      done();
    });
  });
});

describe('GET /pricing-models/:pm-id', function() {
  it('responds with staic string', function(done) {
  request(app)
    .get('/pricing-models/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      res.text.should.equal(`{"id":"1","name":"Super Value Option","pricing":[{"id":"1","price":3,"name":"10 minutes","value":10},{"id":"2","price":5,"name":"20 minutes","value":20}]}`)
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe('PUT /pricing-models/:pm-id', function() {
  it('responds with staic string', function(done) {
  request(app)
    .put('/pricing-models/4')
    .send({pricing:{name:"updatedName"}})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // res.text.should.equal(`{"id":"4","name":"updatedName","pricing":[{"id":"1","price":3,"name":"10 minutes","value":10}]}`)
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe('GET /pricing-models/:pm-id/prices', function() {
  it('responds with staic string', function(done) {
  request(app)
    .get('/pricing-models/1/prices')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe('POST /pricing-models/:pm-id/prices', function() {
  it('responds with staic string', function(done) {
  request(app)
    .post('/pricing-models/4/prices')
    .send({
      price: {
          price: 25,
          name: "New Price",
          value: 120
      }
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe('DELETE /pricing-models/:pm-id/prices/:price-id', function() {
  it('normal', function(done) {
  request(app)
    .delete('/pricing-models/4/prices/1')
    .set('Accept', 'application/json')
    .expect(204)
    .end(function(err, res) {
      if (err) return done(err);
      console.log(res.body);
      done();
    });
  });
});