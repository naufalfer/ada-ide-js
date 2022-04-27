const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ada_ide_nodejs',
    password: 'Polbannn',
    port: 5432
});

module.exports = pool;
