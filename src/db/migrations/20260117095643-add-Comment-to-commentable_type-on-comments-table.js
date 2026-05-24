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
        await queryInterface.changeColumn('comments', 'commentable_type', {
            type: Sequelize.ENUM('Textbook', 'ReferenceMaterial', 'Assignment', 'Comment'),
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
        await queryInterface.changeColumn('comments', 'commentable_type', {
            type: Sequelize.ENUM('Textbook', 'ReferenceMaterial', 'Assignment'),
            allowNull: false,
        })
    },
}
