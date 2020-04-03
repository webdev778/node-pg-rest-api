var { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '10.10.10.194',
    database: 'polycade',
    password: '123123',
    port: 5432,    
});

module.exports = pool;
