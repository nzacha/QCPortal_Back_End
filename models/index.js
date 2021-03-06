const path = require('path');
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize)
db.Data = require('./data')(sequelize)
db.Discipline = require('./discipline')(sequelize)
db.Category = require('./category')(sequelize)
db.Project = require('./project')(sequelize)
db.Administrator = require('./administrator')(sequelize)
db.ProjectAdministratorAssoc = require('./project_administrator_assignment')(sequelize)

db.Data.belongsTo(db.Discipline, {foreignKey: {allowNull: false}})
db.Discipline.hasMany(db.Data, {foreignKey: {allowNull: false}})

db.Discipline.belongsTo(db.Category, {foreignKey: {allowNull: false}})
db.Category.hasMany(db.Discipline, {foreignKey: {allowNull: false}})

db.Data.belongsTo(db.Project, {foreignKey: {allowNull: false}})
db.Project.hasMany(db.Data, {foreignKey: {allowNull: false}})

db.Administrator.belongsToMany(db.Project, {through: db.ProjectAdministratorAssoc, as: 'projects', foreignKey: 'administratorId', onDelete: 'cascade'})
db.Project.belongsToMany(db.Administrator, {through: db.ProjectAdministratorAssoc, as: 'administrators', foreignKey: 'projectId', onDelete: 'cascade'})

module.exports = db;
