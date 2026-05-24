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
        await queryInterface.changeColumn('reference_materials', 'file_type', {
            type: Sequelize.STRING,
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
        await queryInterface.changeColumn('reference_materials', 'file_type', {
            type: Sequelize.ENUM('pdf', 'video', 'image', 'word', 'other'),
            allowNull: false,
        })
    },
}
