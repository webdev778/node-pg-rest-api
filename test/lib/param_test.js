var should = require('should')
var chai = require('chai')
var expect = chai.expect
var { updateParams, insertParams, insertValues, valueArray, filterParams } = require('../../src/lib/param')

describe('lib', function() {
  describe('updateParams', function () {
    it('param count = 1', function () {
      console.log(updateParams({ pricingId: 333 }))
      updateParams({ pricingId: 333 }).should.equal('pricing_id=$2')
    })
  
    it('param count = 2', function () {
      updateParams({ pricingId: 333, priceId: 444 }).should.equal('pricing_id=$2,price_id=$3')
    })
  
    it('param count = 3', function () {
      updateParams({ pricingId: 333, priceId: 444, name: 'aaa' })
        .should.equal('pricing_id=$2,price_id=$3,name=$4')
    })
  })
  
  describe('insertParams', function () {
    it('param count = 1', function () {
      insertParams({ pricingId: 333 }).should.equal('pricing_id')
    })
  
    it('param count = 2', function () {
      insertParams({ pricingId: 333, priceId: 444 }).should.equal('pricing_id,price_id')
    })
  
    it('param count = 3', function () {
      insertParams({ pricingId: 333, priceId: 444, name: 'aaa' })
        .should.equal('pricing_id,price_id,name')
    })
  })
  
  describe('insertValues', function () {
    it('param count = 1', function () {
      insertValues({ pricingId: 333 }).should.equal('$2')
    })
  
    it('param count = 2', function () {
      insertValues({ pricingId: 333, priceId: 444 }).should.equal('$2,$3')
    })
  
    it('param count = 3', function () {
      insertValues({ pricingId: 333, priceId: 444, name: 'aaa' })
        .should.equal('$2,$3,$4')
    })
  })
  
  describe('valueArray', function () {
    it('param count = 1', function () {
      expect(valueArray({ pricingId: 333 })).to.deep.equal([333])
    })
  
    it('param count = 2', function () {
      expect(valueArray({ pricingId: 333, priceId: 444 })).to.deep.equal([333, 444])
    })
  
    it('param count = 3', function () {
      expect(valueArray({ pricingId: 333, priceId: 444, name: 'aaa' }))
        .to.deep.equal([333, 444, 'aaa'])
    })
  })
  
  describe('filterParams', function () {
    it('param count = 1', function () {
      console.log(filterParams({ pricingId: 333 }))
      filterParams({ pricingId: 333 }).should.equal('pricing_id=$1')
    })
  
    it('param count = 2', function () {
      filterParams({ pricingId: 333, priceId: 444 }).should.equal('pricing_id=$1 and price_id=$2')
    })
  
    it('param count = 3', function () {
      filterParams({ pricingId: 333, priceId: 444, name: 'aaa' })
        .should.equal('pricing_id=$1 and price_id=$2 and name=$3')
    })
  })
})

