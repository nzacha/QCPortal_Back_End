const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {            
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            unique: true
        },
        isSuper: {
        	type: Sequelize.BOOLEAN,
        	defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'user'});
    return User 
}