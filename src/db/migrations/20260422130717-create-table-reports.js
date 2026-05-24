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

        await queryInterface.createTable('reports', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reporter_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            type: {
                type: Sequelize.ENUM('message', 'topic', 'comment', 'assignment_document'),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'resolved', 'rejected'),
                defaultValue: 'pending',
            },
            resolved_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            resolved_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            is_read: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.dropTable('reports')
    },
}
