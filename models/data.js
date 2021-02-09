const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Data extends Sequelize.Model {}
    Data.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'data'});
    return Data 
}

