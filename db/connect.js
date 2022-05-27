require('dotenv').config();
const mysql = require('mysql');
// const Connection = require('mysql/lib/Connection');
const env = process.env;

const pool =  mysql.createPool({
    host     : env.DB_HOSTNAME,
    user     : env.DB_USER,
    password : env.DB_SECRET,
    database : env.DB_NAME
})

module.exports = pool
