const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Project extends Sequelize.Model {}
    Project.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'project'});
    return Project 
}

