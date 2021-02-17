const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Discipline extends Sequelize.Model {}
    Discipline.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'discipline'});
    return Discipline 
}

