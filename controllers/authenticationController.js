const models = require('../models')

const crypto = require('crypto')
SECRET_KEY = "26121997"
const getHashOf = (message) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET_KEY, 'hex'))
    .update(message)
    .digest('hex')

  return hash
}

exports.authenticate = async (request, response, next) =>{
    try{
        var {username, password} = request.body;
        password = getHashOf(password);
        admin = await models.Administrator.findOne({attributes: ['id','name', 'surname', 'username'], where: {username: username, password: password}, include:{model: models.Project, as: 'projects'}})
        if(admin){
            admin.dataValues.accountType = 'admin';
            response.status(200).json(admin)
        } else {
        	user = await models.User.findOne({attributes: ['id','name', 'surname', 'username', "isSuper"], where: {username: username, password: password}})
        	if(user){
                user.dataValues.accountType = 'user';
	            response.status(200).json(user)
	        } else {
	            response.status(400).send("An error ocurred")
	        }
        }
    } catch (e) {
        next(e)
    }
}

exports.authenticateAdmin = async (request, response, next) =>{
    try{
        var {username, password} = request.body;
        password = getHashOf(password);
        admin = await models.Administrator.findOne({attributes: ['id','name', 'surname', 'username'], where: {username: username, password: password}, include:{model: models.Project, as: 'projects'}})
        if(admin){
            response.status(200).json(admin)
        } else {
            response.status(400).send("An error ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.authenticateUser = async (request, response, next) =>{
    try{
        var {username, password} = request.body;
        password = getHashOf(password);
        user = await models.User.findOne({attributes: ['id','name', 'surname', 'username', 'isSuper'], where: {username: username, password: password}})
        if(user){
            response.status(200).json(user)
        } else {
            response.status(400).send("An error ocurred")
        }
    } catch (e) {
        next(e)
    }
}