const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Data extends Sequelize.Model {}
    Data.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        week:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        single:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        accumulated: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'data'});
    return Data 
}

