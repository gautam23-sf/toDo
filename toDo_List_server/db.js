const pg = require('pg');

const pool = new pg.Pool({
    user: "postgres",
    database: "todo_project",
    host: "localhost",
    port: 5432
});

module.exports = pool;