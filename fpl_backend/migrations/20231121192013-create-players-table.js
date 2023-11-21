'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('Players', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pos: {
			type: DataTypes.STRING,
			allowNull: false
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		// club_id: { // foreign key!
		//     type: DataTypes.STRING,
		//     allowNull: false
		// },
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
		}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};


