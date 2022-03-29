const { Pool } = require('pg');

const pool = new Pool({
    host:'8.6.193.79',
    user:'postgres',
    password: 'PDDHbase2021$',
    database: 'chequealo',
    port: '5432'
});

module.exports = pool;