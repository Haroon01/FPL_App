const { Sequelize } = require('sequelize');
const config = require('./config/config.json')['development'];
console.log(config)

const sequelize = new Sequelize(config);


module.exports = sequelize;