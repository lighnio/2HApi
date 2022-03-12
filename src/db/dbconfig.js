require('dotenv').config();

const config = {
    user:  process.env.USER, // sql user
    password:  process.env.PASSWORD, //sql user password
    server:  '192.168.75.1', // if it does not work try- localhost
    port: 1433,
    database:  process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    
  }
  
  module.exports = config;