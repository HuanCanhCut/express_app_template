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
        await queryInterface.sequelize.query(`
            UPDATE users
            SET academic_degree = 'Sinh viên'
            WHERE academic_degree IS NULL
        `)

        await queryInterface.changeColumn('users', 'academic_degree', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Sinh viên',
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn('users', 'academic_degree', {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        })
    },
}
