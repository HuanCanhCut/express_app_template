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
        await queryInterface.createTable('textbooks', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            subject_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'subjects',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            publisher: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            published_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            file_path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            thumbnail: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            uploaded_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
        await queryInterface.dropTable('textbooks')
    },
}
