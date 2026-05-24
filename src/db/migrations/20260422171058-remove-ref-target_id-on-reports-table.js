'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async (t) => {
            // 1. Drop foreign key constraint
            await queryInterface.removeConstraint('reports', 'reports_target_id_foreign_idx', { transaction: t })

            // 2. (Optional nhưng nên làm) đảm bảo column không còn reference
            await queryInterface.changeColumn(
                'reports',
                'target_id',
                {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                { transaction: t },
            )
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async (t) => {
            // rollback: add lại foreign key (nếu cần)
            await queryInterface.addConstraint('reports', {
                fields: ['target_id'],
                type: 'foreign key',
                name: 'reports_target_id_foreign_idx',
                references: {
                    table: 'messages',
                    field: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                transaction: t,
            })
        })
    },
}
