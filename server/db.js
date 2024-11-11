const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",  
    password: "password", 
    host: "localhost",
    port: 5432,
    database: "KTPairing"
});

module.exports = pool; 