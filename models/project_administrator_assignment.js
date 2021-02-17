const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class ProjectAdministratorAssoc extends Sequelize.Model {}
    ProjectAdministratorAssoc.init({
        projectId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        administratorId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'project_administrator_association'});
    return ProjectAdministratorAssoc 
}

