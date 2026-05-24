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
        await queryInterface.addIndex('topics', ['title'], { name: 'topic_title_idx', type: 'FULLTEXT' })
        await queryInterface.addIndex('topics', ['title'], { type: 'UNIQUE', name: 'topic_title_unique_idx' })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeIndex('topics', 'topic_title_idx', { type: 'FULLTEXT' })
        await queryInterface.removeIndex('topics', 'topic_title_unique_idx', { type: 'UNIQUE' })
    },
}
