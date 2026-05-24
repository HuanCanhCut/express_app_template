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
        await queryInterface.addColumn('reports', 'description', {
            type: Sequelize.TEXT,
            allowNull: false,
        })

        await queryInterface.addColumn('reports', 'content', {
            type: Sequelize.TEXT,
            allowNull: false,
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('reports', 'description')
        await queryInterface.removeColumn('reports', 'content')
    },
}
