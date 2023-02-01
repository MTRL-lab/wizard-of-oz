
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Participants', // table name
      'gender', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: -1,
      },
      
    )
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.removeColumn('Participants', 'gender')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
