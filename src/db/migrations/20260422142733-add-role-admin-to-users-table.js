'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.changeColumn('users', 'role', {
            type: Sequelize.ENUM('student', 'teacher', 'bot', 'admin'),
            allowNull: false,
            defaultValue: 'student',
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn('users', 'role', {
            type: Sequelize.ENUM('student', 'teacher', 'bot'),
            allowNull: false,
            defaultValue: 'student',
        })
    },
}
