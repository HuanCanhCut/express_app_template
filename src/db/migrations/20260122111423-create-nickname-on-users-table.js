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

        await queryInterface.addColumn('users', 'nickname', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.sequelize.query(`
            UPDATE users
            SET nickname = SUBSTRING_INDEX(email, '@', 1)
            WHERE nickname IS NULL
        `)

        await queryInterface.changeColumn('users', 'nickname', {
            type: Sequelize.STRING,
            allowNull: false,
        })

        await queryInterface.addIndex('users', ['nickname'], {
            name: 'nickname_idx',
            unique: true,
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeIndex('users', 'nickname_idx')
        await queryInterface.removeColumn('users', 'nickname')
    },
}
