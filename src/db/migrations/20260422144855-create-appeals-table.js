'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('appeals', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            report_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'reports',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'approved', 'rejected'),
                defaultValue: 'pending',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('appeals')
    },
}
