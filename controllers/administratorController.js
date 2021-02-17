const models = require('../models')

exports.getAdministrators = async (request, response, next) =>{
    try{
        administrator = await models.Administrator.findAll({attributes: ['id','name', 'surname', 'username'], include:{model: models.Project, as: 'projects', order: ["id", "asc"]}})
        response.status(200).json(administrator)
    } catch (e) {
        next(e)
    }
}

exports.getAdministrator = async (request, response, next) =>{
    try{
        administrator = await models.Administrator.findOne({attributes: ['id','name', 'surname', 'username'], where: {id: request.params.id}, include:{model: models.Project, as: 'projects', order: [[ 'projects', 'id', 'DESC']]}}) //order: ["id", "asc"]}})
        response.status(200).json(administrator)
    } catch (e) {
        next(e)
    }
}

const crypto = require('crypto')
SECRET_KEY = "26121997"
const getHashOf = (message) => {
  const hash = crypto
    .createHmac('sha256', Buffer.from(SECRET_KEY, 'hex'))
    .update(message)
    .digest('hex')

  return hash
}
exports.addAdministrator = async (request, response, next) =>{	
    try{    	
        var {username, password, name, surname} = request.body        
        if(username && password){
            password = getHashOf(password)
            admin = await models.Administrator.create({name: name, surname: surname, username: username, password: password})
            delete admin.dataValues.password;
            console.log(admin);
            if(admin){
	            response.status(200).json(admin)
        	} else {
				response.status(400).send("An Error Ocurred")
        	}
        } else {
            response.status(400).send("An Error Ocurred")
        }
    } catch (e) {
    	next(e)
    }
}

exports.removeAdministrator = async (request, response, next) =>{ 
    try{        
        admin = await models.Administrator.findOne({where: {id: request.params.id}})
        if (admin){
            await admin.destroy()
            response.status(200).json("OK")
        } else {
            response.status(404).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}

exports.updateAdministrator = async (request, response, next) =>{ 
    try{        
        admin = await models.Administrator.findOne({where: {id: request.params.id}})
        var {username, password, name, surname} = request.body
        if (admin){
        	if(password)
	            password = getHashOf(password)
            await admin.update({name: name, surname: surname, username: username, password: password})
            admin = await models.Administrator.findOne({attributes: ['id','name', 'surname', 'username'], where: {id: request.params.id}, include:{model: models.Project, as: 'projects', order: ["id", "asc"]}})
            response.status(200).json(admin);
        } else {
            response.status(404).send("An Error Ocurred")
        }
    } catch (e) {
        next(e)
    }
}