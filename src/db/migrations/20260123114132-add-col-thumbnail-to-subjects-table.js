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
        await queryInterface.addColumn('subjects', 'thumbnail', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.sequelize.query(`
            UPDATE subjects
            SET thumbnail = ''
            WHERE thumbnail IS NULL
        `)

        await queryInterface.changeColumn('subjects', 'thumbnail', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('subjects', 'thumbnail')
    },
}
