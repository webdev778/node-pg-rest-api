module.exports = {
    all,
    find,
    create,
    update
  };
  
  const table = 'prices';
  var db = require("../db");
  
  function all() {
    return db.query(`select * from ${table}`);
  }
  
  function find(id) {
    const sql = `select * from ${table} where id = $1 limit 1`;
    return db.query(sql, [id]);
  }
  
  async function create(attributes) {
    const { price, name, value } = attributes;
    const sql = `insert into ${table}(id, name, price, value) values($1, $2, $3, $4)`;
    
    const result = await db.query(`select nextval('prices_id_seq'::regclass)`);
    const id = result.rows[0].nextval;
    await db.query(sql, [id, name, price, value]);
    return id;
  }
  
  function update(id, name) {
    const sql = `update ${table} set name = $2 where id = $1`;
    return db.query(sql, [id, name]);
  }

  
  
  
  