var app = require('../src/index.js')
// var chai = require('chai')
// var should = require('should')
var request = require('supertest')
var db = require('../src/db')

describe('GET /pricing-models', function () {
  it('responds with staic string', function (done) {
    request(app)
      .get('/pricing-models')
      .set('Accept', 'application/json')
    // .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        // res.text.should.equal('[GET]pricing-models');
        res.status.should.equal(200)
        done()
      })
  })
})

describe('POST /pricing-models', function () {
  it('responds with staic string', function (done) {
    request(app)
      .post('/pricing-models')
      .send({
        pricing: {
          name: 'newPricing',
          prices: [1, 2]
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        // res.text.should.equal('[GET]pricing-models');
        res.status.should.equal(200)
        done()
      })
  })
})

describe('GET /pricing-models/:pm-id', function () {
  it('responds with staic string', function (done) {
    request(app)
      .get('/pricing-models/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal('{"id":"1","name":"Super Value Option","pricing":[{"id":"1","price":3,"name":"10 minutes","value":10},{"id":"2","price":5,"name":"20 minutes","value":20}]}')
        res.status.should.equal(200)
        console.log(res.body)
        done()
      })
  })
})

describe('PUT /pricing-models/:pm-id', function () {
  it('responds with staic string', function (done) {
    request(app)
      .put('/pricing-models/4')
      .send({ pricing: { name: 'updatedName' } })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        // res.text.should.equal(`{"id":"4","name":"updatedName","pricing":[{"id":"1","price":3,"name":"10 minutes","value":10}]}`)
        res.status.should.equal(200)
        console.log(res.body)
        done()
      })
  })
})

describe('GET /pricing-models/:pm-id/prices', function () {
  it('responds with staic string', function (done) {
    request(app)
      .get('/pricing-models/1/prices')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.status.should.equal(200)
        console.log(res.body)
        done()
      })
  })
})

describe('POST /pricing-models/:pm-id/prices', function () {
  it('responds with staic string', function (done) {
    request(app)
      .post('/pricing-models/4/prices')
      .send({
        price: {
          price: 25,
          name: 'New Price',
          value: 120
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.status.should.equal(200)
        console.log(res.body)
        done()
      })
  })
})

describe('DELETE /pricing-models/:pm-id/prices/:price-id', function () {
  it('normal', function (done) {
    db.query('select pricing_id, price_id from pricing_price pp  order by id desc limit 1')
      .then(function (result) {
        if (!result.rowCount) return done()

        var pricingId = result.rows[0].pricing_id
        var priceId = result.rows[0].price_id
        request(app)
          .delete(`/pricing-models/${pricingId}/prices/${priceId}`)
          .set('Accept', 'application/json')
          .expect(204)
          .end(function (err, res) {
            if (err) return done(err)
            console.log(res.body)
            done()
          })
      })
      .catch(function (err) {
        console.log(err)
      })
  })

  it('responds with not found (Price Model)', function (done) {
    request(app)
      .delete('/pricing-models/9999/prices/1')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('responds with not found (Price Configuration)', function (done) {
    request(app)
      .delete('/pricing-models/4/prices/999')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})
