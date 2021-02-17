const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Category extends Sequelize.Model {}
    Category.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'category'});
    return Category 
}

