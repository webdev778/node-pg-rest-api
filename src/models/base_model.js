var db = require('../db')
var { updateParams, insertParams, insertValues, valueArray, filterParams } = require('../lib/param')
var pluralize = require('pluralize')
var _ = require('lodash')

class BaseModel {
  static table
  static sequence

  // constructor () {

  // }

  static tableName () {
    return this.table || pluralize(_.snakeCase(this.name))
  }

  static sequenceName () {
    return this.sequence || `${this.tableName()}_id_seq`
  }

  static all () {
    return db.query(`select * from ${this.tableName()}`)
  }

  static find (id) {
    const sql = `select * from ${this.tableName()} where id = $1 limit 1`

    return new Promise((resolve, reject) => {
      db.query(sql, [id]).then(res =>
        res.rows.length === 0
          ? resolve(null)
          : resolve(res.rows[0])
      ).catch(reject)
    })
  }

  static findBy (attrs) {
    const sql = `select * from ${this.tableName()} where ${filterParams(attrs)} limit 1`

    return new Promise((resolve, reject) => {
      db.query(sql, valueArray(attrs)).then(res =>
        res.rows.length === 0
          ? resolve(null)
          : resolve(res.rows[0])
      ).catch(reject)
    })
  }

  static create (attrs) {
    const sql = `insert into ${this.tableName()}(id, ${insertParams(attrs)}) 
                values($1, ${insertValues(attrs)})`

    return new Promise((resolve, reject) => {
      db.query(`select nextval('${this.tableName()}_id_seq'::regclass)`).then(
        result => {
          const id = result.rows[0].nextval
          db.query(sql, [id, ...valueArray(attrs)]).then(
            resolve(id)
          ).catch(reject)
        }
      ).catch(reject)
    })
  }

  static update (id, attrs) {
    const sql = `update ${this.tableName()} set ${updateParams(attrs)} where id = $1`
    return db.query(sql, [id, ...valueArray(attrs)])
  }

  static destroy (id) {
    const sql = `delete from ${this.tableName()} where id = $1`
    return db.query(sql, [id])
  }
}

module.exports = BaseModel
