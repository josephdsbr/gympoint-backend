module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0,
      },
      height: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  },
};
