const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Administrator extends Sequelize.Model {}
    Administrator.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'administrator'});
    return Administrator 
}

