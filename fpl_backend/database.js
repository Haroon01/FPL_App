// const { Sequelize } = require('sequelize');
// const config = require('./config/config.json')['development'];
// console.log(config)

// const sequelize = new Sequelize(config);


// module.exports = sequelize;

const { Sequelize } = require('sequelize');

// Load configuration based on current environment
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

// Log the configuration to verify it's loading correctly
console.log(config);

// Initialize Sequelize with environment-specific configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
  // Add pool configuration if needed
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
