'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        queryInterface.addColumn(
                'Messages',
                'discussion_id',
                Sequelize.STRING
            )
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
    },

    down: async(queryInterface, Sequelize) => {

        queryInterface.removeColumn(
                'Messages',
                'discussion_id'
            )
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
    }
};