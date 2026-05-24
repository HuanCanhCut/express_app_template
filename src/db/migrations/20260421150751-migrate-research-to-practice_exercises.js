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
        return await queryInterface.sequelize.transaction(async (t) => {
            try {
                await queryInterface.changeColumn(
                    'assignments',
                    'type',
                    {
                        type: Sequelize.ENUM('assignment', 'essay', 'project', 'personal', 'research', 'practice'),
                        allowNull: false,
                    },
                    { transaction: t },
                )

                const [practiceRemains] = await queryInterface.sequelize.query(
                    'SELECT * FROM assignments WHERE type = "research"',
                    { transaction: t },
                )

                for (let i = 0; i < practiceRemains.length; i++) {
                    await queryInterface.sequelize.query(
                        `UPDATE assignments
                        SET type = 'practice' 
                        WHERE id = ${practiceRemains[i].id}`,
                    )
                }

                await queryInterface.changeColumn(
                    'assignments',
                    'type',
                    {
                        type: Sequelize.ENUM('assignment', 'essay', 'project', 'personal', 'practice'),
                        allowNull: false,
                    },
                    { transaction: t },
                )
            } catch (error) {
                console.error(error)
                throw error
            }
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn('assignments', 'type', {
            type: Sequelize.ENUM('assignment', 'essay', 'project', 'personal', 'practice'),
            allowNull: false,
        })
    },
}
