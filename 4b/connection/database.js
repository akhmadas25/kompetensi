const mysql = require('mysql2');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_task',
});

module.exports = connectionPool;