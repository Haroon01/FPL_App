const dotenv = require('dotenv');
dotenv.config(); // This line is necessary if you are using dotenv to load your env variables locally

module.exports = {
 development: {
   username: 'root',
   password: 'password',
   database: 'fpl',
   host: 'localhost',
   dialect: 'mysql'
 },
 test: {
   username: process.env.DB_USERNAME || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME || 'my_test_db',
   host: process.env.DB_HOST || '127.0.0.1',
   dialect: 'mysql'
 },
 production: {
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   host: process.env.DB_HOST,
   dialect: 'mysql',
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false  // This may be necessary depending on your MySQL provider on Heroku
     }
   }
 }
};