'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('reports', 'target_user_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('reports', 'target_user_id')
    },
}
