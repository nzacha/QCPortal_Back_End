const models = require('../models')

exports.getResearchers = async (request, response, next) =>{
    try{
        researchers = await models.Researcher.findAll({attributes: ['id','name', 'surname', 'email', 'phone','is_super_user'], include:{model: models.Project, as: 'projects', order: ["id", "asc"]}})
        response.status(200).json(researchers)
    } catch (e) {
        next(e)
    }
}

exports.getResearcher = async (request, response, next) =>{
    try{
        researcher = await models.Researcher.findOne({attributes: ['id','name', 'surname', 'email', 'phone','is_super_user'], where: {id: request.params.id}, include:{model: models.Project, as: 'projects', order: ["id", "asc"]}})
        response.status(200).json(researcher)
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
exports.addResearcher = async (request, response, next) =>{	
    try{    	
        var {email, password, name, surname, phone, isSuper} = request.body        
        if(email && password){
            password = getHashOf(password)
        	researcher = await models.Researcher.create({name: name, surname: surname, email: email, password: password, phone: phone, is_super_user: isSuper})
        	if(researcher){
	            response.status(200).json("Researcher created successfully")
        	} else {
				response.status(400).json("Something went wrong")
        	}
        } else {
            response.status(400).json("Something went wrong")
        }
    } catch (e) {
    	next(e)
    }
}

exports.removeResearcher = async (request, response, next) =>{ 
    try{        
        researcher = await models.Researcher.findOne({where: {id: request.params.id}})
        if (researcher){
            await researcher.destroy()
            response.status(200).json("OK")
        } else {
            response.status(404).json("Researcher not found")
        }
    } catch (e) {
        next(e)
    }
}

exports.updateResearcher = async (request, response, next) =>{ 
    try{        
        researcher = await models.Researcher.findOne({where: {id: request.params.id}})
        var {email, password, name, surname, phone} = request.body
        if (researcher){
        	if(password)
	            password = getHashOf(password)
            await researcher.update({name: name, surname: surname, email: email, password: password, phone: phone})
            researcher = await models.Researcher.findOne({attributes: ['id','name', 'surname', 'email', 'phone','is_super_user'], where: {id: request.params.id}, include:{model: models.Project, as: 'projects', order: ["id", "asc"]}})
            response.status(200).json(researcher);
        } else {
            response.status(404).json("Researcher not found")
        }
    } catch (e) {
        next(e)
    }
}