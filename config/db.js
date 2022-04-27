const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ada_ide',
    password: 'Polbannn',
    port: 5432
});

module.exports = pool;
