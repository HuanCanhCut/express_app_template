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
        await queryInterface.addColumn('users', 'blocked_by', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        })

        await queryInterface.addColumn('users', 'blocked_at', {
            type: Sequelize.DATE,
            allowNull: true,
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('users', 'blocked_by')
        await queryInterface.removeColumn('users', 'blocked_at')
    },
}
