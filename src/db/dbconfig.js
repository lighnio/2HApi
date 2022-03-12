require('dotenv').config();

const config = {
    user:  process.env.USER, // sql user
    password:  process.env.PASSWORD, //sql user password
    server:  '10.0.0.21', // if it does not work try- localhost
    port: 1433,
    database:  process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    
  }
  
  module.exports = config;