
const queries = [
    `ALTER TABLE Tasks CHANGE status status ENUM('todo','progress','done','fail') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'todo'`,
    `ALTER TABLE Projects CHANGE objectives objectives VARCHAR(6000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;`,
    `ALTER TABLE Projects CHANGE clientBackground clientBackground VARCHAR(1200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;`,
    `ALTER TABLE Projects CHANGE location location VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;`,

]
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

         await queryInterface.sequelize.query(queries[0]);
         await queryInterface.sequelize.query(queries[1]);
         await queryInterface.sequelize.query(queries[2]);

        await queryInterface.addColumn(
            'Participants', // table name
            'education', // new field name
            {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
            })

        await queryInterface.addColumn(
            'Participants', // table name
            'experience', // new field name
            {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
            })

        await queryInterface.addColumn(
            'Participants', // table name
            'live', // new field name
            {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
            })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};

