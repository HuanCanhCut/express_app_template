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
        await queryInterface.addColumn('reference_materials', 'type', {
            type: Sequelize.ENUM('file_upload', 'youtube'),
            allowNull: false,
        })
        await queryInterface.addColumn('reference_materials', 'source_url', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        const [materials] = await queryInterface.sequelize.query('SELECT id FROM reference_materials')

        for (const material of materials) {
            await queryInterface.sequelize.query(
                `UPDATE reference_materials SET type = 'file_upload', source_url = NULL WHERE id = ${material.id}`,
            )
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('reference_materials', 'type')
        await queryInterface.removeColumn('reference_materials', 'source_url')
    },
}
