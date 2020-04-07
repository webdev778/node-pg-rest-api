var Price = require('../../src/models/price')
var { expect } = require('chai')

describe('BaseModel', () => {
  it('#all()', async () => {
    const result = await Price.all()
    console.log(result.rows)
  })

  it('#find(id)', async () => {
    const result = await Price.find(4)
    console.log(result)
  })

  it('#create(attrs)', async () => {
    const result = await Price.create({
      price: 50,
      name: 'test',
      value: 30
    })
    console.log(result)
  })

  it('#update(id, attrs)', async () => {
    const result = await Price.update(70, {
      price: 50,
      name: 'test',
      value: 30
    })
    console.log(result.rows)
  })
})
