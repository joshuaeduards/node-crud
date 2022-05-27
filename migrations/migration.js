require('dotenv').config();
const env = process.env;

const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node-crud'
});

migration.init(connection, __dirname);