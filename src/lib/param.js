var _ = require('lodash')

const _ef = (k) => _.snakeCase(k)
const _pef = (k, i) => `${_.snakeCase(k)}=$${i + 2}`
const _wef = (k, i) => `${_.snakeCase(k)}=$${i + 1}`
const _ief = (k, i) => `$${i + 2}`
const updateParams = (o) => Object.keys(o).map(_pef).join(',')
const insertParams = (o) => Object.keys(o).map(_ef).join(',')
const insertValues = (o) => Object.keys(o).map(_ief).join(',')
const filterParams = (o) => Object.keys(o).map(_wef).join(' and ')
const valueArray = (o) => Object.keys(o).map(k => o[k])

module.exports = {
  updateParams,
  insertParams,
  insertValues,
  valueArray,
  filterParams
}